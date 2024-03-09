import * as cheerio from 'cheerio';

export const LITE_STYLES = `html{line-height:1.15;-webkit-text-size-adjust:100%;font-size:16px;font-family:-apple-system, BlinkMacSystemFont,Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif;}body{margin:0}ul{padding-inline-start:1.25rem}ol{padding-inline-start:0.325rem;list-style-type:none;}.lite-header-brand-wrapper{background-color:#b80000; padding:0.625rem;display:flex;justify-content:space-between;align-items:center;}#brandSvgHeader,#brandSvgFooter{fill:white;height:1.5rem;}#topPage,#footer{display:flex;}.lite-main-content{padding:0 0.625rem;}.lite-footer{background-color:#b80000; padding:0.625rem;}.visuallyHiddenText{clip-path:inset(100%);clip rect(1px,1px,1px,1px);height:1px;overflow:hidden;position:absolute;width:1px;margin:0;}.lite-nav-list{margin:0;padding:0.625rem;list-style-type:none; border-bottom:1px solid #E6E8EA;display:flex;flex-wrap:wrap;gap:0.625rem;}.lite-footer-copyright{padding-inline-start:0.625rem;}.most-read-list-item{display:flex;flex-direction:row;gap:0.625rem;margin-bottom:0.625rem;}[data-type=analytics-pixel]{position:absolute;}.skipLink{position:absolute;clip-path:inset(100%);clip:rect(1px,1px,1px,1px);height:1px;width:1px;overflow:hidden;padding:0.75rem 0.5rem;background-color:#FFFFFF;border:0.1875rem solid #000;color:#333;text-decoration:none;}.lite-switcher{margin:0.625rem;padding:0.425rem 0.625rem;border:2px solid black;display:inline-block;}.lite-switcher:hover,.lite-switcher:focus{background-color:black;color:white;}`;

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
      // Uses htmlparser2 which could be faster but less accurate
      // https://cheerio.js.org/docs/advanced/configuring-cheerio#using-htmlparser2-for-html
      xml: {
        xmlMode: false,
      },
    },
    false,
  );

  // Remove style tags
  $('style').remove();

  // Remove inline style attributes
  $('[style]').removeAttr('style');

  // Classnames to keep from being removed
  const classNamesToKeep = ['visuallyHiddenText', 'skipLink', 'lite-switcher'];

  // Remove all class names except those in 'classNamesToKeep'
  $('[class]').each((_, el) => {
    const foundClassName = classNamesToKeep.find(className =>
      $(el).attr('class')?.includes(className),
    );
    if (foundClassName) {
      $(el).removeAttr('class').addClass(foundClassName);
      return;
    }

    // Remove classnames from element
    $(el).removeAttr('class');
  });

  // Remove all button elements
  $('button').remove();

  // Remove includes
  $('div[id^=include-]').parent().remove();

  // Remove embeds
  $('[data-e2e*="embed"]').parent().remove();

  // Remove figure and picture elements
  $('figure, picture').remove();

  // Remove images except for data-type="analytics-pixel"
  $('img').not('[data-type="analytics-pixel"]').remove();

  // Remove podcast promos
  $('[aria-labelledby=podcast-promo]').parent().remove();

  // Style most-read
  $('[data-e2e=most-read]').find('li > div').addClass('most-read-list-item'); // Style most read list items

  // Style header
  $('[data-e2e=dropdown-nav]').remove(); // Remove secondary nav used for mobile dropdown
  $('#topPage').parent().addClass('lite-header-brand-wrapper'); // Add class to header SVG wrapper for custom styling

  $('header').find('ul').addClass('lite-nav-list'); // Add class to nav list for custom styling

  // Add class to main content
  $('#main-wrapper > div').addClass('lite-main-content');

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
