import Paragraph from '../Paragraph';
import unorderedList from '../BulletedList';
import Blocks from '../Blocks';

const ArticleParagraph = props => <Paragraph {...props} isArticleBody />;

const TextContainer = ({
  blocks,
  isArticleBody = false,
  componentsToRender = {
    paragraph: isArticleBody ? ArticleParagraph : Paragraph,
    unorderedList,
    orderedList: unorderedList,
  },
}) => {
  if (!blocks) return null;

  return <Blocks blocks={blocks} componentsToRender={componentsToRender} />;
};

export default TextContainer;
