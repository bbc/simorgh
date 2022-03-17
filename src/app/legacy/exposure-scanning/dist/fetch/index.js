"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchIssue = exports.fetchPr = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var octokit;

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var _yield$import, Octokit, _yield$import2, _Octokit;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(process.env.GITHUB_ACTION && process.env.GITHUB_TOKEN)) {
            _context.next = 8;
            break;
          }

          _context.next = 3;
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@octokit/action'));
          });

        case 3:
          _yield$import = _context.sent;
          Octokit = _yield$import.Octokit;
          octokit = new Octokit();
          _context.next = 13;
          break;

        case 8:
          _context.next = 10;
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@octokit/rest'));
          });

        case 10:
          _yield$import2 = _context.sent;
          _Octokit = _yield$import2.Octokit;
          octokit = new _Octokit();

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

var fetchPrBody = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(reqBody) {
    var _yield$octokit$reques, body;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return octokit.request('GET /repos/{owner}/{repo}/pulls/{id}', reqBody);

          case 2:
            _yield$octokit$reques = _context2.sent;
            body = _yield$octokit$reques.data.body;
            return _context2.abrupt("return", body);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function fetchPrBody(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var fetchComments = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(reqBody) {
    var _yield$octokit$reques2, data;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return octokit.request('GET /repos/{owner}/{repo}/issues/{id}/comments', reqBody);

          case 2:
            _yield$octokit$reques2 = _context3.sent;
            data = _yield$octokit$reques2.data;
            return _context3.abrupt("return", data.map(function (_ref4) {
              var id = _ref4.id,
                  body = _ref4.body;
              return {
                id: id,
                body: body
              };
            }));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function fetchComments(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var fetchReviewComments = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(reqBody) {
    var _yield$octokit$reques3, data;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return octokit.request('GET /repos/{owner}/{repo}/pulls/{id}/comments', reqBody);

          case 2:
            _yield$octokit$reques3 = _context4.sent;
            data = _yield$octokit$reques3.data;
            return _context4.abrupt("return", data.map(function (_ref6) {
              var id = _ref6.id,
                  body = _ref6.body;
              return {
                id: id,
                body: body
              };
            }));

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function fetchReviewComments(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

var fetchIssueBody = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(reqBody) {
    var _yield$octokit$reques4, body;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return octokit.request('GET /repos/{owner}/{repo}/issues/{id}', reqBody);

          case 2:
            _yield$octokit$reques4 = _context5.sent;
            body = _yield$octokit$reques4.data.body;
            return _context5.abrupt("return", body);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function fetchIssueBody(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

var fetchPr = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(reqBody) {
    var _yield$Promise$all, _yield$Promise$all2, body, comments, reviewComments;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return Promise.all([fetchPrBody(reqBody), fetchComments(reqBody), fetchReviewComments(reqBody)]);

          case 2:
            _yield$Promise$all = _context6.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
            body = _yield$Promise$all2[0];
            comments = _yield$Promise$all2[1];
            reviewComments = _yield$Promise$all2[2];
            return _context6.abrupt("return", {
              body: body,
              comments: comments,
              reviewComments: reviewComments
            });

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function fetchPr(_x5) {
    return _ref8.apply(this, arguments);
  };
}();

exports.fetchPr = fetchPr;

var fetchIssue = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(reqBody) {
    var _yield$Promise$all3, _yield$Promise$all4, body, comments;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return Promise.all([fetchIssueBody(reqBody), fetchComments(reqBody)]);

          case 2:
            _yield$Promise$all3 = _context7.sent;
            _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
            body = _yield$Promise$all4[0];
            comments = _yield$Promise$all4[1];
            return _context7.abrupt("return", {
              body: body,
              comments: comments
            });

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function fetchIssue(_x6) {
    return _ref9.apply(this, arguments);
  };
}();

exports.fetchIssue = fetchIssue;