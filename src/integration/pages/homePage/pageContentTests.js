export default () => {
  describe('Page content', () => {
    const firstItemHeadline = document.querySelector(
      '[data-testid="topic-promos"] > li  h3 a',
    );

    it('First item in the first curation is the correct headline', () => {
      expect(firstItemHeadline).toBeInTheDocument();
      expect(firstItemHeadline.textContent).toMatchSnapshot();
    });
  });

  it('should display a hierarchical grid', () => {
    const hierarchicalGrid = document.querySelector(
      '[data-testid="hierarchical-grid"]',
    );

    expect(hierarchicalGrid).toBeInTheDocument();
  });

  it('should render the main html tag with an attribute of role with the value of main', () => {
    const mainTag = document.querySelector("main[role='main']");
    expect(mainTag).toBeInTheDocument();
  });
};
