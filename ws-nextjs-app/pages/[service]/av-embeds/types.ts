import { MediaBlock } from '#app/components/MediaLoader/types';

export type AvEmbedsPageProps = {
  pageData: {
    input: Record<string, unknown>;
    output: Record<string, unknown>;
    mediaBlock: MediaBlock[];
  };
};
