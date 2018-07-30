import { throwError } from '../../dataValidator/utilities/messaging';

const validateRouteParameter = routeParam => {
  const regex = '^(scenario-[0-9]{2})$';
  const routeMatches = routeParam.match(regex);

  if (!routeMatches) {
    throwError(`Router parameter is not valid.`);
  }
};

export default validateRouteParameter;
