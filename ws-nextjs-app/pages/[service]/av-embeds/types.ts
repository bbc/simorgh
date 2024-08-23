import { MediaBlock } from '#app/components/MediaLoader/types';
import { Article } from '#app/models/types/optimo';

export type AvEmbedsPageProps = {
  pageData: Article & {
    mediaBlock: MediaBlock[];
    metadata: {
      assetId: string;
      language: string;
      mediaId: string | null;
      mediaDelimiter: string | null;
      service: string;
      type: string;
      variant: string;
    };
  };
};
