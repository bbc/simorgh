import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { latin } from '#psammead/gel-foundations/src/scripts';
import Byline from './index';

describe('Byline', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Byline
      service="news"
      script={latin}
      avatar={{ src: 'http://www.bbc.co.uk/john-smith.jpg' }}
      name="John Smith"
      title="Art editor"
    />,
  );
  shouldMatchSnapshot(
    'should render correctly without an avatar',
    <Byline
      service="news"
      script={latin}
      name="By John Smith"
      title="Art editor"
    />,
  );
});
