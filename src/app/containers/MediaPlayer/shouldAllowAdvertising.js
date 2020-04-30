export default ({
  isEmbedabble,
  isOutsideUk,
  allowGlobal,
  allowService,
  allowAsset,
  assetType,
  assetDuration,
}) => {
  let ALLOW_ADVERTISING = false;

  if (isEmbedabble === false) {
    if (isOutsideUk === true) {
      if (allowGlobal === true) {
        if (allowService === true) {
          if (['cps', 'legacy'].includes(assetType)) {
            if (allowAsset === true) {
              if (assetDuration >= 30) {
                ALLOW_ADVERTISING = true;
              }
            }
          }
        }
      }
    }
  }
  return ALLOW_ADVERTISING;
};
