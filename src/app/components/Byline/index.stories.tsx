import React, { PropsWithChildren } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import Timestamp from '../../legacy/containers/ArticleTimestamp';
import {
  bylineWithNameAndRole,
  bylineWithLink,
  bylineWithLinkAndLocation,
  bylineWithNonPngPhoto,
  bylineWithPngPhoto,
} from '../../pages/ArticlePage/fixtureData';
import Byline from '.';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../ThemeProvider';
import { StoryProps } from '../../models/types/storybook';
import md from './README.md';

interface ComponentProps extends StoryProps {
  fixture: object[];
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
  parameters: {
    docs: {
      component: {
        title: 'Byline',
      },
      page: md,
    },
  },
  decorators: [withKnobs, withServicesKnob()],
};

export const AuthorRoleByline = ({ service, variant }: StoryProps) => (
  <Component
    fixture={bylineWithNameAndRole}
    service={service}
    variant={variant}
  />
);

export const LinkByline = ({ service, variant }: StoryProps) => (
  <Component fixture={bylineWithLink} service={service} variant={variant} />
);

export const AuthorRoleTimestampByline = ({ service, variant }: StoryProps) => (
  <Component fixture={bylineWithLink} service={service} variant={variant}>
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
export const LinkAndLocationByline = ({ service, variant }: StoryProps) => (
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
export const LinkLocationNoPhotoByline = ({ service, variant }: StoryProps) => (
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
export const LinkLocationPhotoByline = ({ service, variant }: StoryProps) => (
  <Component fixture={bylineWithPngPhoto} service={service} variant={variant}>
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
