const extractBundlesForPageType = pageType => {
  if (pageType === 'ArticlePage') {
    return [
      'ArticlePage-31ecd969.31473c35.js',
      'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
    ];
  }
  if (pageType === 'StoryPage') {
    return [
      'StoryPage-31ecd969.ca0d676d.js',
      'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
      'common-MediaAssetPage-PhotoGalleryPage-StoryPage-31ecd969.3341ac12.js',
    ];
  }
  if (pageType === 'FrontPage') {
    return [
      'FrontPage-31ecd969.bbf7a07e.js',
      'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
      'common-FrontPage-IdxPage-31ecd969.39680be8.js',
    ];
  }
  if (pageType === 'IdxPage') {
    return [
      'IdxPage-31ecd969.68b77555.js',
      'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
      'common-FrontPage-IdxPage-31ecd969.39680be8.js',
    ];
  }
  if (pageType === 'LiveRadioPage') {
    return [
      'LiveRadioPage-31ecd969.64772a90.js',
      'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
    ];
  }
  if (pageType === 'MediaAssetPage') {
    return [
      'MediaAssetPage-88a3c260.b7ec8c9c.js',
      'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
      'common-MediaAssetPage-PhotoGalleryPage-StoryPage-31ecd969.3341ac12.js',
    ];
  }
  if (pageType === 'MostReadPage') {
    return [
      'MostReadPage-31ecd969.7484ff05.js',
      'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
    ];
  }
  if (pageType === 'OnDemandRadioPage') {
    return [
      'OnDemandRadioPage-31ecd969.ec6af2d0.js',
      'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
    ];
  }
  if (pageType === 'OnDemandTvPage') {
    return [
      'OnDemandTvPage-31ecd969.de41ab7f.js',
      'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
    ];
  }
  if (pageType === 'PhotoGalleryPage') {
    return [
      'PhotoGalleryPage-e94df663.a733283a.js',
      'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
      'common-MediaAssetPage-PhotoGalleryPage-StoryPage-31ecd969.3341ac12.js',
    ];
  }
  if (pageType === 'MostWatchedPage') {
    return [
      'MostWatchedPage-e94df663.a733283a.js',
      'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-MostWatchedPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
    ];
  }
  throw Error('page type not mocked');
};

exports.extractBundlesForPageType = extractBundlesForPageType;
