// TODO: get real data once fixtures are available
// https://github.com/bbc/simorgh/issues/2493
const getMediaPageInitialData = ({ service }) => {
  return Promise.resolve({
    status: 200,
    service,
    pageData: {},
  });
};

export default getMediaPageInitialData;
