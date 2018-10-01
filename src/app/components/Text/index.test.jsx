import React from 'react';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';
import Text from './index';
import Caption from '../Figure/Caption/index';
import { ServiceContext } from '../ServiceContext';

describe('Text', () => {
  describe('with no data', () => {
    isNull('should return null', <Text />);
  });

  shouldMatchSnapshot(
    'should render bold',
    <Text text="This is text with **some bold formatting**." />,
  );

  shouldMatchSnapshot(
    'should render italics',
    <Text text="This is text with _some italic formatting_." />,
  );

  shouldMatchSnapshot(
    'should render strike-through',
    <Text text="This is text with ~~some strike-through formatting~~." />,
  );

  shouldMatchSnapshot(
    'should render inline-code',
    <Text text="This is text with `some inline code`." />,
  );

  shouldMatchSnapshot(
    'should render an inline link',
    <Text text="This is text that contains an [inline link](https://www.bbc.com/news) inside it." />,
  );

  const serviceContextStubNews = {
    imageCaptionOffscreenText: 'Image caption, ',
  };

  shouldMatchSnapshot(
    'should render a <figcaption> as per the Caption component override',
    <ServiceContext.Provider value={serviceContextStubNews}>
      <Text
        text="This is text that contains an [inline link](https://www.bbc.com/news) inside it."
        paragraphOverride={Caption}
      />
    </ServiceContext.Provider>,
  );
});
