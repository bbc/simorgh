import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { latin, arabic } from '#psammead/gel-foundations/src/scripts';
import Caption from '.';

describe('Caption', () => {
  shouldMatchSnapshot(
    'should render with some offscreen text',
    <Caption script={latin} service="news">
      This is some Caption text
      <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>
    </Caption>,
  );

  shouldMatchSnapshot(
    'should render with some offscreen text and arabic script typography values',
    <Caption script={arabic} service="persian">
      هذا هو بعض النص التسمية التوضيحي
      <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>
    </Caption>,
  );
});
