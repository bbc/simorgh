/** @jsx jsx */

import { jsx, useTheme } from '@emotion/react';
import Heading from '#app/components/Heading';
import LegacyText from '#app/legacy/containers/Text';
import LegacyParagraph from '#app/legacy/containers/Paragraph';
import BulletedList from '#app/legacy/containers/BulletedList';
import Blocks from '#app/legacy/containers/Blocks';
import styles from './styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const KeyPoints = ({ keyPointBlocks }: any) => {
  const {
    palette: { GREY_10 },
  } = useTheme();

  if (!keyPointBlocks) return null;
  const listItems = keyPointBlocks[0].model.blocks[0].model.blocks;
  const hasSingleKeyPoint = listItems.length === 1;
  const singleKeyPointComponentsToRender = { paragraph: LegacyParagraph };

  // Requires translations
  const sectionTitle = 'Summary';

  const componentsToRender = () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    text: (props: any) => (
      <LegacyText
        {...props}
        componentsToRender={{
          unorderedList: innerProps => (
            <BulletedList
              {...innerProps}
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
