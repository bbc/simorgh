"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "arabic", {
  enumerable: true,
  get: function get() {
    return _arabic.default;
  }
});
Object.defineProperty(exports, "bengali", {
  enumerable: true,
  get: function get() {
    return _bengali.default;
  }
});
Object.defineProperty(exports, "burmese", {
  enumerable: true,
  get: function get() {
    return _burmese.default;
  }
});
Object.defineProperty(exports, "devanagariAndGurmukhi", {
  enumerable: true,
  get: function get() {
    return _devanagariAndGurmukhi.default;
  }
});
Object.defineProperty(exports, "hindi", {
  enumerable: true,
  get: function get() {
    return _devanagariAndGurmukhi.default;
  }
});
Object.defineProperty(exports, "nepali", {
  enumerable: true,
  get: function get() {
    return _devanagariAndGurmukhi.default;
  }
});
Object.defineProperty(exports, "cyrillic", {
  enumerable: true,
  get: function get() {
    return _latinAndCyrillic.default;
  }
});
Object.defineProperty(exports, "cyrillicAndLatin", {
  enumerable: true,
  get: function get() {
    return _latinAndCyrillic.default;
  }
});
Object.defineProperty(exports, "latin", {
  enumerable: true,
  get: function get() {
    return _latinAndCyrillic.default;
  }
});
Object.defineProperty(exports, "latinDiacritics", {
  enumerable: true,
  get: function get() {
    return _latinWithDiacritics.default;
  }
});
Object.defineProperty(exports, "chinese", {
  enumerable: true,
  get: function get() {
    return _noAscendersOrDescenders.default;
  }
});
Object.defineProperty(exports, "ethiopic", {
  enumerable: true,
  get: function get() {
    return _noAscendersOrDescenders.default;
  }
});
Object.defineProperty(exports, "korean", {
  enumerable: true,
  get: function get() {
    return _noAscendersOrDescenders.default;
  }
});
Object.defineProperty(exports, "noAscendersOrDescenders", {
  enumerable: true,
  get: function get() {
    return _noAscendersOrDescenders.default;
  }
});
Object.defineProperty(exports, "sinhalese", {
  enumerable: true,
  get: function get() {
    return _sinhalese.default;
  }
});
Object.defineProperty(exports, "tamil", {
  enumerable: true,
  get: function get() {
    return _tamil.default;
  }
});
Object.defineProperty(exports, "thai", {
  enumerable: true,
  get: function get() {
    return _thai.default;
  }
});

var _arabic = _interopRequireDefault(require("./scripts/arabic"));

var _bengali = _interopRequireDefault(require("./scripts/bengali"));

var _burmese = _interopRequireDefault(require("./scripts/burmese"));

var _devanagariAndGurmukhi = _interopRequireDefault(require("./scripts/devanagari-and-gurmukhi"));

var _latinAndCyrillic = _interopRequireDefault(require("./scripts/latin-and-cyrillic"));

var _latinWithDiacritics = _interopRequireDefault(require("./scripts/latin-with-diacritics"));

var _noAscendersOrDescenders = _interopRequireDefault(require("./scripts/no-ascenders-or-descenders"));

var _sinhalese = _interopRequireDefault(require("./scripts/sinhalese"));

var _tamil = _interopRequireDefault(require("./scripts/tamil"));

var _thai = _interopRequireDefault(require("./scripts/thai"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }