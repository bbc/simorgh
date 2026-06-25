import CurationMessageBanner from '.';
import readme from './README.md';

const FIXTURE_ID = 'curation-message-banner-story';

const Component = () => (
  <CurationMessageBanner
    id={FIXTURE_ID}
    heading="Follow BBC News Kyrgyz on social media"
    description="Follow all the updates minute-by-minute as the transfer window opens in the world's most popular league!"
    link="https://www.bbc.com/kyrgyz"
    linkText="Follow us"
    image="https://ichef.bbci.co.uk/ace/ws/{width}/cpsdevpb/66b8/test/d1be6bc0-8114-11ed-bd83-8f15ba358e41.png"
  />
);

export default {
  title: 'Components/Curation/MessageBanner',
  Component,
  parameters: {
    docs: { readme },
  },
};

export const Example = Component;

export const WithoutImage = () => (
  <CurationMessageBanner
    id={`${FIXTURE_ID}-no-image`}
    heading="Follow BBC News Kyrgyz on social media"
    description="Follow all the updates minute-by-minute as the transfer window opens in the world's most popular league!"
    link="https://www.bbc.com/kyrgyz"
    linkText="Follow us"
  />
);
