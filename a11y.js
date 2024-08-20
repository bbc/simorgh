/** This is an extension of the bbc-a11y tool, which verifies whether this application meets
 * BBC accessibility guidelines - http://www.bbc.co.uk/guidelines/futuremedia/accessibility/
 *
 * See https://github.com/bbc/bbc-a11y/blob/master/guides/using/using-bbc-a11y-in-your-project.md
 * for further information
 */

const { getPageUrls } = require('./cypress/support/helpers/getPageUrls');

// allPageWidths = [240, 360, 600, 1008, 1280];
// Run a11y on 360px only since designs are done in this width
// This functionality can be extended to allow for testing on all widths
const pageWidths = [360];
const environment = 'local';
const isSmoke = true;
const baseUrl = 'http://localhost:7080';

/**
 *
 * Suppress errors in scrollable navigation for RTL languages -> '//div[@id='root']/header/nav/div/div[1]/div/ul'
 * To be fixed in https://github.com/bbc/simorgh/issues/5222
 */

const mediaEmbedErrorsToSuppress = [
  // * Design: Content resizing: Text must be styled with units that are resizable in all browsers
  "Text styled with px unit: //button[@id='p_audioui_backInterval']/div/div[1]",
  "Text styled with px unit: //button[@id='p_audioui_backInterval']/div/div[2]",
  "Text styled with px unit: //button[@id='p_audioui_forwardInterval']/div/div[1]",
  "Text styled with px unit: //button[@id='p_audioui_forwardInterval']/div/div[2]",
  "Text styled with px unit: //div[@id='p_audioui_backToStartButton_text']",
  "Text styled with px unit: //div[@id='p_audioui_toLiveButton_text']",

  // * Design: Content resizing: Text cannot be too small
  "Text size too small (10px): //div[@id='p_audioui_backToStartButton_text']",
  "Text size too small (10px): //div[@id='p_audioui_toLiveButton_text']",

  // * Editorial: Indicating language: Html must have lang attribute
  'html tag has no lang attribute: /html',

  // * Forms: Labelling form controls: Fields must have labels or titles
  "Button has no text: //button[@id='p_audioui_playpause']",
  "Button has no text: //button[@id='p_audioui_previousButton']",
  "Button has no text: //button[@id='p_audioui_nextButton']",
  "Button has no text: //div[@id='p_audioui_container']/div[2]/button",
  "Button has no text: //button[@id='p_audioui_playbackSettingsButton']",
  "Button has no text: //div[@id='p_audioui_container']/div[4]/button",
];

const advertisementErrorsToSuppress = [
  // Principles: All documents must have a W3C recommended doctype
  // Editorial: Indicating language: Html must have lang attribute
  '/iframe',

  // Design: Content resizing: Text must be styled with units that are resizable in all browsers
  "//div[@id='dotcom-leaderboard']/div/div[1]/a",
  "//div[@id='dotcom-mpu']/div/div[1]/a",
];

const pageTypes = {
  frontPage: [
    "//div[@id='root']/header/nav/div/div[1]/div/ul",
    ...advertisementErrorsToSuppress,
  ],
  articles: ["//div[@id='root']/header/nav/div/div[1]/div/ul"],
  liveRadio: [
    ...mediaEmbedErrorsToSuppress,
    "//div[@id='root']/header/nav/div/div[1]/div/ul",
    '/iframe',
  ],
  photoGalleryPage: ["//div[@id='root']/header/nav/div/div[1]/div/ul"],
  mostReadPage: ["//div[@id='root']/header/nav/div/div[1]/div/ul"],
  storyPage: [
    "//div[@id='root']/header/nav/div/div[1]/div/ul",
    '/iframe', // same issues as in mediaEmbedErrorsToSuppress but the DOM path is different
    "//div[@id='root']/div/div[1]/main/div[37]/div/div/div", // issue with IDT2 includes
    "//div[@id='ns_datapic_royal-engagements']",
    "//div[@id='ns_datapic_env-test-2']",
    "//div[@id='responsive-embed-newsspec-21841-green-diet-app-core-content']",
  ],
  onDemandAudio: [
    ...mediaEmbedErrorsToSuppress,
    "//div[@id='root']/header/nav/div/div[1]/div/ul",
    '/iframe',
  ],
  onDemandTV: ['/iframe'],
  mediaAssetPage: [...mediaEmbedErrorsToSuppress, '/iframe'],
  featureIndexPage: [],
  topicPage: [],
};

// eslint-disable-next-line array-callback-return
Object.keys(pageTypes).map(pageType => {
  getPageUrls({ pageType, environment, isSmoke })
    .toString()
    .split(',')
    .map(pageUrl => `${baseUrl}${pageUrl}`)
    .forEach(url =>
      pageWidths.forEach(width =>
        // eslint-disable-next-line no-undef
        page(url, { width, hide: pageTypes[pageType] }),
      ),
    );
});
