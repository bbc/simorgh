import { use } from 'react';
import ElectionBanner from '#app/components/ElectionBanner';
import isElectionBannerVisible from '#app/components/ElectionBanner/utilities';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useToggle from '#app/hooks/useToggle';
import './index.scss';

type Props = {
  curationIds: string[];
};

// Topic pages only support the Associated Press variant, and are eligible
// when one of the page's curations matches the service's configured ones.
const TopicPageElectionBanner = ({ curationIds }: Props) => {
  const { electionBanner } = use(ServiceContext);
  const { enabled: electionBannerEnabled } = useToggle('electionBanner');

  const shouldShowElectionBanner =
    Boolean(electionBanner?.assocPressIframeSrc) &&
    isElectionBannerVisible({
      curationIds,
      electionBannerEnabled,
      electionCurationIds: electionBanner?.electionCurationIds,
    });

  if (!shouldShowElectionBanner) return null;

  return (
    <ElectionBanner
      overrideClassnames={{
        assocPressWrapper: 'topic-page-election-banner',
        title: 'topic-page-election-banner-title',
      }}
    />
  );
};

export default TopicPageElectionBanner;
