import { v4 as uuid } from 'uuid';
import lensPath from 'ramda/src/lensPath';
import view from 'ramda/src/view';
import set from 'ramda/src/set';

interface AddIdsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lens: any;
  customKeyName?: string;
  recursive?: boolean;
}

const addIdsToItem =
  <BlockType>({ lens, customKeyName, recursive }: AddIdsProps) =>
  (item: BlockType): BlockType => {
    const [shortId] = uuid().split('-');
    const newItem = { [customKeyName || 'id']: shortId, ...item };

    if (recursive) {
      const nestedItems: BlockType[] = view(lens, newItem);

      if (nestedItems) {
        return set(
          lens,
          nestedItems.map(addIdsToItem({ lens, recursive })),
          newItem,
        );
      }
    }

    return newItem;
  };

interface Props {
  pathToItems: string[];
  customKeyName?: string;
  recursive?: boolean;
}

export default <ContentType, BlockType>({
    pathToItems,
    customKeyName,
    recursive,
  }: Props) =>
  (content: ContentType): ContentType => {
    const lens = lensPath(pathToItems);
    const items = view(lens, content);

    if (items) {
      const newItems = items.map(
        addIdsToItem<BlockType>({ lens, customKeyName, recursive }),
      );

      return set(lens, newItems, content);
    }

    return content;
  };
