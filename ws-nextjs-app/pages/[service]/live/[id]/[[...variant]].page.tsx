import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import omit from 'ramda/src/omit';
import constructPageFetchUrl from '#app/routes/utils/constructPageFetchUrl';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import logResponseTime from '#server/utilities/logResponseTime';

import {
  ROUTING_INFORMATION,
  SERVER_SIDE_RENDER_REQUEST_RECEIVED,
  BFF_FETCH_ERROR,
} from '#app/lib/logger.const';
import { Services, Variants } from '#models/types/global';
import { FetchError } from '#models/types/fetch';

import getEnvironment from '#app/routes/utils/getEnvironment';
import fetchPageData from '#app/routes/utils/fetchPageData';
import certsRequired from '#app/routes/utils/certsRequired';
import { OK } from '#app/lib/statusCodes.const';
import getAgent from '../../../../utilities/undiciAgent';

import LivePageLayout from './LivePageLayout';
import extractHeaders from '../../../../../src/server/utilities/extractHeaders';
import isValidPageNumber from '../../../../utilities/pageQueryValidator';

interface PageDataParams extends ParsedUrlQuery {
  id: string;
  page?: string;
  service: Services;
  variant?: Variants;
  // eslint-disable-next-line camelcase
  renderer_env?: string;
}

// const pageData = {
//   "title": "Israeli tanks shell Jabalia camp as heavy fighting continues in north Gaza",
//   "description": "The refugee camp has been hit by hundreds of shells, where Hamas says 100,000 people are still sheltering",
//   "language": "pcm",
//   "headerImage": null,
//   "promoImage": null,
//   "home": "pidgin",
//   "section": null,
//   "commercialInfo": {
//     "adCategory": null,
//     "adSubCategory": null
//   },
//   "sportDataEvent": {
//     "id": null
//   },
//   "eavisEvent": {
//     "id": null
//   },
//   "article": {
//     "id": null
//   },
//   "mediaCollections": [
//     {
//       "id": null
//     }
//   ],
//   "supportingLinks": {
//     "id": null
//   },
//   "seo": {
//     "seoTitle": "Pidgin test  - SEO Title",
//     "seoDescription": "Pidgin test 2 - SEO Description",
//     "datePublished": "2023-04-05T10:22:00.000Z",
//     "dateModified": "2023-12-20T12:23:59+00:00"
//   },
//   "endDateTime": "2024-04-05T10:21:00.000Z",
//   "startDateTime": "2023-04-05T10:22:00.000Z",
//   "type": "live-coverage",
//   "atiAnalytics": {
//     "contentId": "urn:bbc:tipo:topic:c7p765ynk9qt",
//     "contentType": "live-coverage",
//     "pageIdentifier": "live_coverage.c7p765ynk9qt.page",
//     "pageTitle": "Pidgin test  - SEO Title"
//   },
//   "isLive": true,
//   "summaryPoints": {
//     "id": "urn:bbc:optimo:asset:c5x3899j84ro",
//     "content": {
//       "model": {
//         "blocks": [
//           {
//             "id": "99e0fe3f",
//             "type": "text",
//             "model": {
//               "blocks": [
//                 {
//                   "id": "a850b31b",
//                   "type": "unorderedList",
//                   "model": {
//                     "blocks": [
//                       {
//                         "id": "0dd454be",
//                         "type": "listItem",
//                         "model": {
//                           "blocks": [
//                             {
//                               "id": "9d774e66",
//                               "type": "paragraph",
//                               "model": {
//                                 "text": "I am the summary box",
//                                 "blocks": [
//                                   {
//                                     "id": "448c219b",
//                                     "type": "fragment",
//                                     "model": {
//                                       "text": "I am the summary box",
//                                       "attributes": []
//                                     }
//                                   }
//                                 ]
//                               }
//                             }
//                           ]
//                         }
//                       },
//                       {
//                         "id": "98f23582",
//                         "type": "listItem",
//                         "model": {
//                           "blocks": [
//                             {
//                               "id": "940ae762",
//                               "type": "paragraph",
//                               "model": {
//                                 "text": "I need to include bulletpoints",
//                                 "blocks": [
//                                   {
//                                     "id": "82262a3c",
//                                     "type": "fragment",
//                                     "model": {
//                                       "text": "I need to include bulletpoints",
//                                       "attributes": []
//                                     }
//                                   }
//                                 ]
//                               }
//                             }
//                           ]
//                         }
//                       },
//                       {
//                         "id": "73c57ad7",
//                         "type": "listItem",
//                         "model": {
//                           "blocks": [
//                             {
//                               "id": "7dbe0977",
//                               "type": "paragraph",
//                               "model": {
//                                 "text": "I want to link to somebody",
//                                 "blocks": [
//                                   {
//                                     "id": "52d235c7",
//                                     "type": "fragment",
//                                     "model": {
//                                       "text": "I want to ",
//                                       "attributes": []
//                                     }
//                                   },
//                                   {
//                                     "id": "4234d2c8",
//                                     "type": "urlLink",
//                                     "model": {
//                                       "text": "link to somebody",
//                                       "blocks": [
//                                         {
//                                           "id": "58df7174",
//                                           "type": "fragment",
//                                           "model": {
//                                             "text": "link to somebody",
//                                             "attributes": []
//                                           }
//                                         }
//                                       ],
//                                       "locator": "https://www.bbc.com/pidgin",
//                                       "isExternal": false
//                                     }
//                                   }
//                                 ]
//                               }
//                             }
//                           ]
//                         }
//                       }
//                     ]
//                   }
//                 }
//               ]
//             }
//           }
//         ]
//       }
//     }
//   },
//   "liveTextStream": {
//     "id": "8E1A80B519D1451FBF5DF6AB029B8B1C",
//     "contributors": "Edited by Andrew Humphrey",
//     "content": {
//       "data": {
//         "results": [
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "d6a72f96",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "71da6a96",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "13ef8d2e",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Another test for refresh",
//                                   "blocks": [
//                                     {
//                                       "id": "a9aeb7b0",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Another test for refresh",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "f76561d9",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "48b5af62",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "4c493b8d",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Harvey Peachey",
//                                   "blocks": [
//                                     {
//                                       "id": "be78608d",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Harvey Peachey",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "6d86d4aa",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Testing with a new card",
//                       "blocks": [
//                         {
//                           "id": "2b208a16",
//                           "type": "fragment",
//                           "model": {
//                             "text": "Testing with a new card",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:5e696125-cfab-4f6a-b375-67a5878935cb",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-12-20T12:23:59+00:00",
//               "lastPublished": "2023-12-20T12:23:59+00:00",
//               "time": null,
//               "curated": "2023-12-20T12:24:00.526Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "2e190dea",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "61821195",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "de3f3753",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Test for refresh",
//                                   "blocks": [
//                                     {
//                                       "id": "a8e693e5",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Test for refresh",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "af161441",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "6024187a",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "8c6398cb",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Rushdi Abu Alouf - Reporting from Istanbul",
//                                   "blocks": [
//                                     {
//                                       "id": "750f0ec9",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Rushdi Abu Alouf - Reporting from Istanbul",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "aadb6527",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Yo",
//                       "blocks": [
//                         {
//                           "id": "67b55e81",
//                           "type": "fragment",
//                           "model": {
//                             "text": "Yo",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "a167e64f",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "No 10 has decided to split the role. So Michael Tomlinson has been appointed Minister for Illegal Migration in the Home Office, with Tom Pursglove as Minister for Legal Migration and Delivery.",
//                       "blocks": [
//                         {
//                           "id": "dc257088",
//                           "type": "fragment",
//                           "model": {
//                             "text": "No 10 has decided to split the role. So Michael Tomlinson has been appointed Minister for Illegal Migration in the Home Office, with Tom Pursglove as Minister for Legal Migration and Delivery.",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "ff80de8f",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Testing an update within this post card",
//                       "blocks": [
//                         {
//                           "id": "9e4a10bb",
//                           "type": "fragment",
//                           "model": {
//                             "text": "Testing an update within this post card",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "4fd0a6a4",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:8e63ed82-876f-4252-8fe6-80e57cc20da3",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": true
//             },
//             "dates": {
//               "firstPublished": "2023-12-20T10:23:22+00:00",
//               "lastPublished": "2023-12-20T12:15:19+00:00",
//               "time": null,
//               "curated": "2023-12-20T10:23:24.587Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "954c0501",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "eb02f4ab",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "f22b7b41",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "More fuel aid for Gaza but fighting threatens distribution",
//                                   "blocks": [
//                                     {
//                                       "id": "f0aad72e",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "More fuel aid for Gaza but fighting threatens distribution",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "5b9eec2d",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "ffa717ba",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "90cda8ed",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Yvette Tan, Live editor",
//                                   "blocks": [
//                                     {
//                                       "id": "c1925b88",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Yvette Tan, Live editor",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "0d255f30",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Israel has announced what it called a \"minimal\" increase in fuel supplies to southern Gaza.",
//                       "blocks": [
//                         {
//                           "id": "91ee3a94",
//                           "type": "fragment",
//                           "model": {
//                             "text": "Israel has announced what it called a \"minimal\" increase in fuel supplies to southern Gaza.",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "118e76e7",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   },
//                   {
//                     "id": "f3cf35a2",
//                     "type": "video",
//                     "model": {
//                       "locator": "urn:bbc:pips:pid:p01thw20",
//                       "blocks": [
//                         {
//                           "id": "6217b8cb",
//                           "type": "clipMedia",
//                           "model": {
//                             "id": "urn:bbc:pips:pid:p01thw20",
//                             "urns": {
//                               "pipsPid": "urn:bbc:pips:pid:p01thw20"
//                             },
//                             "images": [
//                               {
//                                 "url": "https://ichef.test.bbci.co.uk/images/ic/1024xn/p01thw3g.jpg",
//                                 "urlTemplate": "https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01thw3g.jpg",
//                                 "altText": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                 "type": "socialImage",
//                                 "source": "pipsImage"
//                               },
//                               {
//                                 "url": "https://ichef.test.bbci.co.uk/images/ic/1024xn/p01thw3g.jpg",
//                                 "urlTemplate": "https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01thw3g.jpg",
//                                 "altText": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                 "type": "promoImage",
//                                 "source": "pipsImage"
//                               }
//                             ],
//                             "assetPath": "p01thw20",
//                             "type": "video",
//                             "headlines": {
//                               "primaryHeadline": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "seoHeadline": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "promoHeadline": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "socialHeadline": "BBC launch trailer for We Know Our Place women's sport campaign"
//                             },
//                             "analytics": {
//                               "page": {
//                                 "name": "programmes.av.p01thw20.page",
//                                 "contentId": "urn:bbc:pips:pid:p01thw20",
//                                 "producer": "PROGRAMMES"
//                               }
//                             },
//                             "description": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                             "summary": {
//                               "type": "text",
//                               "model": {
//                                 "blocks": [
//                                   {
//                                     "type": "paragraph",
//                                     "model": {
//                                       "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                       "blocks": [
//                                         {
//                                           "type": "fragment",
//                                           "model": {
//                                             "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                             "attributes": []
//                                           }
//                                         }
//                                       ]
//                                     }
//                                   }
//                                 ]
//                               }
//                             },
//                             "lastPublished": "2022-07-01T08:56:56Z",
//                             "firstPublished": null,
//                             "video": {
//                               "id": "p01thw20",
//                               "title": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "holdingImage": {
//                                 "id": "https://ichef.test.bbci.co.uk/images/ic/$recipe/p01thw3g.jpg",
//                                 "altText": "BBC launch trailer for We Know Our Place women's sport campaign\""
//                               },
//                               "version": {
//                                 "id": "p01thw22",
//                                 "duration": "PT54S",
//                                 "kind": "programme",
//                                 "guidance": null,
//                                 "territories": [
//                                   "nonuk",
//                                   "uk"
//                                 ]
//                               },
//                               "isAdvertisingAllowed": true,
//                               "isEmbeddingAllowed": true,
//                               "isUnavailable": false
//                             },
//                             "attributions": null,
//                             "link": {
//                               "path": "/programmes/p01thw20"
//                             },
//                             "section": null,
//                             "isSharingAllowed": true
//                           }
//                         },
//                         {
//                           "id": "375c36e7",
//                           "type": "caption",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "454cef61",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "48256880",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                         "blocks": [
//                                           {
//                                             "id": "adbafc7d",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:39960839-4a90-4725-b05b-67eb3adb1f0e",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-12-07T16:46:07+00:00",
//               "lastPublished": "2023-12-07T16:46:07+00:00",
//               "time": null,
//               "curated": "2023-12-07T16:46:08.623Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "a098eef6",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "a38f616a",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "45cff07c",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Sunak moves to split Jenrick's old job in two",
//                                   "blocks": [
//                                     {
//                                       "id": "3e7e4f6b",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Sunak moves to split Jenrick's old job in two",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "7eb243ab",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "b2786c3f",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "337dbce8",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Rushdi Abu Alouf - Reporting from Istanbul",
//                                   "blocks": [
//                                     {
//                                       "id": "34c4143a",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Rushdi Abu Alouf - Reporting from Istanbul",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "5ac4ba9b",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Downing Street has moved to announce who will replace Robert Jenrick who quit last night as immigration minister.",
//                       "blocks": [
//                         {
//                           "id": "9e2d8eb1",
//                           "type": "fragment",
//                           "model": {
//                             "text": "Downing Street has moved to announce who will replace Robert Jenrick who quit last night as immigration minister.",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "944a0d29",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "No 10 has decided to split the role. So Michael Tomlinson has been appointed Minister for Illegal Migration in the Home Office, with Tom Pursglove as Minister for Legal Migration and Delivery.",
//                       "blocks": [
//                         {
//                           "id": "26d20b5a",
//                           "type": "fragment",
//                           "model": {
//                             "text": "No 10 has decided to split the role. So Michael Tomlinson has been appointed Minister for Illegal Migration in the Home Office, with Tom Pursglove as Minister for Legal Migration and Delivery.",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "810a842e",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:32d4372b-0045-4673-903c-eb1c31b88361",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": true
//             },
//             "dates": {
//               "firstPublished": "2023-12-07T15:51:05+00:00",
//               "lastPublished": "2023-12-07T15:59:50+00:00",
//               "time": null,
//               "curated": "2023-12-07T15:51:05.859Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "99a697a6",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "ba28af16",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "0d359313",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Gazans squeezed into smaller areas in the south as fighting rages (Twitter)",
//                                   "blocks": [
//                                     {
//                                       "id": "4065aaff",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Gazans squeezed into smaller areas in the south as fighting rages (Twitter)",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "fc5c475a",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "dec8f82f",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "ef84715b",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "UK Defence Secretary Grant Shapps has said more aid needs to reach Gaza",
//                                   "blocks": [
//                                     {
//                                       "id": "f024cc2f",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "UK Defence Secretary Grant Shapps has said more aid needs to reach Gaza",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "7b331369",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "It's been an intense day of fighting in Gaza as the Israeli army continues to push into Khan Younis, where tens of thousands of displaced people have been sheltering.",
//                       "blocks": [
//                         {
//                           "id": "851e280a",
//                           "type": "fragment",
//                           "model": {
//                             "text": "It's been an intense day of fighting in Gaza as the Israeli army continues to push into Khan Younis, where tens of thousands of displaced people have been sheltering.",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "91879de6",
//                     "type": "social",
//                     "model": {
//                       "source": "https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet",
//                       "blocks": [
//                         {
//                           "id": "4d8e5689",
//                           "type": "renditions",
//                           "model": {
//                             "locator": "",
//                             "blocks": [
//                               {
//                                 "id": "bf6457df",
//                                 "type": "aresOEmbed",
//                                 "model": {
//                                   "oembed": {
//                                     "provider_name": "twitter",
//                                     "url": "https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet",
//                                     "html": "<blockquote class=\"twitter-tweet\"><a href=https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet>View original content on Twitter</a></blockquote>",
//                                     "indexOfType": 0
//                                   }
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "d6319261",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "While the focus of the Israeli ground operation seems to be in the south, hundreds of tank shells hit Jabalia refugee camp in the north.",
//                       "blocks": [
//                         {
//                           "id": "357d8814",
//                           "type": "fragment",
//                           "model": {
//                             "text": "While the focus of the Israeli ground operation seems to be in the south, hundreds of tank shells hit Jabalia refugee camp in the north.",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "4f53740a",
//                     "type": "social",
//                     "model": {
//                       "source": "https://twitter.com/bbcnewspidgin/status/1700039661874282772",
//                       "blocks": [
//                         {
//                           "id": "0ce22756",
//                           "type": "renditions",
//                           "model": {
//                             "locator": "",
//                             "blocks": [
//                               {
//                                 "id": "c6c840bd",
//                                 "type": "aresOEmbed",
//                                 "model": {
//                                   "oembed": {
//                                     "provider_name": "twitter",
//                                     "url": "https://twitter.com/bbcnewspidgin/status/1700039661874282772",
//                                     "html": "<blockquote class=\"twitter-tweet\"><a href=https://twitter.com/bbcnewspidgin/status/1700039661874282772>View original content on Twitter</a></blockquote>",
//                                     "indexOfType": 1
//                                   }
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:35f240a5-1fb2-4ed3-9c2a-657c4599fc0b",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-09-08T10:07:36+00:00",
//               "lastPublished": "2023-12-07T16:19:21+00:00",
//               "time": null,
//               "curated": "2023-09-08T10:07:36.652Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "ab52b05b",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "8653e72f",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "0d5b5b5e",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "UK looking at more routes for aid to reach Gaza",
//                                   "blocks": [
//                                     {
//                                       "id": "af9fa7be",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "UK looking at more routes for aid to reach Gaza",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "b68facfc",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "355d29d8",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "af5ffc9b",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Anna Foster, BBC News, Rishpon, central Israel",
//                                   "blocks": [
//                                     {
//                                       "id": "f0f55479",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Anna Foster, BBC News, Rishpon, central Israel",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "324ba41b",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "In pictures: Scenes in Gaza today",
//                       "blocks": [
//                         {
//                           "id": "e408009a",
//                           "type": "fragment",
//                           "model": {
//                             "text": "In pictures: Scenes in Gaza today",
//                             "attributes": [
//                               "bold"
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "9a400467",
//                     "type": "image",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "5704ca75",
//                           "type": "rawImage",
//                           "model": {
//                             "height": 416,
//                             "width": 624,
//                             "locator": "vivo/test/images/2023/12/7/0781b49d-0b5b-43b5-9b39-605b189c2136.jpg",
//                             "originCode": "cpsdevpb",
//                             "copyrightHolder": "AFP"
//                           }
//                         },
//                         {
//                           "id": "1e9878c1",
//                           "type": "altText",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "2d82ebad",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "e8414d85",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "Bombing over the Gaza Strip",
//                                         "blocks": [
//                                           {
//                                             "id": "c421803a",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "Bombing over the Gaza Strip",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         },
//                         {
//                           "id": "362d3d46",
//                           "type": "caption",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "3a7b642a",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "4a57330c",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "A view of Gaza shows smoke rising during Israeli shelling, taken from southern Israel",
//                                         "blocks": [
//                                           {
//                                             "id": "a2d4cfe4",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "A view of Gaza shows smoke rising during Israeli shelling, taken from southern Israel",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "bc05d5b5",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   },
//                   {
//                     "id": "2fdd0b7d",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "What's been happening",
//                       "blocks": [
//                         {
//                           "id": "d23c9475",
//                           "type": "fragment",
//                           "model": {
//                             "text": "What's been happening",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "3d9e514a",
//                     "type": "image",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "875506f7",
//                           "type": "rawImage",
//                           "model": {
//                             "height": 416,
//                             "width": 624,
//                             "locator": "vivo/test/images/2023/12/7/87d8f01c-d00b-4a14-9801-198833d403ea.jpg",
//                             "originCode": "cpsdevpb",
//                             "copyrightHolder": "Getty Images"
//                           }
//                         },
//                         {
//                           "id": "ebcaa97e",
//                           "type": "altText",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "39313cfb",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "36c5481e",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "Israeli construction work in Silwan, East Jerusalem",
//                                         "blocks": [
//                                           {
//                                             "id": "5249c7b9",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "Israeli construction work in Silwan, East Jerusalem",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         },
//                         {
//                           "id": "00ad66db",
//                           "type": "caption",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "fa05b434",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "bbd29234",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "Israeli construction work in Silwan, East Jerusalem",
//                                         "blocks": [
//                                           {
//                                             "id": "7ea2ef0a",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "Israeli construction work in Silwan, East Jerusalem",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:18d24593-b615-4c84-867c-ac1fdec87136",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-09-08T10:03:13+00:00",
//               "lastPublished": "2023-12-08T13:32:45+00:00",
//               "time": null,
//               "curated": "2023-09-08T10:03:14.051Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "5c2f1a01",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "488d3001",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "f488ff4d",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "What's happening in Jabalia?",
//                                   "blocks": [
//                                     {
//                                       "id": "14212621",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "What's happening in Jabalia?",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "1c77a90c",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "7a4faa16",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "992e87d4",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "This is a subheadline",
//                                   "blocks": [
//                                     {
//                                       "id": "8dac0e73",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "This is a subheadline",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "d137e7cf",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Jabalia refugee camp in the north of Gaza used to be one of the most densely populated areas on the Strip and the territory's largest refugee camp.",
//                       "blocks": [
//                         {
//                           "id": "d50bc555",
//                           "type": "fragment",
//                           "model": {
//                             "text": "Jabalia refugee camp in the north of Gaza used to be one of the most densely populated areas on the Strip and the territory's largest refugee camp.",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "e6aff1c6",
//                     "type": "image",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "93db331e",
//                           "type": "rawImage",
//                           "model": {
//                             "height": 402,
//                             "width": 624,
//                             "locator": "vivo/test/images/2023/12/7/a58a1fa6-4033-4f83-b780-c30025c7732d.jpg",
//                             "originCode": "cpsdevpb",
//                             "copyrightHolder": "Getty Images"
//                           }
//                         },
//                         {
//                           "id": "dd545210",
//                           "type": "altText",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "faaa23d9",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "9a489469",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "Israel's attacks on Jabalia refugee camp in northern Gaza have left dozens of structures in ruins.",
//                                         "blocks": [
//                                           {
//                                             "id": "d65fee54",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "Israel's attacks on Jabalia refugee camp in northern Gaza have left dozens of structures in ruins.",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         },
//                         {
//                           "id": "b0e97c8b",
//                           "type": "caption",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "ef8cc6a1",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "890e39ec",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "Israel's attacks on Jabalia refugee camp in northern Gaza have left dozens of structures in ruins.",
//                                         "blocks": [
//                                           {
//                                             "id": "33707898",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "Israel's attacks on Jabalia refugee camp in northern Gaza have left dozens of structures in ruins.",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "3a0532e2",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   },
//                   {
//                     "id": "96e46473",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Read the full story here.",
//                       "blocks": [
//                         {
//                           "id": "cf4e0fe1",
//                           "type": "urlLink",
//                           "model": {
//                             "text": "Read the full story here.",
//                             "locator": "https://www.bbc.co.uk/news/world-middle-east-67636785",
//                             "blocks": [
//                               {
//                                 "id": "80a087df",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "Read the full story here.",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "33a13089",
//                     "type": "video",
//                     "model": {
//                       "locator": "urn:bbc:pips:pid:p01thw20",
//                       "blocks": [
//                         {
//                           "id": "acf61501",
//                           "type": "clipMedia",
//                           "model": {
//                             "id": "urn:bbc:pips:pid:p01thw20",
//                             "urns": {
//                               "pipsPid": "urn:bbc:pips:pid:p01thw20"
//                             },
//                             "images": [
//                               {
//                                 "url": "https://ichef.test.bbci.co.uk/images/ic/1024xn/p01thw3g.jpg",
//                                 "urlTemplate": "https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01thw3g.jpg",
//                                 "altText": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                 "type": "socialImage",
//                                 "source": "pipsImage"
//                               },
//                               {
//                                 "url": "https://ichef.test.bbci.co.uk/images/ic/1024xn/p01thw3g.jpg",
//                                 "urlTemplate": "https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01thw3g.jpg",
//                                 "altText": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                 "type": "promoImage",
//                                 "source": "pipsImage"
//                               }
//                             ],
//                             "assetPath": "p01thw20",
//                             "type": "video",
//                             "headlines": {
//                               "primaryHeadline": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "seoHeadline": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "promoHeadline": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "socialHeadline": "BBC launch trailer for We Know Our Place women's sport campaign"
//                             },
//                             "analytics": {
//                               "page": {
//                                 "name": "programmes.av.p01thw20.page",
//                                 "contentId": "urn:bbc:pips:pid:p01thw20",
//                                 "producer": "PROGRAMMES"
//                               }
//                             },
//                             "description": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                             "summary": {
//                               "type": "text",
//                               "model": {
//                                 "blocks": [
//                                   {
//                                     "type": "paragraph",
//                                     "model": {
//                                       "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                       "blocks": [
//                                         {
//                                           "type": "fragment",
//                                           "model": {
//                                             "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                             "attributes": []
//                                           }
//                                         }
//                                       ]
//                                     }
//                                   }
//                                 ]
//                               }
//                             },
//                             "lastPublished": "2022-07-01T08:56:56Z",
//                             "firstPublished": null,
//                             "video": {
//                               "id": "p01thw20",
//                               "title": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "holdingImage": {
//                                 "id": "https://ichef.test.bbci.co.uk/images/ic/$recipe/p01thw3g.jpg",
//                                 "altText": "BBC launch trailer for We Know Our Place women's sport campaign\""
//                               },
//                               "version": {
//                                 "id": "p01thw22",
//                                 "duration": "PT54S",
//                                 "kind": "programme",
//                                 "guidance": null,
//                                 "territories": [
//                                   "nonuk",
//                                   "uk"
//                                 ]
//                               },
//                               "isAdvertisingAllowed": true,
//                               "isEmbeddingAllowed": true,
//                               "isUnavailable": false
//                             },
//                             "attributions": null,
//                             "link": {
//                               "path": "/programmes/p01thw20"
//                             },
//                             "section": null,
//                             "isSharingAllowed": true
//                           }
//                         },
//                         {
//                           "id": "8e9131b4",
//                           "type": "caption",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "51e42ceb",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "e5b2683a",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                         "blocks": [
//                                           {
//                                             "id": "2642aaf8",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "c032daa7",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   },
//                   {
//                     "id": "00408c86",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Follow BBC posts on X",
//                       "blocks": [
//                         {
//                           "id": "a96f8565",
//                           "type": "urlLink",
//                           "model": {
//                             "text": "Follow BBC posts on X",
//                             "locator": "https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet",
//                             "blocks": [
//                               {
//                                 "id": "14b0b806",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "Follow BBC posts on X",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "19592809",
//                     "type": "social",
//                     "model": {
//                       "source": "https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet",
//                       "blocks": [
//                         {
//                           "id": "4348e19c",
//                           "type": "renditions",
//                           "model": {
//                             "locator": "",
//                             "blocks": [
//                               {
//                                 "id": "17852586",
//                                 "type": "aresOEmbed",
//                                 "model": {
//                                   "oembed": {
//                                     "provider_name": "twitter",
//                                     "url": "https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet",
//                                     "html": "<blockquote class=\"twitter-tweet\"><a href=https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet>View original content on Twitter</a></blockquote>"
//                                   }
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:1e24fad4-7eba-41fc-a02c-ed28e0e8e1d8",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-06-20T09:28:25+00:00",
//               "lastPublished": "2023-12-07T16:51:47+00:00",
//               "time": null,
//               "curated": "2023-06-20T09:28:26.267Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "6853db61",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "89ba1324",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "d5f4b159",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "What's been happening",
//                                   "blocks": [
//                                     {
//                                       "id": "e2996a6d",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "What's been happening",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "b6b7d046",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "5cee0d20",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "845534c0",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Rushdi Abu Alouf, Reporting from Istanbul",
//                                   "blocks": [
//                                     {
//                                       "id": "c17eea39",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Rushdi Abu Alouf, Reporting from Istanbul",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "e668dfda",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "It is another difficult day for civilians in Gaza, as Israel continues its bombardment of the Palestinian enclave. Here's a recap of what's been happening:",
//                       "blocks": [
//                         {
//                           "id": "c0c7815b",
//                           "type": "fragment",
//                           "model": {
//                             "text": "It is another difficult day for civilians in ",
//                             "attributes": []
//                           }
//                         },
//                         {
//                           "id": "fd38742e",
//                           "type": "fragment",
//                           "model": {
//                             "text": "Gaza",
//                             "attributes": [
//                               "italic",
//                               "bold"
//                             ]
//                           }
//                         },
//                         {
//                           "id": "2efb7eb1",
//                           "type": "fragment",
//                           "model": {
//                             "text": ", as Israel continues its bombardment of the Palestinian enclave. Here's a recap of what's been happening:",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "7dca7d2a",
//                     "type": "orderedList",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "078afdbd",
//                           "type": "listItem",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "74584d65",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "\n      Israel is attacking targets inboth northern and southern Gaza\n    ",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         },
//                         {
//                           "id": "026fa1d5",
//                           "type": "listItem",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "066e20af",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "\n      One of the focal points isJabalia refugee campin the north, where Israel maintains Hamas has a stronghold\n    ",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         },
//                         {
//                           "id": "83ac3dba",
//                           "type": "listItem",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "d4562b25",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "\n      Al Jazeera reported thatone of its journalists had lost 22 family membersin an Israeli attack on Jabalia camp yesterday\n    ",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "576b5457",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   },
//                   {
//                     "id": "9981db91",
//                     "type": "unorderedList",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "1b5abf08",
//                           "type": "listItem",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "4cbbac8f",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "\n      Israel's military has alsoadvanced into the heart of Khan Younisin southern Gaza, which had been sheltering hundreds of thousands who fled the fighting in the north\n    ",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "b6d52554",
//                     "type": "unorderedList",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "2fb06dee",
//                           "type": "listItem",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "13fc3bcf",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "\n      No aidhas reached the north since the humanitarian truce ended at the start of December\n    ",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         },
//                         {
//                           "id": "b8e3ab42",
//                           "type": "listItem",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "ea102f59",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "\n      UN chief Antonio Guterres yesterday warned that thehumanitarian system in Gaza may collapse and public order could completely break down\n    ",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "70568e0e",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   },
//                   {
//                     "id": "f5a15008",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "More information here.",
//                       "blocks": [
//                         {
//                           "id": "e4c83804",
//                           "type": "urlLink",
//                           "model": {
//                             "text": "More information here.",
//                             "locator": "https://www.bbc.com/pidgin",
//                             "blocks": [
//                               {
//                                 "id": "c6d613b2",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "More information here.",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "189f1b93",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   },
//                   {
//                     "id": "8426af93",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:b859b861-ff51-44be-9e66-5832697f5b7d",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": true
//             },
//             "dates": {
//               "firstPublished": "2023-06-20T08:40:34+00:00",
//               "lastPublished": "2023-12-07T16:42:20+00:00",
//               "time": null,
//               "curated": "2023-06-20T08:40:45.292Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "ee98df43",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "62f8f04c",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "e757d68e",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Calls for war crime investigation over Lebanon border strikes",
//                                   "blocks": [
//                                     {
//                                       "id": "2157a586",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Calls for war crime investigation over Lebanon border strikes",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "c5131497",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "10058ae8",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "9a53b629",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "New sub headline",
//                                   "blocks": [
//                                     {
//                                       "id": "a9ea1d43",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "New sub headline",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "50bc560c",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Read more about the border area known as the Blue Line, the unofficial frontier between Lebanon and Israel here.  Article share tools",
//                       "blocks": [
//                         {
//                           "id": "608df11b",
//                           "type": "urlLink",
//                           "model": {
//                             "text": "Read more about the border area known as the Blue Line, the unofficial frontier between Lebanon and Israel here.  Article share tools",
//                             "locator": "https://www.bbc.com/news",
//                             "blocks": [
//                               {
//                                 "id": "e3a2dcff",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "Read more about the border area known as the Blue Line, the unofficial frontier between Lebanon and Israel here.  Article share tools",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "bbcd7ea1",
//                     "type": "image",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "1ede5379",
//                           "type": "rawImage",
//                           "model": {
//                             "height": 402,
//                             "width": 624,
//                             "locator": "vivo/test/images/2023/12/7/d6265892-6e84-496c-9d93-735c9ef8d8aa.jpg",
//                             "originCode": "cpsdevpb",
//                             "copyrightHolder": "Getty Images"
//                           }
//                         },
//                         {
//                           "id": "e7cfff77",
//                           "type": "altText",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "02775107",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "20e13b05",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "Smoke rises from the ruins of structures in Jabalia refugee camp in northern Gaza",
//                                         "blocks": [
//                                           {
//                                             "id": "2efecb99",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "Smoke rises from the ruins of structures in Jabalia refugee camp in northern Gaza",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         },
//                         {
//                           "id": "6c89c19f",
//                           "type": "caption",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "1f36ad07",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "d4a2edcb",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "Israel's attacks on Jabalia refugee camp in northern Gaza have left dozens of structures in ruins.",
//                                         "blocks": [
//                                           {
//                                             "id": "fab13af2",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "Israel's attacks on Jabalia refugee camp in northern Gaza have left dozens of structures in ruins.",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:4326df67-94f6-43a2-a3fb-fad2e2312d25",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-04-17T14:41:07+00:00",
//               "lastPublished": "2023-12-08T13:36:28+00:00",
//               "time": null,
//               "curated": "2023-04-17T14:41:08.385Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "20ceb403",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "8576ad02",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "21b045d7",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "No incident set",
//                                   "blocks": [
//                                     {
//                                       "id": "4c03ef88",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "No incident set",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "60ba3f2f",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "00e5c93f",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "a8f36da0",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "This has nothing set",
//                                   "blocks": [
//                                     {
//                                       "id": "94c4f2cd",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "This has nothing set",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "0ac627a2",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "This has no incident type set",
//                       "blocks": [
//                         {
//                           "id": "37f67d29",
//                           "type": "fragment",
//                           "model": {
//                             "text": "This has no incident type set",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:3d0644fb-4d48-42f7-b4c5-26a52c61d311",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-04-05T10:35:01+00:00",
//               "lastPublished": "2023-04-05T10:35:01+00:00",
//               "time": null,
//               "curated": "2023-04-05T10:35:02.317Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": "GET_INVOLVED",
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "89fdd650",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "41f1a21e",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "5c1a27f5",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Get Involved",
//                                   "blocks": [
//                                     {
//                                       "id": "08a41dde",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Get Involved",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "de58646a",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "152241af",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "5a1bd7ee",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "This is get involved",
//                                   "blocks": [
//                                     {
//                                       "id": "4cbeae38",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "This is get involved",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "5dff95aa",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "This is a 'get involved' incident type",
//                       "blocks": [
//                         {
//                           "id": "def2bc24",
//                           "type": "fragment",
//                           "model": {
//                             "text": "This is a 'get involved' incident type",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:b676246f-9a33-4602-a965-35f969561638",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-04-05T10:34:00+00:00",
//               "lastPublished": "2023-04-05T10:34:00+00:00",
//               "time": null,
//               "curated": "2023-04-05T10:34:00.647Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": "QUESTION",
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "2b6e13a5",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "b79fd6bc",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "ddec6dd4",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Question",
//                                   "blocks": [
//                                     {
//                                       "id": "efde3799",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Question",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "ac991462",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "c0d536bf",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "68398ea9",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "This is question",
//                                   "blocks": [
//                                     {
//                                       "id": "162f25fb",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "This is question",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "c63f6f3c",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "This is a 'question' incident type",
//                       "blocks": [
//                         {
//                           "id": "4b397bcd",
//                           "type": "fragment",
//                           "model": {
//                             "text": "This is a 'question' incident type",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:e9646083-27be-45fc-90f3-cf98a4a47df0",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-04-05T10:33:52+00:00",
//               "lastPublished": "2023-04-05T10:33:52+00:00",
//               "time": null,
//               "curated": "2023-04-05T10:33:52.892Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": "ANALYSIS",
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "56ca39a5",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "36a79ee5",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "54378703",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Analysis",
//                                   "blocks": [
//                                     {
//                                       "id": "a6bf6332",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Analysis",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "c12efedb",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "b44aa79d",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "cf425b55",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "This is analysis",
//                                   "blocks": [
//                                     {
//                                       "id": "45be9576",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "This is analysis",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "56b53010",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "This is an 'analysis' incident type",
//                       "blocks": [
//                         {
//                           "id": "13f524d8",
//                           "type": "fragment",
//                           "model": {
//                             "text": "This is an 'analysis' incident type",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:e247894b-7694-4f0f-90b0-0a39fbcfe1d3",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-04-05T10:33:17+00:00",
//               "lastPublished": "2023-04-05T10:33:17+00:00",
//               "time": null,
//               "curated": "2023-04-05T10:33:18.781Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           }
//         ],
//         "page": {
//           "index": 1,
//           "total": 1
//         }
//       }
//     }
//   },
//   "metadata": {
//     "type": "live"
//   }
// }

// const pageData2 = {
//   "title": "Israeli tanks shell Jabalia camp as heavy fighting continues in north Gaza",
//   "description": "The refugee camp has been hit by hundreds of shells, where Hamas says 100,000 people are still sheltering",
//   "language": "pcm",
//   "headerImage": null,
//   "promoImage": null,
//   "home": "pidgin",
//   "section": null,
//   "commercialInfo": {
//     "adCategory": null,
//     "adSubCategory": null
//   },
//   "sportDataEvent": {
//     "id": null
//   },
//   "eavisEvent": {
//     "id": null
//   },
//   "article": {
//     "id": null
//   },
//   "mediaCollections": [
//     {
//       "id": null
//     }
//   ],
//   "supportingLinks": {
//     "id": null
//   },
//   "seo": {
//     "seoTitle": "Pidgin test  - SEO Title",
//     "seoDescription": "Pidgin test 2 - SEO Description",
//     "datePublished": "2023-04-05T10:22:00.000Z",
//     "dateModified": "2023-12-20T12:23:59+00:00"
//   },
//   "endDateTime": "2024-04-05T10:21:00.000Z",
//   "startDateTime": "2023-04-05T10:22:00.000Z",
//   "type": "live-coverage",
//   "atiAnalytics": {
//     "contentId": "urn:bbc:tipo:topic:c7p765ynk9qt",
//     "contentType": "live-coverage",
//     "pageIdentifier": "live_coverage.c7p765ynk9qt.page",
//     "pageTitle": "Pidgin test  - SEO Title"
//   },
//   "isLive": true,
//   "summaryPoints": {
//     "id": "urn:bbc:optimo:asset:c5x3899j84ro",
//     "content": {
//       "model": {
//         "blocks": [
//           {
//             "id": "99e0fe3f",
//             "type": "text",
//             "model": {
//               "blocks": [
//                 {
//                   "id": "a850b31b",
//                   "type": "unorderedList",
//                   "model": {
//                     "blocks": [
//                       {
//                         "id": "0dd454be",
//                         "type": "listItem",
//                         "model": {
//                           "blocks": [
//                             {
//                               "id": "9d774e66",
//                               "type": "paragraph",
//                               "model": {
//                                 "text": "I am the summary box",
//                                 "blocks": [
//                                   {
//                                     "id": "448c219b",
//                                     "type": "fragment",
//                                     "model": {
//                                       "text": "I am the summary box",
//                                       "attributes": []
//                                     }
//                                   }
//                                 ]
//                               }
//                             }
//                           ]
//                         }
//                       },
//                       {
//                         "id": "98f23582",
//                         "type": "listItem",
//                         "model": {
//                           "blocks": [
//                             {
//                               "id": "940ae762",
//                               "type": "paragraph",
//                               "model": {
//                                 "text": "I need to include bulletpoints",
//                                 "blocks": [
//                                   {
//                                     "id": "82262a3c",
//                                     "type": "fragment",
//                                     "model": {
//                                       "text": "I need to include bulletpoints",
//                                       "attributes": []
//                                     }
//                                   }
//                                 ]
//                               }
//                             }
//                           ]
//                         }
//                       },
//                       {
//                         "id": "73c57ad7",
//                         "type": "listItem",
//                         "model": {
//                           "blocks": [
//                             {
//                               "id": "7dbe0977",
//                               "type": "paragraph",
//                               "model": {
//                                 "text": "I want to link to somebody",
//                                 "blocks": [
//                                   {
//                                     "id": "52d235c7",
//                                     "type": "fragment",
//                                     "model": {
//                                       "text": "I want to ",
//                                       "attributes": []
//                                     }
//                                   },
//                                   {
//                                     "id": "4234d2c8",
//                                     "type": "urlLink",
//                                     "model": {
//                                       "text": "link to somebody",
//                                       "blocks": [
//                                         {
//                                           "id": "58df7174",
//                                           "type": "fragment",
//                                           "model": {
//                                             "text": "link to somebody",
//                                             "attributes": []
//                                           }
//                                         }
//                                       ],
//                                       "locator": "https://www.bbc.com/pidgin",
//                                       "isExternal": false
//                                     }
//                                   }
//                                 ]
//                               }
//                             }
//                           ]
//                         }
//                       }
//                     ]
//                   }
//                 }
//               ]
//             }
//           }
//         ]
//       }
//     }
//   },
//   "liveTextStream": {
//     "id": "8E1A80B519D1451FBF5DF6AB029B8B1C",
//     "contributors": "Edited by Andrew Humphrey",
//     "content": {
//       "data": {
//         "results": [
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "d6a72f96",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "71da6a96",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "13ef8d2e",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Another test for refresh",
//                                   "blocks": [
//                                     {
//                                       "id": "a9aeb7b0",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Another test for refresh",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "f76561d9",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "48b5af62",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "4c493b8d",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Harvey Peachey",
//                                   "blocks": [
//                                     {
//                                       "id": "be78608d",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Harvey Peachey",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "6d86d4aa",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Testing with a new card",
//                       "blocks": [
//                         {
//                           "id": "2b208a16",
//                           "type": "fragment",
//                           "model": {
//                             "text": "Testing with a new card",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:5e696125-cfab-4f6a-b375-67a5878935cb",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-12-20T12:23:59+00:00",
//               "lastPublished": "2023-12-20T12:23:59+00:00",
//               "time": null,
//               "curated": "2023-12-20T12:24:00.526Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "2e190dea",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "61821195",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "de3f3753",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Test for refresh",
//                                   "blocks": [
//                                     {
//                                       "id": "a8e693e5",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Test for refresh",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "af161441",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "6024187a",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "8c6398cb",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Rushdi Abu Alouf - Reporting from Istanbul",
//                                   "blocks": [
//                                     {
//                                       "id": "750f0ec9",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Rushdi Abu Alouf - Reporting from Istanbul",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "aadb6527",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Yo",
//                       "blocks": [
//                         {
//                           "id": "67b55e81",
//                           "type": "fragment",
//                           "model": {
//                             "text": "Yo",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "a167e64f",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "No 10 has decided to split the role. So Michael Tomlinson has been appointed Minister for Illegal Migration in the Home Office, with Tom Pursglove as Minister for Legal Migration and Delivery.",
//                       "blocks": [
//                         {
//                           "id": "dc257088",
//                           "type": "fragment",
//                           "model": {
//                             "text": "No 10 has decided to split the role. So Michael Tomlinson has been appointed Minister for Illegal Migration in the Home Office, with Tom Pursglove as Minister for Legal Migration and Delivery.",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "ff80de8f",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Testing an update within this post card",
//                       "blocks": [
//                         {
//                           "id": "9e4a10bb",
//                           "type": "fragment",
//                           "model": {
//                             "text": "Testing an update within this post card",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "4fd0a6a4",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:8e63ed82-876f-4252-8fe6-80e57cc20da3",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": true
//             },
//             "dates": {
//               "firstPublished": "2023-12-20T10:23:22+00:00",
//               "lastPublished": "2023-12-20T12:15:19+00:00",
//               "time": null,
//               "curated": "2023-12-20T10:23:24.587Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "954c0501",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "eb02f4ab",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "f22b7b41",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "More fuel aid for Gaza but fighting threatens distribution",
//                                   "blocks": [
//                                     {
//                                       "id": "f0aad72e",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "More fuel aid for Gaza but fighting threatens distribution",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "5b9eec2d",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "ffa717ba",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "90cda8ed",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Yvette Tan, Live editor",
//                                   "blocks": [
//                                     {
//                                       "id": "c1925b88",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Yvette Tan, Live editor",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "0d255f30",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Israel has announced what it called a \"minimal\" increase in fuel supplies to southern Gaza.",
//                       "blocks": [
//                         {
//                           "id": "91ee3a94",
//                           "type": "fragment",
//                           "model": {
//                             "text": "Israel has announced what it called a \"minimal\" increase in fuel supplies to southern Gaza.",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "118e76e7",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   },
//                   {
//                     "id": "f3cf35a2",
//                     "type": "video",
//                     "model": {
//                       "locator": "urn:bbc:pips:pid:p01thw20",
//                       "blocks": [
//                         {
//                           "id": "6217b8cb",
//                           "type": "clipMedia",
//                           "model": {
//                             "id": "urn:bbc:pips:pid:p01thw20",
//                             "urns": {
//                               "pipsPid": "urn:bbc:pips:pid:p01thw20"
//                             },
//                             "images": [
//                               {
//                                 "url": "https://ichef.test.bbci.co.uk/images/ic/1024xn/p01thw3g.jpg",
//                                 "urlTemplate": "https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01thw3g.jpg",
//                                 "altText": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                 "type": "socialImage",
//                                 "source": "pipsImage"
//                               },
//                               {
//                                 "url": "https://ichef.test.bbci.co.uk/images/ic/1024xn/p01thw3g.jpg",
//                                 "urlTemplate": "https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01thw3g.jpg",
//                                 "altText": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                 "type": "promoImage",
//                                 "source": "pipsImage"
//                               }
//                             ],
//                             "assetPath": "p01thw20",
//                             "type": "video",
//                             "headlines": {
//                               "primaryHeadline": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "seoHeadline": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "promoHeadline": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "socialHeadline": "BBC launch trailer for We Know Our Place women's sport campaign"
//                             },
//                             "analytics": {
//                               "page": {
//                                 "name": "programmes.av.p01thw20.page",
//                                 "contentId": "urn:bbc:pips:pid:p01thw20",
//                                 "producer": "PROGRAMMES"
//                               }
//                             },
//                             "description": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                             "summary": {
//                               "type": "text",
//                               "model": {
//                                 "blocks": [
//                                   {
//                                     "type": "paragraph",
//                                     "model": {
//                                       "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                       "blocks": [
//                                         {
//                                           "type": "fragment",
//                                           "model": {
//                                             "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                             "attributes": []
//                                           }
//                                         }
//                                       ]
//                                     }
//                                   }
//                                 ]
//                               }
//                             },
//                             "lastPublished": "2022-07-01T08:56:56Z",
//                             "firstPublished": null,
//                             "video": {
//                               "id": "p01thw20",
//                               "title": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "holdingImage": {
//                                 "id": "https://ichef.test.bbci.co.uk/images/ic/$recipe/p01thw3g.jpg",
//                                 "altText": "BBC launch trailer for We Know Our Place women's sport campaign\""
//                               },
//                               "version": {
//                                 "id": "p01thw22",
//                                 "duration": "PT54S",
//                                 "kind": "programme",
//                                 "guidance": null,
//                                 "territories": [
//                                   "nonuk",
//                                   "uk"
//                                 ]
//                               },
//                               "isAdvertisingAllowed": true,
//                               "isEmbeddingAllowed": true,
//                               "isUnavailable": false
//                             },
//                             "attributions": null,
//                             "link": {
//                               "path": "/programmes/p01thw20"
//                             },
//                             "section": null,
//                             "isSharingAllowed": true
//                           }
//                         },
//                         {
//                           "id": "375c36e7",
//                           "type": "caption",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "454cef61",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "48256880",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                         "blocks": [
//                                           {
//                                             "id": "adbafc7d",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:39960839-4a90-4725-b05b-67eb3adb1f0e",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-12-07T16:46:07+00:00",
//               "lastPublished": "2023-12-07T16:46:07+00:00",
//               "time": null,
//               "curated": "2023-12-07T16:46:08.623Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "a098eef6",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "a38f616a",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "45cff07c",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Sunak moves to split Jenrick's old job in two",
//                                   "blocks": [
//                                     {
//                                       "id": "3e7e4f6b",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Sunak moves to split Jenrick's old job in two",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "7eb243ab",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "b2786c3f",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "337dbce8",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Rushdi Abu Alouf - Reporting from Istanbul",
//                                   "blocks": [
//                                     {
//                                       "id": "34c4143a",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Rushdi Abu Alouf - Reporting from Istanbul",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "5ac4ba9b",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Downing Street has moved to announce who will replace Robert Jenrick who quit last night as immigration minister.",
//                       "blocks": [
//                         {
//                           "id": "9e2d8eb1",
//                           "type": "fragment",
//                           "model": {
//                             "text": "Downing Street has moved to announce who will replace Robert Jenrick who quit last night as immigration minister.",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "944a0d29",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "No 10 has decided to split the role. So Michael Tomlinson has been appointed Minister for Illegal Migration in the Home Office, with Tom Pursglove as Minister for Legal Migration and Delivery.",
//                       "blocks": [
//                         {
//                           "id": "26d20b5a",
//                           "type": "fragment",
//                           "model": {
//                             "text": "No 10 has decided to split the role. So Michael Tomlinson has been appointed Minister for Illegal Migration in the Home Office, with Tom Pursglove as Minister for Legal Migration and Delivery.",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "810a842e",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:32d4372b-0045-4673-903c-eb1c31b88361",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": true
//             },
//             "dates": {
//               "firstPublished": "2023-12-07T15:51:05+00:00",
//               "lastPublished": "2023-12-07T15:59:50+00:00",
//               "time": null,
//               "curated": "2023-12-07T15:51:05.859Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "99a697a6",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "ba28af16",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "0d359313",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Gazans squeezed into smaller areas in the south as fighting rages (Twitter)",
//                                   "blocks": [
//                                     {
//                                       "id": "4065aaff",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Gazans squeezed into smaller areas in the south as fighting rages (Twitter)",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "fc5c475a",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "dec8f82f",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "ef84715b",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "UK Defence Secretary Grant Shapps has said more aid needs to reach Gaza",
//                                   "blocks": [
//                                     {
//                                       "id": "f024cc2f",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "UK Defence Secretary Grant Shapps has said more aid needs to reach Gaza",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "7b331369",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "It's been an intense day of fighting in Gaza as the Israeli army continues to push into Khan Younis, where tens of thousands of displaced people have been sheltering.",
//                       "blocks": [
//                         {
//                           "id": "851e280a",
//                           "type": "fragment",
//                           "model": {
//                             "text": "It's been an intense day of fighting in Gaza as the Israeli army continues to push into Khan Younis, where tens of thousands of displaced people have been sheltering.",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "91879de6",
//                     "type": "social",
//                     "model": {
//                       "source": "https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet",
//                       "blocks": [
//                         {
//                           "id": "4d8e5689",
//                           "type": "renditions",
//                           "model": {
//                             "locator": "",
//                             "blocks": [
//                               {
//                                 "id": "bf6457df",
//                                 "type": "aresOEmbed",
//                                 "model": {
//                                   "oembed": {
//                                     "provider_name": "twitter",
//                                     "url": "https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet",
//                                     "html": "<blockquote class=\"twitter-tweet\"><a href=https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet>View original content on Twitter</a></blockquote>",
//                                     "indexOfType": 0
//                                   }
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "d6319261",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "While the focus of the Israeli ground operation seems to be in the south, hundreds of tank shells hit Jabalia refugee camp in the north.",
//                       "blocks": [
//                         {
//                           "id": "357d8814",
//                           "type": "fragment",
//                           "model": {
//                             "text": "While the focus of the Israeli ground operation seems to be in the south, hundreds of tank shells hit Jabalia refugee camp in the north.",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "4f53740a",
//                     "type": "social",
//                     "model": {
//                       "source": "https://twitter.com/bbcnewspidgin/status/1700039661874282772",
//                       "blocks": [
//                         {
//                           "id": "0ce22756",
//                           "type": "renditions",
//                           "model": {
//                             "locator": "",
//                             "blocks": [
//                               {
//                                 "id": "c6c840bd",
//                                 "type": "aresOEmbed",
//                                 "model": {
//                                   "oembed": {
//                                     "provider_name": "twitter",
//                                     "url": "https://twitter.com/bbcnewspidgin/status/1700039661874282772",
//                                     "html": "<blockquote class=\"twitter-tweet\"><a href=https://twitter.com/bbcnewspidgin/status/1700039661874282772>View original content on Twitter</a></blockquote>",
//                                     "indexOfType": 1
//                                   }
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:35f240a5-1fb2-4ed3-9c2a-657c4599fc0b",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-09-08T10:07:36+00:00",
//               "lastPublished": "2023-12-07T16:19:21+00:00",
//               "time": null,
//               "curated": "2023-09-08T10:07:36.652Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "ab52b05b",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "8653e72f",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "0d5b5b5e",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "UK looking at more routes for aid to reach Gaza",
//                                   "blocks": [
//                                     {
//                                       "id": "af9fa7be",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "UK looking at more routes for aid to reach Gaza",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "b68facfc",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "355d29d8",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "af5ffc9b",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Anna Foster, BBC News, Rishpon, central Israel",
//                                   "blocks": [
//                                     {
//                                       "id": "f0f55479",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Anna Foster, BBC News, Rishpon, central Israel",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "324ba41b",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "In pictures: Scenes in Gaza today",
//                       "blocks": [
//                         {
//                           "id": "e408009a",
//                           "type": "fragment",
//                           "model": {
//                             "text": "In pictures: Scenes in Gaza today",
//                             "attributes": [
//                               "bold"
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "9a400467",
//                     "type": "image",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "5704ca75",
//                           "type": "rawImage",
//                           "model": {
//                             "height": 416,
//                             "width": 624,
//                             "locator": "vivo/test/images/2023/12/7/0781b49d-0b5b-43b5-9b39-605b189c2136.jpg",
//                             "originCode": "cpsdevpb",
//                             "copyrightHolder": "AFP"
//                           }
//                         },
//                         {
//                           "id": "1e9878c1",
//                           "type": "altText",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "2d82ebad",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "e8414d85",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "Bombing over the Gaza Strip",
//                                         "blocks": [
//                                           {
//                                             "id": "c421803a",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "Bombing over the Gaza Strip",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         },
//                         {
//                           "id": "362d3d46",
//                           "type": "caption",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "3a7b642a",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "4a57330c",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "A view of Gaza shows smoke rising during Israeli shelling, taken from southern Israel",
//                                         "blocks": [
//                                           {
//                                             "id": "a2d4cfe4",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "A view of Gaza shows smoke rising during Israeli shelling, taken from southern Israel",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "bc05d5b5",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   },
//                   {
//                     "id": "2fdd0b7d",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "What's been happening",
//                       "blocks": [
//                         {
//                           "id": "d23c9475",
//                           "type": "fragment",
//                           "model": {
//                             "text": "What's been happening",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "3d9e514a",
//                     "type": "image",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "875506f7",
//                           "type": "rawImage",
//                           "model": {
//                             "height": 416,
//                             "width": 624,
//                             "locator": "vivo/test/images/2023/12/7/87d8f01c-d00b-4a14-9801-198833d403ea.jpg",
//                             "originCode": "cpsdevpb",
//                             "copyrightHolder": "Getty Images"
//                           }
//                         },
//                         {
//                           "id": "ebcaa97e",
//                           "type": "altText",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "39313cfb",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "36c5481e",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "Israeli construction work in Silwan, East Jerusalem",
//                                         "blocks": [
//                                           {
//                                             "id": "5249c7b9",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "Israeli construction work in Silwan, East Jerusalem",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         },
//                         {
//                           "id": "00ad66db",
//                           "type": "caption",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "fa05b434",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "bbd29234",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "Israeli construction work in Silwan, East Jerusalem",
//                                         "blocks": [
//                                           {
//                                             "id": "7ea2ef0a",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "Israeli construction work in Silwan, East Jerusalem",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:18d24593-b615-4c84-867c-ac1fdec87136",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-09-08T10:03:13+00:00",
//               "lastPublished": "2023-12-08T13:32:45+00:00",
//               "time": null,
//               "curated": "2023-09-08T10:03:14.051Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "5c2f1a01",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "488d3001",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "f488ff4d",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "What's happening in Jabalia?",
//                                   "blocks": [
//                                     {
//                                       "id": "14212621",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "What's happening in Jabalia?",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "1c77a90c",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "7a4faa16",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "992e87d4",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "This is a subheadline",
//                                   "blocks": [
//                                     {
//                                       "id": "8dac0e73",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "This is a subheadline",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "d137e7cf",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Jabalia refugee camp in the north of Gaza used to be one of the most densely populated areas on the Strip and the territory's largest refugee camp.",
//                       "blocks": [
//                         {
//                           "id": "d50bc555",
//                           "type": "fragment",
//                           "model": {
//                             "text": "Jabalia refugee camp in the north of Gaza used to be one of the most densely populated areas on the Strip and the territory's largest refugee camp.",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "e6aff1c6",
//                     "type": "image",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "93db331e",
//                           "type": "rawImage",
//                           "model": {
//                             "height": 402,
//                             "width": 624,
//                             "locator": "vivo/test/images/2023/12/7/a58a1fa6-4033-4f83-b780-c30025c7732d.jpg",
//                             "originCode": "cpsdevpb",
//                             "copyrightHolder": "Getty Images"
//                           }
//                         },
//                         {
//                           "id": "dd545210",
//                           "type": "altText",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "faaa23d9",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "9a489469",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "Israel's attacks on Jabalia refugee camp in northern Gaza have left dozens of structures in ruins.",
//                                         "blocks": [
//                                           {
//                                             "id": "d65fee54",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "Israel's attacks on Jabalia refugee camp in northern Gaza have left dozens of structures in ruins.",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         },
//                         {
//                           "id": "b0e97c8b",
//                           "type": "caption",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "ef8cc6a1",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "890e39ec",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "Israel's attacks on Jabalia refugee camp in northern Gaza have left dozens of structures in ruins.",
//                                         "blocks": [
//                                           {
//                                             "id": "33707898",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "Israel's attacks on Jabalia refugee camp in northern Gaza have left dozens of structures in ruins.",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "3a0532e2",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   },
//                   {
//                     "id": "96e46473",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Read the full story here.",
//                       "blocks": [
//                         {
//                           "id": "cf4e0fe1",
//                           "type": "urlLink",
//                           "model": {
//                             "text": "Read the full story here.",
//                             "locator": "https://www.bbc.co.uk/news/world-middle-east-67636785",
//                             "blocks": [
//                               {
//                                 "id": "80a087df",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "Read the full story here.",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "33a13089",
//                     "type": "video",
//                     "model": {
//                       "locator": "urn:bbc:pips:pid:p01thw20",
//                       "blocks": [
//                         {
//                           "id": "acf61501",
//                           "type": "clipMedia",
//                           "model": {
//                             "id": "urn:bbc:pips:pid:p01thw20",
//                             "urns": {
//                               "pipsPid": "urn:bbc:pips:pid:p01thw20"
//                             },
//                             "images": [
//                               {
//                                 "url": "https://ichef.test.bbci.co.uk/images/ic/1024xn/p01thw3g.jpg",
//                                 "urlTemplate": "https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01thw3g.jpg",
//                                 "altText": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                 "type": "socialImage",
//                                 "source": "pipsImage"
//                               },
//                               {
//                                 "url": "https://ichef.test.bbci.co.uk/images/ic/1024xn/p01thw3g.jpg",
//                                 "urlTemplate": "https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01thw3g.jpg",
//                                 "altText": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                 "type": "promoImage",
//                                 "source": "pipsImage"
//                               }
//                             ],
//                             "assetPath": "p01thw20",
//                             "type": "video",
//                             "headlines": {
//                               "primaryHeadline": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "seoHeadline": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "promoHeadline": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "socialHeadline": "BBC launch trailer for We Know Our Place women's sport campaign"
//                             },
//                             "analytics": {
//                               "page": {
//                                 "name": "programmes.av.p01thw20.page",
//                                 "contentId": "urn:bbc:pips:pid:p01thw20",
//                                 "producer": "PROGRAMMES"
//                               }
//                             },
//                             "description": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                             "summary": {
//                               "type": "text",
//                               "model": {
//                                 "blocks": [
//                                   {
//                                     "type": "paragraph",
//                                     "model": {
//                                       "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                       "blocks": [
//                                         {
//                                           "type": "fragment",
//                                           "model": {
//                                             "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                             "attributes": []
//                                           }
//                                         }
//                                       ]
//                                     }
//                                   }
//                                 ]
//                               }
//                             },
//                             "lastPublished": "2022-07-01T08:56:56Z",
//                             "firstPublished": null,
//                             "video": {
//                               "id": "p01thw20",
//                               "title": "BBC launch trailer for We Know Our Place women's sport campaign",
//                               "holdingImage": {
//                                 "id": "https://ichef.test.bbci.co.uk/images/ic/$recipe/p01thw3g.jpg",
//                                 "altText": "BBC launch trailer for We Know Our Place women's sport campaign\""
//                               },
//                               "version": {
//                                 "id": "p01thw22",
//                                 "duration": "PT54S",
//                                 "kind": "programme",
//                                 "guidance": null,
//                                 "territories": [
//                                   "nonuk",
//                                   "uk"
//                                 ]
//                               },
//                               "isAdvertisingAllowed": true,
//                               "isEmbeddingAllowed": true,
//                               "isUnavailable": false
//                             },
//                             "attributions": null,
//                             "link": {
//                               "path": "/programmes/p01thw20"
//                             },
//                             "section": null,
//                             "isSharingAllowed": true
//                           }
//                         },
//                         {
//                           "id": "8e9131b4",
//                           "type": "caption",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "51e42ceb",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "e5b2683a",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                         "blocks": [
//                                           {
//                                             "id": "2642aaf8",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "BBC launch trailer for We Know Our Place women's sport campaign\"",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "c032daa7",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   },
//                   {
//                     "id": "00408c86",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Follow BBC posts on X",
//                       "blocks": [
//                         {
//                           "id": "a96f8565",
//                           "type": "urlLink",
//                           "model": {
//                             "text": "Follow BBC posts on X",
//                             "locator": "https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet",
//                             "blocks": [
//                               {
//                                 "id": "14b0b806",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "Follow BBC posts on X",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "19592809",
//                     "type": "social",
//                     "model": {
//                       "source": "https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet",
//                       "blocks": [
//                         {
//                           "id": "4348e19c",
//                           "type": "renditions",
//                           "model": {
//                             "locator": "",
//                             "blocks": [
//                               {
//                                 "id": "17852586",
//                                 "type": "aresOEmbed",
//                                 "model": {
//                                   "oembed": {
//                                     "provider_name": "twitter",
//                                     "url": "https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet",
//                                     "html": "<blockquote class=\"twitter-tweet\"><a href=https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet>View original content on Twitter</a></blockquote>"
//                                   }
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:1e24fad4-7eba-41fc-a02c-ed28e0e8e1d8",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-06-20T09:28:25+00:00",
//               "lastPublished": "2023-12-07T16:51:47+00:00",
//               "time": null,
//               "curated": "2023-06-20T09:28:26.267Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "6853db61",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "89ba1324",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "d5f4b159",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "What's been happening",
//                                   "blocks": [
//                                     {
//                                       "id": "e2996a6d",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "What's been happening",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "b6b7d046",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "5cee0d20",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "845534c0",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Rushdi Abu Alouf, Reporting from Istanbul",
//                                   "blocks": [
//                                     {
//                                       "id": "c17eea39",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Rushdi Abu Alouf, Reporting from Istanbul",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "e668dfda",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "It is another difficult day for civilians in Gaza, as Israel continues its bombardment of the Palestinian enclave. Here's a recap of what's been happening:",
//                       "blocks": [
//                         {
//                           "id": "c0c7815b",
//                           "type": "fragment",
//                           "model": {
//                             "text": "It is another difficult day for civilians in ",
//                             "attributes": []
//                           }
//                         },
//                         {
//                           "id": "fd38742e",
//                           "type": "fragment",
//                           "model": {
//                             "text": "Gaza",
//                             "attributes": [
//                               "italic",
//                               "bold"
//                             ]
//                           }
//                         },
//                         {
//                           "id": "2efb7eb1",
//                           "type": "fragment",
//                           "model": {
//                             "text": ", as Israel continues its bombardment of the Palestinian enclave. Here's a recap of what's been happening:",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "7dca7d2a",
//                     "type": "orderedList",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "078afdbd",
//                           "type": "listItem",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "74584d65",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "\n      Israel is attacking targets inboth northern and southern Gaza\n    ",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         },
//                         {
//                           "id": "026fa1d5",
//                           "type": "listItem",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "066e20af",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "\n      One of the focal points isJabalia refugee campin the north, where Israel maintains Hamas has a stronghold\n    ",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         },
//                         {
//                           "id": "83ac3dba",
//                           "type": "listItem",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "d4562b25",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "\n      Al Jazeera reported thatone of its journalists had lost 22 family membersin an Israeli attack on Jabalia camp yesterday\n    ",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "576b5457",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   },
//                   {
//                     "id": "9981db91",
//                     "type": "unorderedList",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "1b5abf08",
//                           "type": "listItem",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "4cbbac8f",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "\n      Israel's military has alsoadvanced into the heart of Khan Younisin southern Gaza, which had been sheltering hundreds of thousands who fled the fighting in the north\n    ",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "b6d52554",
//                     "type": "unorderedList",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "2fb06dee",
//                           "type": "listItem",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "13fc3bcf",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "\n      No aidhas reached the north since the humanitarian truce ended at the start of December\n    ",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         },
//                         {
//                           "id": "b8e3ab42",
//                           "type": "listItem",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "ea102f59",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "\n      UN chief Antonio Guterres yesterday warned that thehumanitarian system in Gaza may collapse and public order could completely break down\n    ",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "70568e0e",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   },
//                   {
//                     "id": "f5a15008",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "More information here.",
//                       "blocks": [
//                         {
//                           "id": "e4c83804",
//                           "type": "urlLink",
//                           "model": {
//                             "text": "More information here.",
//                             "locator": "https://www.bbc.com/pidgin",
//                             "blocks": [
//                               {
//                                 "id": "c6d613b2",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "More information here.",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "189f1b93",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   },
//                   {
//                     "id": "8426af93",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "",
//                       "blocks": []
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:b859b861-ff51-44be-9e66-5832697f5b7d",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": true
//             },
//             "dates": {
//               "firstPublished": "2023-06-20T08:40:34+00:00",
//               "lastPublished": "2023-12-07T16:42:20+00:00",
//               "time": null,
//               "curated": "2023-06-20T08:40:45.292Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "ee98df43",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "62f8f04c",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "e757d68e",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Calls for war crime investigation over Lebanon border strikes",
//                                   "blocks": [
//                                     {
//                                       "id": "2157a586",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Calls for war crime investigation over Lebanon border strikes",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "c5131497",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "10058ae8",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "9a53b629",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "New sub headline",
//                                   "blocks": [
//                                     {
//                                       "id": "a9ea1d43",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "New sub headline",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "50bc560c",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "Read more about the border area known as the Blue Line, the unofficial frontier between Lebanon and Israel here.  Article share tools",
//                       "blocks": [
//                         {
//                           "id": "608df11b",
//                           "type": "urlLink",
//                           "model": {
//                             "text": "Read more about the border area known as the Blue Line, the unofficial frontier between Lebanon and Israel here.  Article share tools",
//                             "locator": "https://www.bbc.com/news",
//                             "blocks": [
//                               {
//                                 "id": "e3a2dcff",
//                                 "type": "fragment",
//                                 "model": {
//                                   "text": "Read more about the border area known as the Blue Line, the unofficial frontier between Lebanon and Israel here.  Article share tools",
//                                   "attributes": []
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "bbcd7ea1",
//                     "type": "image",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "1ede5379",
//                           "type": "rawImage",
//                           "model": {
//                             "height": 402,
//                             "width": 624,
//                             "locator": "vivo/test/images/2023/12/7/d6265892-6e84-496c-9d93-735c9ef8d8aa.jpg",
//                             "originCode": "cpsdevpb",
//                             "copyrightHolder": "Getty Images"
//                           }
//                         },
//                         {
//                           "id": "e7cfff77",
//                           "type": "altText",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "02775107",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "20e13b05",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "Smoke rises from the ruins of structures in Jabalia refugee camp in northern Gaza",
//                                         "blocks": [
//                                           {
//                                             "id": "2efecb99",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "Smoke rises from the ruins of structures in Jabalia refugee camp in northern Gaza",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         },
//                         {
//                           "id": "6c89c19f",
//                           "type": "caption",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "1f36ad07",
//                                 "type": "text",
//                                 "model": {
//                                   "blocks": [
//                                     {
//                                       "id": "d4a2edcb",
//                                       "type": "paragraph",
//                                       "model": {
//                                         "text": "Israel's attacks on Jabalia refugee camp in northern Gaza have left dozens of structures in ruins.",
//                                         "blocks": [
//                                           {
//                                             "id": "fab13af2",
//                                             "type": "fragment",
//                                             "model": {
//                                               "text": "Israel's attacks on Jabalia refugee camp in northern Gaza have left dozens of structures in ruins.",
//                                               "attributes": []
//                                             }
//                                           }
//                                         ]
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:4326df67-94f6-43a2-a3fb-fad2e2312d25",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-04-17T14:41:07+00:00",
//               "lastPublished": "2023-12-08T13:36:28+00:00",
//               "time": null,
//               "curated": "2023-04-17T14:41:08.385Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": null,
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "20ceb403",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "8576ad02",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "21b045d7",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "No incident set",
//                                   "blocks": [
//                                     {
//                                       "id": "4c03ef88",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "No incident set",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "60ba3f2f",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "00e5c93f",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "a8f36da0",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "This has nothing set",
//                                   "blocks": [
//                                     {
//                                       "id": "94c4f2cd",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "This has nothing set",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "0ac627a2",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "This has no incident type set",
//                       "blocks": [
//                         {
//                           "id": "37f67d29",
//                           "type": "fragment",
//                           "model": {
//                             "text": "This has no incident type set",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:3d0644fb-4d48-42f7-b4c5-26a52c61d311",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-04-05T10:35:01+00:00",
//               "lastPublished": "2023-04-05T10:35:01+00:00",
//               "time": null,
//               "curated": "2023-04-05T10:35:02.317Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": "GET_INVOLVED",
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "89fdd650",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "41f1a21e",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "5c1a27f5",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Get Involved",
//                                   "blocks": [
//                                     {
//                                       "id": "08a41dde",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Get Involved",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "de58646a",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "152241af",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "5a1bd7ee",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "This is get involved",
//                                   "blocks": [
//                                     {
//                                       "id": "4cbeae38",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "This is get involved",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "5dff95aa",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "This is a 'get involved' incident type",
//                       "blocks": [
//                         {
//                           "id": "def2bc24",
//                           "type": "fragment",
//                           "model": {
//                             "text": "This is a 'get involved' incident type",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:b676246f-9a33-4602-a965-35f969561638",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-04-05T10:34:00+00:00",
//               "lastPublished": "2023-04-05T10:34:00+00:00",
//               "time": null,
//               "curated": "2023-04-05T10:34:00.647Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": "QUESTION",
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "2b6e13a5",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "b79fd6bc",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "ddec6dd4",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Question",
//                                   "blocks": [
//                                     {
//                                       "id": "efde3799",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Question",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "ac991462",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "c0d536bf",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "68398ea9",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "This is question",
//                                   "blocks": [
//                                     {
//                                       "id": "162f25fb",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "This is question",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "c63f6f3c",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "This is a 'question' incident type",
//                       "blocks": [
//                         {
//                           "id": "4b397bcd",
//                           "type": "fragment",
//                           "model": {
//                             "text": "This is a 'question' incident type",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:e9646083-27be-45fc-90f3-cf98a4a47df0",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-04-05T10:33:52+00:00",
//               "lastPublished": "2023-04-05T10:33:52+00:00",
//               "time": null,
//               "curated": "2023-04-05T10:33:52.892Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           },
//           {
//             "typeCode": "ANALYSIS",
//             "header": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "56ca39a5",
//                     "type": "headline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "36a79ee5",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "54378703",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "Analysis",
//                                   "blocks": [
//                                     {
//                                       "id": "a6bf6332",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "Analysis",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     "id": "c12efedb",
//                     "type": "subheadline",
//                     "model": {
//                       "blocks": [
//                         {
//                           "id": "b44aa79d",
//                           "type": "text",
//                           "model": {
//                             "blocks": [
//                               {
//                                 "id": "cf425b55",
//                                 "type": "paragraph",
//                                 "model": {
//                                   "text": "This is analysis",
//                                   "blocks": [
//                                     {
//                                       "id": "45be9576",
//                                       "type": "fragment",
//                                       "model": {
//                                         "text": "This is analysis",
//                                         "attributes": []
//                                       }
//                                     }
//                                   ]
//                                 }
//                               }
//                             ]
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "content": {
//               "model": {
//                 "blocks": [
//                   {
//                     "id": "56b53010",
//                     "type": "paragraph",
//                     "model": {
//                       "text": "This is an 'analysis' incident type",
//                       "blocks": [
//                         {
//                           "id": "13f524d8",
//                           "type": "fragment",
//                           "model": {
//                             "text": "This is an 'analysis' incident type",
//                             "attributes": []
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             },
//             "link": null,
//             "urn": "asset:e247894b-7694-4f0f-90b0-0a39fbcfe1d3",
//             "type": "POST",
//             "options": {
//               "isBreakingNews": false
//             },
//             "dates": {
//               "firstPublished": "2023-04-05T10:33:17+00:00",
//               "lastPublished": "2023-04-05T10:33:17+00:00",
//               "time": null,
//               "curated": "2023-04-05T10:33:18.781Z"
//             },
//             "titles": [
//               {
//                 "title": null,
//                 "source": "primary"
//               }
//             ],
//             "descriptions": [
//               {
//                 "text": null,
//                 "source": "summary"
//               }
//             ],
//             "images": [
//               {
//                 "url": null,
//                 "originalUrl": null,
//                 "urlTemplate": null,
//                 "altText": null,
//                 "copyright": null
//               }
//             ]
//           }
//         ],
//         "page": {
//           "index": 1,
//           "total": 1
//         }
//       }
//     }
//   },
//   "metadata": {
//     "type": "live"
//   }
// }

const logger = nodeLogger(__filename);

const getPageData = async ({
  id,
  page,
  service,
  variant,
  rendererEnv,
}: PageDataParams) => {
  const pathname = `${id}${rendererEnv ? `?renderer_env=${rendererEnv}` : ''}`;
  const livePageUrl = constructPageFetchUrl({
    page,
    pageType: 'live',
    pathname,
    service,
    variant,
  });

  const env = getEnvironment(pathname);
  const optHeaders = { 'ctx-service-env': env };

  const agent = certsRequired(pathname) ? await getAgent() : null;

  let pageStatus;
  let pageJson;
  let errorMessage;

  const path = livePageUrl.toString();

  try {
    // @ts-expect-error Due to jsdoc inference, and no TS within fetchPageData
    const { status, json } = await fetchPageData({
      path,
      agent,
      optHeaders,
    });
    pageStatus = status;
    pageJson = json;
  } catch (error: unknown) {
    const { message, status } = error as FetchError;

    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });
    pageStatus = status;
    errorMessage = message;
  }

  const data = pageJson
    ? { pageData: pageJson.data, status: pageStatus }
    : { error: errorMessage, status: pageStatus };

  const toggles = await getToggles(service);

  return { data, toggles };
};

export const getServerSideProps: GetServerSideProps = async context => {
  logResponseTime(
    {
      path: context.resolvedUrl,
    },
    context.res,
    () => null,
  );

  const {
    id,
    service,
    variant,
    // renderer_env: rendererEnv,
    page = '1',
  } = context.query as PageDataParams;

  const { headers: reqHeaders } = context.req;

  if (!isValidPageNumber(page)) {
    context.res.statusCode = 404;
    return {
      props: {
        bbcOrigin: reqHeaders['bbc-origin'] || null,
        isNextJs: true,
        service,
        status: 404,
        timeOnServer: Date.now(),
        variant: variant?.[0] || null,
        ...extractHeaders(reqHeaders),
      },
    };
  }

  logger.debug(SERVER_SIDE_RENDER_REQUEST_RECEIVED, {
    url: context.resolvedUrl,
    headers: omit(
      (process.env.SENSITIVE_HTTP_HEADERS || '').split(','),
      reqHeaders,
    ),
    pageType: LIVE_PAGE,
  });

  const { data, toggles } = await getPageData({
    id,
    page,
    service,
    variant,
    rendererEnv: 'test', // TODO: remove hardcoding
  });

  let routingInfoLogger = logger.debug;
  if (data.status !== OK) {
    routingInfoLogger = logger.error;
  }

  routingInfoLogger(ROUTING_INFORMATION, {
    url: context.resolvedUrl,
    status: data.status,
    pageType: LIVE_PAGE,
  });

  context.res.statusCode = data.status;
  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      error: data?.error || null,
      id,
      isAmp: false,
      isNextJs: true,
      page: page || null,
      pageData,
      pageType: LIVE_PAGE,
      pathname: context.resolvedUrl,
      service,
      showAdsBasedOnLocation: reqHeaders['bbc-adverts'] === 'true' || false,
      status: data.status,
      timeOnServer: Date.now(), // TODO: check if needed?
      toggles,
      variant: variant?.[0] || null,
      ...extractHeaders(reqHeaders),
    },
  };
};

export default LivePageLayout;
