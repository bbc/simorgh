function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import parseArgs from './args';
import { fetchPr, fetchIssue } from './fetch';
import { scanPr, scanIssue } from './scan';
import { patchPr, patchIssue } from './patch';

var redactPr = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(reqBody, regex) {
    var pr, scannedPr;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetchPr(reqBody);

          case 2:
            pr = _context.sent;
            _context.next = 5;
            return scanPr(pr, regex);

          case 5:
            scannedPr = _context.sent;

            if (!scannedPr.foundMatch) {
              _context.next = 10;
              break;
            }

            _context.next = 9;
            return patchPr(reqBody, scannedPr);

          case 9:
            throw new Error('Match found and patched.');

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function redactPr(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var redactIssue = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(reqBody, regex) {
    var issue, scannedIssue;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetchIssue(reqBody);

          case 2:
            issue = _context2.sent;
            _context2.next = 5;
            return scanIssue(issue, regex);

          case 5:
            scannedIssue = _context2.sent;

            if (!scannedIssue.foundMatch) {
              _context2.next = 10;
              break;
            }

            _context2.next = 9;
            return patchIssue(reqBody, scannedIssue);

          case 9:
            throw new Error('Match found and patched.');

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function redactIssue(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var scanExposures = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var _parseArgs, repo, flag, id, regexString, regex, reqBody;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _parseArgs = parseArgs(process.argv), repo = _parseArgs.repo, flag = _parseArgs.flag, id = _parseArgs.id, regexString = _parseArgs.regexString;
            regex = new RegExp(regexString, 'gi');
            reqBody = {
              owner: 'bbc',
              repo: repo,
              id: id
            };
            _context3.next = 5;
            return {
              '-pr': redactPr,
              '-issue': redactIssue
            }[flag](reqBody, regex);

          case 5:
            return _context3.abrupt("return", 'No matches found.');

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function scanExposures() {
    return _ref3.apply(this, arguments);
  };
}();

export default scanExposures;