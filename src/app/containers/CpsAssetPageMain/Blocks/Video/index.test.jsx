import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

import { optimoVideoBlock } from '#lib/utilities/preprocessor/rules/cpsAssetPage/convertToOptimoBlocks/blocks/media/fixtures';

import CPSVideoBlock from '.';

// eslint-disable-next-line react/prop-types
const Contexts = ({ children }) => (
  <ToggleContextProvider>
    <ServiceContextProvider service="igbo">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        isAmp={false}
        pageType="STY"
        pathname="/igbo/afirika-23252735"
        service="igbo"
        statusCode={200}
      >
        {children}
      </RequestContextProvider>
    </ServiceContextProvider>
  </ToggleContextProvider>
);

describe('CPSVideoBlock', () => {
  shouldMatchSnapshot(
    'no placeholder',
    <Contexts>
      <CPSVideoBlock
        {...optimoVideoBlock.model}
        assetUri="/pidgin/12345678"
        showPlaceholder={false}
      />
    </Contexts>,
  );
  shouldMatchSnapshot(
    'with placeholder',
    <Contexts>
      <CPSVideoBlock
        {...optimoVideoBlock.model}
        assetUri="/pidgin/12345678"
        showPlaceholder
      />
      ,
    </Contexts>,
  );
});
