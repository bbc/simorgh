/** @jsx jsx */
// @ts-nocheck

import { GetServerSideProps } from 'next';
import { useEffect, useContext } from 'react';
import { jsx } from '@emotion/react';
import { ParsedUrlQuery } from 'querystring';
import omit from 'ramda/src/omit';
import { ServiceContext } from '#contexts/ServiceContext';
import { STATIC_PAGE } from '#app/routes/utils/pageTypes';
import {
  Articles,
  Book,
  Calculator,
  Calendar,
  Clock,
  Favourites,
  Words,
} from '#app/components/icons';
import nodeLogger from '#lib/logger.node';
import logResponseTime from '#server/utilities/logResponseTime';
import isLocal from '#lib/utilities/isLocal';

import {
  ROUTING_INFORMATION,
  SERVER_SIDE_RENDER_REQUEST_RECEIVED,
} from '#app/lib/logger.const';
import { Services, Variants } from '#models/types/global';
import styles from './wrappedStyles';

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

  const routingInfoLogger = logger.debug;

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
      status: 200,
      timeOnServer: Date.now(), // TODO: check if needed?
      ...extractHeaders(reqHeaders),
    },
  };
};

const pageLayout = () => {
  const { datetimeLocale, locale } = useContext(ServiceContext);
  const isLocalhost = isLocal();

  useEffect(() => {
    let wsWrapped;
    const MINUTES_IN_HOURS = 60;
    const HOURS_IN_DAYS = 24;
    // Get the value from local storage if it exists
    wsWrapped = localStorage.getItem('ws_bbc_wrapped') || '{}';
    if (isLocalhost)
      wsWrapped =
        '{"2024":{"byMonth": {"2":137,"3":190,"4":300,"5":108,"6":132,"7":124,"8":47,"9":40,"10":9,"11":42},"pageTypeCounts":{"home":81,"live":11,"STY":13,"undefined":10,"Topic":28,"article":49,"MAP":8,"OnDemandRadio":8,"Podcast":1,"FIX":1,"static":1},"serviceCounts":{"mundo":97,"burmese":8,"turkce":7,"russian":19,"arabic":27,"tigrinya":3,"pashto":7,"urdu":5,"bengali":7,"telugu":1,"portuguese":14,"persian":11,"news":1,"sinhala":4},"topicCounts":{"НАТО":3,"Джо Байден":3,"Война России с Украиной":4,"Россия - НАТО":3,"США":3,"Pandora Papers":1,"Negocios":1,"Empleo":1,"Qatar":1,"Mundo árabe":1,"Arabia Saudita":1,"Derechos humanos":3,"Mujeres":1,"Política":14,"Guerra":3,"Joe Biden":1,"Estados Unidos":10,"Conflicto palestino-israelí":2,"Egipto":1,"Israel":2,"Territorios Palestinos":1,"Crisis en Venezuela":3,"Nicolás Maduro":3,"América Latina":11,"Venezuela":3,"ሰሜን ኣሜሪካ ":1,"ኲናት":1,"ፖለቲካ":1,"ኢትዮጵያ":1,"ህወሓት":1,"Elecciones presidenciales en Estados Unidos 2024":3,"Elecciones presidenciales en Estados Unidos 2016":3,"Donald Trump":4,"Derechos de la mujer":1,"México":9,"Claudia Sheinbaum":2,"Elecciones federales de México de 2024":2,"Andrés Manuel López Obrador":2,"سائنس":2,"ٹیکنالوجی":2,"کاروں کی صنعت":1,"ভারত":1,"ভারত লোকসভা নির্বাচন ২০২৪":1,"রাজনীতি":1,"নরেন্দ্র মোদী":1,"Serbia":1,"100 Mujeres":1,"Europa":1,"Economía":3,"Argentina":3,"Javier Milei":1,"المسلمون":1,"الاردن":1,"السعودية":1,"الإسلام":1,"مكة":1,"مصر":1,"شؤون دينية":1,"الحج":1,"المپیک پاریس ۲۰۲۴":1,"Sociedad":4,"Violencia en México":5,"Drogas":4,"Narcotráfico":7,"Британия":1,"Искусство":1,"Музыка":1,"ہوائی سفر":1,"سفر":1,"پاکستان":1,"فضائی حادثے":1,"کراچی":1,"ماحولیاتی تبدیلی":1,"کینیا":1,"Израиль и ПА":1,"Иран":1,"Ближний Восток":1,"Война Израиля с ХАМАС":1,"Россия":4,"Украина":1,"الصراع الفلسطيني الإسرائيلي":1,"إسرائيل":1,"حرب غزة":1,"حركة حماس":1,"البيئة":2,"التلوث":2,"أمراض":2,"الحيوانات":2,"Sociedad y Cultura":4,"Religión":3,"Violencia sexual":3,"Abuso infantil":3,"Reino Unido":3,"Gabriel Boric":1,"Luiz Inácio Lula da Silva":1,"Chile":1,"Paraguay":2,"Uruguay":2,"Brasil":4,"Bolivia":2,"Violencia en América Latina":2,"Violencia de pandillas":2,"Tarih":1,"İngiltere":1,"Türkiye":1,"Libano":1,"Hezbolá":1,"Medio Ambiente":1,"قوه قضائیه ایران":1,"اعتراضات ایران ۱۴۰۱":1,"حجاب":1,"مهسا امینی":1,"ایران":1,"حقوق بشر":1,"حقوق زنان":1,"Eleições municipais 2024":2,"Rio de Janeiro":1,"São Paulo":1,"Belo Horizonte":1,"Cambio climático":1,"Ciencia":1,"کامالا هریس":1,"انتخابات ریاست جمهوری آمریکا ۲۰۲۴":1,"حزب جمهوری خواه آمریکا":1,"ایالات متحده آمریکا":1,"دونالد ترامپ":1,"الولايات المتحدة":2,"الانتخابات الرئاسية الأمريكية 2024":2,"Климат":1,"Регионы России":1,"Экология":1,"Загрязнение":1,"Выборы президента России 2024":1,"Владимир Путин":2,"Elecciones en Estados Unidos 2024":1,"Migraciones":1,"Kamala Harris":1},"duration":52763149,"wordCount":55524}}';
    wsWrapped = JSON.parse(wsWrapped);
    const thisYear = new Date().getFullYear();

    const totalTime = wsWrapped[thisYear].duration;
    const timespent = document.getElementById('timespent');
    const timespentMinutes = Math.round(totalTime / (1000 * 60));

    const timespentMinutesText = new Intl.NumberFormat(locale).format(
      timespentMinutes,
    );
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
    const durationInternationalized = new Intl.DurationFormat(datetimeLocale, {
      style: 'long',
    }).format(duration);

    timespent.innerText = durationInternationalized;
    const totalWords = wsWrapped[thisYear].wordCount;
    const words = document.getElementById('words');
    words.innerText = new Intl.NumberFormat(locale).format(totalWords);
    const pageTypeCounts = Object.keys(wsWrapped[thisYear].pageTypeCounts)
      .filter(key => ['STY', 'article'].includes(key))
      .reduce((sum, key) => {
        return sum + wsWrapped[thisYear].pageTypeCounts[key];
      }, 0);
    const article = document.getElementById('article');
    article.innerText = new Intl.NumberFormat(locale).format(pageTypeCounts);
    const average = document.getElementById('average');
    /// average.innerText = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(totalWords / pageTypeCounts);
    const topics = Object.keys(wsWrapped[thisYear].topicCounts)
      .sort((a, b) => {
        return (
          wsWrapped[thisYear].topicCounts[a] <
          wsWrapped[thisYear].topicCounts[b]
        );
      })
      .slice(0, 5);
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
    const blah = new Intl.DateTimeFormat();
    for (let i = 0; i <= 11; i++) {
      const date = new Date(`2024-${String(i + 1).padStart(2, '0')}-01`);
      tempMonths.push(
        new Intl.DateTimeFormat(datetimeLocale, { month: 'short' }).format(
          date,
        ),
      );
      monthValues[i] = 0;
      if (graphMonths[i + 1]) {
        monthValues[i] = graphMonths[i + 1];
      }
    }
    const graphMax = Math.max(...Object.values(monthValues));

    const my_canvas = document.getElementById('my_canvas');
    const gctx = my_canvas.getContext('2d');

    const bar_width = 50;
    const y_gap = 30; // Gap below the graph
    const bar_gap = 60; // Gap between Bars including width of the bar
    let x = 20; // Margin of graph from left
    let y;
    let i;
    let y1;
    let x1;

    y = my_canvas.height - y_gap;

    my_canvas.width = monthValues.length * bar_gap + x;
    gctx.moveTo(x - 5, y);
    gctx.lineTo(my_canvas.width, y); // Base line of graph
    gctx.stroke();

    const getGraphYValue = initialValue => {
      return !initialValue
        ? initialValue
        : (initialValue / graphMax) * (y - y_gap);
    };

    for (i = 0; i < monthValues.length; i++) {
      gctx.font = '11px "BBC Reith Sans", ReithSerif, Helvetica, sans-serif'; // font for base label showing classes
      gctx.textAlign = 'left';
      gctx.textBaseline = 'top';
      gctx.fillStyle = '#666';
      gctx.fillText(tempMonths[i].toUpperCase(), x + bar_width / 2 - 17, y + 5); // Write base text for classes

      gctx.beginPath();
      gctx.lineWidth = 2;
      y1 = y - getGraphYValue(monthValues[i]); // Coordinate for top of the Bar
      x1 = x;
      gctx.font = '12px  "BBC Reith Sans", ReithSerif, Helvetica, sans-serif'; // font at top of the bar
      gctx.fillStyle = '#000000';
      gctx.fillText(
        monthValues[i] ? monthValues[i] : '',
        x1 + bar_width / 2 - 10,
        y1 - 20,
      ); // text at top of the bar

      gctx.fillStyle = '#B80000';
      gctx.fillRect(x1, y1, bar_width, getGraphYValue(monthValues[i])); // Filled bar

      x += bar_gap;
    }
  }, []);
  return (
    <>
      <main>
        <div css={styles.outerGrid}>
          <div css={styles.wideSection}>
            <h1 css={styles.h1}>
              <Calculator /> 2024
            </h1>
            <div>
              <h2 css={styles.h2}>
                <Clock /> <span id="timespent" />
              </h2>
              <h2 css={styles.h2}>
                <Book />
              </h2>
              <ul css={styles.ul}>
                <li>
                  <Words /> <span id="words" />{' '}
                </li>
                <li>
                  <Articles /> <span id="article" />{' '}
                </li>
              </ul>
              <h2 css={styles.h2}>
                <Favourites />
              </h2>
              <ol id="topiclist" />
              <h2 css={styles.h2}>
                <Calendar />
              </h2>
              <canvas
                id="my_canvas"
                width="100%"
                height="290"
                style={{ border: '2px solid #000000' }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default pageLayout;
