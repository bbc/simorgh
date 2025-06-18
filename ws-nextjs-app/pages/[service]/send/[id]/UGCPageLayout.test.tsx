import React from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import mundoFixture from '#data/mundo/send/test2qq3x8vt.json';
import UGCPageLayout from './UGCPageLayout';
import { PageProps } from './types';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '123' },
  }),
}));

describe('UGC Page Layout', () => {
  let container: HTMLElement;

  beforeEach(async () => {
    jest.restoreAllMocks();

    ({ container } = await act(() => {
      const pageData = mundoFixture.data as PageProps['pageData'];

      return render(<UGCPageLayout pageData={pageData} />);
    }));
  });

  it('Renders a level 1 heading', () => {
    const level1Heading = container.querySelector('h1');
    expect(level1Heading).toBeInTheDocument();
    expect(level1Heading?.innerHTML).toEqual('Escríbenos');
  });

  it('Renders a description', () => {
    const description = container.innerHTML.includes(
      'En BBC Mundo nos importa tu punto de vista.',
    );
    expect(description).toBeTruthy();
  });

  it('Renders a form', () => {
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('Renders a submit button within the form', () => {
    const submitButton = container.querySelector('button[type=submit]');
    expect(submitButton).toBeInTheDocument();
  });
});
