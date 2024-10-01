import React from 'react';
import ShareButton from '.';
import metadata from './metadata.json';

const Component = () => {
  return (
    <ShareButton
      contentId="foo"
      eventTrackingData={{ componentName: 'test' }}
      headline="bar"
    />
  );
};

export default {
  title: 'Components/Live Page Share Button',
  Component,
  parameters: {
    metadata,
    design: [
      {
        name: 'Group 0',
        type: 'figma',
        url: 'https://www.figma.com/design/ZdVqC4YXh68UVL6Id5iTrn/Live-page---Share-tools?node-id=3321-16901&t=CjTYRFcZHoNYA0rY-4',
      },
      {
        name: 'Group 1',
        type: 'figma',
        url: 'https://www.figma.com/design/ZdVqC4YXh68UVL6Id5iTrn/Live-page---Share-tools?node-id=3321-16933&t=CjTYRFcZHoNYA0rY-4',
      },
      {
        name: 'Group 2',
        type: 'figma',
        url: 'https://www.figma.com/design/ZdVqC4YXh68UVL6Id5iTrn/Live-page---Share-tools?node-id=3321-16983&t=CjTYRFcZHoNYA0rY-4',
      },
      {
        name: 'Group 3',
        type: 'figma',
        url: 'https://www.figma.com/design/ZdVqC4YXh68UVL6Id5iTrn/Live-page---Share-tools?node-id=3321-17015&t=CjTYRFcZHoNYA0rY-4',
      },
      {
        name: 'Group 4',
        type: 'figma',
        url: 'https://www.figma.com/design/ZdVqC4YXh68UVL6Id5iTrn/Live-page---Share-tools?node-id=3321-17397&t=CjTYRFcZHoNYA0rY-4',
      },
    ],
  },
};

export const ShareButtonComponent = () => <Component />;
