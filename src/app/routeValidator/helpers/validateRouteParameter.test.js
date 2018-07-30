import validateRouteParameter from './validateRouteParameter';

// global.console.log = jest.fn(); // silence console.log during jest testss

describe('Validate Route Parameter', () => {
  it('should throw an error with an invalid route paremeter', () => {
    const routeParameter = `route-01`;

    expect(() => {
      validateRouteParameter(routeParameter);
    }).toThrowError(`Router parameter is not valid.`);
  });

  // it('should throw a null error with a number length of 0 digits', () => {
  //   const routeParameter = `scenario-`;

  //   expect(() => {
  //     validateRouteParameter(routeParameter);
  //   }).toThrowError(
  //     `Route contained 'scenario-' but did not specify a number.`,
  //   );
  // });

  // it('should throw an error with an number length of 1 digit', () => {
  //   const routeParameter = `scenario-6`;

  //   expect(() => {
  //     validateRouteParameter(routeParameter);
  //   }).toThrowError(
  //     `Route contained '${routeParameter}' but the number was not in a two digit format - e.g. 01.`,
  //   );
  // });

  // it('should throw an error with a number length greater than 2 digits', () => {
  //   const routeParameter = `scenario-123`;

  //   expect(() => {
  //     validateRouteParameter(routeParameter);
  //   }).toThrowError(
  //     `Route parameter is not valid. Scenario number is out of range.`,
  //   );
  // });

  // it('should throw an error with a number type of string', () => {
  //   const routeParameter = `scenario-ab`;

  //   expect(() => {
  //     validateRouteParameter(routeParameter);
  //   }).toThrowError(
  //     `Route contained 'scenario-' but did not specify a number.`,
  //   );
  // });

  it('should not error with a number length of 2 and of type Number', () => {
    const routeParameter = `scenario-13`;

    expect(() => {
      validateRouteParameter(routeParameter);
    }).not.toThrowError();
  });
});
