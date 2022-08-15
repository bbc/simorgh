import { withKnobs, number } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import Pager from '.';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <Pager
        activePage={number('Active Page', 5, { min: 1, max: 100 })}
        pageCount={number('PageCount', 10, { min: 2, max: 100 })}
      />
    </ServiceContextProvider>
  );
};

export default {
  title: 'Topic/Pager',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Pagination = Component;
