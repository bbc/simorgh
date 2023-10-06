import { OptimoBlock } from '#models/types/optimo';

interface OptimoTextBlock {
  type: 'text';
  model: {
    blocks: OptimoBlock[];
  };
}

interface OptimoUnorderedListBlock {
  type: 'unorderedList';
  model: {
    blocks: [
      {
        model: {
          blocks: OptimoBlock[];
        };
      },
    ];
  };
}

export interface SummaryList extends Omit<OptimoTextBlock, 'model'> {
  model: { blocks: [OptimoUnorderedListBlock] };
}

export interface SummaryContent {
  model: {
    blocks: SummaryList[] | [];
  };
}

export type ComponentToRenderProps = {
  blocks: OptimoBlock[];
  className: string;
  blockGroupType?: string;
  blockGroupIndex?: number;
};
