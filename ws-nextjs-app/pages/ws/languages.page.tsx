import { GetServerSideProps } from 'next';
import { useEffect } from "react"
import { ParsedUrlQuery } from 'querystring';
import omit from 'ramda/src/omit';
import constructPageFetchUrl from '#app/routes/utils/constructPageFetchUrl';
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
import getAgent from '../../../utilities/undiciAgent';

import extractHeaders from '../../../src/server/utilities/extractHeaders';

interface PageDataParams extends ParsedUrlQuery {
  id: string;
  page?: string;
  service: Services;
  variant?: Variants;
  // eslint-disable-next-line camelcase
  renderer_env?: string;
}

const logger = nodeLogger(__filename);

export const getServerSideProps: GetServerSideProps = async context => {
  logResponseTime(
    {
      path: context.resolvedUrl,
    },
    context.res,
    () => null,
  );

  const service = 'ws';
  const { headers: reqHeaders } = context.req;

  logger.debug(SERVER_SIDE_RENDER_REQUEST_RECEIVED, {
    url: context.resolvedUrl,
    headers: omit(
      (process.env.SENSITIVE_HTTP_HEADERS || '').split(','),
      reqHeaders,
    ),
    pageType: 'staticPage',
  });

  let routingInfoLogger = logger.debug;

  routingInfoLogger(ROUTING_INFORMATION, {
    url: context.resolvedUrl,
    status: 200,
    pageType: 'staticPage',
  });

  context.res.statusCode = 200;
  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      error: null,
      isAmp: false,
      isNextJs: true,
      page: null,
      pageData: null,
      pageType: 'staticPage',
      pathname: context.resolvedUrl,
      service,
      showAdsBasedOnLocation: reqHeaders['bbc-adverts'] === 'true' || false,
      status: 200,
      timeOnServer: Date.now(), // TODO: check if needed?
      ...extractHeaders(reqHeaders),
    },
  };
};

const morphCSS1 = `@charset "CP850";@font-face{font-family:ReithSans;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/ReithSans/latest/normal.woff2) format('woff2'),url(https://ws-downloads.files.bbci.co.uk/fonts/ReithSans/latest/normal.woff) format('woff');font-display:optional}@font-face{font-family:ReithSans;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/ReithSans/latest/bold.woff2) format('woff2'),url(https://ws-downloads.files.bbci.co.uk/fonts/ReithSans/latest/bold.woff) format('woff');font-display:optional}@font-face{font-family:ReithSerif;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/ReithSerif/latest/medium.woff2) format('woff2'),url(https://ws-downloads.files.bbci.co.uk/fonts/ReithSerif/latest/medium.woff) format('woff');font-display:optional}@font-face{font-family:NassimArabic;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/bold.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimArabic;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimArabic/latest/normal.ttf) format("ttf");font-display:optional}@font-face{font-family:Padauk;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/bold.ttf) format("ttf");font-display:swap}@font-face{font-family:Padauk;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/Padauk/latest/normal.ttf) format("ttf");font-display:swap}@font-face{font-family:ShonarBangla;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/bold.ttf) format("ttf");font-display:optional}@font-face{font-family:ShonarBangla;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/ShonarBangla/latest/normal.ttf) format("ttf");font-display:optional}@font-face{font-family:IskoolaPota;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/bold.ttf) format("ttf");font-display:swap}@font-face{font-family:IskoolaPota;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/IskoolaPota/latest/normal.ttf) format("ttf");font-display:swap}sett{font-family:"SETTdeco Family"!important}@font-face{font-family:Latha;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/bold.ttf) format("ttf");font-display:swap}@font-face{font-family:Latha;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/Latha/latest/normal.ttf) format("ttf");font-display:swap}@font-face{font-family:NassimUrdu;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/bold.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimUrdu;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimUrdu/latest/normal.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimPersian;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/bold.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimPersian;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPersian/latest/normal.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimPashto;font-weight:700;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/bold.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/bold.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/bold.ttf) format("ttf");font-display:optional}@font-face{font-family:NassimPashto;font-weight:400;font-style:normal;src:url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/normal.woff) format("woff"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/normal.eot) format("eot"),url(https://ws-downloads.files.bbci.co.uk/fonts/NassimPashto/latest/normal.ttf) format("ttf");font-display:optional}.arabic_font{font-family:NassimArabic!important;font-size:18px!important}.arabic_font a{font-family:NassimArabic;font-size:18px}.pashto_font{font-family:NassimPashto!important;font-size:18px!important}.pashto_font a{font-family:NassimPashto;font-size:18px}.persian_font{font-family:NassimPersian!important;font-size:18px!important}.persian_font a{font-family:NassimPersian;font-size:18px}.urdu_font{font-family:NassimUrdu!important;font-size:18px!important}.urdu_font a{font-family:NassimUrdu;font-size:18px}#english_version:after,#localised_version:after{clear:both;content:"";display:block;height:0;overflow:hidden}#localised_version #chinese a,.chinese_font{font-family:Helvetica,Arial,STHeiti,"华文黑体","Microsoft YaHei","微软雅黑",SimSun,"宋体","WenQuanYi Micro Hei",sans-serif!important}.bengali_font{font-family:ShonarBangla!important;font-size:16px!important;line-height:22px}#localised_version #tamil{font-family:Latha,Helvetica,Arial,Verdana,sans-serif}#localised_version #tamil a{font-family:Latha,Helvetica,Arial,Verdana,sans-serif;font-size:14px;font-weight:700;line-height:20px}#localised_version #sinhala{font-family:IskoolaPota,Arial,Verdana,sans-serif}#localised_version #sinhala a{font-family:IskoolaPota,Arial,Verdana,sans-serif;font-size:20px;font-weight:700}#localised_version #nepali{font-family:Arial,Verdana,sans-serif}#localised_version #nepali a{font-family:Arial,Verdana,sans-serif;font-size:15px}#localised_version #bengali{font-family:ShonarBangla,Arial,Verdana,sans-serif}#localised_version #bengali a{font-family:ShonarBangla,Arial,Verdana,sans-serif;font-size:18px}#localised_version #hindi{font-family:Arial,Verdana,sans-serif}#localised_version #hindi a{font-family:Arial,Verdana,sans-serif}#localised_version #burmese{font-family:Padauk}#localised_version #burmese a{font-family:Padauk}#localised_version #thai{font-family:Tahoma,Helmet,Freesans,Helvetica,Arial,sans-serif}#localised_version #thai a{font-family:Tahoma,Helmet,Freesans,Helvetica,Arial,sans-serif;font-size:20px}#localised_version #chinese a{font-size:15px}#localised_version .menu_item #burmese a{font-size:17px}`

const morphCSS2 = `body{color:#404040;font-family:ReithSans,Arial,Helvetica,sans-serif}ol,ul{list-style:none}a:link{-webkit-tap-highlight-color:rgba(17,103,168,.3)}#core-navigation{display:none}.column-clearfix::after,.column-clearfix::before{content:"";display:block;height:0;overflow:hidden}.column-clearfix::after,.column-clearfix::before{clear:both}.units-list .unit+.unit{padding-top:9px}.units-list--separators .unit+.unit{padding-top:8px;border-top:1px solid #dcdcdc}.units-list--columning .unit+.unit{padding-top:0}.units-list .unit+.unit{padding-top:17px}#page{position:relative;z-index:10;background:#fff}.c-open{font-size:14px;padding-left:0;margin:0 auto;box-sizing:border-box;-webkit-box-sizing:border-box;-moz-box-sizing:border-box}.container{padding-bottom:42px}.story-body__h1{font-family:ReithSerif,Arial,Helvetica,sans-serif;font-size:1.5rem;line-height:1.125;color:#1e1e1e;font-weight:700}.column--primary{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding-right:16px;padding-top:12px}.group__title{font-family:ReithSerif,Arial,Helvetica,sans-serif;font-size:24px;font-size:1.5rem;line-height:1;text-rendering:optimizeLegibility;letter-spacing:-.0425em;font-weight:700;margin-bottom:.5em}.group-title-component{margin-top:40px}.unit{clear:both;margin-bottom:8px}.container{padding-left:8px;padding-right:8px}.hide{display:none}.atlas-languages-page a{text-decoration:none;color:inherit}.atlas-languages-page a:focus,.atlas-languages-page a:hover{color:#1167a8}.language-switcher{padding:8px 0}@media (max-width:600px){.group-title-component{float:none}.group-title-component:nth-child(2){clear:both}}@media (min-width:480px){.container{padding-left:16px;padding-right:16px}.unit{margin-bottom:16px}}@media (min-width:600px){.group-title-component{float:left;width:50%}.group-title-component:nth-child(3),.group-title-component:nth-child(5),.group-title-component:nth-child(7){clear:both}.story-body__h1{font-size:2.25rem}.column--primary{padding-top:24px}}@media (min-width:976px){.container{margin:0 auto;max-width:1008px}.group-title-component{float:left;width:25%}.group-title-component:nth-child(3),.group-title-component:nth-child(5),.group-title-component:nth-child(7){clear:none}.story-body__h1{font-size:2rem}.column--primary{padding-top:20px;float:left;width:976px}}@media (min-width:1280px){.container{margin:0 auto;max-width:1280px}}`;


const pageLayout = () => {
    useEffect(() => {
        function languageToggle(e) {
          e.preventDefault();
          var elements = document.querySelectorAll(".panel, .toggle");
          for (var i=0; i < elements.length; ++i) {
            var classNames = elements[i].className.split(' ');
            var indexOfHide = classNames.indexOf('hide');
            if (indexOfHide !== -1) {
              classNames.splice(indexOfHide, 1);
            } else {
              classNames.push('hide');
            }
            elements[i].className = classNames.join(' ');
          }
        }
        document.getElementById("switcher").addEventListener("click", languageToggle);
    }, []);
    return (
      <>
        <style>{morphCSS1}</style>
        <style>{morphCSS2}</style>
        <main>
            <div id="page" class="atlas-languages-page">
                <div class="container c-open" role="main">
                    <div class="column-clearfix">
                        <div class="column--primary">
                            <h1 class="story-body__h1">
                                Get the news in your language
                            </h1>
                            <p class="language-switcher">
                                <a class="switcher" id="switcher" href="#"><span class="toggle">Switch list to English</span><span class="toggle hide">Switch list to localised scripts</span></a>
                            </p>
                            <div id="localised_version" class="panel">
                                <div class="group-title-component">
                                    <h2 class="group__title">
                                        Africa
                                    </h2>
                                    <ul class="units-list">
                                        <li id="afaanoromoo" class="unit"><a href="https://www.bbc.com/afaanoromoo">Oduu Afaan Oromootiin</a></li>
                                        <li id="amharic" class="unit"><a href="https://www.bbc.com/amharic">ዜና በአማርኛ</a></li>
                                        <li id="afrique" class="unit"><a href="https://www.bbc.com/afrique">L'actualité en Français</a></li>
                                        <li id="hausa" class="unit"><a href="https://www.bbc.com/hausa">Labarai da Hausa</a></li>
                                        <li id="igbo" class="unit"><a href="https://www.bbc.com/igbo">Akụkọ n’Igbo</a></li>
                                        <li id="kirundi" class="unit"><a href="https://www.bbc.com/gahuza">Amakuru mu Kinyarwanda/ Kirundi</a></li>
                                        <li id="pidgin" class="unit"><a href="https://www.bbc.com/pidgin">News in Pidgin</a></li>
                                        <li id="somali" class="unit"><a href="https://www.bbc.com/somali">War Af Soomaali ah</a></li>
                                        <li id="swahili" class="unit"><a href="https://www.bbc.com/swahili">Habari kwa Kiswahili</a></li>
                                        <li id="tigrinya" class="unit"><a href="https://www.bbc.com/tigrinya">ዜና ብትግርኛ</a></li>
                                        <li id="yoruba" class="unit"><a href="https://www.bbc.com/yoruba">Ìròyìn ní Yorùbá</a></li>
                                    </ul>
                                </div>
                                <div class="group-title-component">
                                    <h2 class="group__title">
                                        Asia (Central)
                                    </h2>
                                    <ul class="units-list">
                                        <li id="kyrgyz" class="unit"><a href="https://www.bbc.com/kyrgyz">Кыргыз тилиндеги жаңылыктар</a></li>
                                        <li id="uzbek" class="unit"><a href="https://www.bbc.com/uzbek">Ўзбек тилидаги янгиликлар</a></li>
                                    </ul>
                                </div>
                                <div class="group-title-component">
                                    <h2 class="group__title">
                                        Asia (Pacific)
                                    </h2>
                                    <ul class="units-list">
                                        <li id="burmese" class="unit"><a href="https://www.bbc.com/burmese">မြန်မာသတင်းများ</a></li>
                                        <li id="chinese" class="unit"><a href="https://www.bbc.com/zhongwen/simp">中文新闻</a></li>
                                        <li id="indonesia" class="unit"><a href="https://www.bbc.com/indonesia">Berita Indonesia</a></li>
                                        <li id="japanese" class="unit"><a href="https://www.bbc.com/japanese">日本語ニュース</a></li>
                                        <li id="korean" class="unit"><a href="https://www.bbc.com/korean">한국어</a></li>
                                        <li id="thai" class="unit"><a href="https://www.bbc.com/thai">ข่าวภาษาไทย</a></li>
                                        <li id="vietnamese" class="unit"><a href="https://www.bbc.com/vietnamese">Tin Tiếng Việt</a></li>
                                    </ul>
                                </div>
                                <div class="group-title-component">
                                    <h2 class="group__title">
                                        Asia (South)
                                    </h2>
                                    <ul class="units-list">
                                        <li id="bengali" class="unit"><a href="https://www.bbc.com/bengali">বাংলা খবর</a></li>
                                        <li id="gujarati" class="unit"><a href="https://www.bbc.com/gujarati">ગુજરાતીમાં સમાચાર</a></li>
                                        <li id="hindi" class="unit"><a href="https://www.bbc.com/hindi">हिन्दी समाचार</a></li>
                                        <li id="marathi" class="unit"><a href="https://www.bbc.com/marathi">मराठीत बातम्या</a></li>
                                        <li id="nepali" class="unit"><a href="https://www.bbc.com/nepali">नेपाली समाचार</a></li>
                                        <li id="pashto" class="unit pashto_font"><a href="https://www.bbc.com/pashto">پښتو نړیوال خپرونه</a></li>
                                        <li id="punjabi" class="unit"><a href="https://www.bbc.com/punjabi">ਪੰਜਾਬੀ ਖ਼ਬਰਾਂ</a></li>
                                        <li id="sinhala" class="unit"><a href="https://www.bbc.com/sinhala">සිංහල පුවත්</a></li>
                                        <li id="tamil" class="unit"><a href="https://www.bbc.com/tamil">தமிழில் செய்திகள்</a></li>
                                        <li id="telugu" class="unit"><a href="https://www.bbc.com/telugu">తెలుగు వార్తలు</a></li>
                                        <li id="urdu" class="urdu_font unit"><a href="https://www.bbc.com/urdu">اردو میں خبریں</a></li>
                                    </ul>
                                </div>
                                <div class="group-title-component">
                                    <h2 class="group__title">
                                        Europe
                                    </h2>
                                    <ul class="units-list">
                                        <li id="azeri" class="unit"><a href="https://www.bbc.com/azeri">Azərbaycanca xəbərlər</a></li>
                                        <li id="english" class="unit"><a href="https://www.bbc.co.uk/news">News in English</a></li>
                                        <li id="gaelic" class="unit"><a href="https://www.bbc.co.uk/naidheachdan">Naidheachdan</a></li>
                                        <li id="russian" class="unit"><a href="https://www.bbc.com/russian">Новости на русском языке</a></li>
                                        <li id="serbian" class="unit"><a href="https://www.bbc.com/serbian">BBC News na srpskom</a></li>
                                        <li id="turkish" class="unit"><a href="https://www.bbc.com/turkce">Türkçe Haberler</a></li>
                                        <li id="ukrainian" class="unit"><a href="https://www.bbc.com/ukrainian">Новини українською мовою</a></li>
                                        <li id="cymrufyw" class="unit"><a href="https://www.bbc.co.uk/cymrufyw">Newyddion</a></li>
                                    </ul>
                                </div>
                                <div class="group-title-component">
                                    <h2 class="group__title">
                                        Latin America
                                    </h2>
                                    <ul class="units-list">
                                        <li id="brasil" class="unit"><a href="https://www.bbc.com/portuguese">Notícias em Português</a></li>
                                        <li id="mundo" class="unit"><a href="https://www.bbc.com/mundo">Noticias para hispanoparlantes</a></li>
                                    </ul>
                                </div>
                                <div class="group-title-component">
                                    <h2 class="group__title">
                                        Middle East
                                    </h2>
                                    <ul class="units-list">
                                        <li id="arabic" class="arabic_font unit"><a href="http://www.bbc.com/arabic">أخبار باللغة العربية</a></li>
                                        <li id="persian" class="persian_font unit"><a href="http://www.bbc.com/persian">خبرها به فارسی</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div id="english_version" class="panel hide">
                                <div class="group-title-component">
                                    <h2 class="group__title">
                                        Africa
                                    </h2>
                                    <ul class="units-list">
                                        <li id="afaanoromoo" class="unit"><a href="https://www.bbc.com/afaanoromoo">Afaan Oromoo</a></li>
                                        <li id="amharic" class="unit"><a href="https://www.bbc.com/amharic">Amharic</a></li>
                                        <li id="afrique" class="unit"><a href="https://www.bbc.com/afrique">French</a></li>
                                        <li id="hausa" class="unit"><a href="https://www.bbc.com/hausa">Hausa</a></li>
                                        <li id="igbo" class="unit"><a href="https://www.bbc.com/igbo">Igbo</a></li>
                                        <li id="kirundi" class="unit"><a href="https://www.bbc.com/gahuza">Kirundi</a></li>
                                        <li id="pidgin" class="unit"><a href="https://www.bbc.com/pidgin">Pidgin</a></li>
                                        <li id="somali" class="unit"><a href="https://www.bbc.com/somali">Somali</a></li>
                                        <li id="swahili" class="unit"><a href="https://www.bbc.com/swahili">Swahili</a></li>
                                        <li id="tigrinya" class="unit"><a href="https://www.bbc.com/tigrinya">Tigrinya</a></li>
                                        <li id="yoruba" class="unit"><a href="https://www.bbc.com/yoruba">Yoruba</a></li>
                                    </ul>
                                </div>
                                <div class="group-title-component">
                                    <h2 class="group__title">
                                        Asia (Central)
                                    </h2>
                                    <ul class="units-list">
                                        <li id="kyrgyz" class="unit"><a href="https://www.bbc.com/kyrgyz">Kyrgyz</a></li>
                                        <li id="uzbek" class="unit"><a href="https://www.bbc.com/uzbek">Uzbek</a></li>
                                    </ul>
                                </div>
                                <div class="group-title-component">
                                    <h2 class="group__title">
                                        Asia (Pacific)
                                    </h2>
                                    <ul class="units-list">
                                        <li id="burmese" class="unit"><a href="https://www.bbc.com/burmese">Burmese</a></li>
                                        <li id="chinese" class="unit"><a href="https://www.bbc.com/zhongwen/simp">Chinese</a></li>
                                        <li id="indonesia" class="unit"><a href="https://www.bbc.com/indonesia">Indonesian</a></li>
                                        <li id="japanese" class="unit"><a href="https://www.bbc.com/japanese">Japanese</a></li>
                                        <li id="korean" class="unit"><a href="https://www.bbc.com/korean">Korean</a></li>
                                        <li id="thai" class="unit"><a href="https://www.bbc.com/thai">Thai</a></li>
                                        <li id="vietnamese" class="unit"><a href="https://www.bbc.com/vietnamese">Vietnamese</a></li>
                                    </ul>
                                </div>
                                <div class="group-title-component">
                                    <h2 class="group__title">
                                        Asia (South)
                                    </h2>
                                    <ul class="units-list">
                                        <li id="bengali" class="unit"><a href="https://www.bbc.com/bengali">Bengali</a></li>
                                        <li id="gujarati" class="unit"><a href="https://www.bbc.com/gujarati">Gujarati</a></li>
                                        <li id="hindi" class="unit"><a href="https://www.bbc.com/hindi">Hindi</a></li>
                                        <li id="marathi" class="unit"><a href="https://www.bbc.com/marathi">Marathi</a></li>
                                        <li id="nepali" class="unit"><a href="https://www.bbc.com/nepali">Nepali</a></li>
                                        <li id="pashto" class="unit"><a href="https://www.bbc.com/pashto">Pashto</a></li>
                                        <li id="punjabi" class="unit"><a href="https://www.bbc.com/punjabi">Punjabiਂ</a></li>
                                        <li id="sinhala" class="unit"><a href="https://www.bbc.com/sinhala">Sinhala</a></li>
                                        <li id="tamil" class="unit"><a href="https://www.bbc.com/tamil">Tamil</a></li>
                                        <li id="telugu" class="unit"><a href="https://www.bbc.com/telugu">Telugu</a></li>
                                        <li id="urdu" class="unit"><a href="https://www.bbc.com/urdu">Urdu</a></li>
                                    </ul>
                                </div>
                                <div class="group-title-component">
                                    <h2 class="group__title">
                                        Europe
                                    </h2>
                                    <ul class="units-list">
                                        <li id="azeri" class="unit"><a href="https://www.bbc.com/azeri">Azeri</a></li>
                                        <li id="english" class="unit"><a href="https://www.bbc.co.uk/news">English</a></li>
                                        <li id="gaelic" class="unit"><a href="https://www.bbc.co.uk/naidheachdan">Gaelic</a></li>
                                        <li id="russian" class="unit"><a href="https://www.bbc.com/russian">Russian</a></li>
                                        <li id="serbian" class="unit"><a href="https://www.bbc.com/serbian">Serbian</a></li>
                                        <li id="turkish" class="unit"><a href="https://www.bbc.com/turkce">Turkish</a></li>
                                        <li id="ukrainian" class="unit"><a href="https://www.bbc.com/ukrainian">Ukrainian</a></li>
                                        <li id="welsh" class="unit"><a href="https://www.bbc.co.uk/cymrufyw">Welsh</a></li>
                                    </ul>
                                </div>
                                <div class="group-title-component">
                                    <h2 class="group__title">
                                        Latin America
                                    </h2>
                                    <ul class="units-list">
                                        <li id="brasil" class="unit"><a href="https://www.bbc.com/portuguese">Portuguese</a></li>
                                        <li id="mundo" class="unit"><a href="https://www.bbc.com/mundo">Spanish</a></li>
                                    </ul>
                                </div>
                                <div class="group-title-component">
                                    <h2 class="group__title">
                                        Middle East
                                    </h2>
                                    <ul class="units-list">
                                        <li id="arabic" class="unit"><a href="http://www.bbc.com/arabic">Arabic</a></li>
                                        <li id="persian" class="unit"><a href="http://www.bbc.com/persian">Persian</a></li>
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
}

export default pageLayout;
