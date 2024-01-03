export default () => {
  describe('Amp Iframe', () => {
    const ampIframe = document.querySelector(
      `amp-iframe[src*="https://news.test.files.bbci.co.uk/include/newsspec/36430-optimo-deployments/nhs-tracker/pidgin/app/amp?version=1.0.202310241621"]`,
    );

    it('should render an Amp Iframe with the correct SRC attribute', () => {
      expect(ampIframe).toBeInTheDocument();
    });

    it('should match snapshot', () => {
      expect(ampIframe).toMatchSnapshot();
    });
  });
};
