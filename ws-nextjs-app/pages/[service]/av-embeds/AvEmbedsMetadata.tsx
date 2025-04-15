/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Helmet } from 'react-helmet';
import { AvEmbedsPageProps } from './types';

const AvEmbedsMetadata = ({ pageData }: AvEmbedsPageProps) => {
  const {
    metadata: { language, promoSummary, headline, imageUrl, caption },
  } = pageData;

  return (
    <Helmet>
      <meta name="robots" content="noindex" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=1"
      />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      {promoSummary && <meta name="description" content={promoSummary} />}

      <link
        href="//ichef.bbci.co.uk"
        rel="preconnect"
        crossOrigin="anonymous"
      />

      <link rel="dns-prefetch" href="//static.bbci.co.uk" />
      <link rel="dns-prefetch" href="//static.bbc.co.uk" />
      <link rel="dns-prefetch" href="//nav.files.bbci.co.uk" />

      {headline && <title>{headline}</title>}

      {headline && <meta property="og:title" content={headline} />}
      <meta property="og:type" content="video" />
      {promoSummary && (
        <meta property="og:description" content={promoSummary} />
      )}
      <meta property="og:site_name" content="BBC News" />
      <meta property="og:locale" content={language} />
      <meta
        property="article:author"
        content="https://www.facebook.com/bbcnews"
      />

      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && caption && (
        <meta property="og:image:alt" content={caption} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@bbcnews" />
      {headline && <meta name="twitter:title" content={headline} />}
      {promoSummary && (
        <meta name="twitter:description" content={promoSummary} />
      )}
      <meta name="twitter:creator" content="@bbcnews" />
      {imageUrl && <meta name="twitter:image:src" content={imageUrl} />}
      {imageUrl && caption && (
        <meta name="twitter:image:alt" content={caption} />
      )}
      <meta name="twitter:domain" content="www.bbc.com" />

      <meta name="apple-mobile-web-app-title" content="BBC News" />

      <meta name="application-name" content="BBC News" />
      <meta name="msapplication-TileImage" content="BBC News" />
      <meta name="msapplication-TileColor" content="#bb1919" />
      <meta name="mobile-web-app-capable" content="yes" />
    </Helmet>
  );
};

export default AvEmbedsMetadata;
