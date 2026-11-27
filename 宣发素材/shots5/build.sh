set -e
RAW="promo-v5-raw.webm"
COVER="cover/用户封面.jpg"
enc() { ffmpeg -y -v error "$@" -an -r 25 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -vf "scale=1280:720"; }

# 片头：用户封面
ffmpeg -y -v error -loop 1 -framerate 25 -i "$COVER" -t 4.0 -an -r 25 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fade=t=in:st=0:d=0.35,fade=t=out:st=3.65:d=0.35" shots5/s01.mp4

# 搜刮出货 10.8-17.0 -> 7.5s
ffmpeg -y -v error -ss 10.8 -t 4.4 -i "$RAW" -an -r 25 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -vf "setpts=(PTS-STARTPTS)*1.70,scale=1280:720,fps=25" shots5/s02.mp4

# 小兵对射 17.8-21.3 -> 4.5s
ffmpeg -y -v error -ss 17.8 -t 3.5 -i "$RAW" -an -r 25 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -vf "setpts=(PTS-STARTPTS)*1.29,scale=1280:720,fps=25" shots5/s03.mp4

# Boss 反击 22.3-29.8 -> 8.5s
ffmpeg -y -v error -ss 22.3 -t 6.4 -i "$RAW" -an -r 25 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -vf "setpts=(PTS-STARTPTS)*1.32,scale=1280:720,fps=25" shots5/s04.mp4

# 双 Boss 32.4-34.0 -> 2.6s
ffmpeg -y -v error -ss 32.4 -t 1.6 -i "$RAW" -an -r 25 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -vf "setpts=(PTS-STARTPTS)*1.63,scale=1280:720,fps=25" shots5/s05.mp4

# 坦克 37.0-40.8 -> 5.0s
ffmpeg -y -v error -ss 37.0 -t 3.8 -i "$RAW" -an -r 25 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -vf "setpts=(PTS-STARTPTS)*1.32,scale=1280:720,fps=25" shots5/s06.mp4

# 战机 43.8-48.0 -> 5.5s
ffmpeg -y -v error -ss 43.8 -t 4.2 -i "$RAW" -an -r 25 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -vf "setpts=(PTS-STARTPTS)*1.31,scale=1280:720,fps=25" shots5/s07.mp4

# 片尾：用户封面
ffmpeg -y -v error -loop 1 -framerate 25 -i "$COVER" -t 6.5 -an -r 25 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fade=t=in:st=0:d=0.4" shots5/s08.mp4
