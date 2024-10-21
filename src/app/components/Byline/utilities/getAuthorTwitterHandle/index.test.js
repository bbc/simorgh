import { pathOr } from 'rambda';
import getAuthorTwitterHandle from '.';
import {
  contentBlockWithByline,
  contentBlockWithEmptyLinkFragment,
  contentBlockWithMultipleBylines,
  contentBlockWithMultipleContributors,
  contentBlockWithNoByline,
  contentBlockWithNoBylineLink,
  contentBlockWithMultipleHandlePrefixes,
  contentBlockWithNoHandlePrefixes,
} from './fixture';

describe('getAuthorTwitterHandle', () => {
  it('should get the twitter handle from the byline block', () => {
    const contentBlocks = pathOr(
      [],
      ['content', 'model', 'blocks'],
      contentBlockWithByline,
    );
    const twitterHandle = getAuthorTwitterHandle(contentBlocks);

    expect(twitterHandle).toEqual('@mary_harper');
  });

  it('should resolve the twitter handle to null where the text from the fragment block is empty', () => {
    const contentBlocks = pathOr(
      [],
      ['content', 'model', 'blocks'],
      contentBlockWithEmptyLinkFragment,
    );
    const twitterHandle = getAuthorTwitterHandle(contentBlocks);

    expect(twitterHandle).toEqual(null);
  });

  it('should resolve the twitter handle to null where the content blocks contains multiple bylines', () => {
    const contentBlocks = pathOr(
      [],
      ['content', 'model', 'blocks'],
      contentBlockWithMultipleBylines,
    );
    const twitterHandle = getAuthorTwitterHandle(contentBlocks);

    expect(twitterHandle).toEqual(null);
  });

  it('should resolve the twitter handle to null where the byline contains multiple contributors', () => {
    const contentBlocks = pathOr(
      [],
      ['content', 'model', 'blocks'],
      contentBlockWithMultipleContributors,
    );
    const twitterHandle = getAuthorTwitterHandle(contentBlocks);

    expect(twitterHandle).toEqual(null);
  });

  it('should resolve the twitter handle to null where there is no byline in the content blocks', () => {
    const contentBlocks = pathOr(
      [],
      ['content', 'model', 'blocks'],
      contentBlockWithNoByline,
    );
    const twitterHandle = getAuthorTwitterHandle(contentBlocks);

    expect(twitterHandle).toEqual(null);
  });

  it('should resolve the twitter handle to null where there is no link in the byline block', () => {
    const contentBlocks = pathOr(
      [],
      ['content', 'model', 'blocks'],
      contentBlockWithNoBylineLink,
    );
    const twitterHandle = getAuthorTwitterHandle(contentBlocks);

    expect(twitterHandle).toEqual(null);
  });

  it('should resolve the twitter handle to a single @ prefix where there are multiple @ symbols in the fragment text', () => {
    const contentBlocks = pathOr(
      [],
      ['content', 'model', 'blocks'],
      contentBlockWithMultipleHandlePrefixes,
    );
    const twitterHandle = getAuthorTwitterHandle(contentBlocks);

    expect(twitterHandle).toEqual('@mary_harper');
  });

  it('should resolve the twitter handle to a single @ prefix where the @ symbol is missing in the fragment text', () => {
    const contentBlocks = pathOr(
      [],
      ['content', 'model', 'blocks'],
      contentBlockWithNoHandlePrefixes,
    );
    const twitterHandle = getAuthorTwitterHandle(contentBlocks);

    expect(twitterHandle).toEqual('@mary_harper');
  });
});
