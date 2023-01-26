

FOLDER=$1 
REMOTE_JSON=$2

_extract() {
  echo ${1} | base64 --decode | jq -r ${2};
}

create_directories() {
    
  echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
  echo "╿  ↯  📂 Create directories for images...  "  
  echo "└┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈";

  mkdir -p "$FOLDER/foils/upscaled";
  mkdir -p "$FOLDER/masks/upscaled";

}

fetch_json() {
    
  if [[ -n $REMOTE_JSON ]]; then

    echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
    echo "╿  ↯  📃 Fetching JSON ┃ $REMOTE_JSON  "  
    echo "└┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈";

    JSON=$( curl $REMOTE_JSON );     # 🌐 remote JSON file
    # JSON=$( cat $REMOTE_JSON );      # 💻 local JSON file

  else

    echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
    echo "╿  ↯  ⛔ No JSON Provided, not fetching"  
    echo "└┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈";

  fi

}

download_images() {
    
  if [[ -n $JSON ]]; then

    local CURL_BATCH="";
    local LOOP_COUNT=0;
      
    for row in $( jq -r '.[] | @base64'); do

      local FOIL_TYPE=$( _extract ${row} '._foil_mask' );
      local FOIL_EFFECT=$( _extract ${row} '._foil_effect' );

      # only continue if there's a foil image (some are null)
      if [[ $FOIL_TYPE != 'None' ]]; then

        # get the foil image value
        local FOIL_IMG=$( _extract ${row} '._foil_img' );

        # get name/path parts
        local EXT="${FOIL_IMG##*.}";
        local SERIES=$( _extract ${row} '._ptcgo_set' );
        local NUMBER=$( _extract ${row} '.collector_number.numerator' );
        local NUMBER="${NUMBER/'SWSH'/}"
        local SUFFIX="_${FOIL_TYPE,,}_${FOIL_EFFECT,,}";
        local SUFFIX="${SUFFIX/'reverse_flatsilver'/'holo_reverse'}"

        # create new name/output
        local NAME="${NUMBER,,}_foil$SUFFIX.$EXT";
        local OUTPUT="${FOLDER}/masks/${NAME}";

        echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
        echo "╿  ↯  🔻 Downloading ${FOIL_IMG##*/} -> ${NAME}..."
        echo "└┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈";
        
        # download the source image
        CURL_BATCH="${CURL_BATCH}\\nurl=\"${FOIL_IMG}\"\\noutput=\"${OUTPUT}\"\\n";

      fi

    done < <( echo $JSON )

    echo "";
    echo -e "$CURL_BATCH" | curl --parallel --parallel-immediate --parallel-max 20 --config -;
    echo "";

    echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
    echo "╿  ↯  ✅ Finished Downloading from ${JSON}  "  
    echo "└┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈";

  else

    echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
    echo "╿  ↯  ⛔ No JSON Provided, not downloading images"  
    echo "└┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈";

  fi


}


# ======================================================================


upscale() {

  echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
  echo "╿  ⇑  🔼 Upscaling / Converting ${FOLDER}  "  
  echo "├┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈";
  echo "│ ";

  for file in ${FOLDER}/masks/*.png; do

    # get filename for the image
    local FILENAME=$( echo "${file##*/}" | cut -f 1 -d '.' );
    local SUFFIX="up"

    # echo "┝ 🔼 Upscaling & Converting ${file##*/}..."

    # params for conversions
    local mask_alpha="-alpha set -background none -channel A -evaluate multiply 8 +channel"
    local mask_brightness=""
    local desaturate="-modulate 100x0"
    local downsize="-colorspace LAB -filter Lanczos2 -distort resize 50% -colorspace sRGB"
    local remove_alpha="-background black -alpha remove -alpha off"
    local foil_brightness="-channel RGB -brightness-contrast 63x73"

    if [[ $FILENAME =~ .*etched.* ]]; then
      # only need to boost brightness on etched cards
      mask_brightness="-channel RGB -brightness-contrast 32x52"
    fi

    # output for 4x masks
    local UPSCALED="${FOLDER}/masks/upscaled/${FILENAME}_${SUFFIX}.png";
    # output for 2x masks
    local UPSCALE_MASK2="${FOLDER}/masks/upscaled/${FILENAME}_2x.png";
    # output for 4x masks
    local UPSCALE_MASK4="${FOLDER}/masks/upscaled/${FILENAME}_4x.png";

    # echo "│  🟣 🔼 4️⃣   Upscaling Mask Image with realesrgan.py";
    python3 ~/Real-ESRGAN/inference_realesrgan.py -i ${file} --suffix ${SUFFIX} -o ${FOLDER}/masks/upscaled/

    # echo "│  🔵 🔼 4️⃣   Simplifying Mask image";
    convert ${UPSCALED} ${mask_alpha} ${mask_brightness} "${UPSCALE_MASK4}";

    # echo "│  🔵 🔽 2️⃣   Downsampling Mask image";
    convert ${UPSCALE_MASK4} ${desaturate} ${downsize} "${UPSCALE_MASK2}";

    # ======================================================================

    # output for 1x foils
    local OUTPUT_FOIL1="${FOLDER}/foils/${FILENAME}.png";
    # output for 2x foils
    local OUTPUT_FOIL2="${FOLDER}/foils/upscaled/${FILENAME}_2x.png";
    # output for 4x foils
    local OUTPUT_FOIL4="${FOLDER}/foils/upscaled/${FILENAME}_4x.png";

    # echo "│  ⚫ 1️⃣   Creating Greyscale image";
    convert ${file} ${desaturate} ${remove_alpha} ${foil_brightness} "${OUTPUT_FOIL1}";

    # echo "│  ⚫ 2️⃣   Creating Greyscale image";
    convert ${UPSCALED} ${desaturate} ${remove_alpha} ${foil_brightness} ${downsize} "${OUTPUT_FOIL2}";

    # echo "│  ⚫ 4️⃣   Creating Greyscale image";
    convert ${UPSCALED} ${desaturate} ${remove_alpha} ${foil_brightness} "${OUTPUT_FOIL4}";

  done;

  echo "┝━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
  echo "│  ⇑  ✅ Finish Upscaling / Converting ${FOLDER}"
  echo "└┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈";

}

# ======================================================================

compress() {
    
  echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
  echo "╿  ⇄  🌐 Creating WebP for ${FOLDER}"  
  echo "├┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈";
  echo "│ ";

  shopt -s globstar nullglob;
  for file in ${FOLDER}/**/*_2x.png; do

    # echo "┝  🌐 converting ${file} to WebP image";
    cwebp "${file}" -m 6 -mt -q 56 -alpha_q 62 -quiet -o "${file%.png}.webp"

  done;
    
  echo "┝━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
  echo "│  ⇄  ✅ Finish WebP for ${FOLDER}"
  echo "└┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈";

}



time ( 

  create_directories

  fetch_json
  download_images

  upscale
  compress

)
