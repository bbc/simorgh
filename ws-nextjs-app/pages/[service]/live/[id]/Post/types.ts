import {
  OptimoBlock,
  OptimoRawImageBlock,
  OptimoAltTextBlock,
} from '#models/types/optimo';

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

type ContributorRawImageBlock = Omit<
  OptimoRawImageBlock['model'],
  'suitableForSyndication'
>;

interface PostContributor {
  id: string;
  type: 'contributor';
  model: {
    name: string;
    link?: string;
    subtitle?: string;
    external: boolean;
    blocks:
      | {
          type: 'image';
          model: {
            blocks: (
              | (Omit<OptimoRawImageBlock, 'model'> & {
                  model: ContributorRawImageBlock;
                })
              | OptimoAltTextBlock
            )[];
          };
        }[]
      | [];
  };
}

interface PostHeadline {
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

export type PostHeadingBlock = PostHeadline | PostContributor;

export type ComponentToRenderProps = {
  blocks: OptimoBlock[];
  className: string;
  blockGroupType?: string;
  blockGroupIndex?: number;
};
