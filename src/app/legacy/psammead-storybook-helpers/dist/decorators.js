"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dirDecorator = void 0;

var _inputProvider = _interopRequireDefault(require("./input-provider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */
var dirDecorator = function dirDecorator(storyFn) {
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

  var decoratedComponent = (0, _inputProvider.default)({
    componentFunction: renderFn
  });
  return decoratedComponent();
};

exports.dirDecorator = dirDecorator;