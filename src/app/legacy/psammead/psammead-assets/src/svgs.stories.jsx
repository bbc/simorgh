import React from 'react';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import { GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';
import notes from '../README.md';
import * as allSvgs from './svgs';

const { coreIcons, mediaIcons, navigationIcons, ...svgs } = allSvgs;

// `currentColor` has been used to address high contrast mode in Firefox.
const Svg = styled.svg`
  display: block;
  color: #fff;
  fill: currentColor;
`;

const Container = styled.div`
  background-color: black;
  padding: ${GEL_SPACING_DBL};
  height: 100vh;
`;

const getSVG = ({
  group = svgs.news.group,
  ratio = svgs.news.ratio,
  viewbox = {
    width: 167.95,
    height: 24,
  },
  height = 24,
}) => {
  const width = height * ratio;

  return (
    <Container>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        aria-hidden="true"
        viewBox={`0 0 ${viewbox.width} ${viewbox.height}`}
        height={height}
        width={width}
      >
        {group}
      </Svg>
    </Container>
  );
};

const stories = storiesOf('Utilities/SVGS/Brand Svgs', module);
Object.keys(svgs)
  .filter(svgName => !svgName.includes('BBC_BLOCKS'))
  .forEach(svgName => {
    stories.add(
      svgName,
      () => {
        const height = 24;
        return getSVG({ ...svgs[svgName], height });
      },
      { notes, chromatic: { disable: true } },
    );
  });

const coreIconStories = storiesOf('Utilities/SVGS/CoreIcons Svgs', module);

const mediaIconStories = storiesOf('Utilities/SVGS/MediaIcons Svgs', module);

const navigationIconsStories = storiesOf(
  'Utilities/SVGS/NavigationIcons Svgs',
  module,
);

Object.keys(coreIcons).forEach(iconName => {
  coreIconStories.add(iconName, () => coreIcons[iconName], {
    notes,
    chromatic: { disable: true },
  });
});

Object.keys(mediaIcons).forEach(iconName => {
  mediaIconStories.add(iconName, () => mediaIcons[iconName], {
    notes,
    chromatic: { disable: true },
  });
});

Object.keys(navigationIcons).forEach(iconName => {
  navigationIconsStories.add(
    iconName,
    () => <Container> {navigationIcons[iconName]} </Container>,
    {
      notes,
      chromatic: { disable: true },
    },
  );
});
