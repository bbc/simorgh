import React from 'react';
import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import KeyPoints from '.';
import { singleKeyPoint, multipleKeyPoints } from './fixture';

const singleKeyPointBlocks = singleKeyPoint.model.blocks;
const multipleKeyPointsBlocks = multipleKeyPoints.model.blocks;

describe('Key Points', () => {
  it('should render a single key point', async () => {
    await act(async () => {
      render(<KeyPoints keyPointBlocks={singleKeyPointBlocks} />);
    });

    expect(
      screen.getByText('I am the summary box single key point'),
    ).toBeInTheDocument();
  });

  it('should render mutliple key points', async () => {
    await act(async () => {
      render(<KeyPoints keyPointBlocks={multipleKeyPointsBlocks} />);
    });

    expect(screen.getByText('I am the summary box')).toBeInTheDocument();
    expect(
      screen.getByText('I need to include bulletpoints'),
    ).toBeInTheDocument();
  });

  // check what is passed through from BFF. Update types too.
});
