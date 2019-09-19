import pathOr from 'ramda/src/pathOr';
import {
  getPassportHome,
  isValidPassportHome,
} from '../../../../lib/utilities/passport';

// checks for data, status, setting default status if not found
const constructRenderObject = data => ({
  status: pathOr(null, ['status'], data) || 500,
  pageData: pathOr(null, ['pageData'], data),
});

// checks for pageData, 200 status and if home service from article data fits the service locale
const shouldRender = (data, service, passportHomesOverride = []) => {
  const { status, pageData } = constructRenderObject(data);

  let statusCode = status;
  let isCorrectService;

  const hasDataAnd200Status = pageData && status === 200;
  if (hasDataAnd200Status) {
    const passportHome = getPassportHome(pageData);
    isCorrectService = isValidPassportHome(passportHome, service);
    if (!isCorrectService) {
      (passportHomesOverride || []).forEach(serviceHome => {
        isCorrectService = isValidPassportHome(passportHome, serviceHome);
      });
    }
    statusCode = !isCorrectService ? 404 : status;
  }

  return {
    hasData200StatusAndCorrectService: hasDataAnd200Status && isCorrectService,
    status: statusCode,
    pageData,
  };
};

export default shouldRender;
