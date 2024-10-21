import { pathOr, take } from 'rambda';
import { v4 as uuid } from 'uuid';
import { data as serbianFrontPageData } from '#data/serbian/frontpage/lat';
import { data as urduFrontPageData } from '#data/urdu/frontpage';

const { article: fixture } = serbianFrontPageData;
const { article: rtlFixture } = urduFrontPageData;

const getFixtureData = dir => (dir === 'ltr' ? fixture : rtlFixture);

const getPromoFixtures = dir =>
  pathOr(null, ['content', 'groups'], getFixtureData(dir))
    .flatMap(group => pathOr(null, ['items'], group))
    .filter(item => pathOr(null, ['assetTypeCode'], item) === 'PRO')
    .map(item => ({ id: uuid(), ...item }));

const getNumberPromoFixtures = (dir, number = 1) => {
  const promoFixtures = getPromoFixtures(dir);

  if (promoFixtures.length < number) {
    const [promo] = promoFixtures;

    let i = 1;
    while (i <= number) {
      promoFixtures.push({
        ...promo,
        name: `${promo.name} ${i + 1}`,
        summary: `${promo.summary} ${i + 1}`,
        id: uuid(),
      });
      i += 1;
    }
  }

  return take(number, promoFixtures);
};

export default getNumberPromoFixtures;
