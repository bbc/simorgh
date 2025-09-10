import React from 'react';
// import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
// import ATIAnalytics from '#app/components/ATIAnalytics';
// import MetadataContainer from '#app/components/Metadata';
// import Head from 'next/head';
// import { STATIC_PAGE } from '#app/routes/utils/pageTypes';

// const morphCSS1 = `@charset "CP850";@font-face {font-family: ReithSans; font-weight: 400; font-style: normal;src: url(https://static.files.bbci.co.uk/fonts/reith/r2.512/BBCReithSans_W_Rg.woff2) format("woff2"),url(https://static.files.bbci.co.uk/fonts/reith/r2.512/BBCReithSans_W_Rg.woff) format("woff");font-display: optional;}@font-face {font-family: ReithSans; font-weight: 700; font-style: normal;src: url(https://static.files.bbci.co.uk/fonts/reith/r2.512/BBCReithSans_W_Bd.woff2) format("woff2"),url(https://static.files.bbci.co.uk/fonts/reith/r2.512/BBCReithSans_W_Bd.woff) format("woff");font-display: optional;}@font-face {font-family: ReithSerif; font-weight: 700; font-style: normal;src: url(https://static.files.bbci.co.uk/fonts/reith/r2.512/BBCReithSerif_W_Bd.woff2) format("woff2"),url(https://static.files.bbci.co.uk/fonts/reith/r2.512/BBCReithSerif_W_Bd.woff) format("woff");font-display: optional;}@font-face{font-family:NassimArabic;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/bold.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimArabic;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/normal.ttf) format("ttf");font-display:optional}@font-face{font-family:Padauk;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/bold.ttf) format("ttf");font-display:swap}@font-face{font-family:Padauk;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/normal.ttf) format("ttf");font-display:swap}@font-face{font-family:ShonarBangla;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/bold.ttf) format("ttf");font-display:optional}@font-face{font-family:ShonarBangla;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/normal.ttf) format("ttf");font-display:optional}@font-face{font-family:IskoolaPota;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/bold.ttf) format("ttf");font-display:swap}@font-face{font-family:IskoolaPota;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/normal.ttf) format("ttf");font-display:swap}sett{font-family:"SETTdeco Family"!important}@font-face{font-family:Latha;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/bold.ttf) format("ttf");font-display:swap}@font-face{font-family:Latha;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/normal.ttf) format("ttf");font-display:swap}@font-face{font-family:NassimUrdu;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/bold.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimUrdu;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/normal.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimPersian;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/bold.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimPersian;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/normal.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimPashto;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/bold.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimPashto;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/normal.ttf) format("ttf");font-display:optional}.arabic_font{font-family:NassimArabic!important;font-size:18px!important}.arabic_font a{font-family:NassimArabic;font-size:18px}.pashto_font{font-family:NassimPashto!important;font-size:18px!important}.pashto_font a{font-family:NassimPashto;font-size:18px}.persian_font{font-family:NassimPersian!important;font-size:18px!important}.persian_font a{font-family:NassimPersian;font-size:18px}.urdu_font{font-family:NassimUrdu!important;font-size:18px!important}.urdu_font a{font-family:NassimUrdu;font-size:18px}#english_version:after,#localised_version:after{clear:both;content:"";display:block;height:0;overflow:hidden}#localised_version #chinese a,.chinese_font{font-family:Helvetica,Arial,STHeiti,"华文黑体","Microsoft YaHei","微软雅黑",SimSun,"宋体","WenQuanYi Micro Hei",sans-serif!important}.bengali_font{font-family:ShonarBangla!important;font-size:16px!important;line-height:22px}#localised_version #tamil{font-family:Latha,Helvetica,Arial,Verdana,sans-serif}#localised_version #tamil a{font-family:Latha,Helvetica,Arial,Verdana,sans-serif;font-size:14px;font-weight:700;line-height:20px}#localised_version #sinhala{font-family:IskoolaPota,Arial,Verdana,sans-serif}#localised_version #sinhala a{font-family:IskoolaPota,Arial,Verdana,sans-serif;font-size:20px;font-weight:700}#localised_version #nepali{font-family:Arial,Verdana,sans-serif}#localised_version #nepali a{font-family:Arial,Verdana,sans-serif;font-size:15px}#localised_version #bengali{font-family:ShonarBangla,Arial,Verdana,sans-serif}#localised_version #bengali a{font-family:ShonarBangla,Arial,Verdana,sans-serif;font-size:18px}#localised_version #hindi{font-family:Arial,Verdana,sans-serif}#localised_version #hindi a{font-family:Arial,Verdana,sans-serif}#localised_version #burmese{font-family:Padauk}#localised_version #burmese a{font-family:Padauk}#localised_version #thai{font-family:Tahoma,Helmet,Freesans,Helvetica,Arial,sans-serif}#localised_version #thai a{font-family:Tahoma,Helmet,Freesans,Helvetica,Arial,sans-serif;font-size:20px}#localised_version #chinese a{font-size:15px}#localised_version .menu_item #burmese a{font-size:17px}`;

// const morphCSS2 = `body{color:#404040;font-family:ReithSans,Arial,Helvetica,sans-serif}ol,ul{list-style:none}a:link{-webkit-tap-highlight-color:rgba(17,103,168,.3)}#core-navigation{display:none}.column-clearfix::after,.column-clearfix::before{content:"";display:block;height:0;overflow:hidden}.column-clearfix::after,.column-clearfix::before{clear:both}.units-list .unit+.unit{padding-top:9px}.units-list--separators .unit+.unit{padding-top:8px;border-top:1px solid #dcdcdc}.units-list--columning .unit+.unit{padding-top:0}.units-list .unit+.unit{padding-top:17px}#page{position:relative;z-index:10;background:#fff}.c-open{font-size:14px;padding-left:0;margin:0 auto;box-sizing:border-box;-webkit-box-sizing:border-box;-moz-box-sizing:border-box}.container{padding-bottom:42px}.container ul{margin:0;padding:0}.story-body__h1{font-family:ReithSerif,Arial,Helvetica,sans-serif;font-size:1.5rem;line-height:1.125;color:#1e1e1e;font-weight:700;margin:0;}.column--primary{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding-right:16px;padding-top:12px}.group__title{font-family:ReithSerif,Arial,Helvetica,sans-serif;font-size:24px;font-size:1.5rem;line-height:1;text-rendering:optimizeLegibility;letter-spacing:-.0425em;font-weight:700;margin-bottom:.5em}.group-title-component{margin-top:40px}.unit{clear:both;margin-bottom:8px}.container{padding-left:8px;padding-right:8px}.hide{display:none}.atlas-languages-page a{text-decoration:none;color:inherit}.atlas-languages-page a:focus,.atlas-languages-page a:hover{color:#1167a8}.language-switcher{padding:8px 0; margin:0;}@media (max-width:600px){.group-title-component{float:none}.group-title-component:nth-child(2){clear:both}}@media (min-width:480px){.container{padding-left:16px;padding-right:16px}.unit{margin-bottom:16px}}@media (min-width:600px){.group-title-component{float:left;width:50%}.group-title-component:nth-child(3),.group-title-component:nth-child(5),.group-title-component:nth-child(7){clear:both}.story-body__h1{font-size:2.25rem}.column--primary{padding-top:24px}}@media (min-width:976px){.container{margin:0 auto;max-width:1008px}.group-title-component{float:left;width:25%}.group-title-component:nth-child(3),.group-title-component:nth-child(5),.group-title-component:nth-child(7){clear:none}.story-body__h1{font-size:2rem}.column--primary{padding-top:20px;float:left;width:976px}}@media (min-width:1280px){.container{margin:0 auto;max-width:63.4rem; padding:0}}`;

// const languageToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
//   e.stopPropagation();
//   const elements = document.querySelectorAll('.panel, .toggle');
//   for (let i = 0; i < elements.length; i += 1) {
//     const classNames = elements[i].className.split(' ');
//     const indexOfHide = classNames.indexOf('hide');
//     if (indexOfHide !== -1) {
//       classNames.splice(indexOfHide, 1);
//     } else {
//       classNames.push('hide');
//     }
//     elements[i].className = classNames.join(' ');
//   }
// };

// const pageTitle = 'BBC Live TV';
// const pageDescription = 'Live TV from the BBC';
// const lang = 'en';

// const atiAnalytics = {
//   campaigns: null,
//   categoryName: null,
//   contentType: STATIC_PAGE,
//   language: lang,
//   ldpThingIds: null,
//   ldpThingLabels: null,
//   pageIdentifier: 'Live.TV.page',
//   pageTitle,
//   producerId: null,
//   producerName: 'DEFAULT',
// };

export default function LiveTvLayout() {
  return (
    <>
      {/* <ATIAnalytics atiData={atiAnalytics} />
      <ChartbeatAnalytics title={pageTitle} />
      <MetadataContainer
        title={pageTitle}
        lang={lang}
        description={pageDescription}
        openGraphType="website"
        hasAmpPage={false}
      /> */}
      <main>
        {/* <div id="page" className="atlas-languages-page">
          <div className="container c-open" role="main">
            <div className="column-clearfix">
              <div className="column--primary"> */}
        <h1 className="story-body__h1" id="content">
          HELLO
        </h1>
      </main>
    </>
  );
}
