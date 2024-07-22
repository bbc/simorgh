export default () => {
  describe('UGC file upload', () => {
    const inputFileField = document.querySelector(`input[type=file]`);
    const inputFileFieldId = inputFileField.id;

    it('should render a file input field', () => {
      expect(inputFileField).toBeInTheDocument();
    });

    it('should render a file upload button', () => {
      const fileUploadButton = document.querySelector(
        `button[aria-describedby=label-${inputFileFieldId}]`,
      );
      expect(fileUploadButton).toBeInTheDocument();
    });
  });
};
