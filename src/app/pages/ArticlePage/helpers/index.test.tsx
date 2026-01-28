import React from 'react';
import getUnderArticleComponents from './index';

const minimalOptimoBlock = { type: 'text', model: {} };

const baseProps = {
  referrerVariant: 'control',
  referrerExperimentName: 'exp',
  topStoriesData: [{ id: 1 }],
  featuresData: [{ id: 2 }],
  articleBlocks: [minimalOptimoBlock],
  grey2: '#eee',
  showRelatedTopics: true,
  pageStyles: { hideOnDesktop: {} },
};

const getKeys = (elements: React.ReactNode[]) =>
  elements
    .filter(Boolean)
    .map(element => (React.isValidElement(element) ? element.key : null))
    .filter(Boolean);

describe('getUnderArticleComponents', () => {
  it('returns all components in default order for control variant', () => {
    const components = getUnderArticleComponents({
      ...baseProps,
      referrerVariant: 'control',
      referrer: 'social',
    });
    const keys = getKeys(components);
    expect(keys).toEqual(['relatedContent', 'topStories', 'features']);
  });
  it('returns all components in search order when referrer variant is adaptive_variant and referrer is search', () => {
    const components = getUnderArticleComponents({
      ...baseProps,
      referrerVariant: 'adaptive_variant',
      referrer: 'search',
    });
    const keys = getKeys(components);
    expect(keys).toEqual(['relatedContent', 'topStories', 'features']);
  });
  it('returns all components in social order when referrer variant is adaptive_variant and referrer is social', () => {
    const components = getUnderArticleComponents({
      ...baseProps,
      referrerVariant: 'adaptive_variant',
      referrer: 'social',
    });
    const keys = getKeys(components);
    expect(keys).toEqual(['features', 'relatedContent', 'topStories']);
  });

  it('returns all components in direct order when referrer variant is adaptive_variant and referrer is direct', () => {
    const components = getUnderArticleComponents({
      ...baseProps,
      referrerVariant: 'adaptive_variant',
      referrer: 'direct',
    });
    const keys = getKeys(components);
    expect(keys).toEqual(['topStories', 'relatedContent', 'features']);
  });

  it('filters out null components', () => {
    const components = getUnderArticleComponents({
      ...baseProps,
      topStoriesData: [],
      featuresData: null,
      referrerVariant: 'control',
      referrer: 'social',
    });
    const keys = getKeys(components);
    expect(keys).toEqual(['relatedContent']);
  });

  it('returns default order for unknown variant', () => {
    const components = getUnderArticleComponents({
      ...baseProps,
      referrerVariant: 'something_else',
      referrer: 'social',
    });
    const keys = getKeys(components);
    expect(keys).toEqual(['relatedContent', 'topStories', 'features']);
  });

  it('returns default order for empty string variant', () => {
    const components = getUnderArticleComponents({
      ...baseProps,
      referrerVariant: '',
      referrer: 'social',
    });
    const keys = getKeys(components);
    expect(keys).toEqual(['relatedContent', 'topStories', 'features']);
  });
  it('returns default order when referrerVariant is adaptive_variant and referrer is null', () => {
    const components = getUnderArticleComponents({
      ...baseProps,
      referrerVariant: 'adaptive_variant',
      referrer: null,
    });
    const keys = getKeys(components);
    expect(keys).toEqual(['relatedContent', 'topStories', 'features']);
  });

  it('returns default order when referrerVariant is adaptive_variant and referrer is undefined', () => {
    const components = getUnderArticleComponents({
      ...baseProps,
      referrerVariant: 'adaptive_variant',
      // referrer is undefined
    });
    const keys = getKeys(components);
    expect(keys).toEqual(['relatedContent', 'topStories', 'features']);
  });
});
