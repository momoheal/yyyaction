set -e
RAW="promo-v4-raw.webm"
CARD="cards"
enc() { ffmpeg -y -v error "$@" -an -r 25 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -vf "scale=1280:720" ; }
clip() { # name start dur
  ffmpeg -y -v error -ss "$2" -i "$RAW" -t "$3" -an -r 25 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -vf "scale=1280:720" "shots/$1.mp4"
}
img() { # name file dur
  ffmpeg -y -v error -loop 1 -framerate 25 -i "$2" -t "$3" -an -r 25 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -vf "scale=1280:720" "shots/$1.mp4"
}
clip s01 14.30 2.20
clip s02 12.72 1.20
img  s03 "$CARD/hook-card.png" 1.40
img  s04 "$CARD/logo-card.png" 1.40
clip s05 7.25 2.80
clip s06 19.20 2.60
clip s07 23.00 2.60
clip s08 30.20 2.40
clip s09 36.20 2.60
# rapid montage 6 x 0.45
clip m1 20.95 0.45
clip m2 19.00 0.45
clip m3 24.10 0.45
clip m4 31.20 0.45
clip m5 38.70 0.45
clip m6 33.20 0.45
img  s10 "$CARD/end-card.png" 4.50
