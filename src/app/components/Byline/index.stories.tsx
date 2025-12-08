import { PropsWithChildren } from 'react';
import { OptimoBylineBlock } from '#app/models/types/optimo';
import Timestamp from '../../legacy/containers/ArticleTimestamp';
import {
  bylineWithNameAndRole,
  bylineWithNameAndNoRoleAndLocation,
  bylineWithLink,
  bylineWithLinkAndLocation,
  bylineWithNonPngPhoto,
  bylineWithPngPhoto,
  bylineWithMultipleContributors,
} from '../../pages/ArticlePage/fixtureData';
import Byline from '.';
import readme from './README.md';
import metadata from './metadata.json';

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
    metadata,
  },
};

export const AuthorRoleByline = () => (
  <Component fixture={bylineWithNameAndRole} />
);

export const AuthorNoRoleByline = () => (
  <Component fixture={bylineWithNameAndNoRoleAndLocation} />
);

export const MultipleContributorsByline = () => (
  <Component fixture={bylineWithMultipleContributors} />
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
export const LocationByline = () => (
  <Component fixture={bylineWithLinkAndLocation}>
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
export const LocationNoPhotoByline = () => (
  <Component fixture={bylineWithNonPngPhoto}>
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
export const LocationPhotoByline = () => (
  <Component fixture={bylineWithPngPhoto}>
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);
