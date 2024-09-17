import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import MostReadRank from '.';

describe('MostReadRank', () => {
  it.each`
    dir      | service       | listIndex | numberOfItems | size         | columnLayout
    ${'ltr'} | ${'pidgin'}   | ${1}      | ${5}          | ${'default'} | ${'oneColumn'}
    ${'ltr'} | ${'pidgin'}   | ${10}     | ${10}         | ${'default'} | ${'oneColumn'}
    ${'ltr'} | ${'pidgin'}   | ${1}      | ${5}          | ${'default'} | ${'twoColumn'}
    ${'ltr'} | ${'pidgin'}   | ${10}     | ${10}         | ${'default'} | ${'twoColumn'}
    ${'ltr'} | ${'pidgin'}   | ${1}      | ${5}          | ${'default'} | ${'multiColumn'}
    ${'ltr'} | ${'pidgin'}   | ${10}     | ${10}         | ${'default'} | ${'multiColumn'}
    ${'ltr'} | ${'pidgin'}   | ${1}      | ${5}          | ${'small'}   | ${'oneColumn'}
    ${'ltr'} | ${'pidgin'}   | ${10}     | ${10}         | ${'small'}   | ${'oneColumn'}
    ${'rtl'} | ${'persian'}  | ${1}      | ${5}          | ${'default'} | ${'oneColumn'}
    ${'rtl'} | ${'persian'}  | ${10}     | ${10}         | ${'default'} | ${'oneColumn'}
    ${'rtl'} | ${'persian'}  | ${1}      | ${5}          | ${'default'} | ${'twoColumn'}
    ${'rtl'} | ${'persian'}  | ${10}     | ${10}         | ${'default'} | ${'twoColumn'}
    ${'rtl'} | ${'persian'}  | ${1}      | ${5}          | ${'default'} | ${'multiColumn'}
    ${'rtl'} | ${'persian'}  | ${10}     | ${10}         | ${'default'} | ${'multiColumn'}
    ${'rtl'} | ${'persian'}  | ${1}      | ${5}          | ${'small'}   | ${'oneColumn'}
    ${'rtl'} | ${'persian'}  | ${10}     | ${10}         | ${'small'}   | ${'oneColumn'}
    ${'ltr'} | ${'japanese'} | ${1}      | ${5}          | ${'default'} | ${'oneColumn'}
    ${'ltr'} | ${'bengali'}  | ${1}      | ${5}          | ${'default'} | ${'oneColumn'}
  `(
    'should render as expected when dir=$dir, service=$service, listIndex=$listIndex, numberOfItems=$numberOfItems, size=$size, columnLayout=$columnLayout',
    ({ dir, service, listIndex, numberOfItems, size, columnLayout }) => {
      const { container } = render(
        <MostReadRank
          service={service}
          listIndex={listIndex}
          numberOfItems={numberOfItems}
          dir={dir}
          size={size}
          columnLayout={columnLayout}
        />,
        { service },
      );
      expect(container).toMatchSnapshot();
    },
  );
});
