import inputProvider from './input-provider';
/* eslint-disable import/prefer-default-export */

export var dirDecorator = function dirDecorator(storyFn) {
  var renderFn = function renderFn(_ref) {
    var script = _ref.script,
        dir = _ref.dir,
        service = _ref.service;
    return storyFn({
      script: script,
      dir: dir,
      service: service
    });
  };

  var decoratedComponent = inputProvider({
    componentFunction: renderFn
  });
  return decoratedComponent();
};