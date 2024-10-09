export default {
  extractBundlesForPageType: pageType => {
    if (pageType === 'ArticlePage') {
      return [
        'modern.ArticlePage-31ecd969.31473c35.js',
        'modern.commons-1111.js',
        'modern.commons-2222.js',
        'modern.1111-lib-1111.js',
        'modern.shared-1111.js',
        'modern.shared-3333.js',
      ];
    }
    if (pageType === 'FrontPage') {
      return [
        'modern.FrontPage-31ecd969.bbf7a07e.js',
        'modern.commons-1111.js',
        'modern.commons-2222.js',
        'modern.1111-lib-1111.js',
        'modern.shared-1111.js',
      ];
    }
    if (pageType === 'HomePage') {
      return [
        'modern.HomePage-31ecd969.0d59dc5c.js',
        'modern.commons-1111.js',
        'modern.commons-2222.js',
        'modern.1111-lib-1111.js',
        'modern.shared-1111.js',
      ];
    }
    if (pageType === 'LiveRadioPage') {
      return [
        'modern.LiveRadioPage-31ecd969.64772a90.js',
        'modern.commons-1111.js',
        'modern.commons-2222.js',
        'modern.1111-lib-1111.js',
        'modern.shared-1111.js',
        'modern.shared-2222.js',
        'modern.shared-3333.js',
      ];
    }
    if (pageType === 'MostReadPage') {
      return [
        'modern.MostReadPage-31ecd969.7484ff05.js',
        'modern.commons-1111.js',
        'modern.commons-2222.js',
        'modern.1111-lib-1111.js',
        'modern.shared-1111.js',
        'modern.shared-2222.js',
        'modern.shared-3333.js',
      ];
    }
    if (pageType === 'OnDemandAudioPage') {
      return [
        'modern.OnDemandAudioPage-31ecd969.ec6af2d0.js',
        'modern.commons-1111.js',
        'modern.commons-2222.js',
        'modern.1111-lib-1111.js',
        'modern.shared-2222.js',
        'modern.shared-3333.js',
      ];
    }
    if (pageType === 'OnDemandTvPage') {
      return [
        'modern.OnDemandTvPage-31ecd969.de41ab7f.js',
        'modern.commons-1111.js',
        'modern.1111-lib-1111.js',
        'modern.3333-lib-2222.js',
        'modern.shared-1111.js',
      ];
    }
    if (pageType === 'ErrorPage') {
      return [
        'modern.ErrorPage-31ecd969.31473c35.js',
        'modern.commons-1111.js',
        'modern.commons-2222.js',
        'modern.1111-lib-1111.js',
        'modern.shared-1111.js',
        'modern.shared-2222.js',
        'modern.shared-3333.js',
      ];
    }
    if (pageType === 'FeatureIdxPage') {
      return [
        'modern.FeatureIdxPage-31ecd969.31473c35.js',
        'modern.commons-1111.js',
        'modern.commons-2222.js',
        'modern.1111-lib-1111.js',
        'modern.3333-lib-2222.js',
        'modern.shared-1111.js',
      ];
    }

    throw Error(`page type ${pageType} not mocked`);
  },
};
