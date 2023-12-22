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



const pageLayout = () => {
    useEffect(() => {
      let wsWrapped
      // Get the value from local storage if it exists
      wsWrapped = localStorage.getItem("ws_bbc_wrapped") || "{}";
      wsWrapped = JSON.parse(wsWrapped);
      const thisYear = new Date().getFullYear();
      console.log('wsWrapped', wsWrapped);
      const totalTime = wsWrapped[thisYear].duration;
      const timespent = document.getElementById('timespent');
      timespent.innerText = `${totalTime / (1000 * 60)} minutes`;
      const totalWords = wsWrapped[thisYear].wordCount;
      const words = document.getElementById('words');
      words.innerText = new Intl.NumberFormat().format(totalWords);
      const pageTypeCounts = Object.keys(wsWrapped[thisYear].pageTypeCounts).filter(key => ['STY', 'article'].includes(key)).reduce((sum, key) => {
        return sum + wsWrapped[thisYear].pageTypeCounts[key];
      }, 0);
      const article = document.getElementById('article');
      article.innerText = new Intl.NumberFormat().format(pageTypeCounts);
      const average = document.getElementById('average');
      average.innerText = new Intl.NumberFormat().format(totalWords / pageTypeCounts);
      const topics = Object.keys(wsWrapped[thisYear].topicCounts).sort((a, b) => {
        return wsWrapped[thisYear].topicCounts[a] < wsWrapped[thisYear].topicCounts[b];
      }).slice(0, 3);
      const topiclist = document.getElementById('topiclist'); 
      topiclist.innerHTML = '';
      topics.forEach(topic => {
        const listitem = document.createElement('LI');
        listitem.innerText = topic;
        topiclist.appendChild(listitem);
      });
    }, [])
    return (
      <>
        <main>
          <h1>WS Wrapped</h1>
          <div>
            <h2>Time on BBC</h2>
            <p>So far this year you have spent <span id="timespent"></span> on the BBC.com site and read <span id="words"></span> words on <span id="article"></span> articles, at an average of <span id="average"></span> words per article.</p>
            <p>Your most popular article topics were: </p>
            <ol id="topiclist"></ol>
          </div>
        </main>
      </>
    );
}

export default pageLayout;
