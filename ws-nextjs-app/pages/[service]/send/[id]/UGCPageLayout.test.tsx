import React from 'react';
import {
  act,
  fireEvent,
  render,
} from '#app/components/react-testing-library-with-providers';
import UGCPageLayout from './UGCPageLayout';
import fixture from './fixture';
import * as SubmitFunctionality from './SubmitButton';

describe('UGC Page Layout', () => {
  let container: HTMLElement;
  const submitSpy = jest.spyOn(SubmitFunctionality, 'handleSubmit');

  beforeEach(async () => {
    ({ container } = await act(() => {
      return render(<UGCPageLayout pageData={fixture} />);
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
    const submitButton = container.querySelector('form input[type=submit]');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    fireEvent.click(submitButton);

    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
});
