import {
  getPassportHome,
  isValidPassportHome,
} from '../../../lib/utilities/passport';

// checks for pageData, 200 status and if home service from article data fits the service locale
const shouldRender = (
  { pageData, status },
  service,
  passportHomesOverride = [],
) => {
  let statusCode = status;
  let isCorrectService;

  const hasDataAnd200Status = pageData && status === 200;
  if (hasDataAnd200Status) {
    const passportHome = getPassportHome(pageData);
    isCorrectService = isValidPassportHome(
      passportHome,
      service,
      passportHomesOverride,
    );
    statusCode = !isCorrectService ? 404 : status;
  }

  return {
    hasData200StatusAndCorrectService: hasDataAnd200Status && isCorrectService,
    status: statusCode,
    pageData,
  };
};

export default shouldRender;
