
aws s3 sync  \
  /Users/robcmills/code/building-connected/movie-library/dist  \
  s3://robcmills.net/movie-library  \
  --exclude '*.DS_Store'  \
  --dryrun
