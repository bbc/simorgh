import { use } from 'react';
import Helmet from 'react-helmet';

import { useOfflinePageFlag } from '#app/hooks/useOfflinePageFlag';
import ErrorMain from '#app/legacy/components/ErrorMain';
import { ServiceContext } from '#contexts/ServiceContext';

const OfflinePage = () => {
  const { service, dir } = use(ServiceContext);

  // Track offline page visit (sets flag in localStorage, PWA only)
  useOfflinePageFlag();

  const title = 'You are offline';
  const message =
    'Looks like you’re not online right now. Please check your network and reconnect. Once you’re back, just refresh the page to continue.';
  const solutions = [
    'Check your internet connection',
    'Refresh the page when your connection is restored',
  ];

  return (
    <>
      <Helmet htmlAttributes={{ dir, lang: service }}>
        <title>{title}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <ErrorMain
        statusCode={null}
        title={title}
        message={message}
        solutions={solutions}
        callToActionLinkText=""
        callToActionLinkUrl=""
      />
    </>
  );
};

export default OfflinePage;
