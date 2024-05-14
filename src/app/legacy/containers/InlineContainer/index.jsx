import React, { useContext } from 'react';
import { ServiceContext } from '../../../contexts/ServiceContext';
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

export default InlineContainer;
