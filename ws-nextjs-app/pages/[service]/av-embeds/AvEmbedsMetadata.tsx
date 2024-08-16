/** @jsx jsx */
import { jsx } from '@emotion/react';
import filterForBlockType from '../../../../src/app/lib/utilities/blockHandlers';
import { AvEmbedsPageProps } from './types';

const AvEmbedsMetadata = ({ pageData }: AvEmbedsPageProps) => {
  const {
    content: {
      model: { blocks },
    },
    metadata,
    promo,
  } = pageData;
  const promoSummary =
    promo.summary.blocks[0].model.blocks[0].model.blocks[0].model.text;
  const headline = promo.headlines.seoHeadline;
  const { language } = metadata;
  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=1"
      />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="description" content={promoSummary} />

      {/* <link href="//ichef.bbci.co.uk" rel="preconnect" crossOrigin /> */}

      <link rel="dns-prefetch" href="//static.bbci.co.uk" />
      <link rel="dns-prefetch" href="//static.bbc.co.uk" />
      <link rel="dns-prefetch" href="//nav.files.bbci.co.uk" />

      <meta property="og:title" content={headline} />
      <meta property="og:type" content="video" />
      <meta property="og:description" content={promoSummary} />
      <meta property="og:site_name" content="BBC News" />
      <meta property="og:locale" content={language} />
      <meta
        property="article:author"
        content="https://www.facebook.com/bbcnews"
      />

      {/* {{#promo.locators.assetUri}}
        <meta property="og:url" content="https://www.bbc.com{{{promo.locators.assetUri}}}/embed" />
      {{/promo.locators.assetUri}}
      {{^promo.locators.assetUri}}
        <meta property="og:url" content="{{{requestInfo.embedUrl}}}" />
      {{/promo.locators.assetUri}} */}

      <meta property="og:image" content="{{{video.imageUrl}}}" />
      <meta property="og:image:alt" content="{{video.caption}}" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@bbcnews" />
      <meta name="twitter:title" content={headline} />
      <meta name="twitter:description" content={promoSummary} />
      <meta name="twitter:creator" content="@bbcnews" />
      <meta name="twitter:image:src" content="{{{video.imageUrl}}}" />
      <meta name="twitter:image:alt" content="{{video.caption}}" />
      <meta name="twitter:domain" content="www.bbc.com" />

      <meta name="apple-mobile-web-app-title" content="BBC News" />

      <meta name="application-name" content="BBC News" />
      <meta name="msapplication-TileImage" content="BBC News" />
      <meta name="msapplication-TileColor" content="#bb1919" />
      <meta name="mobile-web-app-capable" content="yes" />
    </>
  );
}

export default AvEmbedsMetadata;
