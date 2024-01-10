/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@storybook/theming';
import Text from '#app/components/Text';
import pathOr from 'ramda/src/pathOr';
import Fragment from '#app/legacy/containers/Fragment';
import InlineLink from '#app/components/InlineLink';
import Inline from '#app/legacy/containers/PodcastPromo/Inline';
import Blocks, { Block } from '../Blocks';

type Props = {
  block: Block;
  type: string;
};

// TODO: ELEVATE COMPONENTS TO TS
const componentsToRender = {
  fragment: Fragment,
  urlLink: InlineLink,
  inline: Inline,
};

const renderParagraph = (block: Block) => {
  const paragraphBlock = pathOr(null, ['model', 'blocks'], block);
  if (paragraphBlock) {
    return (
      <p key={pathOr(null, ['0', 'id'], paragraphBlock)}>
        <Blocks
          blocks={paragraphBlock}
          componentsToRender={componentsToRender}
        />
      </p>
    );
  }
  return null;
};

const Caption = ({ block }: Props) => {
  const paragraph = block.model.blocks?.[0]?.model?.blocks;
  if (paragraph) {
    return (
      <div>
        <Text> {paragraph.map(fragment => renderParagraph(fragment))}</Text>
      </div>
    );
  }
  return null;
};

export default Caption;
