import * as cheerio from 'cheerio';

type Props = {
  html: string;
  helmetScriptTags: React.ReactElement[];
  helmetLinkTags: React.ReactElement[];
};

export default function litePageTransform({
  html,
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

  // Style header
  $('[data-e2e=dropdown-nav]').remove();
  $('header').addClass('lite-header');
  $('header > div').addClass('lite-header-brand-wrapper');
  // Not sure how fast 'find' is
  $('header').find('button').remove();
  $('header').find('ul').addClass('lite-nav-list');
  $('header').find('li').addClass('lite-nav-list-item');

  // Remove header skip to content - probably want to keep this though
  $('header').find('a[href="#content"]').remove();

  // Style footer
  $('footer').children().first().addClass('lite-footer'); // bit too hacky
  $('footer').find('ul').addClass('lite-footer-list');
  $('footer').find('li').addClass('lite-footer-list-item');
  $('footer').find('p').addClass('lite-footer-copyright');

  return {
    html: $.html(),
    helmetScriptTags: cleanedHelmetScriptTags,
    helmetLinkTags: cleanedHelmetLinkTags,
  };
}
