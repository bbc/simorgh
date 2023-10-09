import { OptimoBlock } from '#models/types/optimo';

interface ListItems {
  type: string;
  model: { blocks: OptimoBlock[] };
}

interface SummaryUnorderedList {
  type: string;
  model: { blocks: ListItems[] };
}

export interface SummaryListWrapper {
  type: string;
  model: { blocks: SummaryUnorderedList[] };
}

export interface SummaryContent {
  model: {
    blocks: SummaryListWrapper[] | [];
  };
}

export type ComponentToRenderProps = {
  blocks: OptimoBlock[];
  className: string;
  blockGroupType?: string;
  blockGroupIndex?: number;
};
