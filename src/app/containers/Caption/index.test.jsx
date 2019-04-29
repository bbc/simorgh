import React from 'react';
import { render } from 'enzyme';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import CaptionContainer from '.';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { ServiceContext } from '../../contexts/ServiceContext';
import { blockContainingText } from '../../models/blocks';

const newsServiceContextStub = {
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  script: latin,
};
const persianServiceContextStub = {
  imageCaptionOffscreenText: ' ، عنوان تصویر',
  videoCaptionOffscreenText: ' ، عنوان تصویر',
  script: arabic,
};

const block = blockContainingText('caption', 'Some caption text...');

const CaptionWithContext = (contextStub, type) => (
  <ServiceContext.Provider value={contextStub}>
    <CaptionContainer block={block} type={type} />
  </ServiceContext.Provider>
);

shouldMatchSnapshot(
  'should render caption text with example News offscreen text',
  CaptionWithContext(newsServiceContextStub, 'image'),
);

shouldMatchSnapshot(
  'should render caption text with example Farsi offscreen text',
  CaptionWithContext(persianServiceContextStub, 'image'),
);

shouldMatchSnapshot(
  'should render caption text with no VisuallyHiddenText component when no imageCaptionOffscreenText is defined in ServiceContext',
  CaptionWithContext({ imageCaptionOffscreenText: undefined, script: latin }),
);

describe('with offscreen text', () => {
  it('should render the default offscreen text', () => {
    const renderedWrapper = render(
      <ServiceContext.Provider value={newsServiceContextStub}>
        <CaptionContainer block={block} />
      </ServiceContext.Provider>,
    );
    expect(renderedWrapper.find('span').html()).toBe('Caption, ');
  });

  it('should render the video offscreen text', () => {
    const renderedWrapper = render(
      <ServiceContext.Provider value={newsServiceContextStub}>
        <CaptionContainer block={block} type="video" />
      </ServiceContext.Provider>,
    );
    expect(renderedWrapper.find('span').html()).toBe('Video caption, ');
  });

  it('should render the image offscreen text', () => {
    const renderedWrapper = render(
      <ServiceContext.Provider value={newsServiceContextStub}>
        <CaptionContainer block={block} type="image" />
      </ServiceContext.Provider>,
    );
    expect(renderedWrapper.find('span').html()).toBe('Image caption, ');
  });

  it('should render the persian image offscreen text', () => {
    const renderedWrapper = render(
      <ServiceContext.Provider value={persianServiceContextStub}>
        <CaptionContainer block={block} type="image" />
      </ServiceContext.Provider>,
    );
    expect(renderedWrapper.find('span').text()).toBe(' ، عنوان تصویر');
  });

  it('should render the persian video offscreen text', () => {
    const renderedWrapper = render(
      <ServiceContext.Provider value={persianServiceContextStub}>
        <CaptionContainer block={block} type="image" />
      </ServiceContext.Provider>,
    );
    expect(renderedWrapper.find('span').text()).toBe(' ، عنوان تصویر');
  });
});
