import React from 'react';
import { render, screen, act } from '@testing-library/react';
import SingleDoc from '.';
import ThemeProvider from '../../../../src/app/components/ThemeProvider';

interface SingleDocFixtureProps {
  label: string;
  status?: boolean;
  url: string;
  urlLabel: string;
}

const SingleDocFixture = ({
  label,
  status,
  url,
  urlLabel,
}: SingleDocFixtureProps) => (
  <ThemeProvider service="news" variant="default">
    <SingleDoc label={label} status={status} url={url} urlLabel={urlLabel} />
  </ThemeProvider>
);

describe('Storybook SingleDoc', () => {
  it('should render documentation title', async () => {
    await act(async () => {
      render(
        <SingleDocFixture
          label="This is the documentation title"
          status
          url="https://documentation.com"
          urlLabel="This is the link label"
        />,
      );
    });

    const title = screen.getByText('This is the documentation title');
    expect(title).toBeInTheDocument();
  });

  it('should render documentation link correctly', async () => {
    await act(async () => {
      render(
        <SingleDocFixture
          label="This is the documentation title"
          status
          url="https://documentation.com"
          urlLabel="This is the link label"
        />,
      );
    });

    const announce = screen.getByText('This is the link label');
    const linkHref = screen.getByRole('link').getAttribute('href');
    expect(announce).toBeTruthy();
    expect(linkHref).toBe('https://documentation.com');
  });

  it('should render items in a list item', async () => {
    await act(async () => {
      render(
        <SingleDocFixture
          label="This is the documentation title"
          status
          url="https://documentation.com"
          urlLabel="This is the link label"
        />,
      );
    });

    const listItem = screen.getByRole('listitem');
    expect(listItem).toBeInTheDocument();
  });

  it('should render confirm and external-link svgs when status is true', async () => {
    await act(async () => {
      render(
        <SingleDocFixture
          label="This is the documentation title"
          status
          url="https://documentation.com"
          urlLabel="This is the link label"
        />,
      );
    });

    const checkSvg = screen.getByTestId('confirm');
    const linkSvg = screen.getByTestId('external-link');
    expect(checkSvg).toBeInTheDocument();
    expect(linkSvg).toBeInTheDocument();
  });

  it('should render close and help svgs when status is false', async () => {
    await act(async () => {
      render(
        <SingleDocFixture
          label="This is the documentation title"
          status={false}
          url="https://documentation.com"
          urlLabel="This is the link label"
        />,
      );
    });

    const checkSvg = screen.getByTestId('close');
    const linkSvg = screen.getByTestId('help');
    expect(checkSvg).toBeInTheDocument();
    expect(linkSvg).toBeInTheDocument();
  });

  it('should render help svgs when no status is provided', async () => {
    await act(async () => {
      render(
        <SingleDocFixture
          label="This is the documentation title"
          url="https://documentation.com"
          urlLabel="This is the link label"
        />,
      );
    });

    const linkSvg = screen.getAllByTestId('help');
    expect(linkSvg.length).toBe(2);
  });
});
