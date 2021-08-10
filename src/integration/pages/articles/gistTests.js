export default () => {
  describe('Gist', () => {
    const gistTitle = document.getElementById('gist-title');
    const gistTitleText = gistTitle.textContent;
    const listItem = document.querySelector(
      `div[aria-labelledby='gist-title'] ul[role="list"] > li`,
    );
    const listItemText = listItem.textContent;

    it('title should be in the document', () => {
      expect(gistTitle).toBeInTheDocument();
      expect(gistTitleText).toBeTruthy();
    });

    it('title should match text', () => {
      expect(gistTitleText).toMatchSnapshot();
    });

    it('should contain a list item within an unordered list', () => {
      expect(listItem).toBeInTheDocument();
      expect(listItemText).toBeTruthy();
    });

    it('list item should match text', () => {
      expect(listItemText).toMatchSnapshot();
    });
  });
};
