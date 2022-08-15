import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { latin, arabic } from '#psammead/gel-foundations/src/scripts';
import MostReadRank from '.';

describe('MostReadRank', () => {
  shouldMatchSnapshot(
    'should render ltr correctly',
    <MostReadRank
      service="news"
      script={latin}
      listIndex={1}
      numberOfItems={5}
      dir="ltr"
    />,
  );

  shouldMatchSnapshot(
    'should render ltr with double digits correctly',
    <MostReadRank
      service="news"
      script={latin}
      listIndex={10}
      numberOfItems={10}
      dir="ltr"
    />,
  );

  shouldMatchSnapshot(
    'should render rtl correctly',
    <MostReadRank
      service="persian"
      script={arabic}
      listIndex={1}
      numberOfItems={5}
      dir="rtl"
    />,
  );

  shouldMatchSnapshot(
    'should render rtl with double digits correctly',
    <MostReadRank
      service="persian"
      script={arabic}
      listIndex={10}
      numberOfItems={10}
      dir="rtl"
    />,
  );
});
