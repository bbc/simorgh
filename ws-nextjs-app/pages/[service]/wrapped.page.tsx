/** @jsx jsx */

import { GetServerSideProps } from 'next';
import { useEffect, useContext } from "react"
import { jsx } from '@emotion/react';
import { ParsedUrlQuery } from 'querystring';
import omit from 'ramda/src/omit';
import { ServiceContext } from '#contexts/ServiceContext';
import { STATIC_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import logResponseTime from '#server/utilities/logResponseTime';

import styles from './wrappedStyles';
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

  const {
    service,
    // renderer_env: rendererEnv,
  } = context.query as PageDataParams;

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
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  context.res.statusCode = 200;
  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
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
      service,
      showAdsBasedOnLocation: reqHeaders['bbc-adverts'] === 'true' || false,
      status: 200,
      timeOnServer: Date.now(), // TODO: check if needed?
      ...extractHeaders(reqHeaders),
    },
  };
};



const pageLayout = () => {
    const { datetimeLocale, locale } = useContext(ServiceContext);

    useEffect(() => {
      let wsWrapped;
      const MINUTES_IN_HOURS = 60;
      const HOURS_IN_DAYS = 24;
      // Get the value from local storage if it exists
      // wsWrapped = localStorage.getItem("ws_bbc_wrapped") || "{}";
      wsWrapped = '{"2024":{"byMonth":{"5":35,"6":45,"7":32,"8":28},"pageTypeCounts":{"home":55,"live":9,"STY":8,"undefined":6,"Topic":20,"article":34,"MAP":5,"OnDemandRadio":2,"Podcast":1},"serviceCounts":{"mundo":68,"burmese":5,"turkce":4,"russian":14,"arabic":19,"tigrinya":3,"pashto":1,"urdu":5,"bengali":7,"telugu":1,"portuguese":10,"persian":3},"topicCounts":{"НАТО":3,"Джо Байден":3,"Война России с Украиной":4,"Россия - НАТО":3,"США":3,"Pandora Papers":1,"Negocios":1,"Empleo":1,"Qatar":1,"Mundo árabe":1,"Arabia Saudita":1,"Derechos humanos":3,"Mujeres":1,"Política":9,"Guerra":2,"Joe Biden":1,"Estados Unidos":8,"Conflicto palestino-israelí":1,"Egipto":1,"Israel":1,"Territorios Palestinos":1,"Crisis en Venezuela":2,"Nicolás Maduro":2,"América Latina":8,"Venezuela":2,"ሰሜን ኣሜሪካ ":1,"ኲናት":1,"ፖለቲካ":1,"ኢትዮጵያ":1,"ህወሓት":1,"Elecciones presidenciales en Estados Unidos 2024":3,"Elecciones presidenciales en Estados Unidos 2016":3,"Donald Trump":3,"Derechos de la mujer":1,"México":7,"Claudia Sheinbaum":1,"Elecciones federales de México de 2024":1,"Andrés Manuel López Obrador":1,"سائنس":2,"ٹیکنالوجی":2,"کاروں کی صنعت":1,"ভারত":1,"ভারত লোকসভা নির্বাচন ২০২৪":1,"রাজনীতি":1,"নরেন্দ্র মোদী":1,"Serbia":1,"100 Mujeres":1,"Europa":1,"Economía":1,"Argentina":1,"Javier Milei":1,"المسلمون":1,"الاردن":1,"السعودية":1,"الإسلام":1,"مكة":1,"مصر":1,"شؤون دينية":1,"الحج":1,"المپیک پاریس ۲۰۲۴":1,"Sociedad":4,"Violencia en México":4,"Drogas":4,"Narcotráfico":4,"Британия":1,"Искусство":1,"Музыка":1,"ہوائی سفر":1,"سفر":1,"پاکستان":1,"فضائی حادثے":1,"کراچی":1,"ماحولیاتی تبدیلی":1,"کینیا":1,"Израиль и ПА":1,"Иран":1,"Ближний Восток":1,"Война Израиля с ХАМАС":1,"Россия":1,"Украина":1,"الصراع الفلسطيني الإسرائيلي":1,"إسرائيل":1,"حرب غزة":1,"حركة حماس":1,"البيئة":2,"التلوث":2,"أمراض":2,"الحيوانات":2,"Sociedad y Cultura":3,"Religión":3,"Violencia sexual":3,"Abuso infantil":3,"Reino Unido":3},"duration":31219166,"wordCount":41301}}';
      wsWrapped = JSON.parse(wsWrapped);
      const thisYear = new Date().getFullYear();
      console.log('wsWrapped', wsWrapped);

      const totalTime = wsWrapped[thisYear].duration;
      const timespent = document.getElementById('timespent');
      const timespentMinutes = Math.round(totalTime / (1000 * 60));

      const timespentMinutesText = new Intl.NumberFormat(locale).format(timespentMinutes);
      let timespentText = `${timespentMinutesText} minutes`;
      if (timespentMinutes > MINUTES_IN_HOURS) {
        const timespentHours = Math.round(timespentMinutes / MINUTES_IN_HOURS);
        timespentText = `${timespentText}. That is ${timespentHours.toLocaleString()} hours`;
        if (timespentHours > HOURS_IN_DAYS) {
            timespentText = `${timespentText} or ${Math.round(timespentMinutes / (MINUTES_IN_HOURS * HOURS_IN_DAYS))} days`;
          }
      }
      
      const duration = {
        hours: Math.floor(timespentMinutes / MINUTES_IN_HOURS),
        minutes: timespentMinutes % MINUTES_IN_HOURS,
      };
      const durationInternationalized = new Intl.DurationFormat(datetimeLocale, { style: "long" }).format(duration);

      timespent.innerText = durationInternationalized;
      const totalWords = wsWrapped[thisYear].wordCount;
      const words = document.getElementById('words');
      words.innerText = new Intl.NumberFormat(locale).format(totalWords);
      const pageTypeCounts = Object.keys(wsWrapped[thisYear].pageTypeCounts).filter(key => ['STY', 'article'].includes(key)).reduce((sum, key) => {
        return sum + wsWrapped[thisYear].pageTypeCounts[key];
      }, 0);
      const article = document.getElementById('article');
      article.innerText = new Intl.NumberFormat(locale).format(pageTypeCounts);
      const average = document.getElementById('average');
      /// average.innerText = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(totalWords / pageTypeCounts);
      const topics = Object.keys(wsWrapped[thisYear].topicCounts).sort((a, b) => {
        return wsWrapped[thisYear].topicCounts[a] < wsWrapped[thisYear].topicCounts[b];
      }).slice(0, 5);
      const topiclist = document.getElementById('topiclist'); 
      topiclist.innerHTML = '';
      topics.forEach(topic => {
        const listitem = document.createElement('LI');
        listitem.innerText = topic;
        topiclist.appendChild(listitem);
      });

      const monthValues = [];
      const graphMonths = wsWrapped[thisYear].byMonth;
      const tempMonths = [];
      const blah = new Intl.DateTimeFormat()
      for(let i = 0; i <= 11; i++) {
        const date = new Date(`2024-${String(i + 1).padStart(2, '0')}-01`);
        tempMonths.push(new Intl.DateTimeFormat(datetimeLocale, { month: 'short' }).format(date));
        monthValues[i] = 0;
        if (graphMonths[i + 1]) {
            monthValues[i] = graphMonths[i + 1];
        }
      }
      const graphMax = Math.max(...Object.values(monthValues));
      
      const my_canvas = document.getElementById("my_canvas");
      const gctx = my_canvas.getContext("2d");

      var bar_width = 50;
      var y_gap = 30;  // Gap below the graph 
      var bar_gap = 60; // Gap between Bars including width of the bar
      var x = 20; // Margin of graph from left  
      var y, i, y1, x1; 

      y = my_canvas.height - y_gap ;

      my_canvas.width = monthValues.length * (bar_gap) + x;
      gctx.moveTo(x - 5, y);
      gctx.lineTo(my_canvas.width, y); // Base line of graph 
      gctx.stroke();
      
      const getGraphYValue = (initialValue) => !initialValue ? initialValue : ((initialValue / graphMax) * y) - y_gap;

      for (i = 0; i < monthValues.length; i++){
          gctx.font = '11px "BBC Reith Sans", ReithSerif, Helvetica, sans-serif'; // font for base label showing classes 
          gctx.textAlign = 'left';
          gctx.textBaseline ='top';
          gctx.fillStyle = '#666';
          gctx.fillText(tempMonths[i].toUpperCase(), x + (bar_width / 2) - 17, y + 5); // Write base text for classes 

          gctx.beginPath();
          gctx.lineWidth = 2;
          y1 = y - getGraphYValue(monthValues[i]); // Coordinate for top of the Bar 
          x1 = x;    
          gctx.font = '12px  "BBC Reith Sans", ReithSerif, Helvetica, sans-serif'; // font at top of the bar 
          gctx.fillStyle= '#000000';
          gctx.fillText(monthValues[i] ? monthValues[i] : '', x1 + (bar_width / 2) - 10, y1 - 20); // text at top of the bar 

          gctx.fillStyle= '#B80000'; 
          gctx.fillRect(x1, y1, bar_width, getGraphYValue(monthValues[i]));// Filled bar 

          x = x + bar_gap

      }
    }, [])
    return (
      <>
        <main>
          <div css={styles.outerGrid}>
            <div css={styles.wideSection}>
              <h1>WS Wrapped</h1>
              <div>
                <h2>Time</h2>
                <h3><span id="timespent"></span></h3>
                <h2>Reading</h2>
                    <ul>
                        <li><span id="words"></span> words</li>
                        <li><span id="article"></span> articles</li>
                    </ul>
                <h2>Topics</h2>
                    <ol id="topiclist"></ol>
                <h2>Per month</h2>
                <canvas id="my_canvas" width="100%" height="230"  style={{border: "2px solid #000000"}}></canvas>
              </div>
            </div>
          </div>
        </main>
      </>
    );
}

export default pageLayout;
