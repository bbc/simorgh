import { PropsWithChildren } from 'react';
import { OptimoBylineBlock } from '#app/models/types/optimo';
// eslint-disable-next-line import/no-relative-packages
import { PostContributor } from '../../../../ws-nextjs-app/pages/[service]/live/[id]/Post/types';
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
import {
  bylineSamplePost,
  bylinesSamplePostWithoutImage,
  bylinesSamplePostWithoutSubtitle,
  // eslint-disable-next-line import/no-relative-packages
} from '../../../../ws-nextjs-app/pages/[service]/live/[id]/Post/fixture';
import Byline from '.';
import readme from './README.md';
import metadata from './metadata.json';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ARTICLE_PAGE, LIVE_PAGE } from '../../routes/utils/pageTypes';
import { PageTypes, Services } from '../../models/types/global';
import filterForBlockType from '../../lib/utilities/blockHandlers';

interface ComponentProps {
  service?: Services;
  pageType?: PageTypes;
  fixture: OptimoBylineBlock['model']['blocks'] | PostContributor['model'][];
}

const Component = ({
  service = 'pidgin',
  pageType = ARTICLE_PAGE,
  fixture,
  children,
}: PropsWithChildren<ComponentProps>) => (
  <RequestContextProvider
    pageType={pageType}
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

export const AuthorRoleBylineLivePage = () => {
  const { model: postContributorBlocks } = filterForBlockType(
    bylineSamplePost.header.model.blocks,
    'contributor',
  );

  return <Component pageType={LIVE_PAGE} fixture={[postContributorBlocks]} />;
};

export const AuthorRoleNoPhotoLivePage = () => {
  const { model: postContributorBlocks } = filterForBlockType(
    bylinesSamplePostWithoutImage.header.model.blocks,
    'contributor',
  );

  return <Component pageType={LIVE_PAGE} fixture={[postContributorBlocks]} />;
};

export const AuthorNoRoleLivePage = () => {
  const { model: postContributorBlocks } = filterForBlockType(
    bylinesSamplePostWithoutSubtitle.header.model.blocks,
    'contributor',
  ) as PostContributor;

  return <Component pageType={LIVE_PAGE} fixture={[postContributorBlocks]} />;
};
