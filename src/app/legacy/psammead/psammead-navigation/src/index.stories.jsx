import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import {
  color,
  select,
  number,
  text,
  withKnobs,
  boolean,
} from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import * as svgs from '#psammead/psammead-assets/src/svgs';
import Brand from '#psammead/psammead-brand/src';
import { ampDecorator } from '#storybook/preview';
import Navigation, { NavigationUl, NavigationLi } from './index';
import {
  CanonicalMenuButton,
  AmpMenuButton,
  CanonicalDropdown,
  DropdownUl,
  DropdownLi,
} from './DropdownNavigation';
import { ScrollableNavigation } from './ScrollableNavigation';
import newsNavData from '../testHelpers/news';
import igboNavData from '../testHelpers/igbo';
import pidginNavData from '../testHelpers/pidgin';
import yorubaNavData from '../testHelpers/yoruba';
import arabicNavData from '../testHelpers/arabic';

import notes from '../README.md';

const navStoriesData = [
  {
    title: 'news',
    currentPageText: 'Current page',
    data: newsNavData,
  },
  {
    title: 'igbo',
    currentPageText: 'Current page',
    data: igboNavData,
  },
  {
    title: 'yoruba',
    currentPageText: 'Current page',
    data: yorubaNavData,
  },
  {
    title: 'arabic',
    currentPageText: 'Current page',
    data: arabicNavData,
    dir: 'rtl',
  },
];

const BackgroundContainer = styled.div`
  background-color: #000000;
  height: 100vh;
`;

const ToggledContainer = styled.div`
  background-color: #ffffff;
  float: left;
  clear: both;
  margin-top: 10px;
`;

const inputs = () => {
  // capitalization is only for presentation purpose on the knob
  const options = Object.keys(svgs)
    .filter(key => key !== 'BBC_BLOCKS')
    .map(key => key.charAt(0).toUpperCase() + key.slice(1));

  const svgChoice = select('Service SVG', options, 'News').toLowerCase();
  const productInput = text('Product', 'BBC News');
  const serviceLocalisedNameInput = text('Localised service name', 'News');
  const svgRatio = svgs[svgChoice].ratio;
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const minWidthInput = number('minimum svg width', svgRatio * svgMinHeight);
  const maxWidthInput = number('maximum svg width', svgRatio * svgMaxHeight);
  const svgHeightInput = number('desired height svg', svgMaxHeight);
  const borderBottom = boolean('Border Bottom', false);
  const borderTop = boolean('Border Top', false);

  return {
    productInput,
    serviceLocalisedNameInput,
    svgChoice,
    svgHeightInput,
    minWidthInput,
    maxWidthInput,
    borderTop,
    borderBottom,
    backgroundColour,
    logoColour,
  };
};

const getBrand = () => {
  const {
    productInput,
    serviceLocalisedNameInput,
    svgHeightInput,
    minWidthInput,
    maxWidthInput,
    svgChoice,
    borderBottom,
    borderTop,
  } = inputs();

  return (
    <Brand
      product={productInput}
      serviceLocalisedName={serviceLocalisedNameInput}
      svgHeight={svgHeightInput}
      minWidth={minWidthInput}
      maxWidth={maxWidthInput}
      svg={svgs[svgChoice]}
      url="https://www.bbc.com/news"
      borderBottom={borderBottom}
      borderTop={borderTop}
    />
  );
};

const dropdownNavigationStory = (
  currentPageText,
  navData,
  dir,
  isAmp,
  script,
  service,
) => (
  <>
    <Navigation script={script} service={service} dir={dir}>
      <ScrollableNavigation dir={dir}>
        <DropdownUl>
          {navData.map((item, index) => {
            const { title, url } = item;
            const active = index === 0;

            return (
              <DropdownLi
                key={title}
                url={url}
                script={script}
                active={active}
                currentPageText={currentPageText}
                service={service}
                dir={dir}
              >
                {title}
              </DropdownLi>
            );
          })}
        </DropdownUl>
      </ScrollableNavigation>
    </Navigation>
  </>
);

const navigationStory = (
  currentPageText,
  navData,
  dir,
  brand,
  isAmp,
  script,
  service,
) => (
  <>
    {brand && getBrand()}

    <Navigation script={script} service={service} dir={dir}>
      <ScrollableNavigation dir={dir}>
        <NavigationUl>
          {navData.map((item, index) => {
            const { title, url } = item;
            const active = index === 0;

            return (
              <NavigationLi
                key={title}
                url={url}
                script={script}
                active={active}
                currentPageText={currentPageText}
                service={service}
                dir={dir}
              >
                {title}
              </NavigationLi>
            );
          })}
        </NavigationUl>
      </ScrollableNavigation>
    </Navigation>
  </>
);

const animationStory = (dir, script, service) => {
  const isOpen = boolean('Open', false);
  return (
    <Navigation script={script} service={service} dir={dir}>
      <CanonicalDropdown isOpen={isOpen}>
        <DropdownUl>
          {pidginNavData.map((item, index) => {
            const active = index === 3;
            const { title, url } = item;
            return (
              <DropdownLi
                script={script}
                service={service}
                key={title}
                dir={dir}
                url={url}
                active={active}
                currentPageText="Current page"
              >
                {title}
              </DropdownLi>
            );
          })}
        </DropdownUl>
      </CanonicalDropdown>
    </Navigation>
  );
};

const canonicalStories = storiesOf('Components/Navigation/Canonical', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob());

navStoriesData.map(item => {
  const { title, currentPageText, data, dir } = item;
  const isAmp = false;

  return canonicalStories.add(
    title,
    ({ script, service }) =>
      navigationStory(
        currentPageText,
        data,
        dir,
        false,
        isAmp,
        script,
        service,
      ),
    {
      notes,
      knobs: { escapeHTML: false },
    },
  );
});

canonicalStories.add(
  'Canonical Menu Button',
  ({ dir, script }) => {
    const isOpen = boolean('Open', true);
    return (
      <BackgroundContainer>
        <CanonicalMenuButton
          announcedText="Menu"
          onClick={() => {}}
          isOpen={isOpen}
          dir={dir}
          script={script}
        />
      </BackgroundContainer>
    );
  },
  {
    notes,
    knobs: { escapeHTML: false },
  },
);

canonicalStories.add(
  'Dropdown animation',
  ({ dir, script, service }) => animationStory(dir, script, service),
  {
    notes,
  },
);

canonicalStories.add(
  'News with brand',
  ({ script, service }) =>
    navigationStory(
      navStoriesData[0].currentPageText,
      newsNavData,
      navStoriesData[0].dir,
      true,
      false,
      script,
      service,
    ),
  {
    notes,
    knobs: { escapeHTML: false },
  },
);

canonicalStories.add(
  'Dropdown Navigation',
  ({ script, service }) =>
    dropdownNavigationStory(
      navStoriesData[0].currentPageText,
      newsNavData,
      navStoriesData[0].dir,
      false,
      script,
      service,
    ),
  {
    notes,
    knobs: { escapeHTML: false },
  },
);

const ampStories = storiesOf('Components/Navigation/AMP', module)
  .addDecorator(ampDecorator)
  .addDecorator(withKnobs)
  .addDecorator(ampDecorator)
  .addDecorator(withServicesKnob());

navStoriesData.map(item => {
  const { title, currentPageText, data, dir } = item;
  const isAmp = true;

  return ampStories.add(
    title,
    ({ script, service }) =>
      navigationStory(
        currentPageText,
        data,
        dir,
        false,
        isAmp,
        script,
        service,
      ),
    {
      notes,
      knobs: { escapeHTML: false },
    },
  );
});

ampStories.add(
  'AMP Menu Button',
  ({ dir, script }) => (
    <BackgroundContainer>
      <AmpMenuButton
        announcedText="Menu"
        onToggle="other-element.toggleVisibility"
        dir={dir}
        script={script}
      />
      <ToggledContainer id="other-element">
        Toggled with AMP action
      </ToggledContainer>
    </BackgroundContainer>
  ),
  {
    notes,
  },
);
