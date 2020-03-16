# Routes to Page Mappings

[Regexes](regex/utils/index.js) for all Simorgh Routes

| Route | Mapping |
| ----- | ----------- |
[article](article/index.js) | Routes matching the Optimo article regex will route to the [Article](../pages/Article/index.jsx) component |
[cpsAsset](cpsAsset/index.js) | Routes matching the CPS asset regex will route to the [MediaAssetPage](../pages/MediaAssetPage/index.jsx) component, if the page type is `MAP` |
| | Routes matching the CPS asset regex will route to the [StoryPage](../pages/Story/index.jsx) component, if the page type is `STY` |
| | Routes matching the CPS asset regex will route to the [PhotoGalleryPage](../pages/PhotoGallery/index.jsx) component, if the page type is `PGL` |
 [error200](error200/index.js) | Routes matching the error regex will route to the [Error](../pages/Error/index.jsx) component |
 [error404](error404/index.js)  | Routes matching the error regex will route to the [Error](../pages/Error/index.jsx) component |
 [home](home/index.js) | Routes matching the home page regex will route to the [FrontPage](../pages/FrontPage/index.jsx) component |
[legacyCpsAsset](legacyCpsAsset/index.js) | Routes matching the Legacy TC2 (CPS) asset regex will route to the [MediaAssetPage](../pages/MediaAssetPage/index.jsx) component, if the page type is `MAP` |
| | Routes matching the Legacy TC2 (CPS) asset regex will route to the [StoryPage](../pages/Story/index.jsx) component, if the page type is `STY` |
| | Routes matching the Legacy TC2 (CPS) asset regex will route to the [PhotoGalleryPage](../pages/PhotoGallery/index.jsx) component, if the page type is `PGL` |
[radio](radio/index.js) | Routes matching the live radio regex will route to the [RadioPage](../pages/RadioPage/index.jsx) component |
