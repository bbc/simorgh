import * as cheerio from 'cheerio';

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

  // Remove includes
  $('div[id^=include-]').parent().remove();

  // Remove embeds
  $('[data-e2e*="embed"]').parent().remove();

  // Remove style tags
  $('style').remove();

  // Remove inline styles
  $('[style]').removeAttr('style');

  // Remove all class names except for visuallyHiddenText which we want to use for accessibility
  $('[class]').each((_, el) => {
    if (el && !$(el).attr('class')?.includes('visuallyHiddenText')) {
      $(el).removeAttr('class');
    }
  });

  // Remove heavier elements
  $(`
    img, figure, picture,
    [data-e2e=media-indicator],
    [aria-labelledby=podcast-promo],
    a[href^="#end-of-recommendations"],
    p[id^=end-of-recommendations]
  `).remove();

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
