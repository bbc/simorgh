import getPreprocessorRules from '.';
import {
  cpsAssetPreprocessorRules,
  articlesPreprocessorRules,
  indexPreprocessorRules,
  radioPagePreprocessorRules,
} from '../preprocessorRulesConfig';

describe('getPreprocessorRules', () => {
  it("should return the correct rules for type: 'article'", async () => {
    expect(getPreprocessorRules('article')).toBe(articlesPreprocessorRules);
  });

  it("should return the correct rules for type: 'WS-LIVE'", async () => {
    expect(getPreprocessorRules('WS-LIVE')).toBe(radioPagePreprocessorRules);
  });

  it("should return the correct rules for type: 'IDX'", async () => {
    expect(getPreprocessorRules('IDX')).toBe(indexPreprocessorRules);
  });

  it("should return the correct rules for type: 'FIX'", async () => {
    expect(getPreprocessorRules('FIX')).toBe(indexPreprocessorRules);
  });

  it("should return the correct rules for type: 'MAP'", async () => {
    expect(getPreprocessorRules('MAP')).toBe(cpsAssetPreprocessorRules);
  });

  it("should return the correct rules for type: 'STY'", async () => {
    expect(getPreprocessorRules('STY')).toBe(cpsAssetPreprocessorRules);
  });

  it("should return the correct rules for type: 'PGL'", async () => {
    expect(getPreprocessorRules('PGL')).toBe(cpsAssetPreprocessorRules);
  });

  it("should return the correct rules for type: 'foobar'", async () => {
    expect(getPreprocessorRules('foobar')).toEqual([]);
  });
});
