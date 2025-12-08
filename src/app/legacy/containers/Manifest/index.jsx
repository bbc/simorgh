import { use } from 'react';
import { Helmet } from 'react-helmet';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import { ServiceContext } from '../../../contexts/ServiceContext';

const ManifestContainer = () => {
  const { manifestPath: originalManifestPath } = use(ServiceContext);

  // EXPERIMENT: PWA Promotional Banner Mundo
  // TODO: Try to get variant in ManifestContainer
  const pwaPromoBannerExperimentName = 'newswb_ws_mundo_pwa_prompt';
  const pwaPromoBannerVariant = useOptimizelyVariation({
    experimentName: pwaPromoBannerExperimentName,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  const isExperimentEnabled = Boolean(pwaPromoBannerVariant);

  // eslint-disable-next-line no-console

  const manifestPath = isExperimentEnabled
    ? '/mundo/manifest-experiment.json'
    : originalManifestPath;

  // eslint-disable-next-line no-console
  console.log(`ManifestContainer`, {
    pwaPromoBannerVariant,
    isExperimentEnabled,
    manifestPath,
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
