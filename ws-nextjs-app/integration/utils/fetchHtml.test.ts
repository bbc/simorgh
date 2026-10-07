/**
 * @jest-environment @happy-dom/jest-environment
 */
import type { Document } from 'happy-dom';
import fetchHtml from './fetchHtml';

jest.mock('happy-dom', () => ({
  Window: jest.fn(() => global.window),
}));

const originalFetch = global.fetch;

describe('fetchHtml', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('excludes hidden React streaming segments while retaining the visible fallback', async () => {
    jest.mocked(global.fetch).mockResolvedValue({
      ok: true,
      text: async () => `
        <html><body>
          <!--$?--><template id="B:0"></template>
          <main><h2>Visible curation</h2></main>
          <!--/$-->
          <div hidden id="S:0"><main><h2>Streamed curation</h2></main></div>
        </body></html>
      `,
    } as Response);

    const { document } = (await fetchHtml({
      url: 'http://localhost:7081/hindi',
      headers: undefined,
    })) as { document: Document };

    expect(document.querySelectorAll('main h2')).toHaveLength(1);
    expect(document.querySelector('main h2')?.textContent).toBe(
      'Visible curation',
    );
    expect(document.getElementById('S:0')).toBeNull();
  });

  it('preserves ordinary hidden elements and non-streamed content', async () => {
    jest.mocked(global.fetch).mockResolvedValue({
      ok: true,
      text: async () => `
        <html><body>
          <main><h2>Curation</h2></main>
          <div hidden id="editorial-content">Hidden content</div>
          <div id="S:ordinary">Visible content</div>
        </body></html>
      `,
    } as Response);

    const { document } = (await fetchHtml({
      url: 'http://localhost:7081/hindi',
      headers: undefined,
    })) as { document: Document };

    expect(document.querySelectorAll('main h2')).toHaveLength(1);
    expect(document.getElementById('editorial-content')).not.toBeNull();
    expect(document.getElementById('S:ordinary')).not.toBeNull();
  });
});
