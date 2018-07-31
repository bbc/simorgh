const validateRouteParameter = routeParam => {
  const regex = '^(scenario-[0-9]{2})$';
  const routeMatches = routeParam.match(regex);

  if (!routeMatches) {
    return false;
  }

  return true;
};

export default validateRouteParameter;
