import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import * as svgs from './svgs';

const bbcBlocks = ['BBC_BLOCKS', 'BBC_BLOCKS_DARK_MODE'];

const icons = ['coreIcons', 'mediaIcons', 'navigationIcons'];

const svgWithoutViewBox = [...bbcBlocks, ...icons];

Object.keys(svgs)
  .filter(svgName => !svgWithoutViewBox.includes(svgName))
  .forEach(svgName => {
    describe(`${svgName} SVG`, () => {
      shouldMatchSnapshot(
        'should render correctly',
        <svg
          viewBox={`${svgs[svgName].viewbox.width} ${svgs[svgName].viewbox.height}`}
        >
          {svgs[svgName].group}
        </svg>,
      );
    });
  });

// SVGs without viewbox
Object.keys(svgs)
  .filter(svgName => svgWithoutViewBox.includes(svgName))
  .forEach(svgName => {
    describe(`${svgName} SVG`, () => {
      it('should render correctly', () => {
        expect(svgs[svgName]).toMatchSnapshot();
      });
    });
  });
