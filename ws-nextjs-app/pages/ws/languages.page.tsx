import Head from 'next/head';
import * as React from 'react';
import { GetServerSideProps } from 'next';
import { STATIC_PAGE } from '#app/routes/utils/pageTypes';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import ATIAnalytics from '#app/components/ATIAnalytics';
import MetadataContainer from '#app/components/Metadata';

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  return {
    props: {
      error: null,
      isAmp: false,
      isNextJs: true,
      page: null,
      pageData: {
        metadata: {
          type: STATIC_PAGE,
        },
      },
      pageType: STATIC_PAGE,
      pathname: context.resolvedUrl,
      service: 'ws',
      status: 200,
      timeOnServer: Date.now(), // TODO: check if needed?
    },
  };
};

const morphCSS1 = `@charset "CP850";@font-face{font-family:ReithSans;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/ReithSans/latest/normal.woff2) format('woff2'),url(https://ws-downloads.files.bbci.co.uk/fonts/ReithSans/latest/normal.woff) format('woff');font-display:optional}@font-face{font-family:ReithSans;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/ReithSans/latest/bold.woff2) format('woff2'),url(https://ws-downloads.files.bbci.co.uk/fonts/ReithSans/latest/bold.woff) format('woff');font-display:optional}@font-face{font-family:ReithSerif;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/ReithSerif/latest/medium.woff2) format('woff2'),url(https://ws-downloads.files.bbci.co.uk/fonts/ReithSerif/latest/medium.woff) format('woff');font-display:optional}@font-face{font-family:NassimArabic;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/bold.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimArabic;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/normal.ttf) format("ttf");font-display:optional}@font-face{font-family:Padauk;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/bold.ttf) format("ttf");font-display:swap}@font-face{font-family:Padauk;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/normal.ttf) format("ttf");font-display:swap}@font-face{font-family:ShonarBangla;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/bold.ttf) format("ttf");font-display:optional}@font-face{font-family:ShonarBangla;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/normal.ttf) format("ttf");font-display:optional}@font-face{font-family:IskoolaPota;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/bold.ttf) format("ttf");font-display:swap}@font-face{font-family:IskoolaPota;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/normal.ttf) format("ttf");font-display:swap}sett{font-family:"SETTdeco Family"!important}@font-face{font-family:Latha;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/bold.ttf) format("ttf");font-display:swap}@font-face{font-family:Latha;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/normal.ttf) format("ttf");font-display:swap}@font-face{font-family:NassimUrdu;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/bold.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimUrdu;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/normal.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimPersian;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/bold.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimPersian;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/normal.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimPashto;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/bold.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimPashto;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/normal.ttf) format("ttf");font-display:optional}.arabic_font{font-family:NassimArabic!important;font-size:18px!important}.arabic_font a{font-family:NassimArabic;font-size:18px}.pashto_font{font-family:NassimPashto!important;font-size:18px!important}.pashto_font a{font-family:NassimPashto;font-size:18px}.persian_font{font-family:NassimPersian!important;font-size:18px!important}.persian_font a{font-family:NassimPersian;font-size:18px}.urdu_font{font-family:NassimUrdu!important;font-size:18px!important}.urdu_font a{font-family:NassimUrdu;font-size:18px}#english_version:after,#localised_version:after{clear:both;content:"";display:block;height:0;overflow:hidden}#localised_version #chinese a,.chinese_font{font-family:Helvetica,Arial,STHeiti,"华文黑体","Microsoft YaHei","微软雅黑",SimSun,"宋体","WenQuanYi Micro Hei",sans-serif!important}.bengali_font{font-family:ShonarBangla!important;font-size:16px!important;line-height:22px}#localised_version #tamil{font-family:Latha,Helvetica,Arial,Verdana,sans-serif}#localised_version #tamil a{font-family:Latha,Helvetica,Arial,Verdana,sans-serif;font-size:14px;font-weight:700;line-height:20px}#localised_version #sinhala{font-family:IskoolaPota,Arial,Verdana,sans-serif}#localised_version #sinhala a{font-family:IskoolaPota,Arial,Verdana,sans-serif;font-size:20px;font-weight:700}#localised_version #nepali{font-family:Arial,Verdana,sans-serif}#localised_version #nepali a{font-family:Arial,Verdana,sans-serif;font-size:15px}#localised_version #bengali{font-family:ShonarBangla,Arial,Verdana,sans-serif}#localised_version #bengali a{font-family:ShonarBangla,Arial,Verdana,sans-serif;font-size:18px}#localised_version #hindi{font-family:Arial,Verdana,sans-serif}#localised_version #hindi a{font-family:Arial,Verdana,sans-serif}#localised_version #burmese{font-family:Padauk}#localised_version #burmese a{font-family:Padauk}#localised_version #thai{font-family:Tahoma,Helmet,Freesans,Helvetica,Arial,sans-serif}#localised_version #thai a{font-family:Tahoma,Helmet,Freesans,Helvetica,Arial,sans-serif;font-size:20px}#localised_version #chinese a{font-size:15px}#localised_version .menu_item #burmese a{font-size:17px}`;

const morphCSS2 = `body{color:#404040;font-family:ReithSans,Arial,Helvetica,sans-serif}ol,ul{list-style:none}a:link{-webkit-tap-highlight-color:rgba(17,103,168,.3)}#core-navigation{display:none}.column-clearfix::after,.column-clearfix::before{content:"";display:block;height:0;overflow:hidden}.column-clearfix::after,.column-clearfix::before{clear:both}.units-list .unit+.unit{padding-top:9px}.units-list--separators .unit+.unit{padding-top:8px;border-top:1px solid #dcdcdc}.units-list--columning .unit+.unit{padding-top:0}.units-list .unit+.unit{padding-top:17px}#page{position:relative;z-index:10;background:#fff}.c-open{font-size:14px;padding-left:0;margin:0 auto;box-sizing:border-box;-webkit-box-sizing:border-box;-moz-box-sizing:border-box}.container{padding-bottom:42px}.container ul{margin:0;padding:0}.story-body__h1{font-family:ReithSerif,Arial,Helvetica,sans-serif;font-size:1.5rem;line-height:1.125;color:#1e1e1e;font-weight:700;margin:0;}.column--primary{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding-right:16px;padding-top:12px}.group__title{font-family:ReithSerif,Arial,Helvetica,sans-serif;font-size:24px;font-size:1.5rem;line-height:1;text-rendering:optimizeLegibility;letter-spacing:-.0425em;font-weight:700;margin-bottom:.5em}.group-title-component{margin-top:40px}.unit{clear:both;margin-bottom:8px}.container{padding-left:8px;padding-right:8px}.hide{display:none}.atlas-languages-page a{text-decoration:none;color:inherit}.atlas-languages-page a:focus,.atlas-languages-page a:hover{color:#1167a8}.language-switcher{padding:8px 0; margin:0;}@media (max-width:600px){.group-title-component{float:none}.group-title-component:nth-child(2){clear:both}}@media (min-width:480px){.container{padding-left:16px;padding-right:16px}.unit{margin-bottom:16px}}@media (min-width:600px){.group-title-component{float:left;width:50%}.group-title-component:nth-child(3),.group-title-component:nth-child(5),.group-title-component:nth-child(7){clear:both}.story-body__h1{font-size:2.25rem}.column--primary{padding-top:24px}}@media (min-width:976px){.container{margin:0 auto;max-width:1008px}.group-title-component{float:left;width:25%}.group-title-component:nth-child(3),.group-title-component:nth-child(5),.group-title-component:nth-child(7){clear:none}.story-body__h1{font-size:2rem}.column--primary{padding-top:20px;float:left;width:976px}}@media (min-width:1280px){.container{margin:0 auto;max-width:63.4rem; padding:0}}`;

const languageToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation();
  const elements = document.querySelectorAll('.panel, .toggle');
  for (let i = 0; i < elements.length; i += 1) {
    const classNames = elements[i].className.split(' ');
    const indexOfHide = classNames.indexOf('hide');
    if (indexOfHide !== -1) {
      classNames.splice(indexOfHide, 1);
    } else {
      classNames.push('hide');
    }
    elements[i].className = classNames.join(' ');
  }
};

const pageTitle = 'News in your language - BBC World Service';
const pageDescription = 'A list of BBC World Service language services';
const lang = 'en';

const atiAnalytics = {
  campaigns: null,
  categoryName: null,
  contentType: STATIC_PAGE,
  language: lang,
  ldpThingIds: null,
  ldpThingLabels: null,
  pageIdentifier: 'ws.languages.page',
  pageTitle,
  producerId: null,
  producerName: 'DEFAULT',
};

const pageLayout = () => {
  return (
    <>
      <ATIAnalytics atiData={atiAnalytics} />
      <ChartbeatAnalytics title={pageTitle} />
      <MetadataContainer
        title={pageTitle}
        lang={lang}
        description={pageDescription}
        openGraphType="website"
        hasAmpPage={false}
      />
      <Head>
        <style>{morphCSS1}</style>
        <style>{morphCSS2}</style>
      </Head>
      <main>
        <div id="page" className="atlas-languages-page">
          <div className="container c-open" role="main">
            <div className="column-clearfix">
              <div className="column--primary">
                <h1 className="story-body__h1">
                  Get the news in your language
                </h1>
                <p className="language-switcher">
                  <button
                    className="switcher"
                    id="switcher"
                    onClick={languageToggle}
                    type="button"
                  >
                    <span className="toggle">Switch list to English</span>
                    <span className="toggle hide">
                      Switch list to localised scripts
                    </span>
                  </button>
                </p>
                <div id="localised_version" className="panel">
                  <div className="group-title-component">
                    <h2 className="group__title">Africa</h2>
                    <ul className="units-list">
                      <li id="afaanoromoo" className="unit">
                        <a href="https://www.bbc.com/afaanoromoo">
                          Oduu Afaan Oromootiin
                        </a>
                      </li>
                      <li id="amharic" className="unit">
                        <a href="https://www.bbc.com/amharic">ዜና በአማርኛ</a>
                      </li>
                      <li id="afrique" className="unit">
                        <a href="https://www.bbc.com/afrique">
                          L&#39;actualité en Français
                        </a>
                      </li>
                      <li id="hausa" className="unit">
                        <a href="https://www.bbc.com/hausa">Labarai da Hausa</a>
                      </li>
                      <li id="igbo" className="unit">
                        <a href="https://www.bbc.com/igbo">Akụkọ n’Igbo</a>
                      </li>
                      <li id="kirundi" className="unit">
                        <a href="https://www.bbc.com/gahuza">
                          Amakuru mu Kinyarwanda/ Kirundi
                        </a>
                      </li>
                      <li id="pidgin" className="unit">
                        <a href="https://www.bbc.com/pidgin">News in Pidgin</a>
                      </li>
                      <li id="somali" className="unit">
                        <a href="https://www.bbc.com/somali">
                          War Af Soomaali ah
                        </a>
                      </li>
                      <li id="swahili" className="unit">
                        <a href="https://www.bbc.com/swahili">
                          Habari kwa Kiswahili
                        </a>
                      </li>
                      <li id="tigrinya" className="unit">
                        <a href="https://www.bbc.com/tigrinya">ዜና ብትግርኛ</a>
                      </li>
                      <li id="yoruba" className="unit">
                        <a href="https://www.bbc.com/yoruba">
                          Ìròyìn ní Yorùbá
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="group-title-component">
                    <h2 className="group__title">Asia (Central)</h2>
                    <ul className="units-list">
                      <li id="kyrgyz" className="unit">
                        <a href="https://www.bbc.com/kyrgyz">
                          Кыргыз тилиндеги жаңылыктар
                        </a>
                      </li>
                      <li id="uzbek" className="unit">
                        <a href="https://www.bbc.com/uzbek">
                          Ўзбек тилидаги янгиликлар
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="group-title-component">
                    <h2 className="group__title">Asia (Pacific)</h2>
                    <ul className="units-list">
                      <li id="burmese" className="unit">
                        <a href="https://www.bbc.com/burmese">
                          မြန်မာသတင်းများ
                        </a>
                      </li>
                      <li id="chinese" className="unit">
                        <a href="https://www.bbc.com/zhongwen/simp">中文新闻</a>
                      </li>
                      <li id="indonesia" className="unit">
                        <a href="https://www.bbc.com/indonesia">
                          Berita Indonesia
                        </a>
                      </li>
                      <li id="japanese" className="unit">
                        <a href="https://www.bbc.com/japanese">
                          日本語ニュース
                        </a>
                      </li>
                      <li id="korean" className="unit">
                        <a href="https://www.bbc.com/korean">한국어</a>
                      </li>
                      <li id="thai" className="unit">
                        <a href="https://www.bbc.com/thai">ข่าวภาษาไทย</a>
                      </li>
                      <li id="vietnamese" className="unit">
                        <a href="https://www.bbc.com/vietnamese">
                          Tin Tiếng Việt
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="group-title-component">
                    <h2 className="group__title">Asia (South)</h2>
                    <ul className="units-list">
                      <li id="bengali" className="unit">
                        <a href="https://www.bbc.com/bengali">বাংলা খবর</a>
                      </li>
                      <li id="gujarati" className="unit">
                        <a href="https://www.bbc.com/gujarati">
                          ગુજરાતીમાં સમાચાર
                        </a>
                      </li>
                      <li id="hindi" className="unit">
                        <a href="https://www.bbc.com/hindi">हिन्दी समाचार</a>
                      </li>
                      <li id="marathi" className="unit">
                        <a href="https://www.bbc.com/marathi">मराठीत बातम्या</a>
                      </li>
                      <li id="nepali" className="unit">
                        <a href="https://www.bbc.com/nepali">नेपाली समाचार</a>
                      </li>
                      <li id="pashto" className="unit pashto_font">
                        <a href="https://www.bbc.com/pashto">
                          پښتو نړیوال خپرونه
                        </a>
                      </li>
                      <li id="punjabi" className="unit">
                        <a href="https://www.bbc.com/punjabi">ਪੰਜਾਬੀ ਖ਼ਬਰਾਂ</a>
                      </li>
                      <li id="sinhala" className="unit">
                        <a href="https://www.bbc.com/sinhala">සිංහල පුවත්</a>
                      </li>
                      <li id="tamil" className="unit">
                        <a href="https://www.bbc.com/tamil">
                          தமிழில் செய்திகள்
                        </a>
                      </li>
                      <li id="telugu" className="unit">
                        <a href="https://www.bbc.com/telugu">తెలుగు వార్తలు</a>
                      </li>
                      <li id="urdu" className="urdu_font unit">
                        <a href="https://www.bbc.com/urdu">اردو میں خبریں</a>
                      </li>
                    </ul>
                  </div>
                  <div className="group-title-component">
                    <h2 className="group__title">Europe</h2>
                    <ul className="units-list">
                      <li id="azeri" className="unit">
                        <a href="https://www.bbc.com/azeri">
                          Azərbaycanca xəbərlər
                        </a>
                      </li>
                      <li id="english" className="unit">
                        <a href="https://www.bbc.co.uk/news">News in English</a>
                      </li>
                      <li id="gaelic" className="unit">
                        <a href="https://www.bbc.co.uk/naidheachdan">
                          Naidheachdan
                        </a>
                      </li>
                      <li id="russian" className="unit">
                        <a href="https://www.bbc.com/russian">
                          Новости на русском языке
                        </a>
                      </li>
                      <li id="serbian" className="unit">
                        <a href="https://www.bbc.com/serbian">
                          BBC News na srpskom
                        </a>
                      </li>
                      <li id="turkish" className="unit">
                        <a href="https://www.bbc.com/turkce">Türkçe Haberler</a>
                      </li>
                      <li id="ukrainian" className="unit">
                        <a href="https://www.bbc.com/ukrainian">
                          Новини українською мовою
                        </a>
                      </li>
                      <li id="cymrufyw" className="unit">
                        <a href="https://www.bbc.co.uk/cymrufyw">Newyddion</a>
                      </li>
                    </ul>
                  </div>
                  <div className="group-title-component">
                    <h2 className="group__title">Latin America</h2>
                    <ul className="units-list">
                      <li id="brasil" className="unit">
                        <a href="https://www.bbc.com/portuguese">
                          Notícias em Português
                        </a>
                      </li>
                      <li id="mundo" className="unit">
                        <a href="https://www.bbc.com/mundo">
                          Noticias para hispanoparlantes
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="group-title-component">
                    <h2 className="group__title">Middle East</h2>
                    <ul className="units-list">
                      <li id="arabic" className="arabic_font unit">
                        <a href="http://www.bbc.com/arabic">
                          أخبار باللغة العربية
                        </a>
                      </li>
                      <li id="persian" className="persian_font unit">
                        <a href="http://www.bbc.com/persian">خبرها به فارسی</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div id="english_version" className="panel hide">
                  <div className="group-title-component">
                    <h2 className="group__title">Africa</h2>
                    <ul className="units-list">
                      <li id="afaanoromoo" className="unit">
                        <a href="https://www.bbc.com/afaanoromoo">
                          Afaan Oromoo
                        </a>
                      </li>
                      <li id="amharic" className="unit">
                        <a href="https://www.bbc.com/amharic">Amharic</a>
                      </li>
                      <li id="afrique" className="unit">
                        <a href="https://www.bbc.com/afrique">French</a>
                      </li>
                      <li id="hausa" className="unit">
                        <a href="https://www.bbc.com/hausa">Hausa</a>
                      </li>
                      <li id="igbo" className="unit">
                        <a href="https://www.bbc.com/igbo">Igbo</a>
                      </li>
                      <li id="kirundi" className="unit">
                        <a href="https://www.bbc.com/gahuza">Kirundi</a>
                      </li>
                      <li id="pidgin" className="unit">
                        <a href="https://www.bbc.com/pidgin">Pidgin</a>
                      </li>
                      <li id="somali" className="unit">
                        <a href="https://www.bbc.com/somali">Somali</a>
                      </li>
                      <li id="swahili" className="unit">
                        <a href="https://www.bbc.com/swahili">Swahili</a>
                      </li>
                      <li id="tigrinya" className="unit">
                        <a href="https://www.bbc.com/tigrinya">Tigrinya</a>
                      </li>
                      <li id="yoruba" className="unit">
                        <a href="https://www.bbc.com/yoruba">Yoruba</a>
                      </li>
                    </ul>
                  </div>
                  <div className="group-title-component">
                    <h2 className="group__title">Asia (Central)</h2>
                    <ul className="units-list">
                      <li id="kyrgyz" className="unit">
                        <a href="https://www.bbc.com/kyrgyz">Kyrgyz</a>
                      </li>
                      <li id="uzbek" className="unit">
                        <a href="https://www.bbc.com/uzbek">Uzbek</a>
                      </li>
                    </ul>
                  </div>
                  <div className="group-title-component">
                    <h2 className="group__title">Asia (Pacific)</h2>
                    <ul className="units-list">
                      <li id="burmese" className="unit">
                        <a href="https://www.bbc.com/burmese">Burmese</a>
                      </li>
                      <li id="chinese" className="unit">
                        <a href="https://www.bbc.com/zhongwen/simp">Chinese</a>
                      </li>
                      <li id="indonesia" className="unit">
                        <a href="https://www.bbc.com/indonesia">Indonesian</a>
                      </li>
                      <li id="japanese" className="unit">
                        <a href="https://www.bbc.com/japanese">Japanese</a>
                      </li>
                      <li id="korean" className="unit">
                        <a href="https://www.bbc.com/korean">Korean</a>
                      </li>
                      <li id="thai" className="unit">
                        <a href="https://www.bbc.com/thai">Thai</a>
                      </li>
                      <li id="vietnamese" className="unit">
                        <a href="https://www.bbc.com/vietnamese">Vietnamese</a>
                      </li>
                    </ul>
                  </div>
                  <div className="group-title-component">
                    <h2 className="group__title">Asia (South)</h2>
                    <ul className="units-list">
                      <li id="bengali" className="unit">
                        <a href="https://www.bbc.com/bengali">Bengali</a>
                      </li>
                      <li id="gujarati" className="unit">
                        <a href="https://www.bbc.com/gujarati">Gujarati</a>
                      </li>
                      <li id="hindi" className="unit">
                        <a href="https://www.bbc.com/hindi">Hindi</a>
                      </li>
                      <li id="marathi" className="unit">
                        <a href="https://www.bbc.com/marathi">Marathi</a>
                      </li>
                      <li id="nepali" className="unit">
                        <a href="https://www.bbc.com/nepali">Nepali</a>
                      </li>
                      <li id="pashto" className="unit">
                        <a href="https://www.bbc.com/pashto">Pashto</a>
                      </li>
                      <li id="punjabi" className="unit">
                        <a href="https://www.bbc.com/punjabi">Punjabiਂ</a>
                      </li>
                      <li id="sinhala" className="unit">
                        <a href="https://www.bbc.com/sinhala">Sinhala</a>
                      </li>
                      <li id="tamil" className="unit">
                        <a href="https://www.bbc.com/tamil">Tamil</a>
                      </li>
                      <li id="telugu" className="unit">
                        <a href="https://www.bbc.com/telugu">Telugu</a>
                      </li>
                      <li id="urdu" className="unit">
                        <a href="https://www.bbc.com/urdu">Urdu</a>
                      </li>
                    </ul>
                  </div>
                  <div className="group-title-component">
                    <h2 className="group__title">Europe</h2>
                    <ul className="units-list">
                      <li id="azeri" className="unit">
                        <a href="https://www.bbc.com/azeri">Azeri</a>
                      </li>
                      <li id="english" className="unit">
                        <a href="https://www.bbc.co.uk/news">English</a>
                      </li>
                      <li id="gaelic" className="unit">
                        <a href="https://www.bbc.co.uk/naidheachdan">Gaelic</a>
                      </li>
                      <li id="russian" className="unit">
                        <a href="https://www.bbc.com/russian">Russian</a>
                      </li>
                      <li id="serbian" className="unit">
                        <a href="https://www.bbc.com/serbian">Serbian</a>
                      </li>
                      <li id="turkish" className="unit">
                        <a href="https://www.bbc.com/turkce">Turkish</a>
                      </li>
                      <li id="ukrainian" className="unit">
                        <a href="https://www.bbc.com/ukrainian">Ukrainian</a>
                      </li>
                      <li id="welsh" className="unit">
                        <a href="https://www.bbc.co.uk/cymrufyw">Welsh</a>
                      </li>
                    </ul>
                  </div>
                  <div className="group-title-component">
                    <h2 className="group__title">Latin America</h2>
                    <ul className="units-list">
                      <li id="brasil" className="unit">
                        <a href="https://www.bbc.com/portuguese">Portuguese</a>
                      </li>
                      <li id="mundo" className="unit">
                        <a href="https://www.bbc.com/mundo">Spanish</a>
                      </li>
                    </ul>
                  </div>
                  <div className="group-title-component">
                    <h2 className="group__title">Middle East</h2>
                    <ul className="units-list">
                      <li id="arabic" className="unit">
                        <a href="http://www.bbc.com/arabic">Arabic</a>
                      </li>
                      <li id="persian" className="unit">
                        <a href="http://www.bbc.com/persian">Persian</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default pageLayout;
