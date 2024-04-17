import * as cheerio from 'cheerio';
import { ReactElement } from 'react';

const BBC_DOMAINS = ['localhost', 'www.bbc.com', 'bbc.com'];

type Props = {
  html?: string;
  helmetMetaTags: ReactElement;
  helmetScriptTags: ReactElement;
  helmetLinkTags: ReactElement;
};

export default function litePageTransform({
  html = '',
  helmetMetaTags,
  helmetScriptTags,
  helmetLinkTags,
}: Props) {
  // https://cheerio.js.org/docs/advanced/configuring-cheerio#fragment-mode
  const $ = cheerio.load(
    html,
    {
      // https://cheerio.js.org/docs/advanced/configuring-cheerio#using-htmlparser2-for-html
      xml: {
        // Disable `xmlMode` to parse HTML with htmlparser2.
        xmlMode: false,
        // Disable `decodeEntities` to prevent HTML entities from being decoded.
        decodeEntities: false,
      },
    },
    false,
  );

  /* NOTE: 
    We may want to just use the 'isLite' flag at the component level to not render the elements below,
    rather than removing them here manually with Cheerio.

    This is an implicit rather than explicit approach currently, but it may be more maintainable in the long 
    run to keep the display logic in the components.
  */

  // Remove button elements
  $('button').remove();

  // Remove figure and picture elements
  $('figure, picture').remove();

  // Remove images except for "analytics-pixel"
  $('img').not('[data-lite=analytics-pixel]').remove();

  // Remove secondary nav used for mobile dropdown
  $('[data-e2e=dropdown-nav]').remove();

  // Remove includes
  if ($('div[id^=include-]').parent().is('div')) {
    $('div[id^=include-]').parent().remove();
  }

  // Remove embeds
  if ($('[data-e2e*="embed"]').parent().is('div')) {
    $('[data-e2e*="embed"]').parent().remove();
  }

  // Remove VJ embeds
  if ($('div[id^=responsive-embed]').parent().is('div')) {
    $('div[id^=responsive-embed]').parent().remove();
  }

  // Remove podcast promos
  if ($('[aria-labelledby=podcast-promo]').parent().is('div')) {
    $('[aria-labelledby=podcast-promo]').parent().remove();
  }

  // Add .lite to all anchor tags URLs on valid domains
  $('a').each((_, element) => {
    const href = $(element).attr('href');
    if (
      href &&
      (href.startsWith('/') ||
        BBC_DOMAINS.some(domain => href.includes(domain)))
    ) {
      $(element).attr('href', `${href}.lite`);
    }
  });

  // Prevent preloading images by removing them from the head
  // @ts-expect-error - React-helmet types are incorrect
  const cleanedHelmetLinkTags = helmetLinkTags?.filter(
    (tag: React.ReactElement) =>
      !tag.props.rel ||
      (tag.props.rel !== 'preload' && tag.props.as !== 'image'),
  );

  // Strip out some Helmet injected script tags we don't want
  // @ts-expect-error - React-helmet types are incorrect
  const cleanedHelmetScriptTags = helmetScriptTags?.filter(
    (tag: React.ReactElement) =>
      !tag.props.src || !tag.props.src?.includes('vendor/require'),
  );

  return {
    liteHtml: $.html(),
    liteHelmetMetaTags: helmetMetaTags,
    liteHelmetScriptTags: cleanedHelmetScriptTags as ReactElement,
    liteHelmetLinkTags: cleanedHelmetLinkTags as ReactElement,
  };
}
