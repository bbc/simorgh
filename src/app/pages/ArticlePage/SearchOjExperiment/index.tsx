import { useEffect, useState } from 'react';
import Recommendations from '#app/components/Recommendations';
import useNearViewport from '#app/hooks/useNearViewport';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import { ComponentExperimentProps } from '#app/models/types/global';
import { Recommendation } from '#app/models/types/onwardJourney';
import {
  isSearchOjVariant,
  MID_ARTICLE_OJ_EXPERIMENT_TRIGGER_ID,
  SEARCH_OJ_EXPERIMENT_NAME,
  SearchOjVariant,
} from './config';

type ActivateSearchOjExperimentProps = {
  onDecision: (variation: SearchOjVariant | null) => void;
};

type SearchOjExperimentProps = {
  data: Recommendation[];
  hasExpandedContinueReading?: boolean;
};

const ActivateSearchOjExperiment = ({
  onDecision,
}: ActivateSearchOjExperimentProps) => {
  const variation = useOptimizelyVariation({
    experimentName: SEARCH_OJ_EXPERIMENT_NAME,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  useEffect(() => {
    if (variation !== null) {
      onDecision(isSearchOjVariant(variation) ? variation : null);
    }
  }, [onDecision, variation]);

  return null;
};

const SearchOjExperiment = ({
  data,
  hasExpandedContinueReading = false,
}: SearchOjExperimentProps) => {
  // keep the variation here so the whole article does not rerender
  const [experimentVariant, setExperimentVariant] =
    useState<SearchOjVariant | null>(null);

  const hasReachedMidArticleOj = useNearViewport({
    elementId: MID_ARTICLE_OJ_EXPERIMENT_TRIGGER_ID,
    bottomViewportMargin: 1,
  });

  // only valid optimizely variations are added to tracking
  const experimentProps: ComponentExperimentProps | undefined =
    experimentVariant
      ? {
          experimentName: SEARCH_OJ_EXPERIMENT_NAME,
          experimentVariant,
          sendOptimizelyEvents: true,
        }
      : undefined;

  return (
    <>
      {/* the id is on the real oj so missing content cannot trigger bucketing */}
      <Recommendations
        data={data}
        experimentProps={experimentProps}
        id={MID_ARTICLE_OJ_EXPERIMENT_TRIGGER_ID}
      />
      {/* the activation component is mounted only after the reader reaches the oj */}
      {(hasReachedMidArticleOj || hasExpandedContinueReading) && (
        <ActivateSearchOjExperiment onDecision={setExperimentVariant} />
      )}
    </>
  );
};

export default SearchOjExperiment;
