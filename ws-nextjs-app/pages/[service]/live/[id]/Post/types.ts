import { OptimoBlock } from '#models/types/optimo';

interface Link {
  url: string;
  scheme: string;
  host: string;
  path: string;
}

interface Titles {
  title: string | null;
  source: string;
}

interface Descriptions {
  text: string | null;
  source: string;
}

interface Images {
  url: string | null;
  originalUrl: string | null;
  altText: string | null;
  copyright: string | null;
  urlTemplate: string | null;
}

export interface Page {
  index: number;
  total: number;
}

export interface Post {
  typeCode?: string | null;
  header: { model: { blocks: OptimoBlock[] } };
  content: { model: { blocks: OptimoBlock[] } };
  link: Link | null;
  urn: string;
  type: string;
  options: {
    isBreakingNews?: boolean;
  };
  dates: {
    firstPublished: string;
    lastPublished: string;
    time?: string | null;
    curated: string;
  };
  titles: Titles[];
  descriptions: Descriptions[];
  images: Images[];
}

export interface StreamResponse {
  data: {
    results: Post[] | [];
    page?: Page | null;
  };
}
export interface PostHeadingBlock {
  id: string;
  type: 'headline' | 'subheadline';
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              model: { text: string; blocks: OptimoBlock[] };
            },
          ];
        };
      },
    ];
  };
}

export type ComponentToRenderProps = {
  blocks: OptimoBlock[];
  className: string;
  blockGroupType?: string;
  blockGroupIndex?: number;
};
