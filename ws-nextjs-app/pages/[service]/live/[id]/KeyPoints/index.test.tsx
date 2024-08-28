import React from 'react';
import {
  render,
  screen,
  act,
} from '#components/react-testing-library-with-providers';
import KeyPoints from '.';
import { singleKeyPoint, multipleKeyPoints, emptyKeyPoints } from './fixture';

const singleKeyPointBlocks = singleKeyPoint.model.blocks;
const multipleKeyPointsBlocks = multipleKeyPoints.model.blocks;
const emptyKeyPointsBlocks = emptyKeyPoints.model.blocks;

describe('Key Points', () => {
  it('should render a section with data-e2e, role and aria-label attributes', async () => {
    const { container } = await act(async () => {
      return render(<KeyPoints keyPointsContent={singleKeyPointBlocks} />);
    });

    expect(container.querySelector('section')).toHaveAttribute('aria-label');
    expect(container.querySelector('section')).toHaveAttribute(
      'role',
      'region',
    );

    expect(container.querySelector('section')).toHaveAttribute(
      'data-e2e',
      'key-points',
    );
  });
  it('should render a h2 heading', async () => {
    await act(async () => {
      render(<KeyPoints keyPointsContent={multipleKeyPointsBlocks} />);
    });

    expect(screen.getAllByRole('heading')).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
  it('should render a single key point as a paragraph', async () => {
    await act(async () => {
      render(<KeyPoints keyPointsContent={singleKeyPointBlocks} />);
    });

    expect(
      screen.getByText('I am the summary box single key point'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should render mutliple key points as a list', async () => {
    await act(async () => {
      render(<KeyPoints keyPointsContent={multipleKeyPointsBlocks} />);
    });

    expect(screen.getByText('I am the summary box')).toBeInTheDocument();
    expect(
      screen.getByText('I need to include bulletpoints'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('should not render if there are no key points', async () => {
    const { container } = await act(async () => {
      return render(<KeyPoints keyPointsContent={emptyKeyPointsBlocks} />);
    });

    expect(container.querySelector('[data-e2e="key-points"]')).toBeFalsy();
  });
});
