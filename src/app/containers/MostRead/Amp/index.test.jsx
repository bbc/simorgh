import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import AmpMostReadContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import newsMostReadData from '#data/news/mostRead';
import { AMP_SCRIPT, AMP_JS } from '@bbc/psammead-assets/amp-boilerplate';
import { Helmet } from 'react-helmet';
import zhongwenSimpMostReadData from '#data/zhongwen/mostRead/simp';

let container;

const renderMostReadContainer = async ({ service, variant = null }) =>
  act(async () => {
    ReactDOM.render(
      <>
        <Helmet>{AMP_JS}</Helmet>
        <RequestContextProvider
          bbcOrigin={`http://localhost:7080/${service}/articles/c0000000000o`}
          id="c0000000000o"
          isAmp
          pageType="article"
          service={service}
          statusCode={200}
          pathname={`/${service}`}
          variant={variant}
        >
          <ServiceContextProvider service={service} variant={variant}>
            <AmpMostReadContainer endpoint="/most_read.json" />,
          </ServiceContextProvider>
        </RequestContextProvider>
      </>,
      container,
    );
  });

describe('MostReadContainerAmp', () => {
  beforeEach(() => {
    container = null;
    container = document.createElement('div');
    document.body.appendChild(container);
    fetch.resetMocks();
  });

  it('test data returns as expected on canonical for News', async () => {
    fetch.mockResponse(JSON.stringify(newsMostReadData));
    await renderMostReadContainer({ service: 'news', isAmp: true });
    // expect(container.querySelectorAll('amp-list').length).toEqual(1);

    console.log(container.innerHTML);
    // expect(container.querySelectorAll('ul').length).toEqual(10);
  });

  // it('test data returns as expected on canonical for Zhongwen Simp', async () => {
  //   fetch.mockResponse(JSON.stringify(zhongwenSimpMostReadData));
  //   await renderMostReadContainer({
  //     service: 'zhongwen',
  //     variant: 'simp',
  //     isAmp: true,
  //   });

  //   expect(container.querySelectorAll('ul').length).toEqual(10);
  // });
});
