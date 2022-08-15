import { latin } from '#psammead/gel-foundations/src/scripts';
import { ServiceContext } from '#contexts/ServiceContext';
import HeadingsContainer from '.';
import blocksSingleFragment from './testHelpers';

const headline = blocksSingleFragment('This is a headline.', []);

const subheadline = blocksSingleFragment('This is a subheadline.', []);

// eslint-disable-next-line react/prop-types
const Component = ({ type, blocks }) => (
  <ServiceContext.Provider value={{ script: latin, service: 'news' }}>
    <HeadingsContainer type={type} blocks={blocks} />
  </ServiceContext.Provider>
);

export default {
  title: 'Containers/Heading',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Heading = () => <Component type="headline" blocks={headline} />;
export const Subheading = () => (
  <Component type="subheadline" blocks={subheadline} />
);
