import { OptimoBlock } from '#models/types/optimo';

interface ListItems {
  type: string;
  model: { blocks: OptimoBlock[] };
}

interface KeyPointsUnorderedList {
  type: string;
  model: { blocks: ListItems[] | [] };
}

export interface KeyPointsContent {
  type: string;
  model: { blocks: KeyPointsUnorderedList[] };
}

export interface KeyPointsResponse {
  model: {
    blocks: KeyPointsContent[];
  };
}

export type ComponentToRenderProps = {
  blocks: OptimoBlock[];
  className: string;
  blockGroupType?: string;
  blockGroupIndex?: number;
};
