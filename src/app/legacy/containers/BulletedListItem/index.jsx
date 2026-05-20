import { BulletedListItem } from '../../../components/BulletedList';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import inline from '../InlineContainer';
import InlineLink from '../InlineLink';

const withClickHandler = (Component, clickHandler) => props => (
  <Component {...props} onClick={clickHandler} />
);

const BulletedListItemContainer = ({ blocks, onClick }) => {
  const contentBlocks = blocks.flatMap(block => block.model.blocks || block);

  return (
    <BulletedListItem>
      <Blocks
        blocks={contentBlocks}
        componentsToRender={{
          fragment,
          inline,
          urlLink: onClick ? withClickHandler(InlineLink, onClick) : InlineLink,
        }}
      />
    </BulletedListItem>
  );
};

export default BulletedListItemContainer;
