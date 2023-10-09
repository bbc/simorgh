/** @jsx jsx */

import { jsx, useTheme } from '@emotion/react';
import Heading from '#app/components/Heading';
import LegacyText from '#app/legacy/containers/Text';
import LegacyParagraph from '#app/legacy/containers/Paragraph';
import BulletedList from '#app/legacy/containers/BulletedList';
import Blocks from '#app/legacy/containers/Blocks';
import styles from './styles';
import { SummaryListWrapper, ComponentToRenderProps } from './types';

const KeyPoints = ({
  keyPointBlocks,
}: {
  keyPointBlocks: SummaryListWrapper[] | [];
}) => {
  const {
    palette: { GREY_10 },
  } = useTheme();

  if (!keyPointBlocks || keyPointBlocks.length === 0) return null;
  const listItems = keyPointBlocks[0].model.blocks[0].model.blocks;
  const hasSingleKeyPoint = listItems.length === 1;
  const singleKeyPointComponentsToRender = { paragraph: LegacyParagraph };

  // Requires translations
  const sectionTitle = 'Summary';

  const componentsToRender = () => ({
    text: (props: ComponentToRenderProps) => (
      <LegacyText
        blocks={props.blocks}
        componentsToRender={{
          unorderedList: innerProps => (
            <BulletedList
              {...innerProps}
              blocks={innerProps.blocks}
              bulletPointShape="square"
              bulletPointColour={GREY_10}
            />
          ),
        }}
      />
    ),
  });

  return (
    <section role="region" aria-label={sectionTitle}>
      <Heading level={2} css={styles.headingStyles}>
        {sectionTitle}
      </Heading>
      <div css={styles.bodyStyles}>
        {hasSingleKeyPoint ? (
          <Blocks
            blocks={listItems[0].model.blocks}
            componentsToRender={singleKeyPointComponentsToRender}
          />
        ) : (
          <Blocks
            blocks={keyPointBlocks}
            componentsToRender={componentsToRender()}
          />
        )}
      </div>
    </section>
  );
};

export default KeyPoints;
