import type { PropsWithChildren } from 'react';

import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import type { Services } from '#app/models/types/global';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { RequestContextProvider } from '#contexts/RequestContext';
import { renderHook } from '../../../../components/react-testing-library-with-providers';
import { CLICK_EVENT, VIEW_EVENT } from '../../analytics.const';
import constructReverbUrl from '.';

const eventTrackingData = {
  componentName: 'features',
  url: '/gahuza/articles/c8xpj9vnd5wo',
  staticUrl: '/gahuza/articles/c8xpj9vnd5wo',
};

const wrapper = ({ children }: PropsWithChildren) => (
  <ServiceContextProvider service={'gahuza' as Services}>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.com"
      id="cy4849j0jyzo"
      isApp={false}
      pageType={ARTICLE_PAGE}
      service="gahuza"
      statusCode={200}
      pathname="/gahuza"
    >
      {children}
    </RequestContextProvider>
  </ServiceContextProvider>
);

const renderResult = (eventType: 'click' | 'view') => {
  const { result } = renderHook(
    () =>
      constructReverbUrl({
        eventTrackingData,
        eventType,
      }),
    { wrapper },
  );

  if (result.current) {
    return decodeURI(result.current);
  }

  return null;
};

describe('constructReverbUrl', () => {
  const originalConfigUrl = process.env.SIMORGH_APP_ENV;
  afterAll(() => {
    process.env.SIMORGH_APP_ENV = originalConfigUrl;
  });

  describe('Test environemnts', () => {
    beforeAll(() => {
      process.env.SIMORGH_APP_ENV = 'test';
    });

    it('should return the correct url format for click tracking', () => {
      const decodedResult = renderResult(CLICK_EVENT);
      expect(decodedResult).toBe(
        'https://logws1363.ati-host.net/hit.xiti?idclient={idclient}&s=596068&r={screenResolutionColourDepth}&re={browserViewportResolution}&hl={timestamp}&ts={epochTimestamp}&lng={language}&app_type=lite&app_name=news-gahuza&language=rw&content_type=article&events=[{"name"%3A"viewability.select"%2C"data"%3A{"item"%3A{"name"%3A"features"%2C"link"%3A"%2Fgahuza%2Farticles%2Fc8xpj9vnd5wo"}%2C"event"%3A{"category"%3A"viewability"%2C"action"%3A"select"}%2C"group"%3A{"type"%3A"features"}%2C"user"%3A{"id"%3Anull}%2C"app"%3A{"type"%3A"lite"%2C"name"%3A"news-gahuza"}}}]&context=[{"data"%3A{"page"%3A{}%2C"site"%3A{"level2_id"%3Anull}}}]',
      );
    });

    it('should return the correct url format for view tracking', () => {
      const decodedResult = renderResult(VIEW_EVENT);
      expect(decodedResult).toBe(
        'https://logws1363.ati-host.net/hit.xiti?idclient={idclient}&s=596068&r={screenResolutionColourDepth}&re={browserViewportResolution}&hl={timestamp}&ts={epochTimestamp}&lng={language}&app_type=lite&app_name=news-gahuza&language=rw&content_type=article&events=[{"name"%3A"viewability.view"%2C"data"%3A{"item"%3A{"name"%3A"features"%2C"link"%3A"%2Fgahuza%2Farticles%2Fc8xpj9vnd5wo"}%2C"event"%3A{"category"%3A"viewability"%2C"action"%3A"view"}%2C"group"%3A{"type"%3A"features"}%2C"user"%3A{"id"%3Anull}%2C"app"%3A{"type"%3A"lite"%2C"name"%3A"news-gahuza"}}}]&context=[{"data"%3A{"page"%3A{}%2C"site"%3A{"level2_id"%3Anull}}}]',
      );
    });
  });

  describe('Live environemnts', () => {
    beforeAll(() => {
      process.env.SIMORGH_APP_ENV = 'live';
    });

    it('should return the correct url format for click tracking', () => {
      const decodedResult = renderResult(CLICK_EVENT);
      expect(decodedResult).toBe(
        'https://a1.api.bbc.co.uk/hit.xiti?idclient={idclient}&s=596068&r={screenResolutionColourDepth}&re={browserViewportResolution}&hl={timestamp}&ts={epochTimestamp}&lng={language}&app_type=lite&app_name=news-gahuza&language=rw&content_type=article&events=[{"name"%3A"viewability.select"%2C"data"%3A{"item"%3A{"name"%3A"features"%2C"link"%3A"%2Fgahuza%2Farticles%2Fc8xpj9vnd5wo"}%2C"event"%3A{"category"%3A"viewability"%2C"action"%3A"select"}%2C"group"%3A{"type"%3A"features"}%2C"user"%3A{"id"%3Anull}%2C"app"%3A{"type"%3A"lite"%2C"name"%3A"news-gahuza"}}}]&context=[{"data"%3A{"page"%3A{}%2C"site"%3A{"level2_id"%3Anull}}}]',
      );
    });
    it('should return the correct url format for view tracking', () => {
      const decodedResult = renderResult(VIEW_EVENT);
      expect(decodedResult).toBe(
        'https://a1.api.bbc.co.uk/hit.xiti?idclient={idclient}&s=596068&r={screenResolutionColourDepth}&re={browserViewportResolution}&hl={timestamp}&ts={epochTimestamp}&lng={language}&app_type=lite&app_name=news-gahuza&language=rw&content_type=article&events=[{"name"%3A"viewability.view"%2C"data"%3A{"item"%3A{"name"%3A"features"%2C"link"%3A"%2Fgahuza%2Farticles%2Fc8xpj9vnd5wo"}%2C"event"%3A{"category"%3A"viewability"%2C"action"%3A"view"}%2C"group"%3A{"type"%3A"features"}%2C"user"%3A{"id"%3Anull}%2C"app"%3A{"type"%3A"lite"%2C"name"%3A"news-gahuza"}}}]&context=[{"data"%3A{"page"%3A{}%2C"site"%3A{"level2_id"%3Anull}}}]',
      );
    });
  });
});
