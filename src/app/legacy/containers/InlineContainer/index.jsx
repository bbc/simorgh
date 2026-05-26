import InlineSpan from '../../components/InlineSpan';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';

const componentsToRender = { fragment, urlLink: InlineLink };

const InlineContainer = ({ blocks, language }) => (
  <InlineSpan lang={language}>
    <Blocks blocks={blocks} componentsToRender={componentsToRender} />
  </InlineSpan>
);

export default InlineContainer;
