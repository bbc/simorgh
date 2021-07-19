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

// The blocks in the fixture folder do not
const conformBlock = block => [
  { model: { blocks: [{ model: { embed: block.model.embed.oembed } }] } },
];

export const CanonicalExample = props => (
  <Component
    blocks={conformBlock(cpsTwitterBlock)}
    source="https://twitter.com/MileyCyrus/status/1237210910835392512"
    {...props}
  />
);

export const AmpExample = props => (
  <Component
    isAmp
    blocks={conformBlock(cpsTwitterBlock)}
    source="https://twitter.com/MileyCyrus/status/1237210910835392512"
    {...props}
  />
);
AmpExample.decorators = [AmpDecorator];

export const NoEmbed = props => (
  <Component
    blocks={[cpsTwitterBlockNoEmbed]}
    source="https://twitter.com/MileyCyrus/status/1237210910835392512"
    {...props}
  />
);

/*
storiesOf('Containers/CPS Social Embed/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', ({ service }) =>
    withContexts(CpsSocialEmbedContainer, {
      isAmp: false,
      isEnabled: true,
      service,
    })({
      blocks: [cpsTwitterBlock],
    }),
  )
  .add('no embed', ({ service }) =>
    withContexts(CpsSocialEmbedContainer, {
      isAmp: false,
      isEnabled: true,
      service,
    })({
      blocks: [cpsTwitterBlockNoEmbed],
    }),
  );

storiesOf('Containers/CPS Social Embed/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .addDecorator(AmpDecorator)
  .add('default', ({ service }) =>
    withContexts(CpsSocialEmbedContainer, {
      isAmp: true,
      isEnabled: true,
      service,
    })({
      blocks: [cpsTwitterBlock],
    }),
  );
*/
