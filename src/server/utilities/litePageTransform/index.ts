import * as cheerio from 'cheerio';
import {
  EBON,
  GREY_3,
  GREY_6,
  GREY_10,
  POSTBOX,
  BLACK,
  WHITE,
} from '#app/components/ThemeProvider/palette';
import { ReactElement } from 'react';

const BBC_DOMAINS = ['localhost', 'www.bbc.com', 'bbc.com'];

const CONTENT_PADDING = 1;

export const LITE_STYLES = `
html{
  text-size-adjust:100%;
  font-size:16px;
  font-family:-apple-system,BlinkMacSystemFont,Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif;
}
body{
  margin:0;
}
ul{
  padding-inline-start:0rem;
  list-style-type:none;
}
ul:not([data-lite-class=nav-list]), ol {
  > li{
    margin:1rem 0;
  }
}
ol{
  padding-inline-start:0.325rem;
  list-style-type:none;
}
a{
  color:${GREY_10};
  position:relative;
  display:inline-flex;

  svg {
    padding-inline-end:0.25rem;
  }

  &:focus-visible{
    outline:none;
  }

  &:focus-visible::after{
    content:'';
    position:absolute;
    inset:0;
    outline: 0.25rem solid ${BLACK};
    box-shadow: none;
    outline-offset: 0.25rem;
  }
}
button{
  &:focus-visible{
    outline: 0.25rem solid ${BLACK};
    box-shadow: none;
    outline-offset: 0.25rem;
  }
}
p{
  a{
   text-decoration-color:${POSTBOX};
 } 
}
input, textarea {
  display:block;
}
#brandSvgHeader,#brandSvgFooter{
  fill:${WHITE};
  height:1.5rem;
}
time{
  color:${GREY_6};
  font-size:0.875rem;
}
/* Custom classes */
[data-lite-class=brand-wrapper]{
  background-color:${POSTBOX};
}
[data-lite-class=svg-wrapper]{
  padding:${CONTENT_PADDING}rem;
  display:flex;
  justify-content:space-between;
  align-items:center;

  a:first-of-type{
    display:flex; 

    &:focus-visible{
      outline: 0.25rem solid ${WHITE};
    }
  }
}
[data-lite-class=main-content]{
  padding:0 ${CONTENT_PADDING}rem;
}
[data-lite-class=nav-list]{
  padding:${CONTENT_PADDING}rem;
  margin:0;
  list-style-type:none;
  border-bottom:1px solid ${GREY_3};
  display:flex;
  flex-wrap:wrap;
  gap:0.625rem;
}
[data-lite-class=footer-copyright]{
  margin:0;
  padding: 1rem;
}
[data-lite-class=most-read-list]{
  > li{
    > div {
      display:flex;
      flex-direction:row;
      gap:0.625rem;
      margin-bottom:0.625rem;
    }
  }
}
[data-lite-class=pagination]{
  display: flex;
  align-items: center;
  margin: 1rem 0;

  > div {
    display:none;
  }

  > ul {
    display:flex;

    > li {
      margin:0 0.625rem;
    }
  }
}
[data-lite-class=visuallyHiddenText]{
  clip-path:inset(100%);
  clip:rect(1px,1px,1px,1px);
  height:1px;
  overflow:hidden;
  position:absolute;
  width:1px;
  margin:0;
}
[data-lite-class=analytics-pixel]{
  position:absolute;
}
a[data-lite-class=skipLink]{
  position:absolute;
  clip-path:inset(100%);
  clip:rect(1px,1px,1px,1px);
  height:1px;
  width:1px;
  overflow:hidden;
  padding:0.75rem 0.5rem;
  background-color:${WHITE};
  color:${EBON};
  text-decoration:none;
  border:0.1875rem solid ${BLACK};

  &:focus, &:active{
    display:block;
    clip-path:none;
    clip:auto;
    height:auto;
    width:auto;
  }
}
`;

type Props = {
  html: string;
  helmetMetaTags: ReactElement;
  helmetScriptTags: ReactElement;
  helmetLinkTags: ReactElement;
  shouldUseEmotionStyles?: boolean;
};

export default function litePageTransform({
  html,
  helmetMetaTags,
  helmetScriptTags,
  helmetLinkTags,
  shouldUseEmotionStyles = false,
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

  /* We need to remove the styles and CSS classes set by Emotion */
  if (!shouldUseEmotionStyles) {
    // Remove style tags
    $('style').remove();

    // Remove inline style attributes
    $('[style]').removeAttr('style');

    // Remove CSS classes
    $('[class]').removeAttr('class');
  }

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
  $('img').not('[data-lite-class=analytics-pixel]').remove();

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
