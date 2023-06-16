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
    expect(screen.getByText('I am a title').nodeName).toBe('H1');
    expect(screen.getByText('I am a description')).toBeInTheDocument();
    expect(screen.getByText('I am a description').nodeName).toBe('P');
    expect(screen.getByText('I am a title').getAttribute('id')).toEqual(
      'content',
    );
  });

  it('should render the live page title only', async () => {
    await act(async () => {
      render(<Header title="I am a title" />);
    });

    expect(screen.getByText('I am a title')).toBeInTheDocument();
    expect(screen.getByText('I am a title').nodeName).toBe('H1');
  });

  it('title should have id of content', async () => {
    await act(async () => {
      render(<Header title="I am a title" />);
    });

    expect(screen.getByText('I am a title').getAttribute('id')).toEqual(
      'content',
    );
  });
});
