import React from 'react';
import { shallow } from 'enzyme';
import Caption from './index';

describe('Caption', () => {
  const CaptionWithContext = (captionText, stubbedContext) =>
    shallow(<Caption>{captionText}</Caption>, {
      context: { props: stubbedContext },
    });

  const newsContextStub = {
    imageCaptionOffscreenText: 'Image caption, ',
  };
  it('should render correctly with news ServiceContext', () => {
    expect(
      CaptionWithContext('This is some Caption text', newsContextStub),
    ).toMatchSnapshot();
  });

  const persianContextStub = {
    imageCaptionOffscreenText: ' ، عنوان تصویر',
  };
  it('should render correctly with news ServiceContext', () => {
    expect(
      CaptionWithContext('توصیف چیزی که اتفاق می افتد', persianContextStub),
    ).toMatchSnapshot();
  });
});
