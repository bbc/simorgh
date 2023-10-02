import React from 'react';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import { Headline, Link } from '../../legacy/psammead/psammead-story-promo/src';
import LiveLabel from '../../legacy/psammead/psammead-live-label/src/index';
import md from '../../legacy/psammead/psammead-live-label/README.md';
import { StoryProps } from '../../models/types/storybook';
import { ThemeProvider } from '../ThemeProvider';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
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
  liveText,
  ariaHidden,
  offScreenText = 'Watch Live',
}: Props) => (
  <ThemeProvider service={service} variant={variant}>
    <ToggleContextProvider>
      <RequestContextProvider
        isAmp={false}
        isApp={false}
        pageType={ARTICLE_PAGE}
        service={service}
        statusCode={200}
        pathname={`/${service}`}
        variant={variant}
      >
        <ServiceContextProvider service={service} variant={variant}>
          <Wrapper>
            <Link href="https://www.bbc.co.uk/news">
              <LiveLabel
                service={service}
                dir={dir}
                ariaHidden
                offScreenText="Live"
                liveText={liveText}
              />
            </Link>
          </Wrapper>
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContextProvider>
  </ThemeProvider>
);

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

export const WithLocalisedLiveText = ({
  service,
  variant,
  dir,
  liveText,
}: Props) => (
  <Component
    service={service}
    variant={variant}
    dir={dir}
    liveText="AS E DE HAPPEN"
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
