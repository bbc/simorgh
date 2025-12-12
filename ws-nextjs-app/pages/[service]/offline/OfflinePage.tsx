import { use } from 'react';
import Helmet from 'react-helmet';
import { ServiceContext } from '#contexts/ServiceContext';
import ErrorMain from '#app/legacy/components/ErrorMain';
import useOfflinePageTracker from '#app/hooks/useOfflinePageTracker';
import useConnectionBackOnlineTracker from '#app/hooks/useConnectionBackOnlineTracker';

const OfflinePage = () => {
  const { service, dir, script } = use(ServiceContext);

  // Track offline page visit (sets flag in localStorage, PWA only)
  useOfflinePageTracker();

  // Track network back online (general)
  useConnectionBackOnlineTracker();

  const title = 'You are offline';
  const message =
    "It seems you don't have an internet connection at the moment. Please check your connection and reload the page.";
  const solutions = [
    'Check your internet connection',
    'Refresh the page when your connection is restored',
  ];

  return (
    <>
      <Helmet htmlAttributes={{ dir, lang: service }}>
        <title>{title}</title>
      </Helmet>
      <ErrorMain
        statusCode={null}
        title={title}
        message={message}
        solutions={solutions}
        callToActionLinkText=""
        callToActionLinkUrl=""
        script={script}
        service={service}
      />
    </>
  );
};

export default OfflinePage;
