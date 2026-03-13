/* eslint-disable jsx-a11y/aria-role */
import { Children, use, PropsWithChildren } from 'react';
import {
  ARTICLE_PAGE,
  LIVE_PAGE,
  MEDIA_ARTICLE_PAGE,
} from '#app/routes/utils/pageTypes';
import { OptimoBylineBlock } from '#app/models/types/optimo';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import VisuallyHiddenText from '../VisuallyHiddenText';
import BylineCss from './index.styles';
import bylineExtractor from './utilities/bylineExtractor';
import ArticleContributors from './ArticleContributors';
import PostContributor from './PostContributor';

const Contributors = ({ contributorValues, isSingleContributor, pageType }) => {
  switch (pageType) {
    case ARTICLE_PAGE:
      return (
        <ArticleContributors
          contributorValues={contributorValues}
          isSingleContributor={isSingleContributor}
        />
      );
    case MEDIA_ARTICLE_PAGE:
      return (
        <ArticleContributors
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
}: PropsWithChildren<OptimoBylineBlock['model']>) => {
  const { translations } = use(ServiceContext);
  const { pageType } = use(RequestContext);

  const contributorValues = bylineExtractor({ blocks, pageType });

  const isSingleContributor = contributorValues.length === 1;

  const { byline: { articleInformation = 'Article Information' } = {} } =
    translations ?? {};

  const bylineContainer =
    {
      [LIVE_PAGE]: [BylineCss.postBylineContainer],
      [ARTICLE_PAGE]: [BylineCss.bylineContainer],
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
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>{child}</li>
            ))}
        </ul>
      </section>
    )
  );
};

export default Byline;
