import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import TopBarOJs from '../TopBarOJs';
import LivePromo from './LivePromo';
import { getLivePageBlock } from './helpers/getPromoDetails';

interface LivePagePromoExperimentProps {
  blocks: TopStoryItem[];
  id?: string;
}

const LivePagePromoExperiment = ({
  blocks,
  id,
}: LivePagePromoExperimentProps) => {
  const livePageBlock = getLivePageBlock(blocks);

  if (livePageBlock) {
    return <LivePromo block={livePageBlock} />;
  }

  return <TopBarOJs blocks={blocks} id={id} />;
};

export default LivePagePromoExperiment;
