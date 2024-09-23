import React, { PropsWithChildren } from 'react';
import { OptimoBylineBlock } from '#app/models/types/optimo';
import Timestamp from '../../legacy/containers/ArticleTimestamp';
import {
  bylineWithNameAndRole,
  bylineWithLink,
  bylineWithLinkAndLocation,
  bylineWithNonPngPhoto,
  bylineWithPngPhoto,
} from '../../pages/ArticlePage/fixtureData';
import Byline from '.';
import readme from './README.md';

interface ComponentProps {
  fixture: OptimoBylineBlock['model']['blocks'];
}

const Component = ({
  fixture,
  children,
}: PropsWithChildren<ComponentProps>) => (
  <Byline blocks={fixture}>{children}</Byline>
);

export default {
  title: 'Components/Byline',
  Component,
  parameters: {
    docs: { readme },
  },
};

export const AuthorRoleByline = () => (
  <Component fixture={bylineWithNameAndRole} />
);

export const LinkByline = () => <Component fixture={bylineWithLink} />;

export const AuthorRoleTimestampByline = () => (
  <Component fixture={bylineWithLink}>
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
export const LinkAndLocationByline = () => (
  <Component fixture={bylineWithLinkAndLocation}>
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
export const LinkLocationNoPhotoByline = () => (
  <Component fixture={bylineWithNonPngPhoto}>
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
export const LinkLocationPhotoByline = () => (
  <Component fixture={bylineWithPngPhoto}>
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
