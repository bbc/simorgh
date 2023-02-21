import React, { PropsWithChildren } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import Timestamp from '../../../legacy/containers/ArticleTimestamp';
import {
  bylineWithNameAndRole,
  bylineWithLink,
  bylineWithLinkAndLocation,
  bylineWithNonPngPhoto,
  bylineWithPngPhoto,
} from '../fixtureData';
import Byline from '.';
import { withServicesKnob } from '../../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../../../components/ThemeProvider';
import { Services, Variants } from '../../../models/types/global';

interface Props {
  service: Services;
  variant: Variants;
}
interface ComponentProps extends Props {
  fixture: any;
}

const Component = ({
  service,
  variant,
  fixture,
  children,
}: PropsWithChildren<ComponentProps>) => (
  <ServiceContextProvider service={service}>
    <ThemeProvider service={service} variant={variant}>
      <Byline blocks={fixture}>{children}</Byline>
    </ThemeProvider>
  </ServiceContextProvider>
);

export default {
  title: 'Components/Byline',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const AuthorRoleByline = ({ service, variant }: Props) => (
  <Component
    fixture={bylineWithNameAndRole}
    service={service}
    variant={variant}
  />
);
export const LinkByline = ({ service, variant }: Props) => (
  <Component fixture={bylineWithLink} service={service} variant={variant} />
);
export const AuthorRoleTimestampByline = ({ service, variant }: Props) => (
  <Component fixture={bylineWithLink} service={service} variant={variant}>
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
export const LinkAndLocationByline = ({ service, variant }: Props) => (
  <Component
    fixture={bylineWithLinkAndLocation}
    service={service}
    variant={variant}
  >
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
export const LinkLocationNoPhotoByline = ({ service, variant }: Props) => (
  <Component
    fixture={bylineWithNonPngPhoto}
    service={service}
    variant={variant}
  >
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
export const LinkLocationPhotoByline = ({ service, variant }: Props) => (
  <Component fixture={bylineWithPngPhoto} service={service} variant={variant}>
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
