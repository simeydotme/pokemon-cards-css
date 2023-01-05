

outputDirectory=$1 
jsonFile=$2

_extract() {
  echo ${1} | base64 --decode | jq -r ${2};
}
# fetch JSON file
echo "📃 Fetching JSON ~ ${jsonFile}..."

# JSON=$( curl $jsonFile );     # 🌐 remote JSON file
# JSON=$( cat $jsonFile );      # 💻 local JSON file
FOLDER="${outputDirectory}";  # local folder

# make folders for images to go in, if needed
mkdir -p "$FOLDER/foils/upscaled";
mkdir -p "$FOLDER/masks/upscaled";
echo "📂 Create directories for images...";

CURL_BATCH="";
LOOP_COUNT=0;

# for row in $( jq -r '.[] | @base64'); do

#   FOIL_TYPE=$( _extract ${row} '._foil_mask' );
#   FOIL_EFFECT=$( _extract ${row} '._foil_effect' );

#   # only continue if there's a foil image (some are null)
#   if [[ $FOIL_TYPE != 'None' ]]; then

#     # get the foil image value
#     FOIL_IMG=$( _extract ${row} '._foil_img' );

#     # get name/path parts
#     EXT="${FOIL_IMG##*.}";
#     SERIES=$( _extract ${row} '._ptcgo_set' );
#     NUMBER=$( _extract ${row} '.collector_number.numerator' );
#     NUMBER="${NUMBER/'SWSH'/}"
#     SUFFIX="_${FOIL_TYPE,,}_${FOIL_EFFECT,,}";
#     SUFFIX="${SUFFIX/'reverse_flatsilver'/'holo_reverse'}"

#     # create new name/output
#     NAME="${NUMBER,,}_foil$SUFFIX.$EXT";
#     OUTPUT="${FOLDER}/masks/${NAME}";

#     # download the source image
#     echo "🔻 Downloading ${FOIL_IMG##*/} -> ${NAME}..."
#     # curl -sN $FOIL_IMG -o $OUTPUT     # curl 1-by-1, not good.
#     CURL_BATCH="${CURL_BATCH}\\nurl=\"${FOIL_IMG}\"\\noutput=\"${OUTPUT}\"\\n";

#   fi

# done < <( echo $JSON )

echo "";
# echo -e "$CURL_BATCH" | curl --parallel --parallel-immediate --parallel-max 20 --config -;
echo "";

echo "✅ Finish downloading"
echo "";

# ======================================================================


for file in ${FOLDER}/masks/*.png; do

  # get filename for the image
  FILENAME=$( echo "${file##*/}" | cut -f 1 -d '.' );

  echo "";
  echo "🔁 Upscaling & Converting ${file##*/}..."
  echo "";

  # output for 2x masks
  UPSCALE_MASK2="${FOLDER}/masks/upscaled/${FILENAME}_2x.png";
  # output for 4x masks
  UPSCALE_MASK4="${FOLDER}/masks/upscaled/${FILENAME}_4x.png";

  echo "  🔼 Upscaling Image with realesrgan.py @ 4️⃣";
  python3 ~/Real-ESRGAN/inference_realesrgan.py -i ${file} --suffix 4x -o ${FOLDER}/masks/upscaled/

  echo "  🔼 ◼ Creating Mask image @ 4️⃣";
  convert ${UPSCALE_MASK4} -modulate 100x0 -brightness-contrast 50x60 "${UPSCALE_MASK4}";

  echo "  🔼 ◼ Creating Mask image @ 2️⃣";
  convert ${UPSCALE_MASK4} -modulate 100x0 -colorspace LAB -filter Lanczos2 -distort resize 50% -colorspace sRGB "${UPSCALE_MASK2}";

  
  # output for 1x foils
  OUTPUT_FOIL1="${FOLDER}/foils/${FILENAME}.png";
  # output for 2x foils
  OUTPUT_FOIL2="${FOLDER}/foils/upscaled/${FILENAME}_2x.png";
  # output for 4x foils
  OUTPUT_FOIL4="${FOLDER}/foils/upscaled/${FILENAME}_4x.png";

  echo "  ◼ Creating Greyscale image @ 1️⃣";
  convert ${file} -modulate 100x0 -background black -alpha remove -alpha off -brightness-contrast 50x60 "${OUTPUT_FOIL1}";

  echo "  🔼 ◼ Creating Greyscale image @ 4️⃣";
  convert ${UPSCALE_MASK4} -modulate 100x0 -background black -alpha remove -alpha off -brightness-contrast 30x40 "${OUTPUT_FOIL4}";

  echo "  🔼 ◼ Creating Greyscale image @ 2️⃣";
  convert ${UPSCALE_MASK2} -modulate 100x0 -background black -alpha remove -alpha off -brightness-contrast 30x40 "${OUTPUT_FOIL2}";

  # if [[ ! $FILENAME =~ .*reverse.* ]]; then
    # create upscaled, and desaturated version
    # echo "🔁 Upscaling & Converting ${file##*/}..."
    # convert ${file} -modulate 100x0 -background black -alpha remove -alpha off -brightness-contrast 50x60 -filter Lanczos2 -distort resize x2048 -quality 66 "${OUTPUT_UPSCALED}";
  # else
    # echo "  🔽 Skipping Reverse Holo ${file##*/}..."
  # fi;
  
done;

echo "";
echo "✅ Finish upscaling"

shopt -s globstar nullglob;
for file in ${FOLDER}/**/*.png; do

  echo "  🖼 converting ${file} to WebP image";
  cwebp "${file}" -m 6 -mt -q 56 -alpha_q 62 -quiet -o "${file%.png}.webp"

done;




# python3 inference_realesrgan.py -s 4 -i i.png -o folder/
# cwebp i.png -m 6 -mt -q 56 -alpha_q 62 -o o.webp
#

# python3 inference_realesrgan.py -i ../Dev/pokemon-deck-builder/public/img/tests/170_foil_etched_sunpillar.png -o ../Dev/pokemon-deck-builder/public/img/tests/170_foil_etched_sunpillar-ganup.png
# python3 ../../../Real-ESRGAN/inference_realesrgan.py -i img/tests/170_foil_etched_sunpillar.png -o img/tests/170_foil_etched_sunpillar-ganupxx.png