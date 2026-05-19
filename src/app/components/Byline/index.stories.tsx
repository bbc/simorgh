import type { PropsWithChildren } from 'react';
import type { OptimoBylineBlock } from '#app/models/types/optimo';
import type { PostContributor } from '../../../../ws-nextjs-app/pages/[service]/live/[id]/Post/types';
import Timestamp from '../../legacy/containers/ArticleTimestamp';
import {
  bylineWithNameAndRole,
  bylineWithNameAndNoRoleAndLocation,
  bylineWithLink,
  bylineWithLinkAndLocation,
  bylineWithNonPngPhoto,
  bylineWithPngPhoto,
  bylineWithMultipleContributors,
  bylineWithMultipleContributorsRTL,
  bylineWithMultipleContributorsNoRole,
} from '../../pages/ArticlePage/fixtureData';
import {
  bylineSamplePost,
  bylinesSamplePostWithoutImage,
  bylinesSamplePostWithoutSubtitle,
} from '../../../../ws-nextjs-app/pages/[service]/live/[id]/Post/fixture';
import Byline from '.';
import readme from './README.md';
import metadata from './metadata.json';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ARTICLE_PAGE, LIVE_PAGE } from '../../routes/utils/pageTypes';
import type { PageTypes, Services, Direction } from '../../models/types/global';
import filterForBlockType from '../../lib/utilities/blockHandlers';

interface ComponentProps {
  service?: Services;
  pageType?: PageTypes;
  fixture: OptimoBylineBlock['model']['blocks'] | PostContributor['model'][];
  dir?: Direction;
}

const Component = ({
  service = 'pidgin',
  pageType = ARTICLE_PAGE,
  fixture,
  children,
  dir = 'ltr',
}: PropsWithChildren<ComponentProps>) => (
  <RequestContextProvider
    pageType={pageType}
    pathname="/pathname"
    service={service}
  >
    <ServiceContextProvider service={service}>
      {pageType === ARTICLE_PAGE ? (
        <div dir={dir}>
          <Byline blocks={fixture as OptimoBylineBlock['model']['blocks']}>
            {children}
          </Byline>
        </div>
      ) : (
        <Byline blocks={fixture as PostContributor['model'][]}>
          {children}
        </Byline>
      )}
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

export const MultipleContributorsBylineRTL = () => (
  <Component
    service={'arabic'}
    fixture={bylineWithMultipleContributorsRTL}
    dir={'rtl'}
  />
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
