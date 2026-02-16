import ShareButton from '.';
import metadata from './metadata.json';

const Component = ({
  url,
  contentId,
}: {
  url?: string;
  contentId?: string;
}) => (
  <ShareButton
    contentId={contentId}
    eventTrackingData={{ componentName: 'test' }}
    title="bar"
    url={url}
  />
);

export default {
  title: 'Components/Share Button',
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

export const ShareButtonLivePagePost = () => (
  <Component url="https://www.bbc.com/news/live" />
);
export const ShareButtonPortraitVideoCarousel = () => (
  <Component contentId="portrait-video-carousel" />
);
