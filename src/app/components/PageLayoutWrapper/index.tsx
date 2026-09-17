import { PropsWithChildren, use } from 'react';
import { Helmet } from 'react-helmet';
import GlobalStyles from '#psammead/psammead-styles/src/global-styles';
import { Navigation, PageTypes } from '#app/models/types/global';
import { MetadataTaggings } from '#app/models/types/metadata';
import appendAdDomainsToCSPHeader from '#app/utilities/appendAdDomainsToCSPHeader';
import addInlineScript from '#app/lib/utilities/addInlineScript';
import getPrimaryMediaType from '#lib/utilities/getPrimaryMediaType';
import { OFFLINE_PAGE } from '#app/routes/utils/pageTypes';
import { TopStoryItem } from '../../pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import WebVitals from '../../legacy/containers/WebVitals';
import HeaderContainer from '../../legacy/containers/Header';
import FooterContainer from '../../legacy/containers/Footer';
import ManifestContainer from '../../legacy/containers/Manifest';
import ServiceWorker from '../ServiceWorker';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import fontFaces from '../ThemeProvider/fontFaces';
import styles from './index.styles';
import { OptimoMostReadRecord, CPSMostReadRecord } from '../MostRead/types';
import setPageWrapperInlineJs from './setPageWrapperInlineJs';

type ModelType = {
  blocks?: [
    {
      type: string;
      text?: string;
      model?: ModelType;
    },
  ];
  text?: string;
};

type Props = {
  pageData: {
    metadata: {
      type: PageTypes;
      topics?: { topicName: string; topicId: string }[];
      passport?: {
        taggings?: MetadataTaggings;
      };
    };
    blockTypes?: string[];
    content?: { model?: ModelType };
    secondaryColumn?: { topStories: TopStoryItem[] };
    mostRead?: { items: (OptimoMostReadRecord | CPSMostReadRecord)[] };
  };
  status: number;
  navItems?: Navigation[] | null;
};

type wordCountType = number | undefined;

const PageLayoutWrapper = ({
  children,
  pageData,
  status,
  navItems,
}: PropsWithChildren<Props>) => {
  const { service } = use(ServiceContext);
  const { isLite, isAmp, nonce, cspHeader } = use(RequestContext);

  const isErrorPage = ![200].includes(status) || !status;
  const pageType = pageData?.metadata?.type;

  const primaryMediaType = getPrimaryMediaType(
    pageData?.metadata?.passport?.taggings,
  );
  const reportingPageType = pageType?.replace(/ /g, '');
  const isOfflinePage = pageType === OFFLINE_PAGE;
  const isWindowValid = typeof window !== 'undefined';
  const shouldRenderWebVitals = isWindowValid && !isErrorPage && !isOfflinePage;

  let wordCount: wordCountType = 0;

  if (pageType === 'article') {
    wordCount = pageData?.content?.model?.blocks
      ?.filter(block => block.type === 'text')
      ?.reduce((reducer, block) => {
        const innerBlocks = block?.model?.blocks
          ?.filter(innerBlock => innerBlock.type === 'paragraph')
          .reduce((innerReducer, p) => {
            return `${innerReducer} ${p.model?.text}`;
          }, '');

        if (!innerBlocks) return reducer;
        return reducer + innerBlocks.split(' ').length;
      }, 0);
  }

  const serviceFonts = fontFaces();

  const wrappedTopics = pageData?.metadata?.topics;

  const shouldRenderPageWrapperInlineJs =
    !isLite &&
    !isAmp &&
    serviceFonts.length > 0 &&
    process.env.JEST_WORKER_ID === undefined;

  return (
    <>
      {shouldRenderPageWrapperInlineJs && (
        <Helmet>
          {addInlineScript({
            script: setPageWrapperInlineJs,
            parameters: [
              {
                serviceFonts,
                wrappedTopics,
                service,
                wordCount,
                reportingPageType,
              },
            ],
            nonce,
          })}
        </Helmet>
      )}

      {nonce && cspHeader && (
        <Helmet>
          <meta
            httpEquiv="Content-Security-Policy"
            content={appendAdDomainsToCSPHeader(cspHeader)}
          />
        </Helmet>
      )}
      <ServiceWorker />
      <ManifestContainer />
      {shouldRenderWebVitals && <WebVitals pageType={pageType} />}
      <GlobalStyles />
      <div id="main-wrapper" css={styles.wrapper}>
        <HeaderContainer
          navItems={navItems}
          primaryMediaType={primaryMediaType}
          propsForTopBarOJComponent={{
            blocks: pageData?.secondaryColumn?.topStories || [],
          }}
        />
        <div css={styles.content}>{children}</div>
        <FooterContainer />
      </div>
    </>
  );
};

export default PageLayoutWrapper;
