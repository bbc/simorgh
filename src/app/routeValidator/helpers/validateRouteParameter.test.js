import validateRouteParameter from './validateRouteParameter';

describe('Validate Route Parameter', () => {
  it('should throw an error with an invalid route paremeter', () => {
    const routeParameter = `route-01`;

    expect(() => {
      validateRouteParameter(routeParameter);
    }).toThrowError(`Router parameter is not valid.`);
  });

  it('should not error with a number length of 2 and of type Number', () => {
    const routeParameter = `scenario-13`;

    expect(() => {
      validateRouteParameter(routeParameter);
    }).not.toThrowError();
  });
});
