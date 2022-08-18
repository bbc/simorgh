import path from 'ramda/src/path';
import pglNoCpsPromos from '#data/arabic/cpsAssets/art-and-culture-38260491.json';
import styNoCpsPromos from '#data/igbo/cpsAssets/afirika-23252735.json';
import pglNoRelatedContent from '#data/pidgin/cpsAssets/sport-23252855.json';
import pglAllCpsPromos from '#data/pidgin/cpsAssets/tori-49221071.json';
import mapPageAllCpsPromos from '#data/pidgin/cpsAssets/23248703.json';
import noSeeAlsoRelatedContent from '#data/sport/cpsAssets/football/55790817.json';
import cpsOnlyPromos from '.';
import seeAlsoGroup from './fixtures/pglSomeCpsOnwardJourneys/expectedSeeAlsoGroup.json';
import fullAsset from './fixtures/pglSomeCpsOnwardJourneys/fullAsset.json';

describe('cpsOnlyOnwardJourneys', () => {
  it("should remove promos in 'see-alsos' group without type: cps", () => {
    const result = cpsOnlyPromos(fullAsset);
    const groups = path(['relatedContent', 'groups'], result);
    const actualSeeAlso = groups.find(({ type }) => {
      return type === 'see-alsos';
    });
    expect(actualSeeAlso).toEqual(seeAlsoGroup);
  });

  it("should empty related content 'groups' if all 'see-alsos' promos are not cps content - PGL", () => {
    const result = cpsOnlyPromos(pglNoCpsPromos);
    const groups = path(['relatedContent', 'groups'], result);
    expect(groups).toHaveLength(0);
  });

  it("should empty related content 'groups' if all 'see-alsos' promos are not cps content - STY", () => {
    const result = cpsOnlyPromos(styNoCpsPromos);
    const groups = path(['relatedContent', 'groups'], result);
    expect(groups).toHaveLength(0);
  });

  it("should empty related content 'groups' if groups are not of type 'see-alsos'", () => {
    const result = cpsOnlyPromos(noSeeAlsoRelatedContent);
    const groups = path(['relatedContent', 'groups'], result);
    expect(groups).toHaveLength(0);
  });

  it("should leave 'see-alsos' group promos unchanged if type: cps, PGL page", () => {
    const result = cpsOnlyPromos(pglAllCpsPromos);
    expect(result).toEqual(pglAllCpsPromos);
  });
  it("should leave 'see-alsos' group promos unchanged if type: cps, MAP page", () => {
    const result = cpsOnlyPromos(mapPageAllCpsPromos);
    expect(result).toEqual(mapPageAllCpsPromos);
  });

  it('should leave payload unchanged if no related content groups', () => {
    const result = cpsOnlyPromos(pglNoRelatedContent);
    expect(result).toEqual(pglNoRelatedContent);
  });
});
