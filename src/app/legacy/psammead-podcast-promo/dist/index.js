"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _propTypes2 = require("@bbc/gel-foundations/prop-types");

var _colours = require("@bbc/psammead-styles/colours");

var _spacings = require("@bbc/gel-foundations/spacings");

var _title = _interopRequireDefault(require("./components/title"));

var _card = _interopRequireDefault(require("./components/card"));

var _cardContent = _interopRequireDefault(require("./components/card-content"));

var _cardLink = _interopRequireDefault(require("./components/card-link"));

var _cardImageWrapper = _interopRequireDefault(require("./components/card-image-wrapper"));

var _cardTitle = _interopRequireDefault(require("./components/card-title"));

var _cardDescription = _interopRequireDefault(require("./components/card-description"));

var _cardEpisodesText = _interopRequireDefault(require("./components/card-episodes-text"));

var _excluded = ["script", "service", "children"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PodcastContext = /*#__PURE__*/_react.default.createContext({});

var withPodcastContext = function withPodcastContext(Component) {
  return function (props) {
    return /*#__PURE__*/_react.default.createElement(PodcastContext.Consumer, null, function (context) {
      return /*#__PURE__*/_react.default.createElement(Component, _extends({}, context, props));
    });
  };
};

var Wrapper = (0, _base.default)("section", process.env.NODE_ENV === "production" ? {
  target: "e14tdpjm0"
} : {
  target: "e14tdpjm0",
  label: "Wrapper"
})("background-color:", _colours.C_LUNAR, ";padding:", _spacings.GEL_SPACING_DBL, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUI4QiIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IHN0cmluZywgc2hhcGUsIGFycmF5T2YsIGVsZW1lbnQgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHNjcmlwdFByb3BUeXBlIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvcHJvcC10eXBlcyc7XG5pbXBvcnQgeyBDX0xVTkFSIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvY29sb3Vycyc7XG5pbXBvcnQgeyBHRUxfU1BBQ0lOR19EQkwgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5cbmltcG9ydCBUaXRsZSBmcm9tICcuL2NvbXBvbmVudHMvdGl0bGUnO1xuaW1wb3J0IENhcmQgZnJvbSAnLi9jb21wb25lbnRzL2NhcmQnO1xuaW1wb3J0IENhcmRDb250ZW50IGZyb20gJy4vY29tcG9uZW50cy9jYXJkLWNvbnRlbnQnO1xuaW1wb3J0IENhcmRMaW5rIGZyb20gJy4vY29tcG9uZW50cy9jYXJkLWxpbmsnO1xuaW1wb3J0IENhcmRJbWFnZVdyYXBwZXIgZnJvbSAnLi9jb21wb25lbnRzL2NhcmQtaW1hZ2Utd3JhcHBlcic7XG5pbXBvcnQgQ2FyZFRpdGxlIGZyb20gJy4vY29tcG9uZW50cy9jYXJkLXRpdGxlJztcbmltcG9ydCBDYXJkRGVzY3JpcHRpb24gZnJvbSAnLi9jb21wb25lbnRzL2NhcmQtZGVzY3JpcHRpb24nO1xuaW1wb3J0IENhcmRFcGlzb2Rlc1RleHQgZnJvbSAnLi9jb21wb25lbnRzL2NhcmQtZXBpc29kZXMtdGV4dCc7XG5cbmNvbnN0IFBvZGNhc3RDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dCh7fSk7XG5jb25zdCB3aXRoUG9kY2FzdENvbnRleHQgPSBDb21wb25lbnQgPT4gcHJvcHMgPT4gKFxuICA8UG9kY2FzdENvbnRleHQuQ29uc3VtZXI+XG4gICAge2NvbnRleHQgPT4gPENvbXBvbmVudCB7Li4uY29udGV4dH0gey4uLnByb3BzfSAvPn1cbiAgPC9Qb2RjYXN0Q29udGV4dC5Db25zdW1lcj5cbik7XG5cbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuc2VjdGlvbmBcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtDX0xVTkFSfTtcbiAgcGFkZGluZzogJHtHRUxfU1BBQ0lOR19EQkx9O1xuYDtcblxuY29uc3QgUG9kY2FzdFByb21vID0gKHsgc2NyaXB0LCBzZXJ2aWNlLCBjaGlsZHJlbiwgLi4ucHJvcHMgfSkgPT4gKFxuICA8UG9kY2FzdENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgc2NyaXB0LCBzZXJ2aWNlIH19PlxuICAgIDxXcmFwcGVyIHsuLi5wcm9wc30+e2NoaWxkcmVufTwvV3JhcHBlcj5cbiAgPC9Qb2RjYXN0Q29udGV4dC5Qcm92aWRlcj5cbik7XG5cblBvZGNhc3RQcm9tby5UaXRsZSA9IHdpdGhQb2RjYXN0Q29udGV4dChUaXRsZSk7XG5Qb2RjYXN0UHJvbW8uQ2FyZCA9IENhcmQ7XG5Qb2RjYXN0UHJvbW8uQ2FyZC5MaW5rID0gQ2FyZExpbms7XG5Qb2RjYXN0UHJvbW8uQ2FyZC5JbWFnZVdyYXBwZXIgPSBDYXJkSW1hZ2VXcmFwcGVyO1xuUG9kY2FzdFByb21vLkNhcmQuQ29udGVudCA9IENhcmRDb250ZW50O1xuUG9kY2FzdFByb21vLkNhcmQuVGl0bGUgPSB3aXRoUG9kY2FzdENvbnRleHQoQ2FyZFRpdGxlKTtcblBvZGNhc3RQcm9tby5DYXJkLkRlc2NyaXB0aW9uID0gd2l0aFBvZGNhc3RDb250ZXh0KENhcmREZXNjcmlwdGlvbik7XG5Qb2RjYXN0UHJvbW8uQ2FyZC5FcGlzb2Rlc1RleHQgPSB3aXRoUG9kY2FzdENvbnRleHQoQ2FyZEVwaXNvZGVzVGV4dCk7XG5cblBvZGNhc3RQcm9tby5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBhcnJheU9mKGVsZW1lbnQpLmlzUmVxdWlyZWQsXG4gIHNjcmlwdDogc2hhcGUoc2NyaXB0UHJvcFR5cGUpLmlzUmVxdWlyZWQsXG4gIHNlcnZpY2U6IHN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuUG9kY2FzdFByb21vLmRlZmF1bHRQcm9wcyA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCBQb2RjYXN0UHJvbW87XG4iXX0= */"));

var PodcastPromo = function PodcastPromo(_ref) {
  var script = _ref.script,
      service = _ref.service,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_react.default.createElement(PodcastContext.Provider, {
    value: {
      script: script,
      service: service
    }
  }, /*#__PURE__*/_react.default.createElement(Wrapper, props, children));
};

PodcastPromo.Title = withPodcastContext(_title.default);
PodcastPromo.Card = _card.default;
PodcastPromo.Card.Link = _cardLink.default;
PodcastPromo.Card.ImageWrapper = _cardImageWrapper.default;
PodcastPromo.Card.Content = _cardContent.default;
PodcastPromo.Card.Title = withPodcastContext(_cardTitle.default);
PodcastPromo.Card.Description = withPodcastContext(_cardDescription.default);
PodcastPromo.Card.EpisodesText = withPodcastContext(_cardEpisodesText.default);
PodcastPromo.propTypes = {
  children: (0, _propTypes.arrayOf)(_propTypes.element).isRequired,
  script: (0, _propTypes.shape)(_propTypes2.scriptPropType).isRequired,
  service: _propTypes.string.isRequired
};
PodcastPromo.defaultProps = {};
var _default = PodcastPromo;
exports.default = _default;