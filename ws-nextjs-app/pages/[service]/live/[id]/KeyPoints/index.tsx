/** @jsx jsx */

import { useContext } from 'react';
import { jsx, useTheme } from '@emotion/react';
import Heading from '#app/components/Heading';
import LegacyText from '#app/legacy/containers/Text';
import LegacyParagraph from '#app/legacy/containers/Paragraph';
import BulletedList from '#app/legacy/containers/BulletedList';
import Blocks from '#app/legacy/containers/Blocks';
import { ServiceContext } from '#contexts/ServiceContext';
import styles from './styles';
import { KeyPointsContent, ComponentToRenderProps } from './types';

const KeyPoints = ({
  keyPointsContent,
}: {
  keyPointsContent: KeyPointsContent[];
}) => {
  const {
    palette: { GREY_10 },
  } = useTheme();

  const {
    translations: {
      liveExperiencePage: { summary = 'Summary' },
    },
  } = useContext(ServiceContext);

  const listItems = keyPointsContent?.[0]?.model?.blocks?.[0]?.model?.blocks;
  if (!listItems || listItems.length === 0) return null;
  const hasSingleKeyPoint = listItems.length === 1;
  const singleKeyPointComponentsToRender = { paragraph: LegacyParagraph };

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
          orderedList: () => <></>,
          paragraph: () => <></>,
        }}
      />
    ),
  });

  return (
    <section role="region" aria-label={summary} data-e2e="key-points">
      <Heading level={2} css={styles.headingStyles}>
        {summary}
      </Heading>
      <div css={styles.bodyStyles}>
        {hasSingleKeyPoint ? (
          <Blocks
            blocks={listItems[0].model.blocks}
            componentsToRender={singleKeyPointComponentsToRender}
          />
        ) : (
          <Blocks
            blocks={keyPointsContent}
            componentsToRender={componentsToRender()}
          />
        )}
      </div>
    </section>
  );
};

export default KeyPoints;
