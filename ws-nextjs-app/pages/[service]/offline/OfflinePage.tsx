import { use } from 'react';
import Helmet from 'react-helmet';
import { ServiceContext } from '#contexts/ServiceContext';
import ErrorMain from '#app/legacy/components/ErrorMain';
import { useOfflinePageFlag } from '#app/hooks/useOfflinePageFlag';

const OfflinePage = () => {
  const { service, dir, script } = use(ServiceContext);

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
