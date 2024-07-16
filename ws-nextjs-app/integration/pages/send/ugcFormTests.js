export default () => {
  describe('UGC Form', () => {
    const form = document.querySelector(`form`);
    const inputField = document.querySelector(`input`);
    const submitButton = document.querySelector(`button[type=submit]`);

    it('should render a form', () => {
      expect(form).toBeInTheDocument();
    });

    it('should render at least one input field', () => {
      expect(inputField).toBeInTheDocument();
    });

    it('should render a submit button', () => {
      expect(submitButton).toBeInTheDocument();
    });
  });
};
