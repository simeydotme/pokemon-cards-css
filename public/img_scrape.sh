

outputDirectory=$1 
jsonFile=$2

_extract() {
  echo ${1} | base64 --decode | jq -r ${2};
}
# fetch JSON file
echo "📃 Fetching JSON ~ ${jsonFile}..."

JSON=$( curl $jsonFile );     # 🌐 remote JSON file
# JSON=$( cat $jsonFile );      # 💻 local JSON file
FOLDER="${outputDirectory}";  # local folder

# make folders for images to go in, if needed
mkdir -p "$FOLDER/foils";
mkdir -p "$FOLDER/masks";
echo "📂 Create directories for images...";

CURL_BATCH="";
LOOP_COUNT=0;

for row in $( jq -r '.[] | @base64'); do

  FOIL_TYPE=$( _extract ${row} '._foil_mask' );
  FOIL_EFFECT=$( _extract ${row} '._foil_effect' );

  # only continue if there's a foil image (some are null)
  if [[ $FOIL_TYPE != 'None' ]]; then

    # get the foil image value
    FOIL_IMG=$( _extract ${row} '._foil_img' );

    # get name/path parts
    EXT="${FOIL_IMG##*.}";
    SERIES=$( _extract ${row} '._ptcgo_set' );
    NUMBER=$( _extract ${row} '.collector_number.numerator' );
    NUMBER="${NUMBER/'SWSH'/}"
    SUFFIX="_${FOIL_TYPE,,}_${FOIL_EFFECT,,}";
    SUFFIX="${SUFFIX/'reverse_flatsilver'/'holo_reverse'}"

    # create new name/output
    NAME="${NUMBER,,}_foil$SUFFIX.$EXT";
    OUTPUT="${FOLDER}/masks/${NAME}";

    # download the source image
    echo "🔻 Downloading ${FOIL_IMG##*/} -> ${NAME}..."
    # curl -sN $FOIL_IMG -o $OUTPUT     # curl 1-by-1, not good.
    CURL_BATCH="${CURL_BATCH}\\nurl=\"${FOIL_IMG}\"\\noutput=\"${OUTPUT}\"\\n";

  fi

done < <( echo $JSON )

echo "";
echo -e "$CURL_BATCH" | curl --parallel --parallel-immediate --parallel-max 20 --config -;
echo "";

echo "✅ Finish downloading"
echo "";

# ======================================================================


for file in ${FOLDER}/masks/*.png; do

  # create upscaled name/output
  FILENAME=$( echo "${file##*/}" | cut -f 1 -d '.' );
  OUTPUT_UPSCALED="${FOLDER}/foils/${FILENAME}.jpg";

  # if [[ ! $FILENAME =~ .*reverse.* ]]; then
    # create upscaled, and desaturated version
    echo "🔁 Upscaling & Converting ${file##*/}..."
    convert ${file} -modulate 100x0 -background black -alpha remove -alpha off -brightness-contrast 50x60 -filter Lanczos2 -distort resize x2048 -quality 66 "${OUTPUT_UPSCALED}";
  # else
    # echo "  🔽 Skipping Reverse Holo ${file##*/}..."
  # fi;
  
done;

echo "";
echo "✅ Finish upscaling"
