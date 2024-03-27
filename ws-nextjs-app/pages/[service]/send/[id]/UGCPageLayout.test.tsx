import React from 'react';
import {
  act,
  fireEvent,
  render,
} from '#app/components/react-testing-library-with-providers';
import fetchMock from 'fetch-mock';
import mundoFixture from '#data/mundo/send/test2qq3x8vt.json';
import UGCPageLayout from './UGCPageLayout';
import * as SubmitFunctionality from './SubmitButton';

describe('UGC Page Layout', () => {
  let container: HTMLElement;
  let submitSpy: jest.SpyInstance;

  beforeEach(async () => {
    jest.restoreAllMocks();

    submitSpy = jest.spyOn(SubmitFunctionality, 'handleSubmit');

    ({ container } = await act(() => {
      return render(<UGCPageLayout pageData={mundoFixture} />);
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
    const submitButton = container.querySelector('form input[type=submit]');
    expect(submitButton).toBeInTheDocument();
  });

  it('Triggers the appropriate request function on submit', () => {
    const postURL = '/myUrl.com';
    fetchMock.post(postURL, 200);

    const submitButton = container.querySelector('form input[type=submit]');

    fireEvent.click(submitButton as Element);

    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
});
