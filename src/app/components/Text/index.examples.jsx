import React from 'react';
import Text from './index';
// import { ServiceContext } from '../ServiceContext';
// import Caption from '../Figure/Caption/index';

const serviceContextStubNews = {
  imageCaptionOffscreenText: 'Image caption, ',
};

/**
 * Absence of 'name' means it won't render in Storybook
 * Defaults to shouldMatchSnapshot, but can provide custom validate function
 */

export default [
  {
    description: 'should return null',
    render: <Text />,
    validate: result => result === null,
  },
  {
    name: 'default',
    description: 'should render correctly',
    render: <Text text="This is text with no formatting." />,
  },
  {
    name: 'bold',
    description: 'should render bold',
    render: <Text text="This is text with **some bold formatting**." />,
  },
  {
    name: 'italic',
    description: 'should render italics',
    render: <Text text="This is text with _some italic formatting_." />,
  },
  {
    name: 'strike-through',
    description: 'should render strike-through',
    render: (
      <Text text="This is text with ~~some strike-through formatting~~." />
    ),
  },
  {
    name: 'inline code',
    description: 'should render inline-code',
    render: <Text text="This is text with `some inline code`." />,
  },
  {
    name: 'inline link',
    description: 'should render an inline link',
    render: (
      <Text text="This is text that contains an [inline link](https://www.bbc.com/news) inside it." />
    ),
  },
  {
    description:
      'should render a <figcaption> as per the Caption component override',
    dependencies: {
      ServiceContext: '../ServiceContext/index',
      Caption: '../Figure/Caption/index',
    },
    render: `
      <ServiceContext.Provider value={${JSON.stringify(
        serviceContextStubNews,
      )}}>
        <Text
          text="This is text that contains an [inline link](https://www.bbc.com/news) inside it."
          paragraphOverride={Caption}
        />
      </ServiceContext.Provider>
    `,
  },
];
