import { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { inlineModelPropTypes } from '#models/propTypes/inline';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import InlineSpan from '../../components/InlineSpan';

const componentsToRender = { fragment, urlLink: InlineLink };

const InlineContainer = ({ blocks, language }) => {
  const { script, service } = useContext(ServiceContext);
  return (
    <InlineSpan lang={language} script={script} service={service}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </InlineSpan>
  );
};

InlineContainer.propTypes = inlineModelPropTypes;

export default InlineContainer;
