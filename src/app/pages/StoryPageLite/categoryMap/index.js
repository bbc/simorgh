const categoryType = category => {
  const dictonary = {
    News: 'ReportageNewsArticle',
    Feature: 'ReportageNewsArticle',
    Infographic: 'ReportageNewsArticle',
    Interactive: 'ReportageNewsArticle',
    'Newsbeat Investigates': 'ReportageNewsArticle',
    Summary: 'ReportageNewsArticle',
    'You what?': 'ReportageNewsArticle',
    Quiz: 'ReportageNewsArticle',
    Explainer: 'BackgroundNewsArticle',
    Analysis: 'AnalysisNewsArticle',
    Opinion: 'OpinionNewsArticle',
    'Advertiser Content': 'AdvertiserContentArticle',
    Review: 'ReviewNewsArticle',
    'Ask the Audience': 'AskPublicNewsArticle',
  };
  return dictonary[category] ? dictonary[category] : 'NewsArticle';
};

export default categoryType;
