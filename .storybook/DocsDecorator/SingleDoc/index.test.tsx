import React from 'react';
import { render, screen, act } from '@testing-library/react';
import SingleDoc from '.';
import ThemeProvider from '../../../src/app/components/ThemeProvider';

const SingleDocFixture = ({
  docTitle,
  docLocation,
  announce,
  missingAnnounce,
  missingLink,
}: {
  docTitle: string;
  docLocation?: string;
  announce: string;
  missingAnnounce: string;
  missingLink: string;
}) => (
  <ThemeProvider service="news" variant="default">
    <SingleDoc
      docTitle={docTitle}
      docLocation={docLocation}
      announce={announce}
      missingAnnounce={missingAnnounce}
      missingLink={missingLink}
    />
  </ThemeProvider>
);

describe('Storybook SingleDoc', () => {
  it('should render documentation title', async () => {
    await act(async () => {
      render(
        <SingleDocFixture
          docTitle="Title"
          docLocation="https://bbc.github.io/accessibility-news-and-you/guides/screen-reader-ux.html"
          announce="Announce this"
          missingAnnounce="Missing Announce"
          missingLink="https://bbc.github.io/accessibility-news-and-you/guides/screen-reader-ux.html"
        />,
      );
    });

    const title = screen.getByText('Title');
    expect(title).toBeInTheDocument();
  });

  it('should render documentation link correctly', async () => {
    await act(async () => {
      render(
        <SingleDocFixture
          docTitle="Title"
          docLocation="https://bbc.github.io/accessibility-news-and-you/guides/screen-reader-ux.html"
          announce="Announce this"
          missingAnnounce="Missing Announce"
          missingLink="https://bbc.github.io/accessibility-news-and-you/guides/screen-reader-ux.html"
        />,
      );
    });

    const announce = screen.getByText('Announce this');
    const linkHref = screen.getByRole('link').getAttribute('href');
    expect(announce).toBeTruthy();
    expect(linkHref).toBe(
      'https://bbc.github.io/accessibility-news-and-you/guides/screen-reader-ux.html',
    );
  });

  it('should render fallback when link is not provided', async () => {
    await act(async () => {
      render(
        <SingleDocFixture
          docTitle="Title"
          announce="Announce this"
          missingAnnounce="Missing Announce"
          missingLink="https://bbc.github.io/accessibility-news-and-you/guides/screen-reader-ux.html"
        />,
      );
    });

    const announce = screen.getByText('Missing Announce');
    const linkHref = screen.getByRole('link').getAttribute('href');
    expect(announce).toBeTruthy();
    expect(linkHref).toBe(
      'https://bbc.github.io/accessibility-news-and-you/guides/screen-reader-ux.html',
    );
  });

  it('should render items in a list item', async () => {
    await act(async () => {
      render(
        <SingleDocFixture
          docTitle="Title"
          announce="Announce this"
          missingAnnounce="Missing Announce"
          missingLink="https://bbc.github.io/accessibility-news-and-you/guides/screen-reader-ux.html"
        />,
      );
    });

    const listItem = screen.getByRole('listitem');
    expect(listItem).toBeInTheDocument();
  });

  it('should render confirm and external-link svgs when document link is provided', async () => {
    await act(async () => {
      render(
        <SingleDocFixture
          docTitle="Title"
          docLocation="https://bbc.github.io/accessibility-news-and-you/guides/screen-reader-ux.html"
          announce="Announce this"
          missingAnnounce="Missing Announce"
          missingLink="https://bbc.github.io/accessibility-news-and-you/guides/screen-reader-ux.html"
        />,
      );
    });

    const checkSvg = screen.getByTestId('confirm');
    const linkSvg = screen.getByTestId('external-link');
    expect(checkSvg).toBeInTheDocument();
    expect(linkSvg).toBeInTheDocument();
  });

  it('should render close and help svgs when document link is provided', async () => {
    await act(async () => {
      render(
        <SingleDocFixture
          docTitle="Title"
          announce="Announce this"
          missingAnnounce="Missing Announce"
          missingLink="https://bbc.github.io/accessibility-news-and-you/guides/screen-reader-ux.html"
        />,
      );
    });

    const checkSvg = screen.getByTestId('close');
    const linkSvg = screen.getByTestId('help');
    expect(checkSvg).toBeInTheDocument();
    expect(linkSvg).toBeInTheDocument();
  });
});
