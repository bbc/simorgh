import routes from './routes';

describe('Routes', () => {
  test('It should be an array', () => {
    expect(routes).toEqual(expect.any(Array));
  });

  test('All routes should have path and component fields', () => {
    routes.forEach(route => {
      expect(route).toEqual(expect.any(Object));
      expect(route).toHaveProperty('path');
      expect(route).toHaveProperty('component');
    });
  });
});
