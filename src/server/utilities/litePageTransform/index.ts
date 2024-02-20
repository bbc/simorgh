import * as cheerio from 'cheerio';

type Props = {
  html: string;
  helmetLinkTags: React.ReactElement[];
};

export default function litePageTransform({ html, helmetLinkTags }: Props) {
  // Prevent preloading images
  const cleanedHelmetLinkTags = helmetLinkTags.filter(
    tag =>
      !tag.props.rel ||
      (tag.props.rel !== 'preload' && tag.props.as !== 'image'),
  );

  const $ = cheerio.load(html);

  // Remove heavier elements
  $(`
    img, figure, picture, 
    [data-e2e=media-indicator],
    [aria-labelledby=podcast-promo],
    a[href^="#end-of-recommendations"],
    p[id^=end-of-recommendations]
  `).remove();

  // Remove header navigation
  $('nav[role=navigation]').remove();

  // Remove includes
  $('div[id^=include-]').parent().remove();

  // Remove embeds
  $('[data-e2e*="embed"]').parent().remove();

  // Remove inline styles
  $('[style]').removeAttr('style');

  // Remove class names except for visuallyHiddenText which we want to use for accessibility
  $('[class]').each((_, el) => {
    if (el && !$(el).attr('class')?.includes('visuallyHiddenText')) {
      $(el).removeAttr('class');
    }
  });

  // Remove header skip to content - probably want to keep this though
  $('header').find('a[href="#content"]').remove();

  // Style header
  $('header').addClass('lite-header');
  // Style footer - bit too hacky imo
  $('footer').children().first().addClass('lite-footer');

  return {
    html: $.html(),
    helmetLinkTags: cleanedHelmetLinkTags,
  };
}
