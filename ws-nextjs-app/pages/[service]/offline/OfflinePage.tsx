import { use } from 'react';
import Helmet from 'react-helmet';
import { ServiceContext } from '#contexts/ServiceContext';
import ErrorMain from '#app/legacy/components/ErrorMain';
import { useOfflinePageFlag } from '#app/hooks/useOfflinePageFlag';
import MostRead from '#app/components/MostRead/Canonical';
import { MostReadData } from '#app/components/MostRead/types';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';

interface PageData {
  mostReadData?: MostReadData | null;
}

interface OfflinePageProps {
  pageData?: PageData | null;
}

const OfflinePage = ({ pageData }: OfflinePageProps) => {
  const { service, dir, script } = use(ServiceContext);

  useOfflinePageFlag();

  const title = 'You are offline';
  const message =
    'Looks like you’re not online right now. Please check your network and reconnect. Once you’re back, just refresh the page to continue.';
  const solutions = [
    'Check your internet connection',
    'Refresh the page when your connection is restored',
  ];

  const mostReadData = pageData?.mostReadData;

  return (
    <>
      <Helmet htmlAttributes={{ dir, lang: service }}>
        <title>{title}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {mostReadData?.items?.length ? (
        <main style={{ margin: '0 auto', maxWidth: '63rem', padding: '1rem' }}>
          <Heading level={1} style={{ margin: '1rem 0' }}>
            {title}
          </Heading>
          <Paragraph size="bodyCopy" style={{ margin: '1rem 0' }}>
            {message}
          </Paragraph>
          <Heading level={3} style={{ margin: '1rem 0' }}>
            Most read articles
          </Heading>
          <MostRead
            data={mostReadData}
            columnLayout="twoColumn"
            size="default"
          />
        </main>
      ) : (
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
      )}
    </>
  );
};

export default OfflinePage;
