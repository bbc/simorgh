import React, { PropsWithChildren } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import Timestamp from '../../../legacy/containers/ArticleTimestamp';
import { bylineWithNameAndRole } from './fixture';
import Byline from '.';
import { withServicesKnob } from '../../../legacy/psammead/psammead-storybook-helpers/src';
import { Services } from '../../../models/types/global';

interface Props {
  service: Services;
}

const Component = ({ service, children }: PropsWithChildren<Props>) => {
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

export const AuthorRoleByline = ({ service }: Props) => (
  <Component service={service} />
);
export const AuthorRoleTimestampByline = ({ service }: Props) => (
  <Component service={service}>
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
