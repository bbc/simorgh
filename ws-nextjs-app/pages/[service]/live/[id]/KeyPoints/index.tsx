import React, { use } from 'react';
import Heading from '#app/components/Heading';
import LegacyText from '#app/legacy/containers/Text';
import LegacyParagraph from '#app/legacy/containers/Paragraph';
import BulletedList from '#app/legacy/containers/BulletedList';
import Blocks from '#app/legacy/containers/Blocks';
import { ServiceContext } from '#contexts/ServiceContext';
import { KeyPointsContent, ComponentToRenderProps } from './types';

const KeyPoints = ({
  keyPointsContent,
}: {
  keyPointsContent: KeyPointsContent[];
}) => {
  const {
    translations: {
      liveExperiencePage: { summary = 'Summary' },
    },
  } = use(ServiceContext);

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
              bulletPointColour="#F6F6F6"
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
      <Heading level={2} className="p-4 pt-4 pb-8 group-2:pt-0 group-3:text-doublePica group-4:pt-8">
        {summary}
      </Heading>
      <div className="text-grey-10 bg-grey-2 border-[0.1875rem] border-transparent p-8 px-4 pb-8 group-2:p-8 group-2:px-0 group-2:pb-8 group-4:p-8 group-4:px-8 group-4:pb-8 [&_li]:ps-[0.1875rem] [&_li:last-child]:mb-0 [&_ul]:ps-8 [&_ul]:mb-0 [&_p]:pb-0 [&_a]:text-grey-10 [&_a]:font-sansBold [&_a]:border-b [&_a]:border-grey-10 [&_a:visited]:text-grey-6">
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
