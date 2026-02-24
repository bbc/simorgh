export default class MockIntersectionObserver {
  observers;

  constructor() {
    this.observers = new Map();
  }

  getMockIntersectionObserver = () => {
    const mockIntersectionObserver = cb => {
      const item = {
        callback: cb,
        elements: new Set(),
      };

      const instance = {
        observe: jest.fn(element => {
          item.elements.add(element);
        }),
        disconnect: jest.fn(() => {
          item.elements.clear();
        }),
      };

      this.observers.set(instance, item);

      return instance;
    };

    return mockIntersectionObserver;
  };

  triggerAllObservers = () => {
    this.observers.forEach(item => {
      item.callback([{ isIntersecting: true }]);
    });
  };

  clearObservers = () => {
    this.observers.clear();
  };
}
