import React from 'react';
import styled from '@emotion/styled';
import { node, number, shape } from 'prop-types';
import { storiesOf } from '@storybook/react';
import { number as numberKnob, withKnobs } from '@storybook/addon-knobs';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
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

const getSVG = ({ group, ratio, viewbox, height }) => {
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

getSVG.defaultProps = {
  group: svgs.news.group,
  ratio: svgs.news.ratio,
  viewbox: {
    width: 167.95,
    height: 24,
  },
  height: 24,
};

getSVG.propTypes = {
  group: node,
  ratio: number,
  viewbox: shape({
    height: number,
    width: number,
  }),
  height: number,
};

const stories = storiesOf('Utilities/SVGS/Brand Svgs', module).addDecorator(
  withKnobs,
);
Object.keys(svgs)
  .filter(svgName => !svgName.includes('BBC_BLOCKS'))
  .forEach(svgName => {
    stories.add(
      svgName,
      () => {
        const height = numberKnob('Height', 24);
        return getSVG({ ...svgs[svgName], height });
      },
      { notes, chromatic: { disable: true } },
    );
  });

const coreIconStories = storiesOf(
  'Utilities/SVGS/CoreIcons Svgs',
  module,
).addDecorator(withKnobs);

const mediaIconStories = storiesOf(
  'Utilities/SVGS/MediaIcons Svgs',
  module,
).addDecorator(withKnobs);

const navigationIconsStories = storiesOf(
  'Utilities/SVGS/NavigationIcons Svgs',
  module,
).addDecorator(withKnobs);

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
