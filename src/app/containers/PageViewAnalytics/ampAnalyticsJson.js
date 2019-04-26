// baseUrl 'https://${atiLog}.${atiDomain}/hit.xiti?s=${destination}&ts=${timestamp}&r=${screenWidth}x${screenHeight}x${screenColorDepth}&re=${availableScreenWidth}x${availableScreenHeight}',

// pageviewParams 'p=${section}&s2=${producer}&x1=[${x1ContentId}]&x2=[${x2AppType}]&x3=[${x3AppName}]&x4=[${x4Language}]&x5=[${x5Url}]&x6=[${x6Referrer}]&x7=[${x7ContentType}]&x8=[${x8LibraryVersion}]&x9=[${x9PageTitle}]&x11=[${x11PublicationDate}]&x12=[${x12UpdateDate}]&x16=[${x16Campaigns}]&x17=[${x17CategoryName}]',
// vars: {
//   atiDomain: 'api.bbc.co.uk',
//   atiLog: 'a1',
//   destination: getDestination(isUK, env),
//   producer: '64',
//   section: '',
//   x1ContentId: getOptimoUrn(articleData),
//   x2AppType: 'amp',
//   x3AppName: service,
//   x4Language: 'en-gb',
//   x5Url: '${sourceUrl}',
//   x6Referrer: '${documentReferrer}',
//   x7ContentType: 'article',
//   x8LibraryVersion: 'SimorghAmp',
//   x9PageTitle: getPromoHeadline(articleData),
//   x11PublicationDate: getPublishedDatetime('lastPublished', articleData), // '2019-04-11T09:36:11+00:00',
//   x12UpdateDate: getPublishedDatetime('lastUpdated', articleData), // '2019-04-12T00:13:19+00:00',
//   x16Campaigns: '',
//   x17CategoryName: 'News',
// },

// '${base}&p=${section}&s2=${producer}&x1=[${x1ContentId}]&x2=[${x2AppType}]&x3=[${x3AppName}]&x4=[${x4Language}]&x5=[${x5Url}]&x6=[${x6Referrer}]&x7=[${x7ContentType}]&x8=[${x8LibraryVersion}]&x9=[${x9PageTitle}]&x11=[${x11PublicationDate}]&x12=[${x12UpdateDate}]&x16=[${x16Campaigns}]&x17=[${x17CategoryName}]',

const ampAnalyticsJson = ({ baseUrl, pageviewParams }) => ({
  transport: {
    beacon: false,
    xhrpost: false,
    image: true,
  },
  requests: {
    base: baseUrl,
    pageview: pageviewParams,
  },
  triggers: { trackPageview: { on: 'visible', request: 'pageview' } },
});

export default ampAnalyticsJson;
