/* eslint-disable jsx-a11y/aria-role */
import { Children, use, PropsWithChildren } from 'react';
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
    case 'article':
      return (
        <ArticleContributors
          contributorValues={contributorValues}
          isSingleContributor={isSingleContributor}
        />
      );
    case 'mediaArticle':
      return (
        <ArticleContributors
          contributorValues={contributorValues}
          isSingleContributor={isSingleContributor}
        />
      );
    case 'live':
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
        <ul css={BylineCss.list}>
          <li
            css={[
              BylineCss.bylineContainer,
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
