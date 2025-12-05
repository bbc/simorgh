import { use } from 'react';
import { Helmet } from 'react-helmet';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import { ServiceContext } from '../../../contexts/ServiceContext';

const ManifestContainer = () => {
  const { manifestPath } = use(ServiceContext);

  // TODO: Try to get variant in ManifestContainer
  const pwaPromoBannerExperimentName = 'newswb_ws_mundo_pwa_prompt';
  const pwaPromoBannerVariant = useOptimizelyVariation({
    experimentName: pwaPromoBannerExperimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  const isExperimentEnabled = Boolean(pwaPromoBannerVariant);

  console.log(`ManifestContainer`, {
    pwaPromoBannerVariant,
    isExperimentEnabled,
  });

  if (!manifestPath) {
    return null;
  }

  return (
    <Helmet>
      <link rel="manifest" href={`${manifestPath}`} />
    </Helmet>
  );
};

export default ManifestContainer;
