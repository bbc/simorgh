import path from 'ramda/src/path';
import hasPath from 'ramda/src/hasPath';
import getOriginCode from '../../../../../lib/utilities/imageSrcHelpers/originCode';
import getLocator from '../../../../../lib/utilities/imageSrcHelpers/locator';

const extractPromoData = ({ promo }) => {
  if (!promo) return null;

  if (hasPath(['indexImage'], promo)) {
    const cpsImage = path(['indexImage'], promo);

    return {
      headline: path(['headlines', 'headline'], promo),
      url: path(['locators', 'assetUri'], promo),
      indexImage: {
        width: path(['width'], cpsImage),
        height: path(['height'], cpsImage),
        altText: path(['altText'], cpsImage),
        copyrightHolder: path(['copyrightHolder'], cpsImage),
        originCode: getOriginCode(path(['path'], cpsImage)),
        locator: getLocator(path(['path'], cpsImage)),
      },
    };
  }

  const optimoImage = path(['images', 'defaultPromoImage', 'blocks'], promo);

  return {
    headline: path(
      [
        'headlines',
        'promoHeadline',
        'blocks',
        0,
        'model',
        'blocks',
        0,
        'model',
        'text',
      ],
      promo,
    ),
    url: path(['locators', 'canonicalUrl'], promo),
    indexImage: {
      width: path([1, 'model', 'width'], optimoImage),
      height: path([1, 'model', 'height'], optimoImage),
      altText: path(
        [0, 'model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
        optimoImage,
      ),
      copyrightHolder: path([1, 'model', 'copyrightHolder'], optimoImage),
      originCode: path([1, 'model', 'originCode'], optimoImage),
      locator: path([1, 'model', 'locator'], optimoImage),
    },
  };
};

export default extractPromoData;
