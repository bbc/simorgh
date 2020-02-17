import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import MostReadContainer from '..';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';

export const setStalePromoTimestamp = mostReadData => {
  const oldTimestamp = 864691200; // 27/05/1997
  const updatedMostReadData = mostReadData;

  // set first promo to have an old timestamp
  updatedMostReadData.records[0].promo.timestamp = oldTimestamp;

  return updatedMostReadData;
};

export const setFreshPromoTimestamp = mostReadData => {
  const freshDate = new Date();
  const updatedMostReadData = mostReadData;

  // Updates first 10 promos to have a fresh date
  for (let i = 0; i < 10; i += 1) {
    updatedMostReadData.records[i].promo.timestamp = freshDate.getTime();
  }

  return updatedMostReadData;
};

export const setStaleLastRecordTimeStamp = mostReadData => {
  const updatedMostReadData = mostReadData;
  updatedMostReadData.lastRecordTimeStamp = '2019-11-06T16:28:00Z';

  return updatedMostReadData;
};

const getToggleState = enabled => ({
  local: { mostRead: { enabled } },
  test: { mostRead: { enabled } },
});

export const renderMostReadContainer = async ({
  container,
  isAmp,
  service,
  variant = null,
  mostReadToggle = false,
}) =>
  act(async () => {
    ReactDOM.render(
      <ToggleContext.Provider
        value={{ toggleState: getToggleState(mostReadToggle) }}
      >
        <RequestContextProvider
          bbcOrigin={`http://localhost:7080/${service}/articles/c0000000000o`}
          id="c0000000000o"
          isAmp={isAmp}
          pageType="article"
          service={service}
          statusCode={200}
          pathname={`/${service}`}
          variant={variant}
        >
          <ServiceContextProvider service={service} variant={variant}>
            <MostReadContainer />
          </ServiceContextProvider>
        </RequestContextProvider>
      </ToggleContext.Provider>,
      container,
    );
  });
