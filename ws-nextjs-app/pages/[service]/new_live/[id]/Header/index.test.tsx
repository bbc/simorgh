import React from 'react';
import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import Header from './index';

describe('Live Page Header', () => {
  it('should render the live page title and description', async () => {
    await act(async () => {
      render(<Header title="I am a title" description="I am a description" />);
    });

    expect(screen.getByText('I am a title')).toBeInTheDocument();
    expect(screen.getByText('I am a description')).toBeInTheDocument();
  });

  it('should render the live page title only', async () => {
    await act(async () => {
      render(<Header title="I am a title" />);
    });

    expect(screen.getByText('I am a title')).toBeInTheDocument();
  });

  it('Header should have id of content', async () => {
    await act(async () => {
      render(<Header title="I am a title" />);
    });

    const header = document.getElementById('content');
    expect(header).toBeInTheDocument();
  });

  it('header should have tab index of -1', async () => {
    await act(async () => {
      render(<Header title="I am a title" />);
    });

    const header = document.getElementById('content');
    const tabIndex = header?.getAttribute('tabIndex');

    expect(tabIndex).toEqual('-1');
  });
});
