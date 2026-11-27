set -e
RAW4="promo-v4-raw.webm"
RAW3="promo-v3-raw.webm"
CARD="cards"
clip4() { ffmpeg -y -v error -ss "$2" -i "$RAW4" -t "$3" -an -r 25 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -vf "scale=1280:720" "shots2/$1.mp4"; }
clip3() { ffmpeg -y -v error -ss "$2" -i "$RAW3" -t "$3" -an -r 25 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -vf "scale=1280:720" "shots2/$1.mp4"; }
img() { ffmpeg -y -v error -loop 1 -framerate 25 -i "$2" -t "$3" -an -r 25 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -vf "scale=1280:720" "shots2/$1.mp4"; }
clip4 s01 19.00 1.60
clip4 s02 20.90 0.50
img  s03 "$CARD/hook-card2.png" 1.20
img  s04 "$CARD/logo-card.png" 1.40
clip4 s05 7.25 2.80
clip3 s06 15.45 2.40
clip4 s07 23.00 2.60
clip4 s08 30.20 2.40
clip4 s09 36.20 2.60
clip4 m1 20.95 0.43
clip4 m2 19.00 0.43
clip4 m3 24.10 0.44
clip4 m4 31.20 0.43
clip4 m5 38.70 0.44
clip4 m6 33.20 0.43
img  s10 "$CARD/end-card.png" 4.50
