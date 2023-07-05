import pathOr from 'ramda/src/pathOr';
import take from 'ramda/src/take';
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

const getNumberPromoFixtures = (dir, number = 1) =>
  take(number, getPromoFixtures(dir));

export default getNumberPromoFixtures;
