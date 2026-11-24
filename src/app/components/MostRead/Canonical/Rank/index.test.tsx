import { render, screen } from '../../../react-testing-library-with-providers';
import MostReadRank from '.';

describe('MostReadRank', () => {
  it.each`
    dir      | service       | listIndex | numberOfItems | size         | columnLayout     | expectedRank
    ${'ltr'} | ${'pidgin'}   | ${1}      | ${5}          | ${'default'} | ${'oneColumn'}   | ${'1'}
    ${'ltr'} | ${'pidgin'}   | ${10}     | ${10}         | ${'default'} | ${'oneColumn'}   | ${'10'}
    ${'ltr'} | ${'pidgin'}   | ${1}      | ${5}          | ${'default'} | ${'twoColumn'}   | ${'1'}
    ${'ltr'} | ${'pidgin'}   | ${10}     | ${10}         | ${'default'} | ${'twoColumn'}   | ${'10'}
    ${'ltr'} | ${'pidgin'}   | ${1}      | ${5}          | ${'default'} | ${'multiColumn'} | ${'1'}
    ${'ltr'} | ${'pidgin'}   | ${10}     | ${10}         | ${'default'} | ${'multiColumn'} | ${'10'}
    ${'ltr'} | ${'pidgin'}   | ${1}      | ${5}          | ${'small'}   | ${'oneColumn'}   | ${'1'}
    ${'ltr'} | ${'pidgin'}   | ${10}     | ${10}         | ${'small'}   | ${'oneColumn'}   | ${'10'}
    ${'rtl'} | ${'persian'}  | ${1}      | ${5}          | ${'default'} | ${'oneColumn'}   | ${'۱'}
    ${'rtl'} | ${'persian'}  | ${10}     | ${10}         | ${'default'} | ${'oneColumn'}   | ${'۱۰'}
    ${'rtl'} | ${'persian'}  | ${1}      | ${5}          | ${'default'} | ${'twoColumn'}   | ${'۱'}
    ${'rtl'} | ${'persian'}  | ${10}     | ${10}         | ${'default'} | ${'twoColumn'}   | ${'۱۰'}
    ${'rtl'} | ${'persian'}  | ${1}      | ${5}          | ${'default'} | ${'multiColumn'} | ${'۱'}
    ${'rtl'} | ${'persian'}  | ${10}     | ${10}         | ${'default'} | ${'multiColumn'} | ${'۱۰'}
    ${'rtl'} | ${'persian'}  | ${1}      | ${5}          | ${'small'}   | ${'oneColumn'}   | ${'۱'}
    ${'rtl'} | ${'persian'}  | ${10}     | ${10}         | ${'small'}   | ${'oneColumn'}   | ${'۱۰'}
    ${'ltr'} | ${'japanese'} | ${1}      | ${5}          | ${'default'} | ${'oneColumn'}   | ${'1'}
    ${'ltr'} | ${'bengali'}  | ${1}      | ${5}          | ${'default'} | ${'oneColumn'}   | ${'১'}
  `(
    'should render as expected when dir=$dir, service=$service, listIndex=$listIndex, numberOfItems=$numberOfItems, size=$size, columnLayout=$columnLayout',
    ({
      dir,
      service,
      listIndex,
      numberOfItems,
      size,
      columnLayout,
      expectedRank,
    }) => {
      render(
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

      const rank = screen.getByText(expectedRank);

      expect(rank).toHaveAttribute('data-e2e', 'most-read-rank');
      expect(rank.closest(`[dir="${dir}"]`)).toBeInTheDocument();
    },
  );
});
