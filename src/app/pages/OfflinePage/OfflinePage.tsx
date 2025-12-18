/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { use } from 'react';
import { jsx } from '@emotion/react';
import path from 'ramda/src/path';
import Helmet from 'react-helmet';
import { ServiceContext } from '#contexts/ServiceContext';
import Heading from '#app/components/Heading';
import UsefulLinks from '#app/components/UsefulLinks';
import Paragraph from '#app/components/Paragraph';
import styles from './OfflinePage.styles';

// Changes here will need replicated in the service worker
const offlineArticleIds = [
  'c14dmxzqd86o',
  'c1j5mz19jdko',
  'c1x0rq3r97ko',
  'c39rjygpmv1o',
  'c578zj113e9o',
];

const OfflinePage = () => {
  const { service, dir, translations } = use(ServiceContext);
  const message =
    'Seems like you don’t have an internet connection at the moment. Some articles are available to read offline.';

  const title: string =
    path(['offline', 'title'], translations) || 'You are offline.';

  return (
    <>
      <Helmet htmlAttributes={{ dir, lang: service }}>
        <title>{`${title}`}</title>
      </Helmet>
      <main role="main" css={styles.main}>
        <div css={styles.inner}>
          <Heading level={1} size="canon" fontVariant="sansBold">
            {title}
          </Heading>
          <Paragraph css={styles.text}>{message}</Paragraph>
          <UsefulLinks
            title={
              path(['offline', 'usefulLinksTitle'], translations) ||
              'Available to read offline'
            }
            summaries={offlineArticleIds.map((id, index) => ({
              imageAlt: '',
              imageUrl: '',
              link: `/${service}/articles/${id}`,
              title: `Article ${index + 1}`,
              type: 'article',
            }))}
          />
        </div>
      </main>
    </>
  );
};

export default OfflinePage;
