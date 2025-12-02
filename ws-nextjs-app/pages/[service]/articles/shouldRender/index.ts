import { getPassportHome, isValidPassportHome } from '#lib/utilities/passport';
import { OK, NOT_FOUND } from '#lib/statusCodes.const';

// checks for pageData, 200 status and if home service from article data fits the service locale

const shouldRender = (
  { pageData, status }: { pageData: object; status: number },
  service: string,
  passportHomesOverride: string[] = [],
) => {
  let statusCode = status;
  const hasDataAnd200Status = pageData && status === OK;
  if (hasDataAnd200Status) {
    const passportHome = getPassportHome(pageData);
    const isValidService = isValidPassportHome(
      passportHome,
      service,
      passportHomesOverride,
    );

    statusCode = isValidService ? status : NOT_FOUND;
  }
  const hasRequestSucceeded = hasDataAnd200Status && statusCode !== NOT_FOUND;
  return {
    hasRequestSucceeded,
    status: statusCode,
  };
};
export default shouldRender;
