import React, { useContext } from 'react';
import { paragraphModelPropTypes } from '#models/propTypes/paragraph';
import { GridItemMedium } from '#components/Grid';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import Inline from '../InlineContainer';
import Paragraph from '../../../components/Paragraph';
import styles from './index.styles';

const componentsToRender = { fragment, urlLink: InlineLink, inline: Inline };

const ParagraphContainer = ({ blocks, isPost }) => {
  const { dir } = useContext(ServiceContext);

  return (
    <GridItemMedium>
      <Paragraph
        dir={dir}
        css={isPost ? styles.postParagraph : styles.paragraph}
      >
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </Paragraph>
    </GridItemMedium>
  );
};

ParagraphContainer.propTypes = paragraphModelPropTypes;

export default ParagraphContainer;
