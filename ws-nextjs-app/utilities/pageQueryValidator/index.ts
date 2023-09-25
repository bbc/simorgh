const isValidPageNumber = (page: string) => {
  const parsedPageNumber = parseInt(page, 10);

  return parsedPageNumber >= 1 && parsedPageNumber <= 40;
};

export default isValidPageNumber;
