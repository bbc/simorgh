import { getStorybook, storiesOf } from '@storybook/react';
import withServicesKnob from './withServicesKnob';

var matchesStoryKind = function matchesStoryKind(kind) {
  return function (story) {
    return story.kind === kind;
  };
};

var matchesStoryName = function matchesStoryName(name) {
  return function (story) {
    return story.name === name;
  };
};

var buildRTLSubstory = function buildRTLSubstory(kind, name, storyFn) {
  var rtlServiceDecorator = withServicesKnob({
    defaultService: 'arabic',
    services: ['arabic', 'persian', 'urdu', 'pashto']
  });
  storiesOf("".concat(kind, "/Right to left layouts"), module).add("Right to left - ".concat(name), function () {
    return rtlServiceDecorator(storyFn);
  });
}; // eslint-disable-next-line import/prefer-default-export


export var buildRTLSubstories = function buildRTLSubstories() {
  var storyKind = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$include = _ref.include,
      include = _ref$include === void 0 ? [] : _ref$include;

  var allStories = getStorybook();

  var _allStories$find = allStories.find(matchesStoryKind(storyKind)),
      stories = _allStories$find.stories;

  if (include.length) {
    include.forEach(function (name) {
      var _stories$find = stories.find(matchesStoryName(name)),
          render = _stories$find.render;

      buildRTLSubstory(storyKind, name, render);
    });
  } else {
    stories.forEach(function (_ref2) {
      var name = _ref2.name,
          render = _ref2.render;
      return buildRTLSubstory(storyKind, name, render);
    });
  }
};