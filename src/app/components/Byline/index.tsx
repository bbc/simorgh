/* eslint-disable jsx-a11y/aria-role */
import { Children, use, type PropsWithChildren } from 'react';
import {
  ARTICLE_PAGE,
  LIVE_PAGE,
  MEDIA_ARTICLE_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
} from '#app/routes/utils/pageTypes';
import type { OptimoBylineBlock } from '#app/models/types/optimo';
import type { PostContributor as LivePageContributor } from '../../../../ws-nextjs-app/pages/[service]/live/[id]/Post/types';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import VisuallyHiddenText from '../VisuallyHiddenText';
import BylineCss from './index.styles';
import bylineExtractor from './utilities/bylineExtractor';
import ArticleContributor from './ArticleContributor';
import PostContributor from './PostContributor';

type BylineBlock =
  | OptimoBylineBlock['model']
  | { blocks: LivePageContributor['model'][] };

const Contributors = ({ contributorValues, isSingleContributor, pageType }) => {
  switch (pageType) {
    case PHOTO_GALLERY_PAGE:
    case STORY_PAGE:
    case ARTICLE_PAGE:
    case MEDIA_ASSET_PAGE:
    case MEDIA_ARTICLE_PAGE:
      return (
        <ArticleContributor
          contributorValues={contributorValues}
          isSingleContributor={isSingleContributor}
        />
      );
    case LIVE_PAGE:
      return <PostContributor contributorValues={contributorValues} />;
    default:
      return null;
  }
};

const Byline = ({
  blocks,
  children = null,
}: PropsWithChildren<BylineBlock>) => {
  const { translations } = use(ServiceContext);
  const { pageType } = use(RequestContext);

  const contributorValues = bylineExtractor({ blocks, pageType });

  const isSingleContributor = contributorValues.length === 1;

  const { byline: { articleInformation = 'Article Information' } = {} } =
    translations ?? {};

  const bylineContainer =
    {
      [LIVE_PAGE]: [BylineCss.postBylineContainer],
      [PHOTO_GALLERY_PAGE]: [BylineCss.bylineContainer],
      [STORY_PAGE]: [BylineCss.bylineContainer],
      [ARTICLE_PAGE]: [BylineCss.bylineContainer],
      [MEDIA_ASSET_PAGE]: [BylineCss.bylineContainer],
      [MEDIA_ARTICLE_PAGE]: [BylineCss.bylineContainer],
    }[pageType] || [];

  return (
    contributorValues?.[0] && (
      <section
        role="region"
        aria-labelledby="article-byline"
        data-testid="byline"
      >
        <VisuallyHiddenText as="strong" id="article-byline" aria-hidden>
          {articleInformation}
        </VisuallyHiddenText>
        <ul css={[BylineCss.list]}>
          <li
            css={[
              ...bylineContainer,
              isSingleContributor && BylineCss.bylineContainerSingleContributor,
            ]}
          >
            <Contributors
              contributorValues={contributorValues}
              isSingleContributor={isSingleContributor}
              pageType={pageType}
            />
          </li>
          {children &&
            Children.map(children, (child, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: we want this
              <li key={index}>{child}</li>
            ))}
        </ul>
      </section>
    )
  );
};

export default Byline;
