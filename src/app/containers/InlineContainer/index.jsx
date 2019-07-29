import React, { useContext } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import InlineSpan from '../../components/InlineSpan';
import inlineBlockPropTypes from '../../models/propTypes/inline';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';

const componentsToRender = { fragment, urlLink: InlineLink };

const InlineContainer = ({ blocks, language }) => {
  const { script, service } = useContext(ServiceContext);

  return (
    <GridItemConstrainedMedium>
      <InlineSpan lang={language} script={script} service={service}>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </InlineSpan>
    </GridItemConstrainedMedium>
  );
};

InlineContainer.propTypes = inlineBlockPropTypes;

export default InlineContainer;
