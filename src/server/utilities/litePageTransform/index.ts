import * as cheerio from 'cheerio';

export const LITE_STYLES = `
html{
  line-height:1.15;
  -webkit-text-size-adjust:100%;
  font-size:16px;
  font-family:-apple-system, BlinkMacSystemFont,Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif;
}
body{
  margin:0;
}
ul{
  padding-inline-start:1.25rem;
}
ol{
  padding-inline-start:0.325rem;
  list-style-type:none;
}
#brandSvgHeader,#brandSvgFooter{
  fill:white;
  height:1.5rem;
}
/* App-wide classes we want to keep */
[data-lite-class=lite-svg-wrapper]{
  background-color:#b80000;
  padding:0.625rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
}
[data-lite-class=lite-main-content]{
  padding:0 0.625rem;
}
[data-lite-class=lite-nav-list]{
  margin:0;
  padding:0.625rem;
  list-style-type:none;
  border-bottom:1px solid #E6E8EA;
  display:flex;
  flex-wrap:wrap;
  gap:0.625rem;
}
[data-lite-class=lite-footer-copyright]{
  padding-inline-start:0.625rem;
}
[data-lite-class=lite-most-read-list-item]{
  display:flex;
  flex-direction:row;
  gap:0.625rem;
  margin-bottom:0.625rem;
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
[data-lite-class=skipLink]{
  position:absolute;
  clip-path:inset(100%);
  clip:rect(1px,1px,1px,1px);
  height:1px;
  width:1px;
  overflow:hidden;
  padding:0.75rem 0.5rem;
  background-color:#FFFFFF;
  border:0.1875rem solid #000;
  color:#333;
  text-decoration:none;
}
[data-lite-class=skipLink]:focus,[data-lite-class=skipLink]:active{
  display:block;
  clip-path:none;
  clip:auto;
  height:auto;
  width:auto;
}`;

type Props = {
  html: string;
  helmetMetaTags: React.ReactElement[];
  helmetScriptTags: React.ReactElement[];
  helmetLinkTags: React.ReactElement[];
};

export default function litePageTransform({
  html,
  helmetMetaTags,
  helmetScriptTags,
  helmetLinkTags,
}: Props) {
  // Prevent preloading images by removing them from the head
  const cleanedHelmetLinkTags = helmetLinkTags?.filter(
    tag =>
      !tag.props.rel ||
      (tag.props.rel !== 'preload' && tag.props.as !== 'image'),
  );

  // Strip out some Helmet injected script tags we don't want
  const cleanedHelmetScriptTags = helmetScriptTags?.filter(
    tag => !tag.props.src || !tag.props.src?.includes('vendor/require'),
  );

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

  // Remove all style tags
  $('style').remove();

  // Remove inline style attributes
  $('[style]').removeAttr('style');

  // Remove all CSS classes
  $('[class]').removeAttr('class');

  // Remove all button elements
  $('button').remove();

  // Remove includes
  if ($('div[id^=include-]').parent().is('div')) {
    $('div[id^=include-]').parent().remove();
  }

  // Remove embeds
  if ($('[data-e2e*="embed"]').parent().is('div')) {
    $('[data-e2e*="embed"]').parent().remove();
  }

  // Remove figure and picture elements
  $('figure, picture').remove();

  // Remove images except for "analytics-pixel"
  $('img').not('[data-lite-class=analytics-pixel]').remove();

  // Remove podcast promos
  if ($('[aria-labelledby=podcast-promo]').parent().is('div')) {
    $('[aria-labelledby=podcast-promo]').parent().remove();
  }

  // Remove secondary nav used for mobile dropdown
  $('[data-e2e=dropdown-nav]').remove();

  return {
    liteHtml: $.html(),
    liteHelmetMetaTags: helmetMetaTags,
    liteHelmetScriptTags: cleanedHelmetScriptTags,
    liteHelmetLinkTags: cleanedHelmetLinkTags,
  };
}
