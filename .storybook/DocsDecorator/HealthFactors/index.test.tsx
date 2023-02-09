import React from 'react';
import { render, screen, act } from '@testing-library/react';
import HealthFactors from '.';
import ThemeProvider from '../../../src/app/components/ThemeProvider';
import {
  allCompletedDocs,
  oneOutstandingAction,
  twoOutstandingActions,
  threeOutstandingActions,
  oneMissingDoc,
  twoMissingDocs,
  allMissingDocs,
} from './fixture';
import HealthFactorsMetadata from '../types';

const HealthFactorsFixture = ({
  metadata,
}: {
  metadata?: HealthFactorsMetadata;
}) => (
  <ThemeProvider service="news" variant="default">
    <HealthFactors metadata={metadata} />
  </ThemeProvider>
);

describe('Storybook HealthFactors Title', () => {
  it('should render the correct title when all docs are provided', async () => {
    await act(async () => {
      render(<HealthFactorsFixture metadata={allCompletedDocs} />);
    });

    const title = screen.getByText('Good to show to the audience');

    expect(title).toBeInTheDocument();
  });

  it('should render the correct title when metadata is missing', async () => {
    await act(async () => {
      render(<HealthFactorsFixture />);
    });

    const title = screen.getByText('Component health is missing!');

    expect(title).toBeInTheDocument();
  });

  it('should render the correct title when there are one outstanding action', async () => {
    await act(async () => {
      render(<HealthFactorsFixture metadata={oneOutstandingAction} />);
    });

    const title = screen.getByText('One action outstanding');

    expect(title).toBeInTheDocument();
  });

  it('should render the correct title when there are two outstanding action', async () => {
    await act(async () => {
      render(<HealthFactorsFixture metadata={twoOutstandingActions} />);
    });

    const title = screen.getByText('Two actions outstanding');

    expect(title).toBeInTheDocument();
  });

  it('should render the correct title when there are three outstanding action', async () => {
    await act(async () => {
      render(<HealthFactorsFixture metadata={threeOutstandingActions} />);
    });

    const title = screen.getByText('Three actions outstanding');

    expect(title).toBeInTheDocument();
  });
});

describe('Storybook HealthFactors Svg', () => {
  it('should render the correct title Svg when all docs are provided', async () => {
    await act(async () => {
      render(<HealthFactorsFixture metadata={allCompletedDocs} />);
    });

    const titleSvg = screen.getByTestId('recommend');

    expect(titleSvg).toBeInTheDocument();
  });

  it('should render the correct title Svg when there are outstanding actions', async () => {
    await act(async () => {
      render(<HealthFactorsFixture metadata={oneOutstandingAction} />);
    });

    const titleSvg = screen.getByTestId('warning');

    expect(titleSvg).toBeInTheDocument();
  });

  it('should render the correct title Svg when health factors is missing', async () => {
    await act(async () => {
      render(<HealthFactorsFixture />);
    });

    const titleSvg = screen.getByTestId('activity');

    expect(titleSvg).toBeInTheDocument();
  });
});

describe('Storybook HealthFactors', () => {
  it('should render the correct number of items when all docs are provided', async () => {
    await act(async () => {
      render(<HealthFactorsFixture metadata={allCompletedDocs} />);
    });

    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toBe(3);
  });

  it('should render the correct number of items when one doc is missing', async () => {
    await act(async () => {
      render(<HealthFactorsFixture metadata={oneMissingDoc} />);
    });

    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toBe(3);
  });

  it('should render the correct number of items when two docs are missing', async () => {
    await act(async () => {
      render(<HealthFactorsFixture metadata={twoMissingDocs} />);
    });

    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toBe(3);
  });

  it('should render the correct number of items when three docs are missing', async () => {
    await act(async () => {
      render(<HealthFactorsFixture metadata={allMissingDocs} />);
    });

    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toBe(3);
  });

  it('should render the correct time when day, month, and year are valid', async () => {
    await act(async () => {
      render(<HealthFactorsFixture metadata={allCompletedDocs} />);
    });

    const time = screen.getByText('Last Updated 1st December 2022');

    expect(time).toBeInTheDocument();
  });

  it('should render time in a time tag when day, month, and year are valid', async () => {
    await act(async () => {
      render(<HealthFactorsFixture metadata={allCompletedDocs} />);
    });

    const time = screen.getByText('Last Updated 1st December 2022');

    expect(time.tagName).toBe('TIME');
  });
});
