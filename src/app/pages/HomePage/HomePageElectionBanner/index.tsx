import { use } from 'react';
import ElectionBanner from '#app/components/ElectionBanner';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useToggle from '#app/hooks/useToggle';
import './index.scss';

// The homepage isn't tied to specific content, so unlike Article/Topic pages
// it doesn't need isElectionBannerVisible's tag-matching: it's eligible
// whenever the toggle is on and the service has an Associated Press banner.
const HomePageElectionBanner = () => {
  const { electionBanner } = use(ServiceContext);
  const { enabled: electionBannerEnabled } = useToggle('electionBanner');

  const shouldShowElectionBanner = Boolean(
    electionBannerEnabled && electionBanner?.assocPressIframeSrc,
  );

  if (!shouldShowElectionBanner) return null;

  return (
    <ElectionBanner
      overrideClassnames={{ assocPressWrapper: 'home-page-election-banner' }}
    />
  );
};

export default HomePageElectionBanner;
