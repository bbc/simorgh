import Blocks from '../Blocks';
import unorderedList from '../BulletedList';
import paragraph from '../Paragraph';

const TextContainer = ({
  blocks,
  componentsToRender = {
    paragraph,
    unorderedList,
    orderedList: unorderedList,
  },
}) => {
  if (!blocks) return null;

  return <Blocks blocks={blocks} componentsToRender={componentsToRender} />;
};

export default TextContainer;
