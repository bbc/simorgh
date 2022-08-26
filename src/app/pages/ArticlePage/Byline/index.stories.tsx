import React, { PropsWithChildren } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import Timestamp from '../../../legacy/containers/ArticleTimestamp';
import { bylineWithNameAndRole, bylineWithLink } from './fixture';
import Byline from '.';
import { withServicesKnob } from '../../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../../../components/ThemeProvider';

interface Props {
  service: any;
  fixture: any;
}

const Component = ({
  service,
  fixture,
  children,
}: PropsWithChildren<Props>) => (
  <ServiceContextProvider service={service}>
    <ThemeProvider service={service}>
      <Byline blocks={fixture}>{children}</Byline>
    </ThemeProvider>
  </ServiceContextProvider>
);

export default {
  title: 'Components/Byline',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const AuthorRoleByline = ({ service }: Props) => (
  <Component fixture={bylineWithNameAndRole} service={service} />
);
export const LinkByline = ({ service }: Props) => (
  <Component fixture={bylineWithLink} service={service} />
);
export const AuthorRoleTimestampByline = ({ service }: Props) => (
  <Component fixture={bylineWithLink} service={service}>
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
