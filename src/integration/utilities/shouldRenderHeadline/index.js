import getHeadlineElement from '../getHeadlineElement';

export default (page, headlineText) => {
  expect(getHeadlineElement(page, headlineText)).toBeInTheDocument();
};
