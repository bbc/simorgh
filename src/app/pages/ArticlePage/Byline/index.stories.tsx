import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import Timestamp from '../../../legacy/containers/ArticleTimestamp';
import { bylineWithNameAndRole } from './fixture';
import Byline from '.';
import { withServicesKnob } from '../../../legacy/psammead/psammead-storybook-helpers/src';

interface Service {
  service: string;
}

interface Fixture extends Service {
  children?: JSX.Element;
}

const Component = ({ service, children }: Fixture) => {
  return (
    <ServiceContextProvider service={service}>
      <Byline blocks={bylineWithNameAndRole}>{children}</Byline>
    </ServiceContextProvider>
  );
};

export default {
  title: 'Components/Byline',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const AuthorRoleByline = ({ service }: Service) => (
  <Component service={service} />
);
export const AuthorRoleTimestampByline = ({ service }: Service) => (
  <Component service={service}>
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
