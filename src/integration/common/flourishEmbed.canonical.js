export default () => {
  describe('Flourish Embed', () => {
    describe('Visualisations', () => {
      const multipleFlourishVisualisations = document.querySelectorAll(
        "iframe[src*='https://flo.uri.sh/visualisation']",
      );

      it('should all be in the document', () => {
        expect(multipleFlourishVisualisations).toBeTruthy();
        expect(multipleFlourishVisualisations.length).toEqual(4);
      });

      multipleFlourishVisualisations.forEach(flourishVisulisation => {
        it('should match snapshot', () => {
          expect(flourishVisulisation).toMatchSnapshot();
        });
      });
    });
    describe('Story', () => {
      const singleFlourishStory = document.querySelector(
        "iframe[src*='https://flo.uri.sh/story']",
      );

      it('should be in the document', () => {
        expect(singleFlourishStory).toBeInTheDocument();
      });

      it('should match snapshot', () => {
        expect(singleFlourishStory).toMatchSnapshot();
      });
    });
  });
};
