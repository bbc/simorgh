import React, { use } from 'react';
import Heading from '#app/components/Heading';
import ATIAnalytics from '#app/components/ATIAnalytics';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import Metadata from '#app/components/Metadata';
import CallToActionLink from '#app/components/CallToActionLink';
import { ServiceContext } from '#app/contexts/ServiceContext';
import TimeStampContainer from '#app/legacy/psammead/psammead-timestamp-container/src';
import { PageProps } from './types';

const DownloadsPageLayout = ({ service, pageData }: PageProps) => {
  const {
    lang,
    timezone,
    locale,
    altCalendar,
    script,
    translations: {
      downloads: {
        instructions = 'You can download and view today’s news.',
        title = 'File Download',
      } = {},
    },
  } = use(ServiceContext);

  const capitalisedService = service[0].toUpperCase() + service.slice(1);
  const description = `${capitalisedService} Downloads`;
  const atiData = pageData?.metadata?.atiAnalytics || {};
  const pageTitle = pageData?.metadata?.pageTitle || '';
  return (
    <>
      <ATIAnalytics atiData={atiData} />
      <ChartbeatAnalytics title={pageTitle} />
      <Metadata
        title={title}
        lang={lang}
        description={description}
        openGraphType="website"
        hasAmpPage={false}
      />
      <div className="max-w-[63rem] mx-auto grid grid-cols-12 p-4 group-4:gap-x-4">
        <div className="col-span-12 pb-8 group-4:col-span-12">
          <main className="pb-12">
            <p>{instructions}</p>
            <Heading level={1}>{title}</Heading>
            <ol className="grid grid-cols-1 group-4:grid-cols-2 list-none p-0">
              {pageData.downloadData?.map(item => (
                <li className="border-b border-black pb-[0.9375rem] mb-2 mr-0 pr-[0.3125rem] [&_time]:text-greatPrimer [&_time]:mb-2 [&_svg]:mr-2 [&_a]:text-rhino [&_a:focus]:text-rhino" key={item.fileCreated}>
                  <TimeStampContainer
                    timestamp={item.fileCreated}
                    dateTimeFormat="DD MMMM YYYY"
                    format="D MMMM YYYY"
                    locale={locale}
                    timezone={timezone}
                    service={service}
                    script={script}
                    altCalendar={altCalendar}
                    padding={false}
                    isRelative={false}
                  />
                  <CallToActionLink
                    className="[&_div]:block"
                    url={item.files[0].fileLink}
                    download
                    eventTrackingData={{
                      componentName: 'koreanDownloads',
                      campaignID: 'korean_downloads',
                      advertiserID: service,
                    }}
                  >
                    <svg
                      className="ws-o-download-icon"
                      viewBox="0 0 32 32"
                      id="gel-icon-download"
                      width="16"
                      height="16"
                    >
                      <path d="M28.2 12.2L19 21.4V0h-6v21.4l-9.2-9.2L0 16l14 14H2v-6H0v8h16l16-16m-2 14h-8l-2 2h12v-8h-2" />
                    </svg>
                    <CallToActionLink.Text shouldUnderlineOnHoverFocus>
                      {item.files[0].fileName}
                      <span>
                        {' '}
                        {(item.files[0].fileSize / 1000000).toFixed(1)}Mb
                      </span>
                    </CallToActionLink.Text>
                  </CallToActionLink>
                </li>
              ))}
            </ol>
          </main>
        </div>
      </div>
    </>
  );
};

export default DownloadsPageLayout;
