import pathOr from 'ramda/src/pathOr';
import take from 'ramda/src/take';
import uuid from 'uuid';
import fixture from '#data/pidgin/frontpage';
import rtlFixture from '#data/urdu/frontpage';

const getFixtureData = (dir) => (dir === 'ltr' ? fixture : rtlFixture);

const getPromoFixtures = (dir) =>
  pathOr(null, ['content', 'groups'], getFixtureData(dir))
    .flatMap((group) => pathOr(null, ['items'], group))
    .filter((item) => pathOr(null, ['assetTypeCode'], item) === 'PRO')
    .map((item) => ({ id: uuid(), ...item }));

const getNumberPromoFixtures = (dir, number = 1) =>
  take(number, getPromoFixtures(dir));

export default getNumberPromoFixtures;
