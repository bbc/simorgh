import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import { StoryArgs, StoryProps } from '#app/models/types/storybook';
import { DOWNLOADS_PAGE } from '#app/routes/utils/pageTypes';
import DownloadsPageLayout from './downloadsPageLayout';
import { PageProps } from './types';

const pageData = {
  title: '다운로드',
  description: 'Korean Downloads',
  downloadData: [
    {
      fileCreated: '2026-11-03',
      files: [
        {
          fileCreatedDate: '2026-11-03',
          fileName: 'korean-2026-11-03-HQ.zip',
          fileLink:
            'https://ws-downloads.files.bbci.co.uk/korean-2026-11-03-HQ.zip',
          lastModified: '2026-11-03T17:36:29.000Z',
          fileSize: 14277557,
        },
        {
          fileCreatedDate: '2026-11-03',
          fileName: 'korean-2026-11-03-LQ.zip',
          fileLink:
            'https://ws-downloads.files.bbci.co.uk/korean-2026-11-03-LQ.zip',
          lastModified: '2026-11-03T17:36:29.000Z',
          fileSize: 7117314,
        },
      ],
    },
    {
      fileCreated: '2026-11-02',
      files: [
        {
          fileCreatedDate: '2026-11-02',
          fileName: 'korean-2026-11-02-HQ.zip',
          fileLink:
            'https://ws-downloads.files.bbci.co.uk/korean-2026-11-02-HQ.zip',
          lastModified: '2026-11-02T17:36:29.000Z',
          fileSize: 14148251,
        },
        {
          fileCreatedDate: '2026-11-02',
          fileName: 'korean-2026-11-02-LQ.zip',
          fileLink:
            'https://ws-downloads.files.bbci.co.uk/korean-2026-11-02-LQ.zip',
          lastModified: '2026-11-02T17:36:29.000Z',
          fileSize: 7117910,
        },
      ],
    },
  ],
  metadata: {
    atiAnalytics: {
      contentType: DOWNLOADS_PAGE,
      language: 'ko-KO',
      pageIdentifier: 'korean.downloads.page',
      pageTitle: '다운로드 - BBC News 코리아',
      producerId: '57',
      producerName: 'KOREAN',
    },
    type: DOWNLOADS_PAGE,
    pageTitle: '다운로드 - BBC News 코리아',
  },
} satisfies PageProps['pageData'];

const Component = ({ service, variant }: StoryProps) => (
  <PageLayoutWrapper pageData={pageData} status={200}>
    <DownloadsPageLayout
      service={service}
      variant={variant}
      pageData={pageData}
    />
  </PageLayoutWrapper>
);

export default {
  Component,
  title: 'Pages/Downloads Page',
  globals: {
    service: { service: 'korean', variant: 'default' },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Example = {
  render: (_: StoryArgs, { service, variant }: StoryProps) => (
    <Component service={service} variant={variant} />
  ),
};
