import React, { useContext } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import { paragraphModelPropTypes } from '../../models/propTypes/paragraph';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';

const componentsToRender = { fragment, urlLink: InlineLink };

const ParagraphContainer = ({ blocks }) => {
  const { script, service } = useContext(ServiceContext);

  return (
    <GridItemConstrainedMedium>
      <p script={script} service={service}>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </p>
    </GridItemConstrainedMedium>
  );
};

ParagraphContainer.propTypes = paragraphModelPropTypes;

export default ParagraphContainer;
