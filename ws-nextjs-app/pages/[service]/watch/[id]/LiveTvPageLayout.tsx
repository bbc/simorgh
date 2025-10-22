import { LiveTVPageProps } from './types';
// import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
// import ATIAnalytics from '#app/components/ATIAnalytics';
// import MetadataContainer from '#app/components/Metadata';

export default function LiveTvLayout({ pageType, service }: LiveTVPageProps) {
  return (
    <>
      {/* <ATIAnalytics atiData={atiAnalytics} />
      <ChartbeatAnalytics title={pageTitle} />
      <MetadataContainer
        title={pageTitle}
        lang={lang}
        description={pageDescription}
        openGraphType="website"
        hasAmpPage={false}
      /> */}
      <main role="main">
        <h1 id="content">
          HELLO WORLD pageType: {pageType} service: {service}
        </h1>
      </main>
    </>
  );
}
