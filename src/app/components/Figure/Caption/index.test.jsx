import React from 'react';
import { shallow } from 'enzyme';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import serviceContextStub from '../../../helpers/contextHelpers';

beforeEach(() => {
  jest.resetModules();
});

const getCaptionWithServiceContext = serviceContext => {
  jest.doMock('../../ServiceContext', () => ({
    ServiceContextConsumer: ({ imageCaptionOffscreenText }) => (
      <VisuallyHiddenText>{imageCaptionOffscreenText}</VisuallyHiddenText>
    ),
  }));

  // return the updated LanguageSelector module that now includes the mocked context
  /* eslint-disable-next-line global-require */
  return require('./index').Caption;
};

const CaptionWithService = (captionText, service) => {
  const serviceContext = serviceContextStub[service];
  const Caption = getCaptionWithServiceContext(serviceContext);
  return <Caption>{captionText}</Caption>;
};

describe('Caption', () => {
  it('should render correctly with news ServiceContext', () => {
    const component = CaptionWithService('This is some Caption text', 'news');
    expect(shallow(component)).toMatchSnapshot();
  });

  shouldMatchSnapshot(
    'should render correctly with persian ServiceContext',
    CaptionWithService('توصیف چیزی که اتفاق می افتد', 'persian'),
  );
});
