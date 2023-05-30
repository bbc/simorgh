import React from 'react';
import { render } from '../../../../../components/react-testing-library-with-providers';
import latinScript from '../../../../../components/ThemeProvider/fontScripts/latin';
import arabicScript from '../../../../../components/ThemeProvider/fontScripts/arabic';
import noAscOrDescScript from '../../../../../components/ThemeProvider/fontScripts/noAscOrDesc';
import bengaliScript from '../../../../../components/ThemeProvider/fontScripts/bengali';
import MostReadRank from '.';

const fontScriptMap = {
  arabic: arabicScript,
  latin: latinScript,
  noAscOrDesc: noAscOrDescScript,
  bengali: bengaliScript,
};

describe('MostReadRank', () => {
  it.each`
    dir      | service       | script           | listIndex | numberOfItems | size         | columnLayout
    ${'ltr'} | ${'pidgin'}   | ${'latin'}       | ${1}      | ${5}          | ${'default'} | ${'oneColumn'}
    ${'ltr'} | ${'pidgin'}   | ${'latin'}       | ${10}     | ${10}         | ${'default'} | ${'oneColumn'}
    ${'ltr'} | ${'pidgin'}   | ${'latin'}       | ${1}      | ${5}          | ${'default'} | ${'twoColumn'}
    ${'ltr'} | ${'pidgin'}   | ${'latin'}       | ${10}     | ${10}         | ${'default'} | ${'twoColumn'}
    ${'ltr'} | ${'pidgin'}   | ${'latin'}       | ${1}      | ${5}          | ${'default'} | ${'multiColumn'}
    ${'ltr'} | ${'pidgin'}   | ${'latin'}       | ${10}     | ${10}         | ${'default'} | ${'multiColumn'}
    ${'ltr'} | ${'pidgin'}   | ${'latin'}       | ${1}      | ${5}          | ${'small'}   | ${'oneColumn'}
    ${'ltr'} | ${'pidgin'}   | ${'latin'}       | ${10}     | ${10}         | ${'small'}   | ${'oneColumn'}
    ${'rtl'} | ${'persian'}  | ${'arabic'}      | ${1}      | ${5}          | ${'default'} | ${'oneColumn'}
    ${'rtl'} | ${'persian'}  | ${'arabic'}      | ${10}     | ${10}         | ${'default'} | ${'oneColumn'}
    ${'rtl'} | ${'persian'}  | ${'arabic'}      | ${1}      | ${5}          | ${'default'} | ${'twoColumn'}
    ${'rtl'} | ${'persian'}  | ${'arabic'}      | ${10}     | ${10}         | ${'default'} | ${'twoColumn'}
    ${'rtl'} | ${'persian'}  | ${'arabic'}      | ${1}      | ${5}          | ${'default'} | ${'multiColumn'}
    ${'rtl'} | ${'persian'}  | ${'arabic'}      | ${10}     | ${10}         | ${'default'} | ${'multiColumn'}
    ${'rtl'} | ${'persian'}  | ${'arabic'}      | ${1}      | ${5}          | ${'small'}   | ${'oneColumn'}
    ${'rtl'} | ${'persian'}  | ${'arabic'}      | ${10}     | ${10}         | ${'small'}   | ${'oneColumn'}
    ${'ltr'} | ${'japanese'} | ${'noAscOrDesc'} | ${1}      | ${5}          | ${'default'} | ${'oneColumn'}
    ${'ltr'} | ${'bengali'}  | ${'bengali'}     | ${1}      | ${5}          | ${'default'} | ${'oneColumn'}
  `(
    'should render as expected when dir=$dir, service=$service, script=$script, listIndex=$listIndex, numberOfItems=$numberOfItems, size=$size, columnLayout=$columnLayout',
    ({
      dir,
      service,
      script,
      listIndex,
      numberOfItems,
      size,
      columnLayout,
    }) => {
      const fontScript = fontScriptMap[script];

      const { container } = render(
        <MostReadRank
          service={service}
          script={fontScript}
          listIndex={listIndex}
          numberOfItems={numberOfItems}
          dir={dir}
          size={size}
          columnLayout={columnLayout}
        />,
      );
      expect(container).toMatchSnapshot();
    },
  );
});
