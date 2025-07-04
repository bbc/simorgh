import React from 'react';
import { render, screen } from '../../react-testing-library-with-providers';
import BillboardCurationGrid from './index';
import { pidginLiveBillboard } from '../fixtures';

const { summaries } = pidginLiveBillboard;

const setMatchMedia = (matches: boolean, query: string) => {
  window.matchMedia = jest.fn().mockImplementation(q => ({
    matches: q === query ? matches : false,
    media: q,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
};

describe('BillboardCurationGrid breakpoint responsive CurationPromo count', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders 4 promos at GROUP_2_MAX_WIDTH (≤599px)', () => {
    setMatchMedia(true, '(max-width:599px)');
    render(<BillboardCurationGrid summaries={summaries} isFirstCuration />);
    const h3Headings = screen.getAllByRole('heading', { level: 3 });
    expect(h3Headings.length).toBe(4);
  });

  it('renders 3 promos at GROUP_3_ONLY (600px–1007px)', () => {
    setMatchMedia(true, '(min-width:600px) and (max-width:1007px)');
    render(<BillboardCurationGrid summaries={summaries} />);
    const h3Headings = screen.getAllByRole('heading', { level: 3 });
    expect(h3Headings.length).toBe(3);
  });

  it('renders 4 promos at GROUP_4_MIN_WIDTH (≥1008px)', () => {
    setMatchMedia(true, '(min-width:1008px)');
    render(<BillboardCurationGrid summaries={summaries} />);
    const h3Headings = screen.getAllByRole('heading', { level: 3 });
    expect(h3Headings.length).toBe(4);
  });

  it('renders a single promo in a div when only one summary is provided', () => {
    setMatchMedia(true, '(min-width:1008px)');
    render(<BillboardCurationGrid summaries={[summaries[0]]} />);
    const promoHeading = screen.getByRole('heading', { level: 3 });
    expect(promoHeading).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders promo links with correct hrefs', () => {
    setMatchMedia(true, '(min-width:1008px)');
    render(<BillboardCurationGrid summaries={summaries.slice(1)} />);
    const links = screen.getAllByRole('link');
    const expectedLinks = summaries.slice(1, 5).map(promo => promo.link);
    const renderedLinks = links.map(link => link.getAttribute('href'));
    expect(renderedLinks).toEqual(expectedLinks);
  });
});
