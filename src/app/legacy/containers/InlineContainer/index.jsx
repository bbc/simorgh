import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import InlineSpan from '../../components/InlineSpan';

const componentsToRender = { fragment, urlLink: InlineLink };

const InlineContainer = ({ blocks, language }) => (
  <InlineSpan lang={language}>
    <Blocks blocks={blocks} componentsToRender={componentsToRender} />
  </InlineSpan>
);

export default InlineContainer;
