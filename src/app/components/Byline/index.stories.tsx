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
  bylineWithMultipleContributorsNoRole,
} from '../../pages/ArticlePage/fixtureData';
import Byline from '.';
import readme from './README.md';
import metadata from './metadata.json';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ARTICLE_PAGE } from '../../routes/utils/pageTypes';
import { Services } from '../../models/types/global';

interface ComponentProps {
  service?: Services;
  fixture: OptimoBylineBlock['model']['blocks'];
}

const Component = ({
  service = 'pidgin',
  fixture,
  children,
}: PropsWithChildren<ComponentProps>) => (
  <RequestContextProvider
    pageType={ARTICLE_PAGE}
    pathname="/pathname"
    service={service}
  >
    <ServiceContextProvider service={service}>
      <Byline blocks={fixture}>{children}</Byline>
    </ServiceContextProvider>
  </RequestContextProvider>
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

export const MultipleContributorsBylineFinalContributorNoRole = () => (
  <Component fixture={bylineWithMultipleContributorsNoRole} />
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
