const getErrorInitialData = async ({ statusCode }) => {
  return {
    pageData: {},
    status: statusCode,
  };
};

export default getErrorInitialData;
