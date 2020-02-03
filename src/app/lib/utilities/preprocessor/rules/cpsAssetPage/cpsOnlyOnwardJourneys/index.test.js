import path from 'ramda/src/path';
import cpsOnlyOnwardJourneys from '.';
import pglNoCpsOnwardJourneys from '#data/arabic/cpsAssets/art-and-culture-38260491.json';
import styNoCpsOnwardJourneys from '#data/igbo/cpsAssets/afirika-23252735.json';
import pglNoOnwardJourneys from '#data/pidgin/cpsAssets/sport-23252855.json';
import pglAllCpsOnwardJourneys from '#data/pidgin/cpsAssets/tori-49221071.json';
import mapPageAllCpsOnwardJourneys from '#data/pidgin/cpsAssets/23248703.json';
import seeAlsoGroup from './fixtures/pglSomeCpsOnwardJourneys/expectedSeeAlsoGroup.json';
import fullAsset from './fixtures/pglSomeCpsOnwardJourneys/fullAsset.json';

describe('cpsOnlyOnwardJourneys', () => {
  it('should remove onward journeys without type: cps', () => {
    const result = cpsOnlyOnwardJourneys(fullAsset);
    const groups = path(['relatedContent', 'groups'], result);
    const actualSeeAlso = groups.find(({ type }) => {
      return type === 'see-alsos';
    });
    expect(actualSeeAlso).toEqual(seeAlsoGroup);
  });

  it('should remove related content section if all onward journeys are not cps content - PGL', () => {
    const result = cpsOnlyOnwardJourneys(pglNoCpsOnwardJourneys);
    const groups = path(['relatedContent', 'groups'], result);
    expect(groups.some(({ type }) => type === 'see-alsos')).toBeFalsy();
  });

  it('should remove related content section if all onward journeys are not cps content - STY', () => {
    const result = cpsOnlyOnwardJourneys(styNoCpsOnwardJourneys);
    const groups = path(['relatedContent', 'groups'], result);
    expect(groups.some(({ type }) => type === 'see-alsos')).toBeFalsy();
  });

  it('should leave onward journeys unchanged if type: cps, PGL page', () => {
    const result = cpsOnlyOnwardJourneys(pglAllCpsOnwardJourneys);
    expect(result).toEqual(pglAllCpsOnwardJourneys);
  });
  it('should leave onward journeys unchanged if type: cps, MAP page', () => {
    const result = cpsOnlyOnwardJourneys(mapPageAllCpsOnwardJourneys);
    expect(result).toEqual(mapPageAllCpsOnwardJourneys);
  });

  it('should leave payload unchanged if no onward journeys', () => {
    const result = cpsOnlyOnwardJourneys(pglNoOnwardJourneys);
    expect(result).toEqual(pglNoOnwardJourneys);
  });
});
