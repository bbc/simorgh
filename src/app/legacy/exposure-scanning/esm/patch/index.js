function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var octokit; // Used to limit the number of calls to the patch comment and review comment endpoint
// since each comment is uniquely identified in the context of the repository instead
// of the individual PR/issue, and we only wish to update the comments and review comments
// of that single PR or issue.

var maxCommentPatches = 20;

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
          return import('@octokit/action');

        case 3:
          _yield$import = _context.sent;
          Octokit = _yield$import.Octokit;
          octokit = new Octokit();
          _context.next = 13;
          break;

        case 8:
          _context.next = 10;
          return import('@octokit/rest');

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

var patchPrBody = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(reqBody, body) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return octokit.request('PATCH /repos/{owner}/{repo}/pulls/{id}', _objectSpread(_objectSpread({}, reqBody), {}, {
              body: body
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function patchPrBody(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var patchReviewComments = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(reqBody, comments) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Promise.all(comments.slice(0, maxCommentPatches).map(function (_ref4) {
              var id = _ref4.id,
                  body = _ref4.body;
              return octokit.request('PATCH /repos/{owner}/{repo}/pulls/comments/{id}', {
                owner: reqBody.owner,
                repo: reqBody.repo,
                id: id,
                body: body
              });
            }));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function patchReviewComments(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var patchComments = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(reqBody, comments) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return Promise.all(comments.slice(0, maxCommentPatches).map(function (_ref6) {
              var id = _ref6.id,
                  body = _ref6.body;
              return octokit.request('PATCH /repos/{owner}/{repo}/issues/comments/{id}', _objectSpread(_objectSpread({}, reqBody), {}, {
                id: id,
                body: body
              }));
            }));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function patchComments(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

var patchIssueBody = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(reqBody, body) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return octokit.request('PATCH /repos/{owner}/{repo}/issues/{id}', _objectSpread(_objectSpread({}, reqBody), {}, {
              body: body
            }));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function patchIssueBody(_x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}();

export var patchPr = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(reqBody, _ref8) {
    var body, comments, reviewComments;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            body = _ref8.body, comments = _ref8.comments, reviewComments = _ref8.reviewComments;
            _context6.next = 3;
            return Promise.all([patchPrBody(reqBody, body), patchComments(reqBody, comments), patchReviewComments(reqBody, reviewComments)]);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function patchPr(_x9, _x10) {
    return _ref9.apply(this, arguments);
  };
}();
export var patchIssue = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(reqBody, _ref10) {
    var body, comments;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            body = _ref10.body, comments = _ref10.comments;
            _context7.next = 3;
            return Promise.all([patchIssueBody(reqBody, body), patchComments(reqBody, comments)]);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function patchIssue(_x11, _x12) {
    return _ref11.apply(this, arguments);
  };
}();