import {
  act,
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import mockMatchMedia from '#testHelpers/mockMatchMedia';
import DownloadsPageLayout from './downloadsPageLayout';

jest.mock('#app/components/ATIAnalytics', () => () => null);
jest.mock('#app/components/ChartbeatAnalytics', () => () => null);
jest.mock('#app/components/Metadata', () => () => null);

describe('DownloadsPageLayout', () => {
  beforeEach(() => {
    mockMatchMedia();
  });

  it('renders a download mask that follows the link foreground', async () => {
    await act(async () => {
      render(
        <DownloadsPageLayout
          service="korean"
          pageData={{
            title: 'Downloads',
            description: 'Download the news',
            downloadData: [
              {
                fileCreated: '2026-11-06T09:00:00Z',
                files: [
                  {
                    fileCreatedDate: '2026-11-06',
                    fileName: 'News.pdf',
                    fileLink: 'https://downloads.bbc.co.uk/news.pdf',
                    lastModified: '2026-11-06T09:00:00Z',
                    fileSize: 1000000,
                  },
                ],
              },
            ],
          }}
        />,
        { service: 'korean' },
      );
    });

    const link = screen.getByRole('link', { name: 'News.pdf 1.0Mb' });
    const icon = link.querySelector<HTMLElement>('.ws-o-download-icon');

    expect(icon?.tagName).toBe('SPAN');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveClass('mask');
    expect(icon?.style.getPropertyValue('--icon-source')).toContain(
      'images/icons/download.svg',
    );
  });
});
