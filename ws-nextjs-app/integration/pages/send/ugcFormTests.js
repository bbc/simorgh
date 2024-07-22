import { fireEvent } from '@testing-library/react';

export default () => {
  describe('UGC form', () => {
    it('should render a form', () => {
      const form = document.querySelector(`form`);
      expect(form).toBeInTheDocument();
    });

    it('should render a heading', () => {
      const headingEl = document.querySelector('h1');
      expect(headingEl).toBeInTheDocument();
      expect(headingEl.textContent).toMatchSnapshot();
    });

    it('should render a submit button', () => {
      const submitButton = document.querySelector(`button[type=submit]`);
      expect(submitButton).toBeInTheDocument();
      expect(submitButton.textContent).toMatchSnapshot();
    });

    describe('input fields', () => {
      it('should render at least one input field', () => {
        const inputField = document.querySelector(`input`);
        expect(inputField).toBeInTheDocument();
      });

      it('should accept a value in a text input field', () => {
        const inputNameField = document.querySelector('input[type=text]');
        fireEvent.change(inputNameField, { target: { value: 'Hello' } });
        expect(inputNameField.value).toEqual('Hello');
      });

      it('should accept a value in an email input field', () => {
        const inputEmailField = document.querySelector('input[type=email]');
        fireEvent.change(inputEmailField, {
          target: { value: 'hello@test.com' },
        });
        expect(inputEmailField.value).toEqual('hello@test.com');
      });

      it('should accept a value in a textarea field', () => {
        const textareaField = document.querySelector('textarea');
        fireEvent.change(textareaField, { target: { value: 'Hello Test' } });
        expect(textareaField.value).toEqual('Hello Test');
      });

      it('should render a checkbox that can be checked', () => {
        const inputCheckboxField =
          document.querySelector(`input[type=checkbox]`);
        expect(inputCheckboxField).toBeInTheDocument();
        expect(inputCheckboxField.checked).toEqual(false);
        fireEvent.click(inputCheckboxField);
        expect(inputCheckboxField.checked).toEqual(true);
      });
    });
  });
};
