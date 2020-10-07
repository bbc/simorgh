const extractBundlesForPageType = pageType => {
  if (pageType === 'ArticlePage') {
    return [
      'ArticlePage-31ecd969.31473c35.js',
      'commons-1111.js',
      'commons-2222.js',
      '1111-lib-1111.js',
      'shared-1111.js',
      'shared-3333.js',
    ];
  }
  if (pageType === 'StoryPage') {
    return [
      'StoryPage-31ecd969.ca0d676d.js',
      'commons-1111.js',
      'commons-2222.js',
      '1111-lib-1111.js',
      'shared-1111.js',
      'shared-2222.js',
    ];
  }
  if (pageType === 'FrontPage') {
    return [
      'FrontPage-31ecd969.bbf7a07e.js',
      'commons-1111.js',
      'commons-2222.js',
      '1111-lib-1111.js',
      'shared-1111.js',
    ];
  }
  if (pageType === 'IdxPage') {
    return [
      'IdxPage-31ecd969.68b77555.js',
      'commons-1111.js',
      'commons-2222.js',
      '1111-lib-1111.js',
      'shared-1111.js',
      'shared-2222.js',
      'shared-3333.js',
    ];
  }
  if (pageType === 'LiveRadioPage') {
    return [
      'LiveRadioPage-31ecd969.64772a90.js',
      'commons-1111.js',
      'commons-2222.js',
      '1111-lib-1111.js',
      'shared-1111.js',
      'shared-2222.js',
      'shared-3333.js',
    ];
  }
  if (pageType === 'MediaAssetPage') {
    return [
      'MediaAssetPage-88a3c260.b7ec8c9c.js',
      'commons-1111.js',
      'commons-2222.js',
      '1111-lib-1111.js',
      '3333-lib-2222.js',
      'shared-1111.js',
    ];
  }
  if (pageType === 'MostReadPage') {
    return [
      'MostReadPage-31ecd969.7484ff05.js',
      'commons-1111.js',
      'commons-2222.js',
      '1111-lib-1111.js',
      'shared-1111.js',
      'shared-2222.js',
      'shared-3333.js',
    ];
  }
  if (pageType === 'MostWatchedPage') {
    return [
      'MostWatchedPage-31ecd969.7484ff05.js',
      'commons-1111.js',
      'commons-2222.js',
      '1111-lib-1111.js',
      'shared-1111.js',
      'shared-2222.js',
      'shared-3333.js',
    ];
  }
  if (pageType === 'OnDemandRadioPage') {
    return [
      'OnDemandRadioPage-31ecd969.ec6af2d0.js',
      'commons-1111.js',
      'commons-2222.js',
      '1111-lib-1111.js',
      'shared-2222.js',
      'shared-3333.js',
    ];
  }
  if (pageType === 'OnDemandTvPage') {
    return [
      'OnDemandTvPage-31ecd969.de41ab7f.js',
      'commons-1111.js',
      '1111-lib-1111.js',
      '3333-lib-2222.js',
      'shared-1111.js',
    ];
  }
  if (pageType === 'PhotoGalleryPage') {
    return [
      'PhotoGalleryPage-e94df663.a733283a.js',
      'commons-1111.js',
      'commons-2222.js',
      '1111-lib-1111.js',
      'shared-1111.js',
      'shared-3333.js',
    ];
  }
  if (pageType === 'ErrorPage') {
    return [
      'ErrorPage-31ecd969.31473c35.js',
      'commons-1111.js',
      'commons-2222.js',
      '1111-lib-1111.js',
      'shared-1111.js',
      'shared-2222.js',
      'shared-3333.js',
    ];
  }
  if (pageType === 'IdxPage') {
    return [
      'IdxPage-31ecd969.31473c35.js',
      'commons-1111.js',
      'commons-2222.js',
      '1111-lib-1111.js',
      '3333-lib-2222.js',
      'shared-1111.js',
    ];
  }

  throw Error('page type not mocked');
};

exports.extractBundlesForPageType = extractBundlesForPageType;
