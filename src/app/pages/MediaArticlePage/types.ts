import { ATIData } from '../../components/ATIAnalytics/types';
import { MetadataTaggings } from '../../models/types/metadata';
import { OptimoBlock } from '../../models/types/optimo';

export type MediaArticlePageProps = {
  pageData: {
    content: object;
    metadata: {
      passport: {
        language: string;
        home: string;
        taggings: MetadataTaggings;
        predicates: {
          infoClass: { value: string; type: string }[];
          primaryMediaType: { value: string; type: string }[];
        };
        category?: {
          categoryName: string;
        };
      };
      analyticsLabels?: {
        producer: string;
      };
      atiAnalytics: ATIData;
      type: string;
    };
    promo: object;
  };
};

export type ComponentToRenderProps = {
  blocks: OptimoBlock[];
};

export type TimestampProps = {
  firstPublished: number;
  lastPublished: number;
  popOut: boolean;
  minutesTolerance?: number;
  className: string;
};

export type EmbedHtmlProps = {
  embeddableContent: string;
};
