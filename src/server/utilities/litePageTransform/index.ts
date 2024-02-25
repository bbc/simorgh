import * as cheerio from 'cheerio';

export const LITE_STYLES = `html{line-height:1.15;-webkit-text-size-adjust:100%;font-size:16px;font-family:-apple-system, BlinkMacSystemFont,Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif;}body{margin:0}ul{padding-inline-start:1.25rem}ol{padding-inline-start:1.25rem;list-style-type:none;}.lite-header-brand-wrapper{background-color:#b80000; padding:0.625rem;display:flex;justify-content:space-between;align-items:center;}#brandSvgHeader,#brandSvgFooter{fill:white;height:1.5rem;}#topPage,#footer{display:flex;}main,aside,[data-e2e=related-content-heading],[data-e2e=top-stories-heading],[data-e2e=features-analysis-heading],[data-e2e=most-read]{padding:0 1.25rem;}.lite-footer{background-color:#b80000; padding:0.625rem;}.visuallyHiddenText{clip-path:inset(100%);clip rect(1px,1px,1px,1px);height:1px;overflow:hidden;position:absolute;width:1px;margin:0;}.lite-nav-list{margin:0;padding:0.625rem;list-style-type:none; border-bottom:1px solid #E6E8EA;display:flex;flex-wrap:wrap;gap:0.625rem;}.lite-footer-copyright{padding-inline-start:0.625rem;}.most-read-list-item{display:flex;flex-direction:row;gap:0.625rem;margin-bottom:0.625rem;}`;

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
  // Prevent preloading images
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
      // Uses htmlparser2 which could be faster but less accurate
      // https://cheerio.js.org/docs/advanced/configuring-cheerio#using-htmlparser2-for-html
      xml: {
        xmlMode: false,
      },
    },
    false,
  );

  // Remove style
  $('style').remove();

  // Remove inline style attributes
  $('[style]').removeAttr('style');

  // Remove all class names except for visuallyHiddenText which we want to use for accessibility
  $('[class]').each((_, el) => {
    if ($(el).attr('class')?.includes('visuallyHiddenText')) return;
    $(el).removeAttr('class');
  });

  // Remove includes
  $('div[id^=include-]').parent().remove();

  // Remove embeds
  $('[data-e2e*="embed"]').parent().remove();

  // Remove heavier elements
  $('img, figure, picture').remove();

  // Remove podcast promos
  $('[aria-labelledby=podcast-promo]').parent().remove();

  // Style most-read
  $('[data-e2e=most-read]').find('li > div').addClass('most-read-list-item'); // Style most read list items

  // Style header
  $('[data-e2e=dropdown-nav]').remove(); // Remove secondary nav used for mobile dropdown
  $('header').addClass('lite-header'); // Add class to header for custom styling
  $('#topPage').parent().addClass('lite-header-brand-wrapper'); // Add class to header SVG wrapper for custom styling

  $('header').find('button').remove(); // Remove mobile menu button
  $('header').find('ul').addClass('lite-nav-list'); // Add class to nav list for custom styling

  // Remove header skip to content - may want to keep this though
  $('header').find('a[href="#content"]').remove();

  // Style footer
  $('footer').children().first().addClass('lite-footer'); // bit too hacky - add class to footer SVG wrapper for custom styling
  $('footer').find('ul').addClass('lite-nav-list'); // Add class to footer list for custom styling
  $('footer').find('p').addClass('lite-footer-copyright'); // Add class to footer copyright for custom styling

  return {
    liteHtml: $.html(),
    liteHelmetMetaTags: helmetMetaTags,
    liteHelmetScriptTags: cleanedHelmetScriptTags,
    liteHelmetLinkTags: cleanedHelmetLinkTags,
  };
}
