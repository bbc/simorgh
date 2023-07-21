import path from 'ramda/src/path';
import hasPath from 'ramda/src/hasPath';
import getOriginCode from '../../../../../lib/utilities/imageSrcHelpers/originCode';
import getLocator from '../../../../../lib/utilities/imageSrcHelpers/locator';
import {
  OptimoRecommendation,
  Recommendation,
} from '../../../../../models/types/onwardJourney';

const extractPromoData = ({ promo }: { promo: Recommendation | null }) => {
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

  const optimoImageBlocks = path<
    OptimoRecommendation['images']['defaultPromoImage']['blocks']
  >(['images', 'defaultPromoImage', 'blocks'], promo);

  const optimoImage = optimoImageBlocks?.find(
    block => block.type === 'rawImage',
  );
  const optimoImageAltText = optimoImageBlocks?.find(
    block => block.type === 'altText',
  );

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
      width: path(['model', 'width'], optimoImage),
      height: path(['model', 'height'], optimoImage),
      altText: path(
        ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
        optimoImageAltText,
      ),
      copyrightHolder: path(['model', 'copyrightHolder'], optimoImage),
      originCode: path(['model', 'originCode'], optimoImage),
      locator: path(['model', 'locator'], optimoImage),
    },
  };
};

export default extractPromoData;
