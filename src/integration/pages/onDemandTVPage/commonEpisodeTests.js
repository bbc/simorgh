import getTextContent from '../../utils/getTextContent';

export default () => {
  it('I can see the brand title', () => {
    const brandTitleEl = document.querySelector('strong span:first-child');

    expect(brandTitleEl).toBeInTheDocument();
    expect(getTextContent(brandTitleEl)).toBeTruthy();
    expect(getTextContent(brandTitleEl)).toMatchSnapshot();
  });

  it('I can see the episode title', () => {
    const episodeTitleEl = document.querySelector('strong span:last-child');

    expect(episodeTitleEl).toBeInTheDocument();
    expect(getTextContent(episodeTitleEl)).toBeTruthy();
    expect(getTextContent(episodeTitleEl)).toMatchSnapshot();
  });

  it('I can see the episode summary', () => {
    const episodeSummaryEl = document.querySelector('main p');

    expect(episodeSummaryEl).toBeInTheDocument();
    expect(getTextContent(episodeSummaryEl)).toBeTruthy();
    expect(getTextContent(episodeSummaryEl)).toMatchSnapshot();
  });

  describe('a11y', () => {
    it('Assistive technology reads the brand and episode title as the headline', () => {
      const headlineEl = document.querySelector(
        'h1[id="content"][tabindex="-1"]',
      );

      expect(headlineEl).toBeInTheDocument();
      expect(getTextContent(headlineEl)).toBeTruthy();
      expect(getTextContent(headlineEl)).toMatchSnapshot();
    });
  });
};
