const MINIMUM_PAGE_NUMBER = 1;
const MAXIMUM_PAGE_NUMBER = 50;

const isValidPageNumber = (page: string) => {
  const parsedPageNumber = parseInt(page, 10);

  return (
    parsedPageNumber >= MINIMUM_PAGE_NUMBER &&
    parsedPageNumber <= MAXIMUM_PAGE_NUMBER
  );
};

export default isValidPageNumber;
