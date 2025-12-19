import React from 'react';
import { GetServerSideProps } from 'next';
import { STATIC_PAGE } from '#app/routes/utils/pageTypes';
import { Services, PageTypes } from '#app/models/types/global';

import LanguagesNearYou from '#app/components/3d/3dComponents/LanguagesNearYou';

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  return {
    props: {
      error: null,
      isAmp: false,
      isNextJs: true,
      page: null,
      status: 200,
      timeOnServer: Date.now(),
      pageType: STATIC_PAGE as PageTypes,
      // Use a service that has the 3D Languages Near You experience enabled
      // so this demo page always renders the component.
      service: 'hindi' as Services,
      pageData: {
        metadata: {
          type: STATIC_PAGE,
          atiAnalytics: {},
        },
      },
      pathname: context?.resolvedUrl || '/3d-demo',
      toggles: {},
      showAdsBasedOnLocation: false,
    },
  };
};

export default function ThreeDDemoPage() {
  return (
    <div
      style={{
        paddingTop: '16px',
        display: 'flex',


        justifyContent: 'center',
        gap: '24px',
        marginBottom: '16px',
      }}
    >
      <LanguagesNearYou />
    </div>
  );
}
