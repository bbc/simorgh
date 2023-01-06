import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContext } from '../../../contexts/ServiceContext';
import pathOr from 'ramda/src/pathOr';

import { ToggleContextProvider } from '#contexts/ToggleContext';
import DisclaimerComponent from '.';

const DISCLAIMER_FIXTURE = {
  news: {
    para1: 'The BBC News apps are available for ',
    para2: {
      text: 'IOS',
      url: 'https://apps.apple.com/gb/app/bbc-news/id377382255',
      isExternal: true,
    },
    para3: ' and ',
    para4: {
      text: 'Android',
      url: 'https://play.google.com/store/apps/details?id=bbc.mobile.news.uk&hl=en_GB&gl=US',
      isExternal: true,
    },
    para5:
      '. Download them to your device and continue to receive news from the BBC.',
  },
  russian: {
    para1: 'Приложение Русской службы BBC News доступно для ',
    para2: {
      text: 'IOS',
      url: 'https://apps.apple.com/us/app/%D0%BD%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D0%B8-%D0%B1%D0%B8-%D0%B1%D0%B8-%D1%81%D0%B8/id504278066',
      isExternal: true,
    },
    para3: ' и ',
    para4: {
      text: 'Android',
      url: 'https://play.google.com/store/apps/details?id=uk.co.bbc.russian',
      isExternal: true,
    },
    para5: '. Вы можете также подписаться на наш канал в ',
    para6: {
      text: 'Telegram',
      url: 'https://t.me/bbcrussian',
      isExternal: true,
    },
    para7: '.',
  },
};

const externalLinkText = ', внешняя';

// eslint-disable-next-line react/prop-types
const Component = ({ service }) => {
  const disclaimer = pathOr(
    DISCLAIMER_FIXTURE.news,
    [service],
    DISCLAIMER_FIXTURE,
  );
  return (
    <ToggleContextProvider
      toggles={{
        disclaimer: {
          enabled: true,
        },
      }}
    >
      <ServiceContext.Provider
        value={{ service, disclaimer, externalLinkText }}
      >
        <DisclaimerComponent />
      </ServiceContext.Provider>
    </ToggleContextProvider>
  );
};

export default {
  title: 'Containers/Disclaimer',
  Component,
  decorators: [withKnobs, withServicesKnob({ defaultService: 'russian' })],
  parameters: { chromatic: { disable: true } },
};

export const Disclaimer = props => <Component {...props} />;
