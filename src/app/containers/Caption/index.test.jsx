import React from 'react';
import { render } from 'enzyme';
import Caption from '.';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { ServiceContext } from '../../contexts/ServiceContext';
import { blockContainingText } from '../../models/blocks';

const newsServiceContextStub = {
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
};
const persianServiceContextStub = {
  imageCaptionOffscreenText: ' ، عنوان تصویر',
  videoCaptionOffscreenText: ' ، عنوان ویدئو',
};

const block = blockContainingText('caption', 'Some caption text...');

const CaptionWithContext = (contextStub, type) => (
  <ServiceContext.Provider value={contextStub}>
    <Caption block={block} type={type} />
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
  CaptionWithContext({ imageCaptionOffscreenText: undefined }),
);

describe('with offscreen text', () => {
  it('should render the default offscreen text', () => {
    const renderedWrapper = render(
      <ServiceContext.Provider value={newsServiceContextStub}>
        <Caption block={block} />
      </ServiceContext.Provider>,
    );
    expect(renderedWrapper.find('span').html()).toBe('Caption, ');
  });

  it('should render the video offscreen text', () => {
    const renderedWrapper = render(
      <ServiceContext.Provider value={newsServiceContextStub}>
        <Caption block={block} type="video" />
      </ServiceContext.Provider>,
    );
    expect(renderedWrapper.find('span').html()).toBe('Video caption, ');
  });

  it('should render the image offscreen text', () => {
    const renderedWrapper = render(
      <ServiceContext.Provider value={newsServiceContextStub}>
        <Caption block={block} type="image" />
      </ServiceContext.Provider>,
    );
    expect(renderedWrapper.find('span').html()).toBe('Image caption, ');
  });
});
