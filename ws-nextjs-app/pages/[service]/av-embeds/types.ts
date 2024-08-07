import { MediaBlock } from '#app/components/MediaLoader/types';

export type AvEmbedsPageProps = {
  pageData: {
    input: string;
    output: Record<string, unknown>;
    mediaBlock?: MediaBlock[];
  };
};
