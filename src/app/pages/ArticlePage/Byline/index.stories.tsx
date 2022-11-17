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
} from './fixture';
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

function Component({
  service,
  variant,
  fixture,
  children,
}: PropsWithChildren<ComponentProps>) {
  return (
    <ServiceContextProvider service={service}>
      <ThemeProvider service={service} variant={variant}>
        <Byline blocks={fixture}>{children}</Byline>
      </ThemeProvider>
    </ServiceContextProvider>
  );
}

export default {
  title: 'Components/Byline',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export function AuthorRoleByline({ service, variant }: Props) {
  return (
    <Component
      fixture={bylineWithNameAndRole}
      service={service}
      variant={variant}
    />
  );
}
export function LinkByline({ service, variant }: Props) {
  return (
    <Component fixture={bylineWithLink} service={service} variant={variant} />
  );
}
export function AuthorRoleTimestampByline({ service, variant }: Props) {
  return (
    <Component fixture={bylineWithLink} service={service} variant={variant}>
      <Timestamp
        firstPublished={1660658887}
        lastPublished={1660658887}
        popOut={false}
      />
    </Component>
  );
}
export function LinkAndLocationByline({ service, variant }: Props) {
  return (
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
}
export function LinkLocationNoPhotoByline({ service, variant }: Props) {
  return (
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
}
export function LinkLocationPhotoByline({ service, variant }: Props) {
  return (
    <Component fixture={bylineWithPngPhoto} service={service} variant={variant}>
      <Timestamp
        firstPublished={1660658887}
        lastPublished={1660658887}
        popOut={false}
      />
    </Component>
  );
}
