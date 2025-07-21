import React, { use } from 'react';
import path from 'ramda/src/path';
import Helmet from 'react-helmet';
import { ServiceContext } from '#contexts/ServiceContext';
import ErrorMain from '#components/ErrorMain';

const OfflinePage = () => {
  const {
    service: contextService,
    brandName,
    dir,
    script,
    translations,
  } = use(ServiceContext);
  const message =
    "Seems like you don't have an internet connection at the moment. Please check your connection and reload the page.";

  const service = contextService;

  const title = path(['offline', 'title'], translations) || 'You are offline.';

  return (
    <>
      <Helmet htmlAttributes={{ dir, lang: service }}>
        <title>{`${title} - ${brandName}`}</title>
      </Helmet>
      <ErrorMain
        statusCode={null}
        title={title}
        message={message}
        solutions={path(['offline', 'solutions'], translations) || []}
        callToActionLinkText={
          path(['offline', 'callToActionLinkText'], translations) || ''
        }
        callToActionLinkUrl={
          path(['offline', 'callToActionLinkUrl'], translations) || ''
        }
        script={script}
        service={service}
      />
    </>
  );
};

export default OfflinePage;
