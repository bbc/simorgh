// biome-ignore-all lint/style/noCommonJs: we want this
const regexes = {
  AMP_REGEX: /\.amp$/,
  APP_REGEX: /\.app$/,
  LITE_REGEX: /\.lite$/,
  TLD_REGEX: /(\.com|\.co\.uk)/g,
};

module.exports = regexes;
