
aws s3 sync  \
  .  \
  s3://robcmills.net/movie-library  \
  --exclude '*.DS_Store'  \
  --exclude '.sass-cache*'  \
  --dryrun
