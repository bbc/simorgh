import filterForBlockType from '#lib/utilities/blockHandlers';
import type {
  OptimoBlock,
  OptimoRawImageBlock,
} from '#app/models/types/optimo';

interface PromoImageData {
  altText: string;
  rawBlock?: OptimoRawImageBlock;
}

const extractPromoImage = (blocks: OptimoBlock[]): PromoImageData => {
  if (!blocks.length) {
    return {
      altText: '',
      rawBlock: undefined,
    };
  }

  const altTextBlock = filterForBlockType(blocks, 'altText');
  const rawBlock = filterForBlockType(blocks, 'rawImage') as
    | OptimoRawImageBlock
    | undefined;

  const altText =
    altTextBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  return {
    altText: altText || '',
    rawBlock,
  };
};

export default extractPromoImage;
