import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import { Headline, Link } from '../../legacy/psammead/psammead-story-promo/src';
import LiveLabel from '../../legacy/psammead/psammead-live-label/src/index';
import md from '../../legacy/psammead/psammead-live-label/README.md';
import { StoryProps } from '../../models/types/storybook';
import { ThemeProvider } from '../ThemeProvider';
import {
  ServiceContext,
  ServiceContextProvider,
} from '../../contexts/ServiceContext';
import services from '../../../server/utilities/serviceConfigs';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ARTICLE_PAGE } from '../../routes/utils/pageTypes';

interface Props extends StoryProps {
  dir: string;
  ariaHidden: boolean;
  offScreenText: string;
  liveText?: string;
}

const Wrapper = styled.div`
  position: relative;
`;

//   .add(
//     'with children',
//     ({ text: headline, script, service, dir }) => (
//       <Wrapper>
//         <Headline script={script} service={service}>
//           <Link href="https://www.bbc.co.uk/news">
//             <LiveLabel
//               service={service}
//               dir={dir}
//               ariaHidden
//               offScreenText="Live"
//             >
//               {headline}
//             </LiveLabel>
//           </Link>
//         </Headline>
//       </Wrapper>
//     ),
//     {
//       notes,
//     },
//   );

const Component = ({
  service,
  variant,
  dir,
  ariaHidden,
  offScreenText = 'Watch Live',
}: Props) => {
  const { liveLabel } = services[service].default.translations.media;
  return (
    <Wrapper>
      <Link href="https://www.bbc.co.uk/news">
        <LiveLabel
          service={service}
          dir={dir}
          ariaHidden
          offScreenText="Live"
          liveText={liveLabel}
        />
      </Link>
    </Wrapper>
  );
};

export default {
  title: 'New Components/Live Label',
  Component,
  decorators: [withKnobs(), withServicesKnob({ defaultService: 'pidgin' })],
  parameters: {
    docs: {
      page: md,
    },
  },
};

export const WithEnglishLiveText = ({ service, variant, dir }: Props) => (
  <Component
    service={service}
    variant={variant}
    dir={dir}
    ariaHidden
    offScreenText="Live"
  />
);

export const WithLocalisedLiveText = ({ service, variant, dir }: Props) => (
  <Component
    service={service}
    variant={variant}
    dir={dir}
    ariaHidden
    offScreenText="Live"
  />
);

export const WithCustomOffscreenText = ({ service, variant, dir }: Props) => (
  <Component
    service={service}
    variant={variant}
    dir={dir}
    ariaHidden
    offScreenText="Watch Live"
  />
);

// export const WithChildren = ({ service, variant, dir }:Props) => (

// )
