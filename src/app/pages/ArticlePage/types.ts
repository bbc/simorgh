import { OptimoBlock } from '#app/models/types/optimo';

export type Block = Omit<OptimoBlock, 'model'> & {
  model: { blocks: OptimoBlock[] };
};

export type ComponentToRenderProps = {
  type: string;
  blocks: Block[];
};

export type TimeStampProps = {
  firstPublished: number;
  lastPublished: number;
};
