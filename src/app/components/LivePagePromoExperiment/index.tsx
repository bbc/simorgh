import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import LivePromo from './LivePromo';
import { getLivePageBlock } from './helpers/getPromoDetails';

interface LivePagePromoExperimentProps {
  blocks: TopStoryItem[];
}

const LivePagePromoExperiment = ({ blocks }: LivePagePromoExperimentProps) => {
  const livePageBlock = getLivePageBlock(blocks);

  if (!livePageBlock) {
    return null;
  }

  return <LivePromo block={livePageBlock} />;
};

export default LivePagePromoExperiment;
