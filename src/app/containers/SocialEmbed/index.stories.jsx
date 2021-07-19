import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

import { cpsTwitterBlock, cpsTwitterBlockNoEmbed } from './common/fixtures';
import CpsSocialEmbedContainer from '.';

const Component = props => {
  // eslint-disable-next-line react/prop-types
  const { isAmp = false, service = 'news' } = props;
  return (
    <RequestContextProvider
      isAmp={isAmp}
      pageType={STORY_PAGE}
      service={service}
      pathname="/pathname"
    >
      <ServiceContextProvider service={service}>
        <ToggleContext.Provider
          value={{
            toggleState: {
              cpsSocialEmbed: {
                enabled: true,
              },
              socialEmbed: {
                enabled: true,
              },
            },
            toggleDispatch: () => {},
          }}
        >
          <CpsSocialEmbedContainer {...props} />
        </ToggleContext.Provider>
      </ServiceContextProvider>
    </RequestContextProvider>
  );
};

export default {
  title: 'Containers/CPS Social Embed',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [withKnobs, withServicesKnob()],
};

const createBlocks = block => [
  { model: { blocks: [{ model: { oembed: block?.model?.embed?.oembed } }] } },
];

export const CanonicalExample = props => (
  <Component
    blocks={createBlocks(cpsTwitterBlock)}
    source="https://twitter.com/MileyCyrus/status/1237210910835392512"
    {...props}
  />
);

export const AmpExample = props => (
  <Component
    isAmp
    blocks={createBlocks(cpsTwitterBlock)}
    source="https://twitter.com/MileyCyrus/status/1237210910835392512"
    {...props}
  />
);
AmpExample.decorators = [AmpDecorator];

export const NoEmbed = props => (
  <Component
    blocks={createBlocks(cpsTwitterBlockNoEmbed)}
    source="https://twitter.com/MileyCyrus/status/1237210910835392512"
    {...props}
  />
);
