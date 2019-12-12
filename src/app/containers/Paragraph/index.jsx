import React, { useContext } from 'react';
import Paragraph from '@bbc/psammead-paragraph';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import Inline from '../InlineContainer';
import { paragraphModelPropTypes } from '#models/propTypes/paragraph';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const componentsToRender = { fragment, urlLink: InlineLink, inline: Inline };

const ParagraphContainer = ({ blocks }) => {
  const { script, service } = useContext(ServiceContext);

  return (
    <GridItemConstrainedMedium>
      <Paragraph script={script} service={service}>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </Paragraph>
    </GridItemConstrainedMedium>
  );
};

ParagraphContainer.propTypes = paragraphModelPropTypes;

export default ParagraphContainer;
