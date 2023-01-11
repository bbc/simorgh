/*! License information can be found in LICENSE and LICENSE-THIRD-PARTY */
!function() {
    var e = {
            914: function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.RawSha256 = void 0;
                var r = n(945),
                    o = function() {
                        function e() {
                            this.state = Int32Array.from(r.INIT),
                            this.temp = new Int32Array(64),
                            this.buffer = new Uint8Array(64),
                            this.bufferLength = 0,
                            this.bytesHashed = 0,
                            this.finished = !1
                        }
                        return e.prototype.update = function(e) {
                            if (this.finished)
                                throw new Error("Attempted to update an already finished hash.");
                            var t = 0,
                                n = e.byteLength;
                            if (this.bytesHashed += n, 8 * this.bytesHashed > r.MAX_HASHABLE_LENGTH)
                                throw new Error("Cannot hash more than 2^53 - 1 bits");
                            for (; n > 0;)
                                this.buffer[this.bufferLength++] = e[t++],
                                n--,
                                this.bufferLength === r.BLOCK_SIZE && (this.hashBuffer(), this.bufferLength = 0)
                        }, e.prototype.digest = function() {
                            if (!this.finished) {
                                var e = 8 * this.bytesHashed,
                                    t = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength),
                                    n = this.bufferLength;
                                if (t.setUint8(this.bufferLength++, 128), n % r.BLOCK_SIZE >= r.BLOCK_SIZE - 8) {
                                    for (var o = this.bufferLength; o < r.BLOCK_SIZE; o++)
                                        t.setUint8(o, 0);
                                    this.hashBuffer(),
                                    this.bufferLength = 0
                                }
                                for (o = this.bufferLength; o < r.BLOCK_SIZE - 8; o++)
                                    t.setUint8(o, 0);
                                t.setUint32(r.BLOCK_SIZE - 8, Math.floor(e / 4294967296), !0),
                                t.setUint32(r.BLOCK_SIZE - 4, e),
                                this.hashBuffer(),
                                this.finished = !0
                            }
                            var i = new Uint8Array(r.DIGEST_LENGTH);
                            for (o = 0; o < 8; o++)
                                i[4 * o] = this.state[o] >>> 24 & 255,
                                i[4 * o + 1] = this.state[o] >>> 16 & 255,
                                i[4 * o + 2] = this.state[o] >>> 8 & 255,
                                i[4 * o + 3] = this.state[o] >>> 0 & 255;
                            return i
                        }, e.prototype.hashBuffer = function() {
                            for (var e = this.buffer, t = this.state, n = t[0], o = t[1], i = t[2], s = t[3], a = t[4], c = t[5], u = t[6], l = t[7], d = 0; d < r.BLOCK_SIZE; d++) {
                                if (d < 16)
                                    this.temp[d] = (255 & e[4 * d]) << 24 | (255 & e[4 * d + 1]) << 16 | (255 & e[4 * d + 2]) << 8 | 255 & e[4 * d + 3];
                                else {
                                    var f = this.temp[d - 2],
                                        p = (f >>> 17 | f << 15) ^ (f >>> 19 | f << 13) ^ f >>> 10,
                                        h = ((f = this.temp[d - 15]) >>> 7 | f << 25) ^ (f >>> 18 | f << 14) ^ f >>> 3;
                                    this.temp[d] = (p + this.temp[d - 7] | 0) + (h + this.temp[d - 16] | 0)
                                }
                                var v = (((a >>> 6 | a << 26) ^ (a >>> 11 | a << 21) ^ (a >>> 25 | a << 7)) + (a & c ^ ~a & u) | 0) + (l + (r.KEY[d] + this.temp[d] | 0) | 0) | 0,
                                    y = ((n >>> 2 | n << 30) ^ (n >>> 13 | n << 19) ^ (n >>> 22 | n << 10)) + (n & o ^ n & i ^ o & i) | 0;
                                l = u,
                                u = c,
                                c = a,
                                a = s + v | 0,
                                s = i,
                                i = o,
                                o = n,
                                n = v + y | 0
                            }
                            t[0] += n,
                            t[1] += o,
                            t[2] += i,
                            t[3] += s,
                            t[4] += a,
                            t[5] += c,
                            t[6] += u,
                            t[7] += l
                        }, e
                    }();
                t.RawSha256 = o
            },
            945: function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.MAX_HASHABLE_LENGTH = t.INIT = t.KEY = t.DIGEST_LENGTH = t.BLOCK_SIZE = void 0,
                t.BLOCK_SIZE = 64,
                t.DIGEST_LENGTH = 32,
                t.KEY = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]),
                t.INIT = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
                t.MAX_HASHABLE_LENGTH = Math.pow(2, 53) - 1
            },
            938: function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                (0, n(655).__exportStar)(n(430), t)
            },
            430: function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.Sha256 = void 0;
                var r = n(655),
                    o = n(945),
                    i = n(914),
                    s = n(658),
                    a = function() {
                        function e(e) {
                            if (this.hash = new i.RawSha256, e) {
                                this.outer = new i.RawSha256;
                                var t = function(e) {
                                        var t = (0, s.convertToBuffer)(e);
                                        if (t.byteLength > o.BLOCK_SIZE) {
                                            var n = new i.RawSha256;
                                            n.update(t),
                                            t = n.digest()
                                        }
                                        var r = new Uint8Array(o.BLOCK_SIZE);
                                        return r.set(t), r
                                    }(e),
                                    n = new Uint8Array(o.BLOCK_SIZE);
                                n.set(t);
                                for (var r = 0; r < o.BLOCK_SIZE; r++)
                                    t[r] ^= 54,
                                    n[r] ^= 92;
                                this.hash.update(t),
                                this.outer.update(n);
                                for (r = 0; r < t.byteLength; r++)
                                    t[r] = 0
                            }
                        }
                        return e.prototype.update = function(e) {
                            if (!(0, s.isEmptyData)(e) && !this.error)
                                try {
                                    this.hash.update((0, s.convertToBuffer)(e))
                                } catch (e) {
                                    this.error = e
                                }
                        }, e.prototype.digestSync = function() {
                            if (this.error)
                                throw this.error;
                            return this.outer ? (this.outer.finished || this.outer.update(this.hash.digest()), this.outer.digest()) : this.hash.digest()
                        }, e.prototype.digest = function() {
                            return (0, r.__awaiter)(this, void 0, void 0, (function() {
                                return (0, r.__generator)(this, (function(e) {
                                    return [2, this.digestSync()]
                                }))
                            }))
                        }, e
                    }();
                t.Sha256 = a
            },
            106: function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.convertToBuffer = void 0;
                var r = n(668),
                    o = "undefined" != typeof Buffer && Buffer.from ? function(e) {
                        return Buffer.from(e, "utf8")
                    } : r.fromUtf8;
                t.convertToBuffer = function(e) {
                    return e instanceof Uint8Array ? e : "string" == typeof e ? o(e) : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(e)
                }
            },
            658: function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.numToUint8 = t.isEmptyData = t.convertToBuffer = void 0;
                var r = n(106);
                Object.defineProperty(t, "convertToBuffer", {
                    enumerable: !0,
                    get: function() {
                        return r.convertToBuffer
                    }
                });
                var o = n(304);
                Object.defineProperty(t, "isEmptyData", {
                    enumerable: !0,
                    get: function() {
                        return o.isEmptyData
                    }
                });
                var i = n(174);
                Object.defineProperty(t, "numToUint8", {
                    enumerable: !0,
                    get: function() {
                        return i.numToUint8
                    }
                })
            },
            304: function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.isEmptyData = void 0,
                t.isEmptyData = function(e) {
                    return "string" == typeof e ? 0 === e.length : 0 === e.byteLength
                }
            },
            174: function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.numToUint8 = void 0,
                t.numToUint8 = function(e) {
                    return new Uint8Array([(4278190080 & e) >> 24, (16711680 & e) >> 16, (65280 & e) >> 8, 255 & e])
                }
            },
            668: function(e, t, n) {
                "use strict";
                n.r(t),
                n.d(t, {
                    fromUtf8: function() {
                        return r
                    },
                    toUtf8: function() {
                        return o
                    }
                });
                var r = function(e) {
                        return "function" == typeof TextEncoder ? function(e) {
                            return (new TextEncoder).encode(e)
                        }(e) : function(e) {
                            for (var t = [], n = 0, r = e.length; n < r; n++) {
                                var o = e.charCodeAt(n);
                                if (o < 128)
                                    t.push(o);
                                else if (o < 2048)
                                    t.push(o >> 6 | 192, 63 & o | 128);
                                else if (n + 1 < e.length && 55296 == (64512 & o) && 56320 == (64512 & e.charCodeAt(n + 1))) {
                                    var i = 65536 + ((1023 & o) << 10) + (1023 & e.charCodeAt(++n));
                                    t.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128)
                                } else
                                    t.push(o >> 12 | 224, o >> 6 & 63 | 128, 63 & o | 128)
                            }
                            return Uint8Array.from(t)
                        }(e)
                    },
                    o = function(e) {
                        return "function" == typeof TextDecoder ? function(e) {
                            return new TextDecoder("utf-8").decode(e)
                        }(e) : function(e) {
                            for (var t = "", n = 0, r = e.length; n < r; n++) {
                                var o = e[n];
                                if (o < 128)
                                    t += String.fromCharCode(o);
                                else if (192 <= o && o < 224) {
                                    var i = e[++n];
                                    t += String.fromCharCode((31 & o) << 6 | 63 & i)
                                } else if (240 <= o && o < 365) {
                                    var s = "%" + [o, e[++n], e[++n], e[++n]].map((function(e) {
                                        return e.toString(16)
                                    })).join("%");
                                    t += decodeURIComponent(s)
                                } else
                                    t += String.fromCharCode((15 & o) << 12 | (63 & e[++n]) << 6 | 63 & e[++n])
                            }
                            return t
                        }(e)
                    }
            },
            372: function(e) {
                "use strict";
                function t(e) {
                    return "function" == typeof e
                }
                var n = console.error.bind(console);
                function r(e, t, n) {
                    var r = !!e[t] && e.propertyIsEnumerable(t);
                    Object.defineProperty(e, t, {
                        configurable: !0,
                        enumerable: r,
                        writable: !0,
                        value: n
                    })
                }
                function o(e) {
                    e && e.logger && (t(e.logger) ? n = e.logger : n("new logger isn't a function, not replacing"))
                }
                function i(e, o, i) {
                    if (e && e[o]) {
                        if (!i)
                            return n("no wrapper function"), void n((new Error).stack);
                        if (t(e[o]) && t(i)) {
                            var s = e[o],
                                a = i(s, o);
                            return r(a, "__original", s), r(a, "__unwrap", (function() {
                                e[o] === a && r(e, o, s)
                            })), r(a, "__wrapped", !0), r(e, o, a), a
                        }
                        n("original object and wrapper must be functions")
                    } else
                        n("no original function " + o + " to wrap")
                }
                function s(e, t) {
                    return e && e[t] ? e[t].__unwrap ? e[t].__unwrap() : void n("no original to unwrap to -- has " + t + " already been unwrapped?") : (n("no function to unwrap."), void n((new Error).stack))
                }
                o.wrap = i,
                o.massWrap = function(e, t, r) {
                    if (!e)
                        return n("must provide one or more modules to patch"), void n((new Error).stack);
                    Array.isArray(e) || (e = [e]),
                    t && Array.isArray(t) ? e.forEach((function(e) {
                        t.forEach((function(t) {
                            i(e, t, r)
                        }))
                    })) : n("must provide one or more functions to wrap on modules")
                },
                o.unwrap = s,
                o.massUnwrap = function(e, t) {
                    if (!e)
                        return n("must provide one or more modules to patch"), void n((new Error).stack);
                    Array.isArray(e) || (e = [e]),
                    t && Array.isArray(t) ? e.forEach((function(e) {
                        t.forEach((function(t) {
                            s(e, t)
                        }))
                    })) : n("must provide one or more functions to unwrap on modules")
                },
                e.exports = o
            },
            655: function(e, t, n) {
                "use strict";
                n.r(t),
                n.d(t, {
                    __extends: function() {
                        return o
                    },
                    __assign: function() {
                        return i
                    },
                    __rest: function() {
                        return s
                    },
                    __decorate: function() {
                        return a
                    },
                    __param: function() {
                        return c
                    },
                    __metadata: function() {
                        return u
                    },
                    __awaiter: function() {
                        return l
                    },
                    __generator: function() {
                        return d
                    },
                    __createBinding: function() {
                        return f
                    },
                    __exportStar: function() {
                        return p
                    },
                    __values: function() {
                        return h
                    },
                    __read: function() {
                        return v
                    },
                    __spread: function() {
                        return y
                    },
                    __spreadArrays: function() {
                        return g
                    },
                    __await: function() {
                        return m
                    },
                    __asyncGenerator: function() {
                        return w
                    },
                    __asyncDelegator: function() {
                        return b
                    },
                    __asyncValues: function() {
                        return S
                    },
                    __makeTemplateObject: function() {
                        return E
                    },
                    __importStar: function() {
                        return C
                    },
                    __importDefault: function() {
                        return x
                    },
                    __classPrivateFieldGet: function() {
                        return T
                    },
                    __classPrivateFieldSet: function() {
                        return A
                    }
                });
                var r = function(e, t) {
                    return r = Object.setPrototypeOf || {
                        __proto__: []
                    } instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t)
                            t.hasOwnProperty(n) && (e[n] = t[n])
                    }, r(e, t)
                };
                function o(e, t) {
                    function n() {
                        this.constructor = e
                    }
                    r(e, t),
                    e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }
                var i = function() {
                    return i = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var o in t = arguments[n])
                                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                        return e
                    }, i.apply(this, arguments)
                };
                function s(e, t) {
                    var n = {};
                    for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                        var o = 0;
                        for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
                            t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]])
                    }
                    return n
                }
                function a(e, t, n, r) {
                    var o,
                        i = arguments.length,
                        s = i < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                        s = Reflect.decorate(e, t, n, r);
                    else
                        for (var a = e.length - 1; a >= 0; a--)
                            (o = e[a]) && (s = (i < 3 ? o(s) : i > 3 ? o(t, n, s) : o(t, n)) || s);
                    return i > 3 && s && Object.defineProperty(t, n, s), s
                }
                function c(e, t) {
                    return function(n, r) {
                        t(n, r, e)
                    }
                }
                function u(e, t) {
                    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                        return Reflect.metadata(e, t)
                }
                function l(e, t, n, r) {
                    return new (n || (n = Promise))((function(o, i) {
                        function s(e) {
                            try {
                                c(r.next(e))
                            } catch (e) {
                                i(e)
                            }
                        }
                        function a(e) {
                            try {
                                c(r.throw(e))
                            } catch (e) {
                                i(e)
                            }
                        }
                        function c(e) {
                            var t;
                            e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                                e(t)
                            }))).then(s, a)
                        }
                        c((r = r.apply(e, t || [])).next())
                    }))
                }
                function d(e, t) {
                    var n,
                        r,
                        o,
                        i,
                        s = {
                            label: 0,
                            sent: function() {
                                if (1 & o[0])
                                    throw o[1];
                                return o[1]
                            },
                            trys: [],
                            ops: []
                        };
                    return i = {
                        next: a(0),
                        throw: a(1),
                        return: a(2)
                    }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                        return this
                    }), i;
                    function a(i) {
                        return function(a) {
                            return function(i) {
                                if (n)
                                    throw new TypeError("Generator is already executing.");
                                for (; s;)
                                    try {
                                        if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done)
                                            return o;
                                        switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                        case 0:
                                        case 1:
                                            o = i;
                                            break;
                                        case 4:
                                            return s.label++, {
                                                value: i[1],
                                                done: !1
                                            };
                                        case 5:
                                            s.label++,
                                            r = i[1],
                                            i = [0];
                                            continue;
                                        case 7:
                                            i = s.ops.pop(),
                                            s.trys.pop();
                                            continue;
                                        default:
                                            if (!(o = s.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                                s = 0;
                                                continue
                                            }
                                            if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                                s.label = i[1];
                                                break
                                            }
                                            if (6 === i[0] && s.label < o[1]) {
                                                s.label = o[1],
                                                o = i;
                                                break
                                            }
                                            if (o && s.label < o[2]) {
                                                s.label = o[2],
                                                s.ops.push(i);
                                                break
                                            }
                                            o[2] && s.ops.pop(),
                                            s.trys.pop();
                                            continue
                                        }
                                        i = t.call(e, s)
                                    } catch (e) {
                                        i = [6, e],
                                        r = 0
                                    } finally {
                                        n = o = 0
                                    }
                                if (5 & i[0])
                                    throw i[1];
                                return {
                                    value: i[0] ? i[1] : void 0,
                                    done: !0
                                }
                            }([i, a])
                        }
                    }
                }
                function f(e, t, n, r) {
                    void 0 === r && (r = n),
                    e[r] = t[n]
                }
                function p(e, t) {
                    for (var n in e)
                        "default" === n || t.hasOwnProperty(n) || (t[n] = e[n])
                }
                function h(e) {
                    var t = "function" == typeof Symbol && Symbol.iterator,
                        n = t && e[t],
                        r = 0;
                    if (n)
                        return n.call(e);
                    if (e && "number" == typeof e.length)
                        return {
                            next: function() {
                                return e && r >= e.length && (e = void 0), {
                                    value: e && e[r++],
                                    done: !e
                                }
                            }
                        };
                    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
                }
                function v(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n)
                        return e;
                    var r,
                        o,
                        i = n.call(e),
                        s = [];
                    try {
                        for (; (void 0 === t || t-- > 0) && !(r = i.next()).done;)
                            s.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.return) && n.call(i)
                        } finally {
                            if (o)
                                throw o.error
                        }
                    }
                    return s
                }
                function y() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e = e.concat(v(arguments[t]));
                    return e
                }
                function g() {
                    for (var e = 0, t = 0, n = arguments.length; t < n; t++)
                        e += arguments[t].length;
                    var r = Array(e),
                        o = 0;
                    for (t = 0; t < n; t++)
                        for (var i = arguments[t], s = 0, a = i.length; s < a; s++, o++)
                            r[o] = i[s];
                    return r
                }
                function m(e) {
                    return this instanceof m ? (this.v = e, this) : new m(e)
                }
                function w(e, t, n) {
                    if (!Symbol.asyncIterator)
                        throw new TypeError("Symbol.asyncIterator is not defined.");
                    var r,
                        o = n.apply(e, t || []),
                        i = [];
                    return r = {}, s("next"), s("throw"), s("return"), r[Symbol.asyncIterator] = function() {
                        return this
                    }, r;
                    function s(e) {
                        o[e] && (r[e] = function(t) {
                            return new Promise((function(n, r) {
                                i.push([e, t, n, r]) > 1 || a(e, t)
                            }))
                        })
                    }
                    function a(e, t) {
                        try {
                            (n = o[e](t)).value instanceof m ? Promise.resolve(n.value.v).then(c, u) : l(i[0][2], n)
                        } catch (e) {
                            l(i[0][3], e)
                        }
                        var n
                    }
                    function c(e) {
                        a("next", e)
                    }
                    function u(e) {
                        a("throw", e)
                    }
                    function l(e, t) {
                        e(t),
                        i.shift(),
                        i.length && a(i[0][0], i[0][1])
                    }
                }
                function b(e) {
                    var t,
                        n;
                    return t = {}, r("next"), r("throw", (function(e) {
                        throw e
                    })), r("return"), t[Symbol.iterator] = function() {
                        return this
                    }, t;
                    function r(r, o) {
                        t[r] = e[r] ? function(t) {
                            return (n = !n) ? {
                                value: m(e[r](t)),
                                done: "return" === r
                            } : o ? o(t) : t
                        } : o
                    }
                }
                function S(e) {
                    if (!Symbol.asyncIterator)
                        throw new TypeError("Symbol.asyncIterator is not defined.");
                    var t,
                        n = e[Symbol.asyncIterator];
                    return n ? n.call(e) : (e = h(e), t = {}, r("next"), r("throw"), r("return"), t[Symbol.asyncIterator] = function() {
                        return this
                    }, t);
                    function r(n) {
                        t[n] = e[n] && function(t) {
                            return new Promise((function(r, o) {
                                (function(e, t, n, r) {
                                    Promise.resolve(r).then((function(t) {
                                        e({
                                            value: t,
                                            done: n
                                        })
                                    }), t)
                                })(r, o, (t = e[n](t)).done, t.value)
                            }))
                        }
                    }
                }
                function E(e, t) {
                    return Object.defineProperty ? Object.defineProperty(e, "raw", {
                        value: t
                    }) : e.raw = t, e
                }
                function C(e) {
                    if (e && e.__esModule)
                        return e;
                    var t = {};
                    if (null != e)
                        for (var n in e)
                            Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    return t.default = e, t
                }
                function x(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                function T(e, t) {
                    if (!t.has(e))
                        throw new TypeError("attempted to get private field on non-instance");
                    return t.get(e)
                }
                function A(e, t, n) {
                    if (!t.has(e))
                        throw new TypeError("attempted to set private field on non-instance");
                    return t.set(e, n), n
                }
            },
            238: function(e, t, n) {
                var r;
                !function(o, i) {
                    "use strict";
                    var s = "function",
                        a = "undefined",
                        c = "object",
                        u = "string",
                        l = "model",
                        d = "name",
                        f = "type",
                        p = "vendor",
                        h = "version",
                        v = "architecture",
                        y = "console",
                        g = "mobile",
                        m = "tablet",
                        w = "smarttv",
                        b = "wearable",
                        S = "embedded",
                        E = {
                            extend: function(e, t) {
                                var n = {};
                                for (var r in e)
                                    t[r] && t[r].length % 2 == 0 ? n[r] = t[r].concat(e[r]) : n[r] = e[r];
                                return n
                            },
                            has: function(e, t) {
                                return typeof e === u && -1 !== t.toLowerCase().indexOf(e.toLowerCase())
                            },
                            lowerize: function(e) {
                                return e.toLowerCase()
                            },
                            major: function(e) {
                                return typeof e === u ? e.replace(/[^\d\.]/g, "").split(".")[0] : i
                            },
                            trim: function(e, t) {
                                return e = e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""), typeof t === a ? e : e.substring(0, 255)
                            }
                        },
                        C = {
                            rgx: function(e, t) {
                                for (var n, r, o, a, u, l, d = 0; d < t.length && !u;) {
                                    var f = t[d],
                                        p = t[d + 1];
                                    for (n = r = 0; n < f.length && !u;)
                                        if (u = f[n++].exec(e))
                                            for (o = 0; o < p.length; o++)
                                                l = u[++r],
                                                typeof (a = p[o]) === c && a.length > 0 ? 2 == a.length ? typeof a[1] == s ? this[a[0]] = a[1].call(this, l) : this[a[0]] = a[1] : 3 == a.length ? typeof a[1] !== s || a[1].exec && a[1].test ? this[a[0]] = l ? l.replace(a[1], a[2]) : i : this[a[0]] = l ? a[1].call(this, l, a[2]) : i : 4 == a.length && (this[a[0]] = l ? a[3].call(this, l.replace(a[1], a[2])) : i) : this[a] = l || i;
                                    d += 2
                                }
                            },
                            str: function(e, t) {
                                for (var n in t)
                                    if (typeof t[n] === c && t[n].length > 0) {
                                        for (var r = 0; r < t[n].length; r++)
                                            if (E.has(t[n][r], e))
                                                return "?" === n ? i : n
                                    } else if (E.has(t[n], e))
                                        return "?" === n ? i : n;
                                return e
                            }
                        },
                        x = {
                            browser: {
                                oldSafari: {
                                    version: {
                                        "1.0": "/8",
                                        1.2: "/1",
                                        1.3: "/3",
                                        "2.0": "/412",
                                        "2.0.2": "/416",
                                        "2.0.3": "/417",
                                        "2.0.4": "/419",
                                        "?": "/"
                                    }
                                },
                                oldEdge: {
                                    version: {
                                        .1: "12.",
                                        21: "13.",
                                        31: "14.",
                                        39: "15.",
                                        41: "16.",
                                        42: "17.",
                                        44: "18."
                                    }
                                }
                            },
                            os: {
                                windows: {
                                    version: {
                                        ME: "4.90",
                                        "NT 3.11": "NT3.51",
                                        "NT 4.0": "NT4.0",
                                        2e3: "NT 5.0",
                                        XP: ["NT 5.1", "NT 5.2"],
                                        Vista: "NT 6.0",
                                        7: "NT 6.1",
                                        8: "NT 6.2",
                                        8.1: "NT 6.3",
                                        10: ["NT 6.4", "NT 10.0"],
                                        RT: "ARM"
                                    }
                                }
                            }
                        },
                        T = {
                            browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [h, [d, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [h, [d, "Edge"]], [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]{3,6})\b.+version\/([\w\.-]+)/i, /(opera)(?:.+version\/|[\/\s]+)([\w\.]+)/i], [d, h], [/opios[\/\s]+([\w\.]+)/i], [h, [d, "Opera Mini"]], [/\sopr\/([\w\.]+)/i], [h, [d, "Opera"]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i, /(ba?idubrowser)[\/\s]?([\w\.]+)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i, /(rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([\w\.]+)/i, /(weibo)__([\d\.]+)/i], [d, h], [/(?:[\s\/]uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i], [h, [d, "UCBrowser"]], [/(?:windowswechat)?\sqbcore\/([\w\.]+)\b.*(?:windowswechat)?/i], [h, [d, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [h, [d, "WeChat"]], [/konqueror\/([\w\.]+)/i], [h, [d, "Konqueror"]], [/trident.+rv[:\s]([\w\.]{1,9})\b.+like\sgecko/i], [h, [d, "IE"]], [/yabrowser\/([\w\.]+)/i], [h, [d, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[d, /(.+)/, "$1 Secure Browser"], h], [/focus\/([\w\.]+)/i], [h, [d, "Firefox Focus"]], [/opt\/([\w\.]+)/i], [h, [d, "Opera Touch"]], [/coc_coc_browser\/([\w\.]+)/i], [h, [d, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [h, [d, "Dolphin"]], [/coast\/([\w\.]+)/i], [h, [d, "Opera Coast"]], [/xiaomi\/miuibrowser\/([\w\.]+)/i], [h, [d, "MIUI Browser"]], [/fxios\/([\w\.-]+)/i], [h, [d, "Firefox"]], [/(qihu|qhbrowser|qihoobrowser|360browser)/i], [[d, "360 Browser"]], [/(oculus|samsung|sailfish)browser\/([\w\.]+)/i], [[d, /(.+)/, "$1 Browser"], h], [/(comodo_dragon)\/([\w\.]+)/i], [[d, /_/g, " "], h], [/\s(electron)\/([\w\.]+)\ssafari/i, /(tesla)(?:\sqtcarbrowser|\/(20[12]\d\.[\w\.-]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/\s]?([\w\.]+)/i], [d, h], [/(MetaSr)[\/\s]?([\w\.]+)/i, /(LBBROWSER)/i], [d], [/;fbav\/([\w\.]+);/i], [h, [d, "Facebook"]], [/FBAN\/FBIOS|FB_IAB\/FB4A/i], [[d, "Facebook"]], [/safari\s(line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/\s]([\w\.-]+)/i], [d, h], [/\bgsa\/([\w\.]+)\s.*safari\//i], [h, [d, "GSA"]], [/headlesschrome(?:\/([\w\.]+)|\s)/i], [h, [d, "Chrome Headless"]], [/\swv\).+(chrome)\/([\w\.]+)/i], [[d, "Chrome WebView"], h], [/droid.+\sversion\/([\w\.]+)\b.+(?:mobile\ssafari|safari)/i], [h, [d, "Android Browser"]], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i], [d, h], [/version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i], [h, [d, "Mobile Safari"]], [/version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i], [h, d], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [d, [h, C.str, x.browser.oldSafari.version]], [/(webkit|khtml)\/([\w\.]+)/i], [d, h], [/(navigator|netscape)\/([\w\.-]+)/i], [[d, "Netscape"], h], [/ile\svr;\srv:([\w\.]+)\).+firefox/i], [h, [d, "Firefox Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, /(firefox)\/([\w\.]+)\s[\w\s\-]+\/[\w\.]+$/i, /(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]*)/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i], [d, h]],
                            cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [[v, "amd64"]], [/(ia32(?=;))/i], [[v, E.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [[v, "ia32"]], [/\b(aarch64|armv?8e?l?)\b/i], [[v, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[v, "armhf"]], [/windows\s(ce|mobile);\sppc;/i], [[v, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [[v, /ower/, "", E.lowerize]], [/(sun4\w)[;\)]/i], [[v, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?:64|(?=v(?:[1-7]|[5-7]1)l?|;|eabi))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[v, E.lowerize]]],
                            device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus\s10)/i], [l, [p, "Samsung"], [f, m]], [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy\snexus)/i, /\ssamsung[\s-]([\w-]+)/i, /sec-(sgh\w+)/i], [l, [p, "Samsung"], [f, g]], [/\((ip(?:hone|od)[\s\w]*);/i], [l, [p, "Apple"], [f, g]], [/\((ipad);[\w\s\),;-]+apple/i, /applecoremedia\/[\w\.]+\s\((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [l, [p, "Apple"], [f, m]], [/\b((?:agr|ags[23]|bah2?|sht?)-a?[lw]\d{2})/i], [l, [p, "Huawei"], [f, m]], [/d\/huawei([\w\s-]+)[;\)]/i, /\b(nexus\s6p|vog-[at]?l\d\d|ane-[at]?l[x\d]\d|eml-a?l\d\da?|lya-[at]?l\d[\dc]|clt-a?l\d\di?|ele-l\d\d)/i, /\b(\w{2,4}-[atu][ln][01259][019])[;\)\s]/i], [l, [p, "Huawei"], [f, g]], [/\b(poco[\s\w]+)(?:\sbuild|\))/i, /\b;\s(\w+)\sbuild\/hm\1/i, /\b(hm[\s\-_]?note?[\s_]?(?:\d\w)?)\sbuild/i, /\b(redmi[\s\-_]?(?:note|k)?[\w\s_]+)(?:\sbuild|\))/i, /\b(mi[\s\-_]?(?:a\d|one|one[\s_]plus|note lte)?[\s_]?(?:\d?\w?)[\s_]?(?:plus)?)\sbuild/i], [[l, /_/g, " "], [p, "Xiaomi"], [f, g]], [/\b(mi[\s\-_]?(?:pad)(?:[\w\s_]+))(?:\sbuild|\))/i], [[l, /_/g, " "], [p, "Xiaomi"], [f, m]], [/;\s(\w+)\sbuild.+\soppo/i, /\s(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007)\b/i], [l, [p, "OPPO"], [f, g]], [/\svivo\s(\w+)(?:\sbuild|\))/i, /\s(v[12]\d{3}\w?[at])(?:\sbuild|;)/i], [l, [p, "Vivo"], [f, g]], [/\s(rmx[12]\d{3})(?:\sbuild|;)/i], [l, [p, "Realme"], [f, g]], [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)\b[\w\s]+build\//i, /\smot(?:orola)?[\s-](\w*)/i, /((?:moto[\s\w\(\)]+|xt\d{3,4}|nexus\s6)(?=\sbuild|\)))/i], [l, [p, "Motorola"], [f, g]], [/\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [l, [p, "Motorola"], [f, m]], [/((?=lg)?[vl]k\-?\d{3})\sbuild|\s3\.[\s\w;-]{10}lg?-([06cv9]{3,4})/i], [l, [p, "LG"], [f, m]], [/(lm-?f100[nv]?|nexus\s[45])/i, /lg[e;\s\/-]+((?!browser|netcast)\w+)/i, /\blg(\-?[\d\w]+)\sbuild/i], [l, [p, "LG"], [f, g]], [/(ideatab[\w\-\s]+)/i, /lenovo\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+)|yt[\d\w-]{6}|tb[\d\w-]{6})/i], [l, [p, "Lenovo"], [f, m]], [/(?:maemo|nokia).*(n900|lumia\s\d+)/i, /nokia[\s_-]?([\w\.-]*)/i], [[l, /_/g, " "], [p, "Nokia"], [f, g]], [/droid.+;\s(pixel\sc)[\s)]/i], [l, [p, "Google"], [f, m]], [/droid.+;\s(pixel[\s\daxl]{0,6})(?:\sbuild|\))/i], [l, [p, "Google"], [f, g]], [/droid.+\s([c-g]\d{4}|so[-l]\w+|xq-a\w[4-7][12])(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [l, [p, "Sony"], [f, g]], [/sony\stablet\s[ps]\sbuild\//i, /(?:sony)?sgp\w+(?:\sbuild\/|\))/i], [[l, "Xperia Tablet"], [p, "Sony"], [f, m]], [/\s(kb2005|in20[12]5|be20[12][59])\b/i, /\ba000(1)\sbuild/i, /\boneplus\s(a\d{4})[\s)]/i], [l, [p, "OnePlus"], [f, g]], [/(alexa)webm/i, /(kf[a-z]{2}wi)(\sbuild\/|\))/i, /(kf[a-z]+)(\sbuild\/|\)).+silk\//i], [l, [p, "Amazon"], [f, m]], [/(sd|kf)[0349hijorstuw]+(\sbuild\/|\)).+silk\//i], [[l, "Fire Phone"], [p, "Amazon"], [f, g]], [/\((playbook);[\w\s\),;-]+(rim)/i], [l, p, [f, m]], [/((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10;\s(\w+)/i], [l, [p, "BlackBerry"], [f, g]], [/(?:\b|asus_)(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus\s7|padfone|p00[cj])/i], [l, [p, "ASUS"], [f, m]], [/\s(z[es]6[027][01][km][ls]|zenfone\s\d\w?)\b/i], [l, [p, "ASUS"], [f, g]], [/(nexus\s9)/i], [l, [p, "HTC"], [f, m]], [/(htc)[;_\s-]{1,2}([\w\s]+(?=\)|\sbuild)|\w+)/i, /(zte)-(\w*)/i, /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i], [p, [l, /_/g, " "], [f, g]], [/droid[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i], [l, [p, "Acer"], [f, m]], [/droid.+;\s(m[1-5]\snote)\sbuild/i, /\bmz-([\w-]{2,})/i], [l, [p, "Meizu"], [f, g]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i, /(microsoft);\s(lumia[\s\w]+)/i, /(lenovo)[_\s-]?([\w-]+)/i, /linux;.+(jolla);/i, /droid.+;\s(oppo)\s?([\w\s]+)\sbuild/i], [p, l, [f, g]], [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i, /[;\/]\s?(le[\s\-]+pan)[\s\-]+(\w{1,9})\sbuild/i, /[;\/]\s?(trinity)[\-\s]*(t\d{3})\sbuild/i, /\b(gigaset)[\s\-]+(q\w{1,9})\sbuild/i, /\b(vodafone)\s([\w\s]+)(?:\)|\sbuild)/i], [p, l, [f, m]], [/\s(surface\sduo)\s/i], [l, [p, "Microsoft"], [f, m]], [/droid\s[\d\.]+;\s(fp\du?)\sbuild/i], [l, [p, "Fairphone"], [f, g]], [/\s(u304aa)\sbuild/i], [l, [p, "AT&T"], [f, g]], [/sie-(\w*)/i], [l, [p, "Siemens"], [f, g]], [/[;\/]\s?(rct\w+)\sbuild/i], [l, [p, "RCA"], [f, m]], [/[;\/\s](venue[\d\s]{2,7})\sbuild/i], [l, [p, "Dell"], [f, m]], [/[;\/]\s?(q(?:mv|ta)\w+)\sbuild/i], [l, [p, "Verizon"], [f, m]], [/[;\/]\s(?:barnes[&\s]+noble\s|bn[rt])([\w\s\+]*)\sbuild/i], [l, [p, "Barnes & Noble"], [f, m]], [/[;\/]\s(tm\d{3}\w+)\sbuild/i], [l, [p, "NuVision"], [f, m]], [/;\s(k88)\sbuild/i], [l, [p, "ZTE"], [f, m]], [/;\s(nx\d{3}j)\sbuild/i], [l, [p, "ZTE"], [f, g]], [/[;\/]\s?(gen\d{3})\sbuild.*49h/i], [l, [p, "Swiss"], [f, g]], [/[;\/]\s?(zur\d{3})\sbuild/i], [l, [p, "Swiss"], [f, m]], [/[;\/]\s?((zeki)?tb.*\b)\sbuild/i], [l, [p, "Zeki"], [f, m]], [/[;\/]\s([yr]\d{2})\sbuild/i, /[;\/]\s(dragon[\-\s]+touch\s|dt)(\w{5})\sbuild/i], [[p, "Dragon Touch"], l, [f, m]], [/[;\/]\s?(ns-?\w{0,9})\sbuild/i], [l, [p, "Insignia"], [f, m]], [/[;\/]\s?((nxa|Next)-?\w{0,9})\sbuild/i], [l, [p, "NextBook"], [f, m]], [/[;\/]\s?(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05]))\sbuild/i], [[p, "Voice"], l, [f, g]], [/[;\/]\s?(lvtel\-)?(v1[12])\sbuild/i], [[p, "LvTel"], l, [f, g]], [/;\s(ph-1)\s/i], [l, [p, "Essential"], [f, g]], [/[;\/]\s?(v(100md|700na|7011|917g).*\b)\sbuild/i], [l, [p, "Envizen"], [f, m]], [/[;\/]\s?(trio[\s\w\-\.]+)\sbuild/i], [l, [p, "MachSpeed"], [f, m]], [/[;\/]\s?tu_(1491)\sbuild/i], [l, [p, "Rotor"], [f, m]], [/(shield[\w\s]+)\sbuild/i], [l, [p, "Nvidia"], [f, m]], [/(sprint)\s(\w+)/i], [p, l, [f, g]], [/(kin\.[onetw]{3})/i], [[l, /\./g, " "], [p, "Microsoft"], [f, g]], [/droid\s[\d\.]+;\s(cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [l, [p, "Zebra"], [f, m]], [/droid\s[\d\.]+;\s(ec30|ps20|tc[2-8]\d[kx])\)/i], [l, [p, "Zebra"], [f, g]], [/\s(ouya)\s/i, /(nintendo)\s([wids3utch]+)/i], [p, l, [f, y]], [/droid.+;\s(shield)\sbuild/i], [l, [p, "Nvidia"], [f, y]], [/(playstation\s[345portablevi]+)/i], [l, [p, "Sony"], [f, y]], [/[\s\(;](xbox(?:\sone)?(?!;\sxbox))[\s\);]/i], [l, [p, "Microsoft"], [f, y]], [/smart-tv.+(samsung)/i], [p, [f, w]], [/hbbtv.+maple;(\d+)/i], [[l, /^/, "SmartTV"], [p, "Samsung"], [f, w]], [/(?:linux;\snetcast.+smarttv|lg\snetcast\.tv-201\d)/i], [[p, "LG"], [f, w]], [/(apple)\s?tv/i], [p, [l, "Apple TV"], [f, w]], [/crkey/i], [[l, "Chromecast"], [p, "Google"], [f, w]], [/droid.+aft([\w])(\sbuild\/|\))/i], [l, [p, "Amazon"], [f, w]], [/\(dtv[\);].+(aquos)/i], [l, [p, "Sharp"], [f, w]], [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i], [[p, E.trim], [l, E.trim], [f, w]], [/[\s\/\(](android\s|smart[-\s]?|opera\s)tv[;\)\s]/i], [[f, w]], [/((pebble))app\/[\d\.]+\s/i], [p, l, [f, b]], [/droid.+;\s(glass)\s\d/i], [l, [p, "Google"], [f, b]], [/droid\s[\d\.]+;\s(wt63?0{2,3})\)/i], [l, [p, "Zebra"], [f, b]], [/(tesla)(?:\sqtcarbrowser|\/20[12]\d\.[\w\.-]+)/i], [p, [f, S]], [/droid .+?; ([^;]+?)(?: build|\) applewebkit).+? mobile safari/i], [l, [f, g]], [/droid .+?;\s([^;]+?)(?: build|\) applewebkit).+?(?! mobile) safari/i], [l, [f, m]], [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i], [[f, E.lowerize]], [/(android[\w\.\s\-]{0,9});.+build/i], [l, [p, "Generic"]], [/(phone)/i], [[f, g]]],
                            engine: [[/windows.+\sedge\/([\w\.]+)/i], [h, [d, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [h, [d, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [d, h], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [h, d]],
                            os: [[/microsoft\s(windows)\s(vista|xp)/i], [d, h], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)(?!.+xbox)/i], [d, [h, C.str, x.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[d, "Windows"], [h, C.str, x.os.windows.version]], [/ip[honead]{2,4}\b(?:.*os\s([\w]+)\slike\smac|;\sopera)/i, /cfnetwork\/.+darwin/i], [[h, /_/g, "."], [d, "iOS"]], [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)(?!.+haiku)/i], [[d, "Mac OS"], [h, /_/g, "."]], [/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/\s]([\w\.]+)/i, /\((series40);/i], [d, h], [/\(bb(10);/i], [h, [d, "BlackBerry"]], [/(?:symbian\s?os|symbos|s60(?=;)|series60)[\/\s-]?([\w\.]*)/i], [h, [d, "Symbian"]], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[d, "Firefox OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [h, [d, "webOS"]], [/crkey\/([\d\.]+)/i], [h, [d, "Chromecast"]], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[d, "Chromium OS"], h], [/(nintendo|playstation)\s([wids345portablevuch]+)/i, /(xbox);\s+xbox\s([^\);]+)/i, /(mint)[\/\s\(\)]?(\w*)/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?=\slinux)|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus|raspbian)(?:\sgnu\/linux)?(?:\slinux)?[\/\s-]?(?!chrom|package)([\w\.-]*)/i, /(hurd|linux)\s?([\w\.]*)/i, /(gnu)\s?([\w\.]*)/i, /\s([frentopc-]{0,4}bsd|dragonfly)\s?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku)\s(\w+)/i], [d, h], [/(sunos)\s?([\w\.\d]*)/i], [[d, "Solaris"], h], [/((?:open)?solaris)[\/\s-]?([\w\.]*)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i, /(unix)\s?([\w\.]*)/i], [d, h]]
                        },
                        A = function(e, t) {
                            if ("object" == typeof e && (t = e, e = i), !(this instanceof A))
                                return new A(e, t).getResult();
                            var n = e || (void 0 !== o && o.navigator && o.navigator.userAgent ? o.navigator.userAgent : ""),
                                r = t ? E.extend(T, t) : T;
                            return this.getBrowser = function() {
                                var e = {
                                    name: i,
                                    version: i
                                };
                                return C.rgx.call(e, n, r.browser), e.major = E.major(e.version), e
                            }, this.getCPU = function() {
                                var e = {
                                    architecture: i
                                };
                                return C.rgx.call(e, n, r.cpu), e
                            }, this.getDevice = function() {
                                var e = {
                                    vendor: i,
                                    model: i,
                                    type: i
                                };
                                return C.rgx.call(e, n, r.device), e
                            }, this.getEngine = function() {
                                var e = {
                                    name: i,
                                    version: i
                                };
                                return C.rgx.call(e, n, r.engine), e
                            }, this.getOS = function() {
                                var e = {
                                    name: i,
                                    version: i
                                };
                                return C.rgx.call(e, n, r.os), e
                            }, this.getResult = function() {
                                return {
                                    ua: this.getUA(),
                                    browser: this.getBrowser(),
                                    engine: this.getEngine(),
                                    os: this.getOS(),
                                    device: this.getDevice(),
                                    cpu: this.getCPU()
                                }
                            }, this.getUA = function() {
                                return n
                            }, this.setUA = function(e) {
                                return n = typeof e === u && e.length > 255 ? E.trim(e, 255) : e, this
                            }, this.setUA(n), this
                        };
                    A.VERSION = "0.7.28",
                    A.BROWSER = {
                        NAME: d,
                        MAJOR: "major",
                        VERSION: h
                    },
                    A.CPU = {
                        ARCHITECTURE: v
                    },
                    A.DEVICE = {
                        MODEL: l,
                        VENDOR: p,
                        TYPE: f,
                        CONSOLE: y,
                        MOBILE: g,
                        SMARTTV: w,
                        TABLET: m,
                        WEARABLE: b,
                        EMBEDDED: S
                    },
                    A.ENGINE = {
                        NAME: d,
                        VERSION: h
                    },
                    A.OS = {
                        NAME: d,
                        VERSION: h
                    },
                    typeof t !== a ? (e.exports && (t = e.exports = A), t.UAParser = A) : (r = function() {
                        return A
                    }.call(t, n, t, e)) === i || (e.exports = r);
                    var I = void 0 !== o && (o.jQuery || o.Zepto);
                    if (I && !I.ua) {
                        var _ = new A;
                        I.ua = _.getResult(),
                        I.ua.get = function() {
                            return _.getUA()
                        },
                        I.ua.set = function(e) {
                            _.setUA(e);
                            var t = _.getResult();
                            for (var n in t)
                                I.ua[n] = t[n]
                        }
                    }
                }("object" == typeof window ? window : this)
            }
        },
        t = {};
    function n(r) {
        var o = t[r];
        if (void 0 !== o)
            return o.exports;
        var i = t[r] = {
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, n), i.exports
    }
    n.d = function(e, t) {
        for (var r in t)
            n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
                enumerable: !0,
                get: t[r]
            })
    },
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    },
    n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    },
    function() {
        "use strict";
        var e = function() {
            function e(e) {
                this.statusCode = e.statusCode,
                this.headers = e.headers || {},
                this.body = e.body
            }
            return e.isInstance = function(e) {
                if (!e)
                    return !1;
                var t = e;
                return "number" == typeof t.statusCode && "object" == typeof t.headers
            }, e
        }();
        var t = function() {
            return t = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }, t.apply(this, arguments)
        };
        Object.create;
        function r(e, t) {
            var n = "function" == typeof Symbol && e[Symbol.iterator];
            if (!n)
                return e;
            var r,
                o,
                i = n.call(e),
                s = [];
            try {
                for (; (void 0 === t || t-- > 0) && !(r = i.next()).done;)
                    s.push(r.value)
            } catch (e) {
                o = {
                    error: e
                }
            } finally {
                try {
                    r && !r.done && (n = i.return) && n.call(i)
                } finally {
                    if (o)
                        throw o.error
                }
            }
            return s
        }
        Object.create;
        var o = function() {
            function e(e) {
                this.method = e.method || "GET",
                this.hostname = e.hostname || "localhost",
                this.port = e.port,
                this.query = e.query || {},
                this.headers = e.headers || {},
                this.body = e.body,
                this.protocol = e.protocol ? ":" !== e.protocol.substr(-1) ? e.protocol + ":" : e.protocol : "https:",
                this.path = e.path ? "/" !== e.path.charAt(0) ? "/" + e.path : e.path : "/"
            }
            return e.isInstance = function(e) {
                if (!e)
                    return !1;
                var t = e;
                return "method" in t && "protocol" in t && "hostname" in t && "path" in t && "object" == typeof t.query && "object" == typeof t.headers
            }, e.prototype.clone = function() {
                var n,
                    o = new e(t(t({}, this), {
                        headers: t({}, this.headers)
                    }));
                return o.query && (o.query = (n = o.query, Object.keys(n).reduce((function(e, o) {
                    var i,
                        s = n[o];
                    return t(t({}, e), ((i = {})[o] = Array.isArray(s) ? function(e, t, n) {
                        if (n || 2 === arguments.length)
                            for (var r, o = 0, i = t.length; o < i; o++)
                                !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)), r[o] = t[o]);
                        return e.concat(r || Array.prototype.slice.call(t))
                    }([], r(s)) : s, i))
                }), {}))), o
            }, e
        }();
        var i = function(e, t, n, r) {
                return new (n || (n = Promise))((function(o, i) {
                    function s(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function a(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function c(e) {
                        var t;
                        e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                            e(t)
                        }))).then(s, a)
                    }
                    c((r = r.apply(e, t || [])).next())
                }))
            },
            s = function(e, t) {
                var n,
                    r,
                    o,
                    i,
                    s = {
                        label: 0,
                        sent: function() {
                            if (1 & o[0])
                                throw o[1];
                            return o[1]
                        },
                        trys: [],
                        ops: []
                    };
                return i = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                    return this
                }), i;
                function a(i) {
                    return function(a) {
                        return function(i) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; s;)
                                try {
                                    if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done)
                                        return o;
                                    switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                    case 0:
                                    case 1:
                                        o = i;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: i[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        r = i[1],
                                        i = [0];
                                        continue;
                                    case 7:
                                        i = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!(o = s.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                            s.label = i[1];
                                            break
                                        }
                                        if (6 === i[0] && s.label < o[1]) {
                                            s.label = o[1],
                                            o = i;
                                            break
                                        }
                                        if (o && s.label < o[2]) {
                                            s.label = o[2],
                                            s.ops.push(i);
                                            break
                                        }
                                        o[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    i = t.call(e, s)
                                } catch (e) {
                                    i = [6, e],
                                    r = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & i[0])
                                throw i[1];
                            return {
                                value: i[0] ? i[1] : void 0,
                                done: !0
                            }
                        }([i, a])
                    }
                }
            },
            a = function(e) {
                var t = this;
                this.getId = function(e) {
                    return i(t, void 0, void 0, (function() {
                        var t,
                            n;
                        return s(this, (function(r) {
                            return t = JSON.stringify(e), n = this.getHttpRequest("AWSCognitoIdentityService.GetId", t), [2, this.fetchRequestHandler.handle(n).then((function(e) {
                                return e.response.body.getReader().read().then((function(e) {
                                    var t = e.value;
                                    return JSON.parse(String.fromCharCode.apply(null, t))
                                }))
                            })).catch((function() {
                                throw new Error("CWR: Failed to retrieve Cognito identity")
                            }))]
                        }))
                    }))
                },
                this.getOpenIdToken = function(e) {
                    return i(t, void 0, void 0, (function() {
                        var t,
                            n;
                        return s(this, (function(r) {
                            return t = JSON.stringify(e), n = this.getHttpRequest("AWSCognitoIdentityService.GetOpenIdToken", t), [2, this.fetchRequestHandler.handle(n).then((function(e) {
                                return e.response.body.getReader().read().then((function(e) {
                                    var t = e.value;
                                    return JSON.parse(String.fromCharCode.apply(null, t))
                                }))
                            })).catch((function() {
                                throw new Error("CWR: Failed to retrieve Cognito OpenId token")
                            }))]
                        }))
                    }))
                },
                this.getCredentialsForIdentity = function(e) {
                    return i(t, void 0, void 0, (function() {
                        var t,
                            n;
                        return s(this, (function(r) {
                            return t = JSON.stringify({
                                IdentityId: e
                            }), n = this.getHttpRequest("AWSCognitoIdentityService.GetCredentialsForIdentity", t), [2, this.fetchRequestHandler.handle(n).then((function(e) {
                                return e.response.body.getReader().read().then((function(e) {
                                    var t = e.value,
                                        n = JSON.parse(String.fromCharCode.apply(null, t)),
                                        r = n.IdentityId,
                                        o = n.Credentials,
                                        i = o.AccessKeyId,
                                        s = o.Expiration;
                                    return {
                                        identityId: r,
                                        accessKeyId: i,
                                        secretAccessKey: o.SecretAccessKey,
                                        sessionToken: o.SessionToken,
                                        expiration: new Date(1e3 * s)
                                    }
                                }))
                            })).catch((function() {
                                throw new Error("CWR: Failed to retrieve credentials for Cognito identity")
                            }))]
                        }))
                    }))
                },
                this.getHttpRequest = function(e, n) {
                    return new o({
                        method: "POST",
                        headers: {
                            "content-type": "application/x-amz-json-1.1",
                            "x-amz-target": e
                        },
                        protocol: "https:",
                        hostname: t.hostname,
                        body: n
                    })
                },
                this.hostname = "cognito-identity." + e.region + ".amazonaws.com",
                this.fetchRequestHandler = e.fetchRequestHandler
            };
        Object.create;
        function c(e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
            if (n)
                return n.call(e);
            if (e && "number" == typeof e.length)
                return {
                    next: function() {
                        return e && r >= e.length && (e = void 0), {
                            value: e && e[r++],
                            done: !e
                        }
                    }
                };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }
        Object.create;
        Object.create;
        function u(e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
            if (n)
                return n.call(e);
            if (e && "number" == typeof e.length)
                return {
                    next: function() {
                        return e && r >= e.length && (e = void 0), {
                            value: e && e[r++],
                            done: !e
                        }
                    }
                };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }
        Object.create;
        var l = function(e) {
                return encodeURIComponent(e).replace(/[!'()*]/g, d)
            },
            d = function(e) {
                return "%" + e.charCodeAt(0).toString(16).toUpperCase()
            };
        function f(e) {
            var t,
                n,
                r = [];
            try {
                for (var o = u(Object.keys(e).sort()), i = o.next(); !i.done; i = o.next()) {
                    var s = i.value,
                        a = e[s];
                    if (s = l(s), Array.isArray(a))
                        for (var c = 0, d = a.length; c < d; c++)
                            r.push(s + "=" + l(a[c]));
                    else {
                        var f = s;
                        (a || "string" == typeof a) && (f += "=" + l(a)),
                        r.push(f)
                    }
                }
            } catch (e) {
                t = {
                    error: e
                }
            } finally {
                try {
                    i && !i.done && (n = o.return) && n.call(o)
                } finally {
                    if (t)
                        throw t.error
                }
            }
            return r.join("&")
        }
        for (var p = function() {
                function t(e) {
                    var t = (void 0 === e ? {} : e).requestTimeout;
                    this.requestTimeout = t
                }
                return t.prototype.destroy = function() {}, t.prototype.handle = function(t, n) {
                    var r = (void 0 === n ? {} : n).abortSignal,
                        o = this.requestTimeout;
                    if (null == r ? void 0 : r.aborted) {
                        var i = new Error("Request aborted");
                        return i.name = "AbortError", Promise.reject(i)
                    }
                    var s = t.path;
                    if (t.query) {
                        var a = f(t.query);
                        a && (s += "?" + a)
                    }
                    var u = t.port,
                        l = t.method,
                        d = t.protocol + "//" + t.hostname + (u ? ":" + u : "") + s,
                        p = {
                            body: "GET" === l || "HEAD" === l ? void 0 : t.body,
                            headers: new Headers(t.headers),
                            method: l
                        };
                    "undefined" != typeof AbortController && (p.signal = r);
                    var h,
                        v = new Request(d, p),
                        y = [fetch(v).then((function(t) {
                            var n,
                                r,
                                o = t.headers,
                                i = {};
                            try {
                                for (var s = c(o.entries()), a = s.next(); !a.done; a = s.next()) {
                                    var u = a.value;
                                    i[u[0]] = u[1]
                                }
                            } catch (e) {
                                n = {
                                    error: e
                                }
                            } finally {
                                try {
                                    a && !a.done && (r = s.return) && r.call(s)
                                } finally {
                                    if (n)
                                        throw n.error
                                }
                            }
                            return void 0 !== t.body ? {
                                response: new e({
                                    headers: i,
                                    statusCode: t.status,
                                    body: t.body
                                })
                            } : t.blob().then((function(n) {
                                return {
                                    response: new e({
                                        headers: i,
                                        statusCode: t.status,
                                        body: n
                                    })
                                }
                            }))
                        })), (h = o, void 0 === h && (h = 0), new Promise((function(e, t) {
                            h && setTimeout((function() {
                                var e = new Error("Request did not complete within " + h + " ms");
                                e.name = "TimeoutError",
                                t(e)
                            }), h)
                        })))];
                    return r && y.push(new Promise((function(e, t) {
                        r.onabort = function() {
                            var e = new Error("Request aborted");
                            e.name = "AbortError",
                            t(e)
                        }
                    }))), Promise.race(y)
                }, t
            }(), h = {}, v = new Array(64), y = 0, g = "A".charCodeAt(0), m = "Z".charCodeAt(0); y + g <= m; y++) {
            var w = String.fromCharCode(y + g);
            h[w] = y,
            v[y] = w
        }
        for (y = 0, g = "a".charCodeAt(0), m = "z".charCodeAt(0); y + g <= m; y++) {
            w = String.fromCharCode(y + g);
            var b = y + 26;
            h[w] = b,
            v[b] = w
        }
        for (y = 0; y < 10; y++) {
            h[y.toString(10)] = y + 52;
            w = y.toString(10),
            b = y + 52;
            h[w] = b,
            v[b] = w
        }
        h["+"] = 62,
        v[62] = "+",
        h["/"] = 63,
        v[63] = "/";
        var S = function() {
                return S = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e
                }, S.apply(this, arguments)
            },
            E = function(e, t, n, r) {
                return new (n || (n = Promise))((function(o, i) {
                    function s(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function a(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function c(e) {
                        var t;
                        e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                            e(t)
                        }))).then(s, a)
                    }
                    c((r = r.apply(e, t || [])).next())
                }))
            },
            C = function(e, t) {
                var n,
                    r,
                    o,
                    i,
                    s = {
                        label: 0,
                        sent: function() {
                            if (1 & o[0])
                                throw o[1];
                            return o[1]
                        },
                        trys: [],
                        ops: []
                    };
                return i = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                    return this
                }), i;
                function a(i) {
                    return function(a) {
                        return function(i) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; s;)
                                try {
                                    if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done)
                                        return o;
                                    switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                    case 0:
                                    case 1:
                                        o = i;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: i[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        r = i[1],
                                        i = [0];
                                        continue;
                                    case 7:
                                        i = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!(o = s.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                            s.label = i[1];
                                            break
                                        }
                                        if (6 === i[0] && s.label < o[1]) {
                                            s.label = o[1],
                                            o = i;
                                            break
                                        }
                                        if (o && s.label < o[2]) {
                                            s.label = o[2],
                                            s.ops.push(i);
                                            break
                                        }
                                        o[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    i = t.call(e, s)
                                } catch (e) {
                                    i = [6, e],
                                    r = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & i[0])
                                throw i[1];
                            return {
                                value: i[0] ? i[1] : void 0,
                                done: !0
                            }
                        }([i, a])
                    }
                }
            },
            x = function(e) {
                var t = this;
                this.assumeRoleWithWebIdentity = function(e) {
                    return E(t, void 0, void 0, (function() {
                        var t,
                            n,
                            r;
                        return C(this, (function(i) {
                            return t = S(S({}, e), {
                                Action: "AssumeRoleWithWebIdentity",
                                Version: "2011-06-15"
                            }), n = new URLSearchParams(Object.entries(t)).toString(), r = new o({
                                method: "POST",
                                headers: {
                                    "content-type": "application/x-www-form-urlencoded",
                                    host: this.hostname
                                },
                                protocol: "https:",
                                hostname: this.hostname,
                                body: n
                            }), [2, this.fetchRequestHandler.handle(r).then((function(e) {
                                return e.response.body.getReader().read().then((function(e) {
                                    var t = e.value,
                                        n = String.fromCharCode.apply(null, t);
                                    return {
                                        accessKeyId: n.split("<AccessKeyId>")[1].split("</AccessKeyId>")[0],
                                        secretAccessKey: n.split("<SecretAccessKey>")[1].split("</SecretAccessKey>")[0],
                                        sessionToken: n.split("<SessionToken>")[1].split("</SessionToken>")[0],
                                        expiration: new Date(n.split("<Expiration>")[1].split("</Expiration>")[0])
                                    }
                                }))
                            })).catch((function() {
                                throw new Error("CWR: Failed to retrieve credentials from STS")
                            }))]
                        }))
                    }))
                },
                this.hostname = "sts." + e.region + ".amazonaws.com",
                this.fetchRequestHandler = e.fetchRequestHandler
            },
            T = "cwr_c",
            A = "cwr_s",
            I = "cwr_u",
            _ = function(e, t, n, r) {
                return new (n || (n = Promise))((function(o, i) {
                    function s(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function a(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function c(e) {
                        var t;
                        e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                            e(t)
                        }))).then(s, a)
                    }
                    c((r = r.apply(e, t || [])).next())
                }))
            },
            O = function(e, t) {
                var n,
                    r,
                    o,
                    i,
                    s = {
                        label: 0,
                        sent: function() {
                            if (1 & o[0])
                                throw o[1];
                            return o[1]
                        },
                        trys: [],
                        ops: []
                    };
                return i = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                    return this
                }), i;
                function a(i) {
                    return function(a) {
                        return function(i) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; s;)
                                try {
                                    if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done)
                                        return o;
                                    switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                    case 0:
                                    case 1:
                                        o = i;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: i[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        r = i[1],
                                        i = [0];
                                        continue;
                                    case 7:
                                        i = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!(o = s.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                            s.label = i[1];
                                            break
                                        }
                                        if (6 === i[0] && s.label < o[1]) {
                                            s.label = o[1],
                                            o = i;
                                            break
                                        }
                                        if (o && s.label < o[2]) {
                                            s.label = o[2],
                                            s.ops.push(i);
                                            break
                                        }
                                        o[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    i = t.call(e, s)
                                } catch (e) {
                                    i = [6, e],
                                    r = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & i[0])
                                throw i[1];
                            return {
                                value: i[0] ? i[1] : void 0,
                                done: !0
                            }
                        }([i, a])
                    }
                }
            },
            P = function() {
                function e(e) {
                    var t = this;
                    this.ChainAnonymousCredentialsProvider = function() {
                        return _(t, void 0, void 0, (function() {
                            return O(this, (function(e) {
                                return [2, this.AnonymousCredentialsProvider().catch(this.AnonymousStorageCredentialsProvider).catch(this.AnonymousCognitoCredentialsProvider)]
                            }))
                        }))
                    },
                    this.AnonymousCredentialsProvider = function() {
                        return _(t, void 0, void 0, (function() {
                            var e = this;
                            return O(this, (function(t) {
                                return [2, new Promise((function(t, n) {
                                    if (e.renewCredentials())
                                        return n();
                                    t(e.credentials)
                                }))]
                            }))
                        }))
                    },
                    this.AnonymousStorageCredentialsProvider = function() {
                        return _(t, void 0, void 0, (function() {
                            var e = this;
                            return O(this, (function(t) {
                                return [2, new Promise((function(t, n) {
                                    var r;
                                    try {
                                        r = JSON.parse(localStorage.getItem(T))
                                    } catch (e) {
                                        return n()
                                    }
                                    if (r.expiration = new Date(r.expiration), e.credentials = r, e.renewCredentials())
                                        return n();
                                    e.credentials = r,
                                    t(r)
                                }))]
                            }))
                        }))
                    },
                    this.AnonymousCognitoCredentialsProvider = function() {
                        return _(t, void 0, void 0, (function() {
                            var e = this;
                            return O(this, (function(t) {
                                return [2, this.cognitoIdentityClient.getId({
                                    IdentityPoolId: this.config.identityPoolId
                                }).then((function(t) {
                                    return e.cognitoIdentityClient.getOpenIdToken(t)
                                })).then((function(t) {
                                    return e.stsClient.assumeRoleWithWebIdentity({
                                        RoleArn: e.config.guestRoleArn,
                                        RoleSessionName: "cwr",
                                        WebIdentityToken: t.Token
                                    })
                                })).then((function(t) {
                                    e.credentials = t;
                                    try {
                                        localStorage.setItem(T, JSON.stringify(t))
                                    } catch (e) {}
                                    return t
                                }))]
                            }))
                        }))
                    };
                    var n = e.identityPoolId.split(":")[0];
                    this.config = e,
                    this.stsClient = new x({
                        fetchRequestHandler: new p,
                        region: n
                    }),
                    this.cognitoIdentityClient = new a({
                        fetchRequestHandler: new p,
                        region: n
                    })
                }
                return e.prototype.renewCredentials = function() {
                    if (!this.credentials || !this.credentials.expiration)
                        return !0;
                    var e = new Date(this.credentials.expiration.getTime() - 3e4);
                    return new Date > e
                }, e
            }(),
            k = function(e, t, n, r) {
                return new (n || (n = Promise))((function(o, i) {
                    function s(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function a(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function c(e) {
                        var t;
                        e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                            e(t)
                        }))).then(s, a)
                    }
                    c((r = r.apply(e, t || [])).next())
                }))
            },
            L = function(e, t) {
                var n,
                    r,
                    o,
                    i,
                    s = {
                        label: 0,
                        sent: function() {
                            if (1 & o[0])
                                throw o[1];
                            return o[1]
                        },
                        trys: [],
                        ops: []
                    };
                return i = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                    return this
                }), i;
                function a(i) {
                    return function(a) {
                        return function(i) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; s;)
                                try {
                                    if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done)
                                        return o;
                                    switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                    case 0:
                                    case 1:
                                        o = i;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: i[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        r = i[1],
                                        i = [0];
                                        continue;
                                    case 7:
                                        i = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!(o = s.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                            s.label = i[1];
                                            break
                                        }
                                        if (6 === i[0] && s.label < o[1]) {
                                            s.label = o[1],
                                            o = i;
                                            break
                                        }
                                        if (o && s.label < o[2]) {
                                            s.label = o[2],
                                            s.ops.push(i);
                                            break
                                        }
                                        o[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    i = t.call(e, s)
                                } catch (e) {
                                    i = [6, e],
                                    r = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & i[0])
                                throw i[1];
                            return {
                                value: i[0] ? i[1] : void 0,
                                done: !0
                            }
                        }([i, a])
                    }
                }
            },
            R = function() {
                function e(e) {
                    var t = this;
                    this.ChainAnonymousCredentialsProvider = function() {
                        return k(t, void 0, void 0, (function() {
                            return L(this, (function(e) {
                                return [2, this.AnonymousCredentialsProvider().catch(this.AnonymousStorageCredentialsProvider).catch(this.AnonymousCognitoCredentialsProvider)]
                            }))
                        }))
                    },
                    this.AnonymousCredentialsProvider = function() {
                        return k(t, void 0, void 0, (function() {
                            var e = this;
                            return L(this, (function(t) {
                                return [2, new Promise((function(t, n) {
                                    if (e.renewCredentials())
                                        return n();
                                    t(e.credentials)
                                }))]
                            }))
                        }))
                    },
                    this.AnonymousStorageCredentialsProvider = function() {
                        return k(t, void 0, void 0, (function() {
                            var e = this;
                            return L(this, (function(t) {
                                return [2, new Promise((function(t, n) {
                                    var r;
                                    try {
                                        r = JSON.parse(localStorage.getItem(T))
                                    } catch (e) {
                                        n()
                                    }
                                    if (r.expiration = new Date(r.expiration), e.credentials = r, e.renewCredentials())
                                        return n();
                                    e.credentials = r,
                                    t(r)
                                }))]
                            }))
                        }))
                    },
                    this.AnonymousCognitoCredentialsProvider = function() {
                        return k(t, void 0, void 0, (function() {
                            var e = this;
                            return L(this, (function(t) {
                                var n;
                                return n = {
                                    client: this.cognitoIdentityClient,
                                    identityPoolId: this.config.identityPoolId
                                }, [2, function() {
                                    return n.client.getCredentialsForIdentity(n.identityPoolId)
                                }().then((function(t) {
                                    e.credentials = t;
                                    try {
                                        localStorage.setItem(T, JSON.stringify(t))
                                    } catch (e) {}
                                    return t
                                }))]
                            }))
                        }))
                    };
                    var n = e.identityPoolId.split(":")[0];
                    this.config = e,
                    this.cognitoIdentityClient = new a({
                        fetchRequestHandler: new p,
                        region: n
                    })
                }
                return e.prototype.renewCredentials = function() {
                    if (!this.credentials || !this.credentials.expiration)
                        return !0;
                    var e = new Date(this.credentials.expiration.getTime() - 3e4);
                    return new Date > e
                }, e
            }(),
            j = function() {
                function e(e) {
                    this.plugins = new Map,
                    this.context = e
                }
                return e.prototype.addPlugin = function(e) {
                    var t = e.getPluginId();
                    if (!t)
                        throw new Error("InvalidPluginIdException");
                    this.plugins.set(t, e),
                    e.load(this.context)
                }, e.prototype.enable = function() {
                    this.plugins.forEach((function(e) {
                        return e.enable()
                    }))
                }, e.prototype.disable = function() {
                    this.plugins.forEach((function(e) {
                        return e.disable()
                    }))
                }, e.prototype.hasPlugin = function(e) {
                    return this.plugins.has(e)
                }, e.prototype.record = function(e, t) {
                    var n = this.plugins.get(e);
                    if (!(n && n.record instanceof Function))
                        throw new Error("AWS RUM Client record: Invalid plugin ID");
                    n.record(t)
                }, e
            }(),
            H = "com.amazon.rum.http_event",
            D = "com.amazon.rum.xray_trace_event",
            M = "com.amazon.rum.performance_navigation_event",
            q = "com.amazon.rum.js_error_event",
            N = function() {
                return N = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e
                }, N.apply(this, arguments)
            },
            B = {
                events: []
            },
            z = function() {
                function e(e) {
                    this.pluginId = "com.amazonaws.rum.dom-event",
                    this.eventListenerMap = new Map,
                    this.config = N(N({}, B), e),
                    this.enabled = !1
                }
                return e.prototype.load = function(e) {
                    this.recordEvent = e.record,
                    this.enable()
                }, e.prototype.enable = function() {
                    this.enabled || (this.addListeners(), this.enabled = !0)
                }, e.prototype.disable = function() {
                    this.enabled && (this.removeListeners(), this.enabled = !1)
                }, e.prototype.getPluginId = function() {
                    return this.pluginId
                }, e.prototype.removeListeners = function() {
                    var e = this;
                    this.config.events.forEach((function(t) {
                        return e.removeEventHandler(t)
                    }))
                }, e.prototype.addListeners = function() {
                    var e = this;
                    this.config.events.forEach((function(t) {
                        return e.addEventHandler(t)
                    }))
                }, e.prototype.getEventListener = function(e) {
                    var t = this;
                    return function(n) {
                        var r = {
                            version: "1.0.0",
                            event: n.type,
                            elementId: t.getElementId(n)
                        };
                        void 0 !== e && (r.cssLocator = e),
                        t.recordEvent && t.recordEvent("com.amazon.rum.dom_event", r)
                    }
                }, e.prototype.getElementId = function(e) {
                    return e.target ? e.target instanceof Element && e.target.id ? e.target.id : e.target instanceof Node ? e.target.nodeName : "" : ""
                }, e.prototype.addEventHandler = function(e) {
                    var t,
                        n = e.event,
                        r = this.getEventListener(e.cssLocator);
                    (this.eventListenerMap.set(e, r), e.cssLocator) ? document.querySelectorAll(e.cssLocator).forEach((function(e) {
                        e.addEventListener(n, r)
                    })) : e.elementId ? null === (t = document.getElementById(e.elementId)) || void 0 === t || t.addEventListener(n, r) : e.element && e.element.addEventListener(n, r)
                }, e.prototype.removeEventHandler = function(e) {
                    var t = this.eventListenerMap.get(e);
                    if (e.cssLocator && t)
                        document.querySelectorAll(e.cssLocator).forEach((function(n) {
                            n.removeEventListener(e.event, t)
                        }));
                    else if (e.elementId && t) {
                        var n = document.getElementById(e.elementId);
                        n && n.removeEventListener(e.event, t)
                    } else
                        e.element && t && e.element.removeEventListener(e.event, t);
                    this.eventListenerMap.delete(e)
                }, e
            }();
        function U(e) {
            return U = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }, U(e)
        }
        var F,
            W = function(e) {
                return e !== Object(e) && null != e
            },
            V = function(e, t) {
                var n = function(e) {
                        var t = {
                            version: "1.0.0",
                            type: "undefined",
                            message: "undefined"
                        };
                        return void 0 !== e.type && (t.type = e.type), void 0 !== e.message && (t.message = e.message), void 0 !== e.filename && (t.filename = e.filename), void 0 !== e.lineno && (t.lineno = e.lineno), void 0 !== e.colno && (t.colno = e.colno), t
                    }(e),
                    r = e.error;
                return !function(e) {
                    var t = U(e);
                    return ("object" === t || "function" === t) && !!e
                }(r) ? W(r) && function(e, t) {
                    e.type = t.toString(),
                    e.message = t.toString()
                }(n, r) : function(e, t, n) {
                    t.name && (e.type = t.name),
                    t.message && (e.message = t.message),
                    t.fileName && (e.filename = t.fileName),
                    t.lineNumber && (e.lineno = t.lineNumber),
                    t.columnNumber && (e.colno = t.columnNumber),
                    n && t.stack && (e.stack = t.stack.length > n ? t.stack.substring(0, n) + "..." : t.stack)
                }(n, r, t), n
            },
            G = function() {
                return G = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e
                }, G.apply(this, arguments)
            },
            X = "com.amazonaws.rum.js-error",
            K = {
                stackTraceLength: 200
            },
            Z = function() {
                function e(e) {
                    var t = this;
                    this.eventHandler = function(e) {
                        t.recordEvent(q, V(e, t.config.stackTraceLength))
                    },
                    this.promiseRejectEventHandler = function(e) {
                        var n = {
                            version: "1.0.0",
                            type: e.type,
                            message: e.reason
                        };
                        t.recordEvent(q, n)
                    },
                    this.pluginId = X,
                    this.enabled = !0,
                    this.config = G(G({}, K), e)
                }
                return e.prototype.load = function(e) {
                    this.recordEvent = e.record,
                    this.addEventHandler()
                }, e.prototype.enable = function() {
                    this.enabled || (this.addEventHandler(), this.enabled = !0)
                }, e.prototype.disable = function() {
                    this.enabled && (this.removeEventHandler(), this.enabled = !1)
                }, e.prototype.getPluginId = function() {
                    return this.pluginId
                }, e.prototype.record = function(e) {
                    e instanceof ErrorEvent ? this.eventHandler(e) : this.eventHandler({
                        type: "error",
                        error: e
                    })
                }, e.prototype.addEventHandler = function() {
                    window.addEventListener("error", this.eventHandler),
                    window.addEventListener("unhandledrejection", this.promiseRejectEventHandler)
                }, e.prototype.removeEventHandler = function() {
                    window.removeEventListener("error", this.eventHandler),
                    window.removeEventListener("unhandledrejection", this.promiseRejectEventHandler)
                }, e
            }(),
            J = function(e, t, n, r, o) {
                var i = e + "=";
                i += t || "",
                void 0 !== o ? i += "; Expires=" + o.toUTCString() : void 0 !== r && (i += "; Expires=" + Y(r).toUTCString()),
                i += "; Domain=" + n.domain,
                i += "; Path=" + n.path,
                i += "; SameSite=" + n.sameSite,
                i += n.secure ? "; Secure" : "",
                document.cookie = i
            },
            Y = function(e) {
                return new Date((new Date).getTime() + 1e3 * e)
            },
            $ = function(e) {
                for (var t = 0, n = document.cookie.split("; "); t < n.length; t++) {
                    var r = n[t].split("=");
                    if (r[0] === e)
                        return r[1]
                }
                return ""
            },
            Q = new Uint8Array(16);
        function ee() {
            if (!F && !(F = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto)))
                throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return F(Q)
        }
        var te = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
        for (var ne = function(e) {
                return "string" == typeof e && te.test(e)
            }, re = [], oe = 0; oe < 256; ++oe)
            re.push((oe + 256).toString(16).substr(1));
        var ie = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                n = (re[e[t + 0]] + re[e[t + 1]] + re[e[t + 2]] + re[e[t + 3]] + "-" + re[e[t + 4]] + re[e[t + 5]] + "-" + re[e[t + 6]] + re[e[t + 7]] + "-" + re[e[t + 8]] + re[e[t + 9]] + "-" + re[e[t + 10]] + re[e[t + 11]] + re[e[t + 12]] + re[e[t + 13]] + re[e[t + 14]] + re[e[t + 15]]).toLowerCase();
            if (!ne(n))
                throw TypeError("Stringified UUID is invalid");
            return n
        };
        for (var se = function(e, t, n) {
                var r = (e = e || {}).random || (e.rng || ee)();
                if (r[6] = 15 & r[6] | 64, r[8] = 63 & r[8] | 128, t) {
                    n = n || 0;
                    for (var o = 0; o < 16; ++o)
                        t[n + o] = r[o];
                    return t
                }
                return ie(r)
            }, ae = n(238), ce = "00000000-0000-0000-0000-000000000000", ue = "unknown", le = function() {
                function e(e, t, n, r) {
                    this.appMonitorDetails = e,
                    this.config = t,
                    this.record = n,
                    this.pageManager = r,
                    this.session = {
                        sessionId: ce,
                        record: this.sample(),
                        eventCount: 0
                    },
                    this.initializeUser(),
                    this.collectAttributes(),
                    this.getSessionFromCookie()
                }
                return e.prototype.getSession = function() {
                    return this.session.sessionId === ce || this.useCookies() ? (this.session.sessionId === ce && this.useCookies() || this.session.sessionId !== ce && new Date > this.sessionExpiry) && this.createSession() : this.session = {
                        sessionId: ce,
                        record: this.sample(),
                        eventCount: 0,
                        page: this.session.page
                    }, this.session
                }, e.prototype.getAttributes = function() {
                    return this.attributes
                }, e.prototype.getUserId = function() {
                    return this.useCookies() ? this.userId : ce
                }, e.prototype.incrementSessionEventCount = function() {
                    this.session.eventCount++,
                    this.renewSession()
                }, e.prototype.initializeUser = function() {
                    var e = "";
                    this.userExpiry = new Date,
                    this.userExpiry.setDate(this.userExpiry.getDate() + this.config.userIdRetentionDays),
                    this.config.userIdRetentionDays <= 0 ? this.userId = "00000000-0000-0000-0000-000000000000" : this.useCookies() ? (e = this.getUserIdCookie(), this.userId = e || se(), this.createOrRenewUserCookie(e, this.userExpiry)) : this.userId = se()
                }, e.prototype.createOrRenewSessionCookie = function(e, t) {
                    btoa && J(this.sessionCookieName(), btoa(JSON.stringify(e)), this.config.cookieAttributes, void 0, t)
                }, e.prototype.createOrRenewUserCookie = function(e, t) {
                    J(I, e, this.config.cookieAttributes, void 0, t)
                }, e.prototype.getUserIdCookie = function() {
                    return $(I)
                }, e.prototype.getSessionFromCookie = function() {
                    if (this.useCookies()) {
                        var e = $(this.sessionCookieName());
                        if (e && atob)
                            try {
                                this.session = JSON.parse(atob(e)),
                                this.pageManager.resumeSession(this.session.page.pageId, this.session.page.interaction)
                            } catch (e) {}
                    }
                }, e.prototype.storeSessionAsCookie = function() {
                    this.useCookies() && this.config.userIdRetentionDays > 0 && this.createOrRenewUserCookie(this.userId, this.userExpiry),
                    this.useCookies() && this.createOrRenewSessionCookie(this.session, this.sessionExpiry)
                }, e.prototype.createSession = function() {
                    this.session = {
                        sessionId: se(),
                        record: this.sample(),
                        eventCount: 0
                    },
                    this.session.page = this.pageManager.getPage(),
                    this.sessionExpiry = new Date((new Date).getTime() + 1e3 * this.config.sessionLengthSeconds),
                    this.storeSessionAsCookie(),
                    this.record(this.session, "com.amazon.rum.session_start_event", {
                        version: "1.0.0"
                    })
                }, e.prototype.renewSession = function() {
                    this.sessionExpiry = new Date((new Date).getTime() + 1e3 * this.config.sessionLengthSeconds),
                    this.session.page = this.pageManager.getPage(),
                    this.storeSessionAsCookie()
                }, e.prototype.collectAttributes = function() {
                    var e = new ae.UAParser(navigator.userAgent).getResult();
                    this.attributes = {
                        browserLanguage: navigator.language,
                        browserName: e.browser.name ? e.browser.name : ue,
                        browserVersion: e.browser.version ? e.browser.version : ue,
                        osName: e.os.name ? e.os.name : ue,
                        osVersion: e.os.version ? e.os.version : ue,
                        deviceType: e.device.type ? e.device.type : "desktop",
                        platformType: "web",
                        domain: window.location.hostname
                    }
                }, e.prototype.useCookies = function() {
                    return navigator.cookieEnabled && this.config.allowCookies
                }, e.prototype.sample = function() {
                    return Math.random() < this.config.sessionSampleRate
                }, e.prototype.sessionCookieName = function() {
                    return this.config.cookieAttributes.unique ? "cwr_s_" + this.appMonitorDetails.id : A
                }, e
            }(), de = function() {
                function e(e, t) {
                    this.config = e,
                    this.record = t,
                    this.page = void 0,
                    this.resumed = void 0,
                    this.recordInteraction = !1
                }
                return e.prototype.getPage = function() {
                    return this.page
                }, e.prototype.getAttributes = function() {
                    return this.attributes
                }, e.prototype.resumeSession = function(e, t) {
                    this.recordInteraction = !0,
                    this.resumed = {
                        pageId: e,
                        interaction: t,
                        start: 0
                    }
                }, e.prototype.recordPageView = function(e) {
                    if (this.useCookies() && (this.recordInteraction = !0), !this.page && this.resumed)
                        this.createResumedPage(e);
                    else if (this.page) {
                        if (this.page.pageId === e)
                            return;
                        this.createNextPage(e)
                    } else
                        this.createLandingPage(e);
                    this.collectAttributes(),
                    this.recordPageViewEvent()
                }, e.prototype.createResumedPage = function(e) {
                    this.page = {
                        pageId: e,
                        parentPageId: this.resumed.pageId,
                        interaction: this.resumed.interaction + 1,
                        start: Date.now()
                    },
                    this.resumed = void 0
                }, e.prototype.createNextPage = function(e) {
                    this.page = {
                        pageId: e,
                        parentPageId: this.page.pageId,
                        interaction: this.page.interaction + 1,
                        start: Date.now()
                    }
                }, e.prototype.createLandingPage = function(e) {
                    this.page = {
                        pageId: e,
                        interaction: 0,
                        start: Date.now()
                    }
                }, e.prototype.collectAttributes = function() {
                    this.attributes = {
                        title: document.title,
                        pageId: this.page.pageId
                    },
                    this.recordInteraction && (this.attributes.interaction = this.page.interaction, void 0 !== this.page.parentPageId && (this.attributes.parentPageId = this.page.parentPageId))
                }, e.prototype.createPageViewEvent = function() {
                    var e = {
                        version: "1.0.0",
                        pageId: this.page.pageId
                    };
                    return this.recordInteraction && (e.interaction = this.page.interaction, e.pageInteractionId = this.page.pageId + "-" + this.page.interaction, void 0 !== this.page.parentPageId && (e.parentPageInteractionId = this.page.parentPageId + "-" + (this.page.interaction - 1))), e
                }, e.prototype.recordPageViewEvent = function() {
                    this.record("com.amazon.rum.page_view_event", this.createPageViewEvent())
                }, e.prototype.useCookies = function() {
                    return navigator.cookieEnabled && this.config.allowCookies
                }, e
            }(), fe = function() {
                return fe = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e
                }, fe.apply(this, arguments)
            }, pe = function() {
                function e(e, t) {
                    var n = this;
                    this.events = [],
                    this.recordPageView = function(e) {
                        n.isCurrentUrlAllowed() && n.pageManager.recordPageView(e)
                    },
                    this.recordEvent = function(e, t) {
                        if (n.enabled && n.isCurrentUrlAllowed()) {
                            var r = n.sessionManager.getSession();
                            n.sessionManager.incrementSessionEventCount(),
                            n.canRecord(r) && n.addRecordToCache(e, t)
                        }
                    },
                    this.getSession = function() {
                        if (n.isCurrentUrlAllowed())
                            return n.sessionManager.getSession()
                    },
                    this.recordSessionInitEvent = function(e, t, r) {
                        n.enabled && (n.sessionManager.incrementSessionEventCount(), n.canRecord(e) && n.addRecordToCache(t, r))
                    },
                    this.canRecord = function(e) {
                        return e.record && (e.eventCount <= n.config.sessionEventLimit || n.config.sessionEventLimit <= 0)
                    },
                    this.addRecordToCache = function(e, t) {
                        if (n.enabled) {
                            n.events.length === n.config.eventCacheSize && n.events.shift();
                            var r = fe(fe({
                                version: "1.0.0"
                            }, n.sessionManager.getAttributes()), n.pageManager.getAttributes());
                            n.events.push({
                                details: JSON.stringify(t),
                                id: se(),
                                metadata: JSON.stringify(r),
                                timestamp: new Date,
                                type: e
                            })
                        }
                    },
                    this.appMonitorDetails = e,
                    this.config = t,
                    this.enabled = !0,
                    this.pageManager = new de(t, this.recordEvent),
                    this.sessionManager = new le(e, t, this.recordSessionInitEvent, this.pageManager)
                }
                return e.prototype.enable = function() {
                    this.enabled = !0
                }, e.prototype.disable = function() {
                    this.enabled = !1
                }, e.prototype.hasEvents = function() {
                    return 0 !== this.events.length
                }, e.prototype.getEventBatch = function() {
                    var e = [];
                    return 0 === this.events.length || (this.events.length <= this.config.batchLimit ? (e = this.events, this.events = []) : e = this.events.splice(0, this.config.batchLimit)), e
                }, e.prototype.getAppMonitorDetails = function() {
                    return this.appMonitorDetails
                }, e.prototype.getUserDetails = function() {
                    return {
                        userId: this.sessionManager.getUserId(),
                        sessionId: this.sessionManager.getSession().sessionId
                    }
                }, e.prototype.isCurrentUrlAllowed = function() {
                    var e = document.location.toString();
                    return !(this.config.pagesToExclude.length > 0 && this.config.pagesToExclude.some((function(t) {
                            return t.test(e)
                        }))) && (!(this.config.pagesToInclude.length && !this.config.pagesToInclude.some((function(t) {
                            return t.test(e)
                        }))) || void 0)
                }, e
            }(), he = {}, ve = {}, ye = 0; ye < 256; ye++) {
            var ge = ye.toString(16).toLowerCase();
            1 === ge.length && (ge = "0" + ge),
            he[ye] = ge,
            ve[ge] = ye
        }
        function me(e) {
            for (var t = "", n = 0; n < e.byteLength; n++)
                t += he[e[n]];
            return t
        }
        var we = function() {
            return we = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }, we.apply(this, arguments)
        };
        function be(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function s(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function a(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function c(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                        e(t)
                    }))).then(s, a)
                }
                c((r = r.apply(e, t || [])).next())
            }))
        }
        function Se(e, t) {
            var n,
                r,
                o,
                i,
                s = {
                    label: 0,
                    sent: function() {
                        if (1 & o[0])
                            throw o[1];
                        return o[1]
                    },
                    trys: [],
                    ops: []
                };
            return i = {
                next: a(0),
                throw: a(1),
                return: a(2)
            }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }), i;
            function a(i) {
                return function(a) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; s;)
                            try {
                                if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return s.label++, {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!(o = s.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        s.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && s.label < o[1]) {
                                        s.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && s.label < o[2]) {
                                        s.label = o[2],
                                        s.ops.push(i);
                                        break
                                    }
                                    o[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                i = t.call(e, s)
                            } catch (e) {
                                i = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, a])
                }
            }
        }
        Object.create;
        function Ee(e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
            if (n)
                return n.call(e);
            if (e && "number" == typeof e.length)
                return {
                    next: function() {
                        return e && r >= e.length && (e = void 0), {
                            value: e && e[r++],
                            done: !e
                        }
                    }
                };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }
        function Ce(e, t) {
            var n = "function" == typeof Symbol && e[Symbol.iterator];
            if (!n)
                return e;
            var r,
                o,
                i = n.call(e),
                s = [];
            try {
                for (; (void 0 === t || t-- > 0) && !(r = i.next()).done;)
                    s.push(r.value)
            } catch (e) {
                o = {
                    error: e
                }
            } finally {
                try {
                    r && !r.done && (n = i.return) && n.call(i)
                } finally {
                    if (o)
                        throw o.error
                }
            }
            return s
        }
        Object.create;
        var xe,
            Te = "X-Amz-Date",
            Ae = "X-Amz-Signature",
            Ie = "X-Amz-Security-Token",
            _e = "authorization",
            Oe = Te.toLowerCase(),
            Pe = [_e, Oe, "date"],
            ke = Ae.toLowerCase(),
            Le = "x-amz-content-sha256",
            Re = Ie.toLowerCase(),
            je = {
                authorization: !0,
                "cache-control": !0,
                connection: !0,
                expect: !0,
                from: !0,
                "keep-alive": !0,
                "max-forwards": !0,
                pragma: !0,
                referer: !0,
                te: !0,
                trailer: !0,
                "transfer-encoding": !0,
                upgrade: !0,
                "user-agent": !0,
                "x-amzn-trace-id": !0
            },
            He = /^proxy-/,
            De = /^sec-/,
            Me = "AWS4-HMAC-SHA256",
            qe = "AWS4-HMAC-SHA256-PAYLOAD",
            Ne = "aws4_request",
            Be = {},
            ze = [],
            Ue = function(e, t, n) {
                return e + "/" + t + "/" + n + "/" + Ne
            },
            Fe = function(e, t, n) {
                var r = new e(t);
                return r.update(n), r.digest()
            },
            We = function(e, t, n) {
                var r,
                    o,
                    i = e.headers,
                    s = {};
                try {
                    for (var a = Ee(Object.keys(i).sort()), c = a.next(); !c.done; c = a.next()) {
                        var u = c.value,
                            l = u.toLowerCase();
                        (l in je || (null == t ? void 0 : t.has(l)) || He.test(l) || De.test(l)) && (!n || n && !n.has(l)) || (s[l] = i[u].trim().replace(/\s+/g, " "))
                    }
                } catch (e) {
                    r = {
                        error: e
                    }
                } finally {
                    try {
                        c && !c.done && (o = a.return) && o.call(a)
                    } finally {
                        if (r)
                            throw r.error
                    }
                }
                return s
            },
            Ve = function(e, t) {
                var n = e.headers,
                    r = e.body;
                return be(void 0, void 0, void 0, (function() {
                    var e,
                        o,
                        i,
                        s,
                        a,
                        c,
                        u;
                    return Se(this, (function(l) {
                        switch (l.label) {
                        case 0:
                            try {
                                for (e = Ee(Object.keys(n)), o = e.next(); !o.done; o = e.next())
                                    if ((i = o.value).toLowerCase() === Le)
                                        return [2, n[i]]
                            } catch (e) {
                                c = {
                                    error: e
                                }
                            } finally {
                                try {
                                    o && !o.done && (u = e.return) && u.call(e)
                                } finally {
                                    if (c)
                                        throw c.error
                                }
                            }
                            return null != r ? [3, 1] : [2, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"];
                        case 1:
                            return "string" == typeof r || ArrayBuffer.isView(r) || (d = r, "function" == typeof ArrayBuffer && d instanceof ArrayBuffer || "[object ArrayBuffer]" === Object.prototype.toString.call(d)) ? ((s = new t).update(r), a = me, [4, s.digest()]) : [3, 3];
                        case 2:
                            return [2, a.apply(void 0, [l.sent()])];
                        case 3:
                            return [2, "UNSIGNED-PAYLOAD"]
                        }
                        var d
                    }))
                }))
            },
            Ge = function(e) {
                var t = e.headers,
                    n = e.query,
                    r = function(e, t) {
                        var n = {};
                        for (var r in e)
                            Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                            var o = 0;
                            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
                                t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]])
                        }
                        return n
                    }(e, ["headers", "query"]);
                return we(we({}, r), {
                    headers: we({}, t),
                    query: n ? Xe(n) : void 0
                })
            },
            Xe = function(e) {
                return Object.keys(e).reduce((function(t, n) {
                    var r,
                        o = e[n];
                    return we(we({}, t), ((r = {})[n] = Array.isArray(o) ? function(e, t, n) {
                        if (n || 2 === arguments.length)
                            for (var r, o = 0, i = t.length; o < i; o++)
                                !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)), r[o] = t[o]);
                        return e.concat(r || Array.prototype.slice.call(t))
                    }([], Ce(o)) : o, r))
                }), {})
            },
            Ke = function(e) {
                var t,
                    n;
                e = "function" == typeof e.clone ? e.clone() : Ge(e);
                try {
                    for (var r = Ee(Object.keys(e.headers)), o = r.next(); !o.done; o = r.next()) {
                        var i = o.value;
                        Pe.indexOf(i.toLowerCase()) > -1 && delete e.headers[i]
                    }
                } catch (e) {
                    t = {
                        error: e
                    }
                } finally {
                    try {
                        o && !o.done && (n = r.return) && n.call(r)
                    } finally {
                        if (t)
                            throw t.error
                    }
                }
                return e
            },
            Ze = function(e) {
                return "number" == typeof e ? new Date(1e3 * e) : "string" == typeof e ? Number(e) ? new Date(1e3 * Number(e)) : new Date(e) : e
            },
            Je = function() {
                function e(e) {
                    var t = e.applyChecksum,
                        n = e.credentials,
                        r = e.region,
                        o = e.service,
                        i = e.sha256,
                        s = e.uriEscapePath,
                        a = void 0 === s || s;
                    this.service = o,
                    this.sha256 = i,
                    this.uriEscapePath = a,
                    this.applyChecksum = "boolean" != typeof t || t,
                    this.regionProvider = function(e) {
                        if ("string" == typeof e) {
                            var t = Promise.resolve(e);
                            return function() {
                                return t
                            }
                        }
                        return e
                    }(r),
                    this.credentialProvider = function(e) {
                        if ("object" == typeof e) {
                            var t = Promise.resolve(e);
                            return function() {
                                return t
                            }
                        }
                        return e
                    }(n)
                }
                return e.prototype.presign = function(e, t) {
                    return void 0 === t && (t = {}), be(this, void 0, void 0, (function() {
                        var n,
                            r,
                            o,
                            i,
                            s,
                            a,
                            c,
                            u,
                            l,
                            d,
                            f,
                            p,
                            h,
                            v,
                            y,
                            g,
                            m,
                            w,
                            b,
                            S,
                            E,
                            C,
                            x,
                            T;
                        return Se(this, (function(A) {
                            switch (A.label) {
                            case 0:
                                return n = t.signingDate, r = void 0 === n ? new Date : n, o = t.expiresIn, i = void 0 === o ? 3600 : o, s = t.unsignableHeaders, a = t.unhoistableHeaders, c = t.signableHeaders, u = t.signingRegion, l = t.signingService, [4, this.credentialProvider()];
                            case 1:
                                return d = A.sent(), null == u ? [3, 2] : (p = u, [3, 4]);
                            case 2:
                                return [4, this.regionProvider()];
                            case 3:
                                p = A.sent(),
                                A.label = 4;
                            case 4:
                                return f = p, h = Ye(r), v = h.longDate, y = h.shortDate, i > 604800 ? [2, Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future")] : (g = Ue(y, f, null != l ? l : this.service), m = function(e, t) {
                                    var n,
                                        r,
                                        o;
                                    void 0 === t && (t = {});
                                    var i = "function" == typeof e.clone ? e.clone() : Ge(e),
                                        s = i.headers,
                                        a = i.query,
                                        c = void 0 === a ? {} : a;
                                    try {
                                        for (var u = Ee(Object.keys(s)), l = u.next(); !l.done; l = u.next()) {
                                            var d = l.value,
                                                f = d.toLowerCase();
                                            "x-amz-" !== f.substr(0, 6) || (null === (o = t.unhoistableHeaders) || void 0 === o ? void 0 : o.has(f)) || (c[d] = s[d], delete s[d])
                                        }
                                    } catch (e) {
                                        n = {
                                            error: e
                                        }
                                    } finally {
                                        try {
                                            l && !l.done && (r = u.return) && r.call(u)
                                        } finally {
                                            if (n)
                                                throw n.error
                                        }
                                    }
                                    return we(we({}, e), {
                                        headers: s,
                                        query: c
                                    })
                                }(Ke(e), {
                                    unhoistableHeaders: a
                                }), d.sessionToken && (m.query[Ie] = d.sessionToken), m.query["X-Amz-Algorithm"] = Me, m.query["X-Amz-Credential"] = d.accessKeyId + "/" + g, m.query["X-Amz-Date"] = v, m.query["X-Amz-Expires"] = i.toString(10), w = We(m, s, c), m.query["X-Amz-SignedHeaders"] = $e(w), b = m.query, S = Ae, E = this.getSignature, C = [v, g, this.getSigningKey(d, f, y, l)], x = this.createCanonicalRequest, T = [m, w], [4, Ve(e, this.sha256)]);
                            case 5:
                                return [4, E.apply(this, C.concat([x.apply(this, T.concat([A.sent()]))]))];
                            case 6:
                                return b[S] = A.sent(), [2, m]
                            }
                        }))
                    }))
                }, e.prototype.sign = function(e, t) {
                    return be(this, void 0, void 0, (function() {
                        return Se(this, (function(n) {
                            return "string" == typeof e ? [2, this.signString(e, t)] : e.headers && e.payload ? [2, this.signEvent(e, t)] : [2, this.signRequest(e, t)]
                        }))
                    }))
                }, e.prototype.signEvent = function(e, t) {
                    var n = e.headers,
                        r = e.payload,
                        o = t.signingDate,
                        i = void 0 === o ? new Date : o,
                        s = t.priorSignature,
                        a = t.signingRegion,
                        c = t.signingService;
                    return be(this, void 0, void 0, (function() {
                        var e,
                            t,
                            o,
                            u,
                            l,
                            d,
                            f,
                            p,
                            h,
                            v,
                            y;
                        return Se(this, (function(g) {
                            switch (g.label) {
                            case 0:
                                return null == a ? [3, 1] : (t = a, [3, 3]);
                            case 1:
                                return [4, this.regionProvider()];
                            case 2:
                                t = g.sent(),
                                g.label = 3;
                            case 3:
                                return e = t, o = Ye(i), u = o.shortDate, l = o.longDate, d = Ue(u, e, null != c ? c : this.service), [4, Ve({
                                    headers: {},
                                    body: r
                                }, this.sha256)];
                            case 4:
                                return f = g.sent(), (p = new this.sha256).update(n), v = me, [4, p.digest()];
                            case 5:
                                return h = v.apply(void 0, [g.sent()]), y = [qe, l, d, s, h, f].join("\n"), [2, this.signString(y, {
                                    signingDate: i,
                                    signingRegion: e,
                                    signingService: c
                                })]
                            }
                        }))
                    }))
                }, e.prototype.signString = function(e, t) {
                    var n = void 0 === t ? {} : t,
                        r = n.signingDate,
                        o = void 0 === r ? new Date : r,
                        i = n.signingRegion,
                        s = n.signingService;
                    return be(this, void 0, void 0, (function() {
                        var t,
                            n,
                            r,
                            a,
                            c,
                            u,
                            l,
                            d;
                        return Se(this, (function(f) {
                            switch (f.label) {
                            case 0:
                                return [4, this.credentialProvider()];
                            case 1:
                                return t = f.sent(), null == i ? [3, 2] : (r = i, [3, 4]);
                            case 2:
                                return [4, this.regionProvider()];
                            case 3:
                                r = f.sent(),
                                f.label = 4;
                            case 4:
                                return n = r, a = Ye(o).shortDate, l = (u = this.sha256).bind, [4, this.getSigningKey(t, n, a, s)];
                            case 5:
                                return (c = new (l.apply(u, [void 0, f.sent()]))).update(e), d = me, [4, c.digest()];
                            case 6:
                                return [2, d.apply(void 0, [f.sent()])]
                            }
                        }))
                    }))
                }, e.prototype.signRequest = function(e, t) {
                    var n = void 0 === t ? {} : t,
                        r = n.signingDate,
                        o = void 0 === r ? new Date : r,
                        i = n.signableHeaders,
                        s = n.unsignableHeaders,
                        a = n.signingRegion,
                        c = n.signingService;
                    return be(this, void 0, void 0, (function() {
                        var t,
                            n,
                            r,
                            u,
                            l,
                            d,
                            f,
                            p,
                            h,
                            v,
                            y;
                        return Se(this, (function(g) {
                            switch (g.label) {
                            case 0:
                                return [4, this.credentialProvider()];
                            case 1:
                                return t = g.sent(), null == a ? [3, 2] : (r = a, [3, 4]);
                            case 2:
                                return [4, this.regionProvider()];
                            case 3:
                                r = g.sent(),
                                g.label = 4;
                            case 4:
                                return n = r, u = Ke(e), l = Ye(o), d = l.longDate, f = l.shortDate, p = Ue(f, n, null != c ? c : this.service), u.headers[Oe] = d, t.sessionToken && (u.headers[Re] = t.sessionToken), [4, Ve(u, this.sha256)];
                            case 5:
                                return h = g.sent(), !function(e, t) {
                                    var n,
                                        r;
                                    e = e.toLowerCase();
                                    try {
                                        for (var o = Ee(Object.keys(t)), i = o.next(); !i.done; i = o.next())
                                            if (e === i.value.toLowerCase())
                                                return !0
                                    } catch (e) {
                                        n = {
                                            error: e
                                        }
                                    } finally {
                                        try {
                                            i && !i.done && (r = o.return) && r.call(o)
                                        } finally {
                                            if (n)
                                                throw n.error
                                        }
                                    }
                                    return !1
                                }(Le, u.headers) && this.applyChecksum && (u.headers[Le] = h), v = We(u, s, i), [4, this.getSignature(d, p, this.getSigningKey(t, n, f, c), this.createCanonicalRequest(u, v, h))];
                            case 6:
                                return y = g.sent(), u.headers[_e] = "AWS4-HMAC-SHA256 Credential=" + t.accessKeyId + "/" + p + ", SignedHeaders=" + $e(v) + ", Signature=" + y, [2, u]
                            }
                        }))
                    }))
                }, e.prototype.createCanonicalRequest = function(e, t, n) {
                    var r = Object.keys(t).sort();
                    return e.method + "\n" + this.getCanonicalPath(e) + "\n" + function(e) {
                        var t,
                            n,
                            r = e.query,
                            o = void 0 === r ? {} : r,
                            i = [],
                            s = {},
                            a = function(e) {
                                if (e.toLowerCase() === ke)
                                    return "continue";
                                i.push(e);
                                var t = o[e];
                                "string" == typeof t ? s[e] = l(e) + "=" + l(t) : Array.isArray(t) && (s[e] = t.slice(0).sort().reduce((function(t, n) {
                                    return t.concat([l(e) + "=" + l(n)])
                                }), []).join("&"))
                            };
                        try {
                            for (var c = Ee(Object.keys(o).sort()), u = c.next(); !u.done; u = c.next())
                                a(u.value)
                        } catch (e) {
                            t = {
                                error: e
                            }
                        } finally {
                            try {
                                u && !u.done && (n = c.return) && n.call(c)
                            } finally {
                                if (t)
                                    throw t.error
                            }
                        }
                        return i.map((function(e) {
                            return s[e]
                        })).filter((function(e) {
                            return e
                        })).join("&")
                    }(e) + "\n" + r.map((function(e) {
                        return e + ":" + t[e]
                    })).join("\n") + "\n\n" + r.join(";") + "\n" + n
                }, e.prototype.createStringToSign = function(e, t, n) {
                    return be(this, void 0, void 0, (function() {
                        var r,
                            o;
                        return Se(this, (function(i) {
                            switch (i.label) {
                            case 0:
                                return (r = new this.sha256).update(n), [4, r.digest()];
                            case 1:
                                return o = i.sent(), [2, "AWS4-HMAC-SHA256\n" + e + "\n" + t + "\n" + me(o)]
                            }
                        }))
                    }))
                }, e.prototype.getCanonicalPath = function(e) {
                    var t = e.path;
                    return this.uriEscapePath ? "/" + encodeURIComponent(t.replace(/^\//, "")).replace(/%2F/g, "/") : t
                }, e.prototype.getSignature = function(e, t, n, r) {
                    return be(this, void 0, void 0, (function() {
                        var o,
                            i,
                            s,
                            a,
                            c;
                        return Se(this, (function(u) {
                            switch (u.label) {
                            case 0:
                                return [4, this.createStringToSign(e, t, r)];
                            case 1:
                                return o = u.sent(), a = (s = this.sha256).bind, [4, n];
                            case 2:
                                return (i = new (a.apply(s, [void 0, u.sent()]))).update(o), c = me, [4, i.digest()];
                            case 3:
                                return [2, c.apply(void 0, [u.sent()])]
                            }
                        }))
                    }))
                }, e.prototype.getSigningKey = function(e, t, n, r) {
                    return function(e, t, n, r, o) {
                        return be(void 0, void 0, void 0, (function() {
                            var i,
                                s,
                                a,
                                c,
                                u,
                                l,
                                d,
                                f,
                                p;
                            return Se(this, (function(h) {
                                switch (h.label) {
                                case 0:
                                    return [4, Fe(e, t.secretAccessKey, t.accessKeyId)];
                                case 1:
                                    if (i = h.sent(), (s = n + ":" + r + ":" + o + ":" + me(i) + ":" + t.sessionToken) in Be)
                                        return [2, Be[s]];
                                    for (ze.push(s); ze.length > 50;)
                                        delete Be[ze.shift()];
                                    a = "AWS4" + t.secretAccessKey,
                                    h.label = 2;
                                case 2:
                                    h.trys.push([2, 7, 8, 9]),
                                    c = Ee([n, r, o, Ne]),
                                    u = c.next(),
                                    h.label = 3;
                                case 3:
                                    return u.done ? [3, 6] : (l = u.value, [4, Fe(e, a, l)]);
                                case 4:
                                    a = h.sent(),
                                    h.label = 5;
                                case 5:
                                    return u = c.next(), [3, 3];
                                case 6:
                                    return [3, 9];
                                case 7:
                                    return d = h.sent(), f = {
                                        error: d
                                    }, [3, 9];
                                case 8:
                                    try {
                                        u && !u.done && (p = c.return) && p.call(c)
                                    } finally {
                                        if (f)
                                            throw f.error
                                    }
                                    return [7];
                                case 9:
                                    return [2, Be[s] = a]
                                }
                            }))
                        }))
                    }(this.sha256, e, n, t, r || this.service)
                }, e
            }(),
            Ye = function(e) {
                var t,
                    n = (t = e, Ze(t).toISOString().replace(/\.\d{3}Z$/, "Z")).replace(/[\-:]/g, "");
                return {
                    longDate: n,
                    shortDate: n.substr(0, 8)
                }
            },
            $e = function(e) {
                return Object.keys(e).sort().join(";")
            },
            Qe = n(938);
        !function(e) {
            e.OTHER = "other",
            e.STYLESHEET = "stylesheet",
            e.DOCUMENT = "document",
            e.SCRIPT = "script",
            e.IMAGE = "image",
            e.FONT = "font"
        }(xe || (xe = {}));
        for (var et, tt, nt, rt, ot = [{
                name: xe.STYLESHEET,
                list: ["css", "less"]
            }, {
                name: xe.DOCUMENT,
                list: ["htm", "html", "ts", "doc", "docx", "pdf", "xls", "xlsx"]
            }, {
                name: xe.SCRIPT,
                list: ["js"]
            }, {
                name: xe.IMAGE,
                list: ["ai", "bmp", "gif", "ico", "jpeg", "jpg", "png", "ps", "psd", "svg", "tif", "tiff"]
            }, {
                name: xe.FONT,
                list: ["fnt", "fon", "otf", "ttf", "woff"]
            }], it = function(e) {
                for (var t = e.length - 1; t > 0; t--) {
                    var n = Math.floor(Math.random() * (t + 1)),
                        r = e[t];
                    e[t] = e[n],
                    e[n] = r
                }
            }, st = function(e) {
                var t = e.substring(e.lastIndexOf("/") + 1),
                    n = t.substring(t.lastIndexOf(".") + 1).split(/[?#]/)[0],
                    r = xe.OTHER;
                return ot.forEach((function(e) {
                    e.list.indexOf(n) > -1 && (r = e.name)
                })), r
            }, at = function(e) {
                var t = e.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/);
                return t && t[4] ? t[4] : ""
            }, ct = function(e) {
                var t = e.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/);
                return t && t[2] ? t[2] : ""
            }, ut = function(e, t, n, r) {
                return new (n || (n = Promise))((function(o, i) {
                    function s(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function a(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function c(e) {
                        var t;
                        e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                            e(t)
                        }))).then(s, a)
                    }
                    c((r = r.apply(e, t || [])).next())
                }))
            }, lt = function(e, t) {
                var n,
                    r,
                    o,
                    i,
                    s = {
                        label: 0,
                        sent: function() {
                            if (1 & o[0])
                                throw o[1];
                            return o[1]
                        },
                        trys: [],
                        ops: []
                    };
                return i = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                    return this
                }), i;
                function a(i) {
                    return function(a) {
                        return function(i) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; s;)
                                try {
                                    if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done)
                                        return o;
                                    switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                    case 0:
                                    case 1:
                                        o = i;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: i[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        r = i[1],
                                        i = [0];
                                        continue;
                                    case 7:
                                        i = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!(o = s.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                            s.label = i[1];
                                            break
                                        }
                                        if (6 === i[0] && s.label < o[1]) {
                                            s.label = o[1],
                                            o = i;
                                            break
                                        }
                                        if (o && s.label < o[2]) {
                                            s.label = o[2],
                                            s.ops.push(i);
                                            break
                                        }
                                        o[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    i = t.call(e, s)
                                } catch (e) {
                                    i = [6, e],
                                    r = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & i[0])
                                throw i[1];
                            return {
                                value: i[0] ? i[1] : void 0,
                                done: !0
                            }
                        }([i, a])
                    }
                }
            }, dt = "POST", ft = {
                expiresIn: 60
            }, pt = function(e) {
                var t = this;
                this.sendFetch = function(e) {
                    return ut(t, void 0, void 0, (function() {
                        var t,
                            n,
                            r,
                            i,
                            s,
                            a,
                            c,
                            u;
                        return lt(this, (function(l) {
                            switch (l.label) {
                            case 0:
                                return t = at(this.config.endpoint), n = JSON.stringify(ht(e)), i = o.bind, c = {
                                    method: dt
                                }, u = {
                                    "content-type": "application/json"
                                }, s = "X-Amz-Content-Sha256", [4, yt(n)];
                            case 1:
                                return r = new (i.apply(o, [void 0, (c.headers = (u[s] = l.sent(), u.host = t, u), c.protocol = ct(this.config.endpoint), c.hostname = t, c.path = "/appmonitors/" + e.AppMonitorDetails.id + "/", c.body = n, c)])), [4, this.awsSigV4.sign(r)];
                            case 2:
                                return a = l.sent(), [2, this.config.fetchRequestHandler.handle(a)]
                            }
                        }))
                    }))
                },
                this.sendBeacon = function(e) {
                    return ut(t, void 0, void 0, (function() {
                        var t,
                            n,
                            r,
                            i,
                            s,
                            a,
                            c,
                            u;
                        return lt(this, (function(l) {
                            switch (l.label) {
                            case 0:
                                return t = at(this.config.endpoint), n = JSON.stringify(ht(e)), i = o.bind, c = {
                                    method: dt
                                }, u = {
                                    "content-type": "text/plain;charset=UTF-8"
                                }, s = "X-Amz-Content-Sha256", [4, yt(n)];
                            case 1:
                                return r = new (i.apply(o, [void 0, (c.headers = (u[s] = l.sent(), u.host = t, u), c.protocol = ct(this.config.endpoint), c.hostname = t, c.path = "/appmonitors/" + e.AppMonitorDetails.id, c.body = n, c)])), [4, this.awsSigV4.presign(r, ft)];
                            case 2:
                                return a = l.sent(), [2, this.config.beaconRequestHandler.handle(a)]
                            }
                        }))
                    }))
                },
                this.config = e,
                this.awsSigV4 = new Je({
                    applyChecksum: !0,
                    credentials: e.credentials,
                    region: e.region,
                    service: "rum",
                    uriEscapePath: !0,
                    sha256: Qe.Sha256
                })
            }, ht = function(e) {
                var t = [];
                return e.RumEvents.forEach((function(e) {
                    return t.push(vt(e))
                })), {
                    BatchId: e.BatchId,
                    AppMonitorDetails: e.AppMonitorDetails,
                    UserDetails: e.UserDetails,
                    RumEvents: t
                }
            }, vt = function(e) {
                return {
                    id: e.id,
                    timestamp: Math.round(e.timestamp.getTime() / 1e3),
                    type: e.type,
                    metadata: e.metadata,
                    details: e.details
                }
            }, yt = function(e) {
                return ut(void 0, void 0, void 0, (function() {
                    var t,
                        n;
                    return lt(this, (function(r) {
                        switch (r.label) {
                        case 0:
                            return (t = new Qe.Sha256).update(e), n = me, [4, t.digest()];
                        case 1:
                            return [2, n.apply(void 0, [r.sent()]).toLowerCase()]
                        }
                    }))
                }))
            }, gt = function() {
                function t() {}
                return t.prototype.handle = function(t) {
                    var n = this.sendBeacon(t);
                    return new Promise((function(t, r) {
                        n ? t({
                            response: new e({
                                statusCode: 200
                            })
                        }) : r()
                    }))
                }, t.prototype.sendBeacon = function(e) {
                    var t = e.path;
                    if (e.query) {
                        var n = f(e.query);
                        n && (t += "?" + n)
                    }
                    var r = e.port,
                        o = e.protocol + "//" + e.hostname + (r ? ":" + r : "") + t;
                    return navigator.sendBeacon(o, e.body)
                }, t
            }(), mt = function() {
                function t(e) {
                    var t = void 0 === e ? {} : e,
                        n = t.fetchFunction,
                        r = t.requestTimeout;
                    this.requestTimeout = r,
                    this.fetchFunction = n
                }
                return t.prototype.destroy = function() {}, t.prototype.handle = function(t, n) {
                    var r = (void 0 === n ? {} : n).abortSignal,
                        o = this.requestTimeout;
                    if (null == r ? void 0 : r.aborted) {
                        var i = new Error("Request aborted");
                        return i.name = "AbortError", Promise.reject(i)
                    }
                    var s = t.path;
                    if (t.query) {
                        var a = f(t.query);
                        a && (s += "?" + a)
                    }
                    var c = t.port,
                        u = t.method,
                        l = t.protocol + "//" + t.hostname + (c ? ":" + c : "") + s,
                        d = {
                            body: "GET" === u || "HEAD" === u ? void 0 : t.body,
                            headers: new Headers(t.headers),
                            method: u
                        };
                    "undefined" != typeof AbortController && (d.signal = r);
                    var p,
                        h = new Request(l, d),
                        v = [this.fetchFunction.apply(window, [h]).then((function(t) {
                            for (var n = t.headers, r = {}, o = 0, i = n.entries(); o < i.length; o++) {
                                var s = i[o];
                                r[s[0]] = s[1]
                            }
                            return void 0 !== t.body ? {
                                response: new e({
                                    headers: r,
                                    statusCode: t.status,
                                    body: t.body
                                })
                            } : t.blob().then((function(n) {
                                return {
                                    response: new e({
                                        headers: r,
                                        statusCode: t.status,
                                        body: n
                                    })
                                }
                            }))
                        })), (p = o, void 0 === p && (p = 0), new Promise((function(e, t) {
                            p && setTimeout((function() {
                                var e = new Error("Request did not complete within " + p + " ms");
                                e.name = "TimeoutError",
                                t(e)
                            }), p)
                        })))];
                    return r && v.push(new Promise((function(e, t) {
                        r.onabort = function() {
                            var e = new Error("Request aborted");
                            e.name = "AbortError",
                            t(e)
                        }
                    }))), Promise.race(v)
                }, t
            }(), wt = function(e, t, n, r) {
                return new (n || (n = Promise))((function(o, i) {
                    function s(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function a(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function c(e) {
                        var t;
                        e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                            e(t)
                        }))).then(s, a)
                    }
                    c((r = r.apply(e, t || [])).next())
                }))
            }, bt = function(e, t) {
                var n,
                    r,
                    o,
                    i,
                    s = {
                        label: 0,
                        sent: function() {
                            if (1 & o[0])
                                throw o[1];
                            return o[1]
                        },
                        trys: [],
                        ops: []
                    };
                return i = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                    return this
                }), i;
                function a(i) {
                    return function(a) {
                        return function(i) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; s;)
                                try {
                                    if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done)
                                        return o;
                                    switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                    case 0:
                                    case 1:
                                        o = i;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: i[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        r = i[1],
                                        i = [0];
                                        continue;
                                    case 7:
                                        i = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!(o = s.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                            s.label = i[1];
                                            break
                                        }
                                        if (6 === i[0] && s.label < o[1]) {
                                            s.label = o[1],
                                            o = i;
                                            break
                                        }
                                        if (o && s.label < o[2]) {
                                            s.label = o[2],
                                            s.ops.push(i);
                                            break
                                        }
                                        o[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    i = t.call(e, s)
                                } catch (e) {
                                    i = [6, e],
                                    r = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & i[0])
                                throw i[1];
                            return {
                                value: i[0] ? i[1] : void 0,
                                done: !0
                            }
                        }([i, a])
                    }
                }
            }, St = "CWR: Cannot dispatch; no AWS credentials.", Et = function() {
                function e(e, t, n, r) {
                    var o = this;
                    this.dispatchFetch = function() {
                        return wt(o, void 0, void 0, (function() {
                            return bt(this, (function(e) {
                                return [2, this.dispatch(this.rum.sendFetch)]
                            }))
                        }))
                    },
                    this.dispatchBeacon = function() {
                        return wt(o, void 0, void 0, (function() {
                            return bt(this, (function(e) {
                                return [2, this.dispatch(this.rum.sendBeacon)]
                            }))
                        }))
                    },
                    this.dispatchFetchFailSilent = function() {
                        return wt(o, void 0, void 0, (function() {
                            return bt(this, (function(e) {
                                return [2, this.dispatchFetch().catch((function() {}))]
                            }))
                        }))
                    },
                    this.dispatchBeaconFailSilent = function() {
                        return wt(o, void 0, void 0, (function() {
                            return bt(this, (function(e) {
                                return [2, this.dispatchBeacon().catch((function() {}))]
                            }))
                        }))
                    },
                    this.defaultClientBuilder = function(e, t, n) {
                        return new pt({
                            fetchRequestHandler: new mt({
                                fetchFunction: o.config.fetchFunction
                            }),
                            beaconRequestHandler: new gt,
                            endpoint: e,
                            region: t,
                            credentials: n
                        })
                    },
                    this.region = e,
                    this.endpoint = t,
                    this.eventCache = n,
                    this.enabled = !0,
                    this.buildClient = r.clientBuilder || this.defaultClientBuilder,
                    this.config = r,
                    this.startDispatchTimer(),
                    this.rum = {
                        sendFetch: function() {
                            return Promise.reject(new Error(St))
                        },
                        sendBeacon: function() {
                            return Promise.reject(new Error(St))
                        }
                    }
                }
                return e.prototype.enable = function() {
                    this.enabled = !0,
                    this.startDispatchTimer()
                }, e.prototype.disable = function() {
                    this.stopDispatchTimer(),
                    this.enabled = !1
                }, e.prototype.setAwsCredentials = function(e) {
                    this.rum = this.buildClient(this.endpoint, this.region, e),
                    "function" == typeof e && e()
                }, e.prototype.startDispatchTimer = function() {
                    document.addEventListener("visibilitychange", this.dispatchBeaconFailSilent),
                    document.addEventListener("pagehide", this.dispatchBeaconFailSilent),
                    this.config.dispatchInterval <= 0 || this.dispatchTimerId || (this.dispatchTimerId = window.setInterval(this.dispatchFetchFailSilent, this.config.dispatchInterval))
                }, e.prototype.stopDispatchTimer = function() {
                    document.removeEventListener("visibilitychange", this.dispatchBeaconFailSilent),
                    document.removeEventListener("pagehide", this.dispatchBeaconFailSilent),
                    this.dispatchTimerId && (window.clearInterval(this.dispatchTimerId), this.dispatchTimerId = void 0)
                }, e.prototype.dispatch = function(e) {
                    return wt(this, void 0, void 0, (function() {
                        var t;
                        return bt(this, (function(n) {
                            return this.enabled && this.eventCache.hasEvents() ? (t = {
                                BatchId: se(),
                                AppMonitorDetails: this.eventCache.getAppMonitorDetails(),
                                UserDetails: this.eventCache.getUserDetails(),
                                RumEvents: this.eventCache.getEventBatch()
                            }, [2, e(t)]) : [2]
                        }))
                    }))
                }, e
            }(), Ct = "navigation", xt = "load", Tt = function() {
                function e() {
                    var e = this;
                    this.eventListener = function() {
                        0 === performance.getEntriesByType(Ct).length ? e.performanceNavigationEventHandlerTimingLevel1() : new PerformanceObserver((function(t) {
                            t.getEntries().forEach((function(t) {
                                t.entryType === Ct && e.performanceNavigationEventHandlerTimingLevel2(t)
                            }))
                        })).observe({
                            entryTypes: [Ct]
                        })
                    },
                    this.performanceNavigationEventHandlerTimingLevel1 = function() {
                        setTimeout((function() {
                            var t = performance.timing,
                                n = t.navigationStart,
                                r = {
                                    version: "1.0.0",
                                    initiatorType: "navigation",
                                    startTime: 0,
                                    unloadEventStart: t.unloadEventStart > 0 ? t.unloadEventStart - n : 0,
                                    promptForUnload: t.unloadEventEnd - t.unloadEventStart,
                                    redirectStart: t.redirectStart > 0 ? t.redirectStart - n : 0,
                                    redirectTime: t.redirectEnd - t.redirectStart,
                                    fetchStart: t.fetchStart > 0 ? t.fetchStart - n : 0,
                                    domainLookupStart: t.domainLookupStart > 0 ? t.domainLookupStart - n : 0,
                                    dns: t.domainLookupEnd - t.domainLookupStart,
                                    connectStart: t.connectStart > 0 ? t.connectStart - n : 0,
                                    connect: t.connectEnd - t.connectStart,
                                    secureConnectionStart: t.secureConnectionStart > 0 ? t.secureConnectionStart - n : 0,
                                    tlsTime: t.secureConnectionStart > 0 ? t.connectEnd - t.secureConnectionStart : 0,
                                    requestStart: t.requestStart > 0 ? t.requestStart - n : 0,
                                    timeToFirstByte: t.responseStart - t.requestStart,
                                    responseStart: t.responseStart > 0 ? t.responseStart - n : 0,
                                    responseTime: t.responseStart > 0 ? t.responseEnd - t.responseStart : 0,
                                    domInteractive: t.domInteractive > 0 ? t.domInteractive - n : 0,
                                    domContentLoadedEventStart: t.domContentLoadedEventStart > 0 ? t.domContentLoadedEventStart - n : 0,
                                    domContentLoaded: t.domContentLoadedEventEnd - t.domContentLoadedEventStart,
                                    domComplete: t.domComplete > 0 ? t.domComplete - n : 0,
                                    domProcessingTime: t.loadEventStart - t.responseEnd,
                                    loadEventStart: t.loadEventStart > 0 ? t.loadEventStart - n : 0,
                                    loadEventTime: t.loadEventEnd - t.loadEventStart,
                                    duration: t.loadEventEnd - t.navigationStart,
                                    navigationTimingLevel: 1
                                };
                            e.recordEvent && e.recordEvent(M, r)
                        }), 0)
                    },
                    this.performanceNavigationEventHandlerTimingLevel2 = function(t) {
                        var n = {
                            version: "1.0.0",
                            initiatorType: t.initiatorType,
                            navigationType: t.type,
                            startTime: t.startTime,
                            unloadEventStart: t.unloadEventStart,
                            promptForUnload: t.unloadEventEnd - t.unloadEventStart,
                            redirectCount: t.redirectCount,
                            redirectStart: t.redirectStart,
                            redirectTime: t.redirectEnd - t.redirectStart,
                            workerStart: t.workerStart,
                            workerTime: t.workerStart > 0 ? t.fetchStart - t.workerStart : 0,
                            fetchStart: t.fetchStart,
                            domainLookupStart: t.domainLookupStart,
                            dns: t.domainLookupEnd - t.domainLookupStart,
                            nextHopProtocol: t.nextHopProtocol,
                            connectStart: t.connectStart,
                            connect: t.connectEnd - t.connectStart,
                            secureConnectionStart: t.secureConnectionStart,
                            tlsTime: t.secureConnectionStart > 0 ? t.connectEnd - t.secureConnectionStart : 0,
                            requestStart: t.requestStart,
                            timeToFirstByte: t.responseStart - t.requestStart,
                            responseStart: t.responseStart,
                            responseTime: t.responseStart > 0 ? t.responseEnd - t.responseStart : 0,
                            domInteractive: t.domInteractive,
                            domContentLoadedEventStart: t.domContentLoadedEventStart,
                            domContentLoaded: t.domContentLoadedEventEnd - t.domContentLoadedEventStart,
                            domComplete: t.domComplete,
                            domProcessingTime: t.loadEventStart - t.responseEnd,
                            loadEventStart: t.loadEventStart,
                            loadEventTime: t.loadEventEnd - t.loadEventStart,
                            duration: t.duration,
                            headerSize: t.transferSize - t.encodedBodySize,
                            transferSize: t.transferSize,
                            compressionRatio: t.encodedBodySize > 0 ? t.decodedBodySize / t.encodedBodySize : 0,
                            navigationTimingLevel: 2
                        };
                        e.recordEvent && e.recordEvent(M, n)
                    },
                    this.pluginId = "com.amazonaws.rum.navigation",
                    this.enabled = !0
                }
                return e.prototype.load = function(e) {
                    if (this.recordEvent = e.record, this.enabled)
                        if (this.hasTheWindowLoadEventFired()) {
                            var t = window.performance.getEntriesByType(Ct)[0];
                            this.performanceNavigationEventHandlerTimingLevel2(t)
                        } else
                            window.addEventListener(xt, this.eventListener)
                }, e.prototype.enable = function() {
                    this.enabled || (this.enabled = !0, window.addEventListener(xt, this.eventListener))
                }, e.prototype.disable = function() {
                    this.enabled && (this.enabled = !1, this.eventListener && window.removeEventListener(xt, this.eventListener))
                }, e.prototype.hasTheWindowLoadEventFired = function() {
                    if (window.performance && window.performance.getEntriesByType(Ct).length) {
                        var e = window.performance.getEntriesByType(Ct)[0];
                        return Boolean(e.loadEventEnd)
                    }
                    return !1
                }, e.prototype.getPluginId = function() {
                    return this.pluginId
                }, e
            }(), At = function() {
                return At = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e
                }, At.apply(this, arguments)
            }, It = "resource", _t = "load", Ot = {
                eventLimit: 10,
                recordAllTypes: [xe.DOCUMENT, xe.SCRIPT],
                sampleTypes: [xe.STYLESHEET, xe.IMAGE, xe.FONT, xe.OTHER]
            }, Pt = function() {
                function e(e) {
                    var t = this;
                    this.resourceEventListener = function(e) {
                        var n = [],
                            r = [],
                            o = 0,
                            i = new PerformanceObserver((function(e) {
                                e.getEntries().filter((function(e) {
                                    return e.entryType === It
                                })).forEach((function(e) {
                                    var o = st(e.name);
                                    t.config.recordAllTypes.includes(o) ? n.push(e) : t.config.sampleTypes.includes(o) && r.push(e)
                                }))
                            }));
                        i.observe({
                            entryTypes: [It]
                        });
                        var s = performance.getEntriesByType(It);
                        for (void 0 !== s && s.length > 0 && s.forEach((function(e) {
                            var o = st(e.name);
                            t.config.recordAllTypes.includes(o) ? n.push(e) : t.config.sampleTypes.includes(o) && r.push(e)
                        })), it(n); n.length > 0 && o < t.config.eventLimit;)
                            t.recordResourceEvent(n.pop()),
                            o++;
                        for (it(r); r.length > 0 && o < t.config.eventLimit;)
                            t.recordResourceEvent(r.pop()),
                            o++
                    },
                    this.recordResourceEvent = function(e) {
                        if (t.recordEvent && at(e.name) !== at(t.context.config.endpoint)) {
                            var n = {
                                version: "1.0.0",
                                initiatorType: e.initiatorType,
                                duration: e.duration,
                                fileType: st(e.name),
                                transferSize: e.transferSize
                            };
                            t.context.config.recordResourceUrl && (n.targetUrl = e.name),
                            t.recordEvent("com.amazon.rum.performance_resource_event", n)
                        }
                    },
                    this.pluginId = "com.amazonaws.rum.resource",
                    this.enabled = !0,
                    this.config = At(At({}, Ot), e)
                }
                return e.prototype.load = function(e) {
                    this.context = e,
                    this.recordEvent = e.record,
                    window.addEventListener(_t, this.resourceEventListener)
                }, e.prototype.enable = function() {
                    this.enabled || (this.enabled = !0, window.addEventListener(_t, this.resourceEventListener))
                }, e.prototype.disable = function() {
                    this.enabled && (this.enabled = !1, this.resourceEventListener && window.removeEventListener(_t, this.resourceEventListener))
                }, e.prototype.getPluginId = function() {
                    return this.pluginId
                }, e
            }(), kt = function(e, t) {
                return {
                    name: e,
                    value: void 0 === t ? -1 : t,
                    delta: 0,
                    entries: [],
                    id: "v1-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
                }
            }, Lt = function(e, t) {
                try {
                    if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                        if ("first-input" === e && !("PerformanceEventTiming" in self))
                            return;
                        var n = new PerformanceObserver((function(e) {
                            return e.getEntries().map(t)
                        }));
                        return n.observe({
                            type: e,
                            buffered: !0
                        }), n
                    }
                } catch (e) {}
            }, Rt = function(e, t) {
                var n = function n(r) {
                    "pagehide" !== r.type && "hidden" !== document.visibilityState || (e(r), t && (removeEventListener("visibilitychange", n, !0), removeEventListener("pagehide", n, !0)))
                };
                addEventListener("visibilitychange", n, !0),
                addEventListener("pagehide", n, !0)
            }, jt = function(e) {
                addEventListener("pageshow", (function(t) {
                    t.persisted && e(t)
                }), !0)
            }, Ht = "function" == typeof WeakSet ? new WeakSet : new Set, Dt = function(e, t, n) {
                var r;
                return function() {
                    t.value >= 0 && (n || Ht.has(t) || "hidden" === document.visibilityState) && (t.delta = t.value - (r || 0), (t.delta || void 0 === r) && (r = t.value, e(t)))
                }
            }, Mt = -1, qt = function() {
                return "hidden" === document.visibilityState ? 0 : 1 / 0
            }, Nt = function() {
                Rt((function(e) {
                    var t = e.timeStamp;
                    Mt = t
                }), !0)
            }, Bt = function() {
                return Mt < 0 && (Mt = qt(), Nt(), jt((function() {
                    setTimeout((function() {
                        Mt = qt(),
                        Nt()
                    }), 0)
                }))), {
                    get timeStamp() {
                        return Mt
                    }
                }
            }, zt = {
                passive: !0,
                capture: !0
            }, Ut = new Date, Ft = function(e, t) {
                et || (et = t, tt = e, nt = new Date, Gt(removeEventListener), Wt())
            }, Wt = function() {
                if (tt >= 0 && tt < nt - Ut) {
                    var e = {
                        entryType: "first-input",
                        name: et.type,
                        target: et.target,
                        cancelable: et.cancelable,
                        startTime: et.timeStamp,
                        processingStart: et.timeStamp + tt
                    };
                    rt.forEach((function(t) {
                        t(e)
                    })),
                    rt = []
                }
            }, Vt = function(e) {
                if (e.cancelable) {
                    var t = (e.timeStamp > 1e12 ? new Date : performance.now()) - e.timeStamp;
                    "pointerdown" == e.type ? function(e, t) {
                        var n = function() {
                                Ft(e, t),
                                o()
                            },
                            r = function() {
                                o()
                            },
                            o = function() {
                                removeEventListener("pointerup", n, zt),
                                removeEventListener("pointercancel", r, zt)
                            };
                        addEventListener("pointerup", n, zt),
                        addEventListener("pointercancel", r, zt)
                    }(t, e) : Ft(t, e)
                }
            }, Gt = function(e) {
                ["mousedown", "keydown", "touchstart", "pointerdown"].forEach((function(t) {
                    return e(t, Vt, zt)
                }))
            }, Xt = function() {
                function e() {
                    this.pluginId = "com.amazonaws.rum.web-vitals"
                }
                return e.prototype.load = function(e) {
                    var t = this;
                    this.recordEvent = e.record,
                    function(e, t) {
                        var n,
                            r = Bt(),
                            o = kt("LCP"),
                            i = function(e) {
                                var t = e.startTime;
                                t < r.timeStamp && (o.value = t, o.entries.push(e)),
                                n()
                            },
                            s = Lt("largest-contentful-paint", i);
                        if (s) {
                            n = Dt(e, o, t);
                            var a = function() {
                                Ht.has(o) || (s.takeRecords().map(i), s.disconnect(), Ht.add(o), n())
                            };
                            ["keydown", "click"].forEach((function(e) {
                                addEventListener(e, a, {
                                    once: !0,
                                    capture: !0
                                })
                            })),
                            Rt(a, !0),
                            jt((function(r) {
                                o = kt("LCP"),
                                n = Dt(e, o, t),
                                requestAnimationFrame((function() {
                                    requestAnimationFrame((function() {
                                        o.value = performance.now() - r.timeStamp,
                                        Ht.add(o),
                                        n()
                                    }))
                                }))
                            }))
                        }
                    }((function(e) {
                        return t.getWebVitalData(e, "com.amazon.rum.largest_contentful_paint_event")
                    })),
                    function(e, t) {
                        var n,
                            r = Bt(),
                            o = kt("FID"),
                            i = function(e) {
                                e.startTime < r.timeStamp && (o.value = e.processingStart - e.startTime, o.entries.push(e), Ht.add(o), n())
                            },
                            s = Lt("first-input", i);
                        n = Dt(e, o, t),
                        s && Rt((function() {
                            s.takeRecords().map(i),
                            s.disconnect()
                        }), !0),
                        s && jt((function() {
                            var r;
                            o = kt("FID"),
                            n = Dt(e, o, t),
                            rt = [],
                            tt = -1,
                            et = null,
                            Gt(addEventListener),
                            r = i,
                            rt.push(r),
                            Wt()
                        }))
                    }((function(e) {
                        return t.getWebVitalData(e, "com.amazon.rum.first_input_delay_event")
                    })),
                    function(e, t) {
                        var n,
                            r = kt("CLS", 0),
                            o = function(e) {
                                e.hadRecentInput || (r.value += e.value, r.entries.push(e), n())
                            },
                            i = Lt("layout-shift", o);
                        i && (n = Dt(e, r, t), Rt((function() {
                            i.takeRecords().map(o),
                            n()
                        })), jt((function() {
                            r = kt("CLS", 0),
                            n = Dt(e, r, t)
                        })))
                    }((function(e) {
                        return t.getWebVitalData(e, "com.amazon.rum.cumulative_layout_shift_event")
                    }))
                }, e.prototype.enable = function() {}, e.prototype.disable = function() {}, e.prototype.getPluginId = function() {
                    return this.pluginId
                }, e.prototype.configure = function(e) {}, e.prototype.getWebVitalData = function(e, t) {
                    var n = {
                        version: "1.0.0",
                        value: e.value
                    };
                    this.recordEvent(t, n)
                }, e
            }(), Kt = n(372), Zt = function() {
                function e() {
                    this.enabled = !1
                }
                return e.prototype.enable = function() {
                    if (!this.enabled) {
                        this.enabled = !0;
                        for (var e = 0, t = this.patches(); e < t.length; e++) {
                            var n = t[e];
                            Kt.wrap(n.nodule, n.name, n.wrapper())
                        }
                    }
                }, e.prototype.disable = function() {
                    if (this.enabled) {
                        this.enabled = !1;
                        for (var e = 0, t = this.patches(); e < t.length; e++) {
                            var n = t[e];
                            Kt.unwrap(n.nodule, n.name)
                        }
                    }
                }, e
            }(), Jt = function(e) {
                if (crypto)
                    return crypto.getRandomValues(e);
                if (msCrypto)
                    return msCrypto.getRandomValues(e);
                throw new Error("No crypto library found.")
            }, Yt = [], $t = 0; $t < 256; $t++)
            Yt[$t] = ($t + 256).toString(16).substr(1);
        var Qt,
            en,
            tn,
            nn = "X-Amzn-Trace-Id",
            rn = {
                logicalServiceName: "rum.aws.amazon.com",
                urlsToInclude: [/.*/],
                urlsToExclude: [/cognito\-identity\.([^\.]*\.)?amazonaws\.com/, /sts\.([^\.]*\.)?amazonaws\.com/],
                stackTraceLength: 200,
                recordAllRequests: !1,
                addXRayTraceIdHeader: !1
            },
            on = function(e, t) {
                var n = t.urlsToInclude.some((function(t) {
                        return t.test(e)
                    })),
                    r = t.urlsToExclude.some((function(t) {
                        return t.test(e)
                    }));
                return n && !r
            },
            sn = function() {
                return Date.now() / 1e3
            },
            an = function(e, t, n) {
                var r = {
                    version: "1.0.0",
                    name: e,
                    origin: "AWS::RUM::AppMonitor",
                    id: fn(),
                    start_time: t,
                    trace_id: dn(),
                    end_time: void 0,
                    subsegments: [],
                    in_progress: !1
                };
                return n && (r.http = n), r
            },
            cn = function(e, t, n) {
                var r = {
                    id: fn(),
                    name: e,
                    start_time: t,
                    end_time: void 0,
                    in_progress: !1,
                    namespace: e.endsWith("amazonaws.com") ? "aws" : "remote"
                };
                return n && (r.http = n), r
            },
            un = function(e) {
                return (e.hostname ? e.hostname : e.url ? at(e.url) : at(e.toString())) || window.location.hostname
            },
            ln = function(e, t) {
                return "Root=" + e + ";Parent=" + t + ";Sampled=1"
            },
            dn = function() {
                return "1-" + pn() + "-" + hn()
            },
            fn = function() {
                var e = new Uint8Array(8);
                return Jt(e), vn(e)
            },
            pn = function() {
                return Math.floor(Date.now() / 1e3).toString(16)
            },
            hn = function() {
                var e = new Uint8Array(12);
                return Jt(e), vn(e)
            },
            vn = function(e) {
                for (var t = "", n = 0; n < e.length; n++)
                    t += Yt[e[n]];
                return t
            },
            yn = (Qt = function(e, t) {
                return Qt = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }, Qt(e, t)
            }, function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                Qt(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }),
            gn = function(e) {
                function t(t) {
                    var n = e.call(this, t) || this;
                    return n.name = "XMLHttpRequest error", n
                }
                return yn(t, e), t
            }(Error),
            mn = function() {
                var e = function(t, n) {
                    return e = Object.setPrototypeOf || {
                        __proto__: []
                    } instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t)
                            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                    }, e(t, n)
                };
                return function(t, n) {
                    if ("function" != typeof n && null !== n)
                        throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
                    function r() {
                        this.constructor = t
                    }
                    e(t, n),
                    t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                }
            }(),
            wn = function() {
                return wn = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e
                }, wn.apply(this, arguments)
            },
            bn = function(e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.addXRayTraceIdHeader = function() {
                        return n.config.addXRayTraceIdHeader
                    }, n.isTracingEnabled = function() {
                        return n.context.config.enableXRay
                    }, n.isSessionRecorded = function() {
                        var e;
                        return (null === (e = n.context.getSession()) || void 0 === e ? void 0 : e.record) || !1
                    }, n.handleXhrLoadEvent = function(e) {
                        var t = e.target,
                            r = n.xhrMap.get(t);
                        if (r) {
                            var o = sn();
                            r.trace.end_time = o,
                            r.trace.subsegments[0].end_time = o,
                            r.trace.subsegments[0].http.response = {
                                status: t.status
                            };
                            var i = parseInt(t.getResponseHeader("Content-Length"), 10);
                            isNaN(i) || (r.trace.subsegments[0].http.response.content_length = parseInt(t.getResponseHeader("Content-Length"), 10)),
                            n.recordTraceEvent(r.trace),
                            n.recordHttpEventWithResponse(r, t)
                        }
                    }, n.handleXhrErrorEvent = function(e) {
                        var t = e.target,
                            r = n.xhrMap.get(t),
                            o = t.statusText ? t.status.toString() + ": " + t.statusText : t.status.toString();
                        if (r) {
                            var i = sn();
                            r.trace.end_time = i,
                            r.trace.subsegments[0].end_time = i,
                            r.trace.subsegments[0].error = !0,
                            r.trace.subsegments[0].cause = {
                                exceptions: [{
                                    type: "XMLHttpRequest error",
                                    message: o
                                }]
                            },
                            n.recordTraceEvent(r.trace),
                            n.recordHttpEventWithError(r, new gn(o))
                        }
                    }, n.handleXhrAbortEvent = function(e) {
                        var t = e.target,
                            r = n.xhrMap.get(t),
                            o = "XMLHttpRequest abort";
                        if (r) {
                            var i = sn();
                            r.trace.end_time = i,
                            r.trace.subsegments[0].end_time = i,
                            r.trace.subsegments[0].error = !0,
                            r.trace.subsegments[0].cause = {
                                exceptions: [{
                                    type: o
                                }]
                            },
                            n.recordTraceEvent(r.trace),
                            n.recordHttpEventWithError(r, o)
                        }
                    }, n.handleXhrTimeoutEvent = function(e) {
                        var t = e.target,
                            r = n.xhrMap.get(t),
                            o = "XMLHttpRequest timeout";
                        if (r) {
                            var i = sn();
                            r.trace.end_time = i,
                            r.trace.subsegments[0].end_time = i,
                            r.trace.subsegments[0].error = !0,
                            r.trace.subsegments[0].cause = {
                                exceptions: [{
                                    type: o
                                }]
                            },
                            n.recordTraceEvent(r.trace),
                            n.recordHttpEventWithError(r, o)
                        }
                    }, n.initializeTrace = function(e) {
                        var t = sn();
                        e.trace = an(n.config.logicalServiceName, t),
                        e.trace.subsegments.push(cn(un(e.url), t, {
                            request: {
                                method: e.method,
                                traced: !0
                            }
                        }))
                    }, n.sendWrapper = function() {
                        var e = n;
                        return function(t) {
                            return function() {
                                var n = e.xhrMap.get(this);
                                return n && (this.addEventListener("load", e.handleXhrLoadEvent), this.addEventListener("error", e.handleXhrErrorEvent), this.addEventListener("abort", e.handleXhrAbortEvent), this.addEventListener("timeout", e.handleXhrTimeoutEvent), e.initializeTrace(n), e.isTracingEnabled() && e.addXRayTraceIdHeader() && e.isSessionRecorded() && this.setRequestHeader(nn, ln(n.trace.trace_id, n.trace.subsegments[0].id))), t.apply(this, arguments)
                            }
                        }
                    }, n.openWrapper = function() {
                        var e = n;
                        return function(t) {
                            return function(n, r, o) {
                                return on(r, e.config) && e.xhrMap.set(this, {
                                    url: r,
                                    method: n,
                                    async: o
                                }), t.apply(this, arguments)
                            }
                        }
                    }, n.pluginId = "com.amazonaws.rum.xhr", n.config = wn(wn({}, rn), t), n.xhrMap = new Map, n
                }
                return mn(t, e), t.prototype.load = function(e) {
                    this.context = e,
                    this.enable()
                }, t.prototype.getPluginId = function() {
                    return this.pluginId
                }, t.prototype.patches = function() {
                    return [{
                        nodule: XMLHttpRequest.prototype,
                        name: "send",
                        wrapper: this.sendWrapper
                    }, {
                        nodule: XMLHttpRequest.prototype,
                        name: "open",
                        wrapper: this.openWrapper
                    }]
                }, t.prototype.statusOk = function(e) {
                    return e >= 200 && e < 300
                }, t.prototype.recordHttpEventWithResponse = function(e, t) {
                    !this.config.recordAllRequests && this.statusOk(t.status) || this.context.record(H, {
                        version: "1.0.0",
                        request: {
                            method: e.method
                        },
                        response: {
                            status: t.status,
                            statusText: t.statusText
                        }
                    })
                }, t.prototype.recordHttpEventWithError = function(e, t) {
                    var n = {
                        version: "1.0.0",
                        request: {
                            method: e.method
                        }
                    };
                    n.error = V({
                        type: "error",
                        error: t
                    }, this.config.stackTraceLength),
                    this.context.record(H, n)
                }, t.prototype.recordTraceEvent = function(e) {
                    this.isTracingEnabled() && this.isSessionRecorded() && this.context.record(D, e)
                }, t
            }(Zt),
            Sn = function() {
                var e = function(t, n) {
                    return e = Object.setPrototypeOf || {
                        __proto__: []
                    } instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t)
                            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                    }, e(t, n)
                };
                return function(t, n) {
                    if ("function" != typeof n && null !== n)
                        throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
                    function r() {
                        this.constructor = t
                    }
                    e(t, n),
                    t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                }
            }(),
            En = function() {
                return En = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e
                }, En.apply(this, arguments)
            },
            Cn = function(e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.isTracingEnabled = function() {
                        return n.context.config.enableXRay
                    }, n.isSessionRecorded = function() {
                        var e;
                        return (null === (e = n.context.getSession()) || void 0 === e ? void 0 : e.record) || !1
                    }, n.beginTrace = function(e, t, r) {
                        var o = sn(),
                            i = function(e, t) {
                                var n = {
                                    request: {}
                                };
                                return n.request.method = (null == e ? void 0 : e.method) ? e.method : "GET", n.request.traced = t, n
                            }(t, !0),
                            s = an(n.config.logicalServiceName, o),
                            a = cn(un(e), o, i);
                        return s.subsegments.push(a), n.config.addXRayTraceIdHeader && n.addXRayTraceIdHeader(e, t, r, s), s
                    }, n.addXRayTraceIdHeader = function(e, t, n, r) {
                        if (e.headers)
                            return o = e.headers, i = r.trace_id, s = r.subsegments[0].id, void o.set(nn, ln(i, s));
                        var o,
                            i,
                            s;
                        t || (t = {}, [].push.call(n, t)),
                        function(e, t, n) {
                            e.headers || (e.headers = {}),
                            e.headers[nn] = ln(t, n)
                        }(t, r.trace_id, r.subsegments[0].id)
                    }, n.endTrace = function(e, t, r) {
                        if (e) {
                            var o = sn();
                            if (e.subsegments[0].end_time = o, e.end_time = o, t) {
                                e.subsegments[0].http.response = {
                                    status: t.status
                                };
                                var i = parseInt(t.headers.get("Content-Length"), 10);
                                isNaN(i) || (e.subsegments[0].http.response.content_length = i)
                            }
                            r && (e.subsegments[0].error = !0, r instanceof Object ? n.appendErrorCauseFromObject(e.subsegments[0], r) : W(r) && n.appendErrorCauseFromPrimitive(e.subsegments[0], r.toString())),
                            n.context.record(D, e)
                        }
                    }, n.createHttpEvent = function(e, t) {
                        return {
                            version: "1.0.0",
                            request: {
                                method: (null == t ? void 0 : t.method) ? t.method : "GET"
                            }
                        }
                    }, n.recordHttpEventWithResponse = function(e, t) {
                        !n.config.recordAllRequests && t.ok || (e.response = {
                            status: t.status,
                            statusText: t.statusText
                        }, n.context.record(H, e))
                    }, n.recordHttpEventWithError = function(e, t) {
                        e.error = V({
                            type: "error",
                            error: t
                        }, n.config.stackTraceLength),
                        n.context.record(H, e)
                    }, n.fetch = function(e, t, r, o, i) {
                        var s,
                            a,
                            c = n.createHttpEvent(o, i);
                        return a = "string" == typeof o ? o : o.url, on(a, n.config) ? (n.isTracingEnabled() && n.isSessionRecorded() && (s = n.beginTrace(o, i, r)), e.apply(t, r).then((function(e) {
                            return n.endTrace(s, e, void 0), n.recordHttpEventWithResponse(c, e), e
                        })).catch((function(e) {
                            throw n.endTrace(s, void 0, e), n.recordHttpEventWithError(c, e), e
                        }))) : e.apply(t, r)
                    }, n.fetchWrapper = function() {
                        var e = n;
                        return function(t) {
                            return function(n, r) {
                                return e.fetch(t, this, arguments, n, r)
                            }
                        }
                    }, n.pluginId = "com.amazonaws.rum.fetch", n.config = En(En({}, rn), t), n
                }
                return Sn(t, e), t.prototype.load = function(e) {
                    this.context = e,
                    this.enable()
                }, t.prototype.getPluginId = function() {
                    return this.pluginId
                }, t.prototype.patches = function() {
                    return [{
                        nodule: window,
                        name: "fetch",
                        wrapper: this.fetchWrapper
                    }]
                }, t.prototype.appendErrorCauseFromPrimitive = function(e, t) {
                    e.cause = {
                        exceptions: [{
                            type: t
                        }]
                    }
                }, t.prototype.appendErrorCauseFromObject = function(e, t) {
                    e.cause = {
                        exceptions: [{
                            type: t.name,
                            message: t.message
                        }]
                    }
                }, t
            }(Zt),
            xn = function() {
                var e = function(t, n) {
                    return e = Object.setPrototypeOf || {
                        __proto__: []
                    } instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t)
                            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                    }, e(t, n)
                };
                return function(t, n) {
                    if ("function" != typeof n && null !== n)
                        throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
                    function r() {
                        this.constructor = t
                    }
                    e(t, n),
                    t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                }
            }(),
            Tn = function(e) {
                function t() {
                    var t = e.call(this) || this;
                    return t.pushState = function() {
                        var e = t;
                        return function(t) {
                            return function(n, r, o) {
                                var i = t.apply(this, arguments);
                                return e.recordPageView(), i
                            }
                        }
                    }, t.replaceState = function() {
                        var e = t;
                        return function(t) {
                            return function(n, r, o) {
                                var i = t.apply(this, arguments);
                                return e.recordPageView(), i
                            }
                        }
                    }, t.popstateListener = function(e) {
                        t.recordPageView()
                    }, t.recordPageView = function() {
                        t.context.recordPageView(t.createIdForCurrentPage())
                    }, t.pluginId = "com.amazonaws.rum.page-view", t.enable(), t
                }
                return xn(t, e), t.prototype.load = function(e) {
                    this.context = e,
                    this.addListener(),
                    this.recordPageView()
                }, t.prototype.getPluginId = function() {
                    return this.pluginId
                }, t.prototype.patches = function() {
                    return [{
                        nodule: History.prototype,
                        name: "pushState",
                        wrapper: this.pushState
                    }, {
                        nodule: History.prototype,
                        name: "replaceState",
                        wrapper: this.replaceState
                    }]
                }, t.prototype.addListener = function() {
                    window.addEventListener("popstate", this.popstateListener)
                }, t.prototype.createIdForCurrentPage = function() {
                    var e = window.location.pathname,
                        t = window.location.hash;
                    switch (this.context.config.pageIdFormat) {
                    case tn.PATH_AND_HASH:
                        return e && t ? e + t : e || (t || "");
                    case tn.HASH:
                        return t || "";
                    case tn.PATH:
                    default:
                        return e || ""
                    }
                }, t
            }(Zt),
            An = function() {
                return An = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e
                }, An.apply(this, arguments)
            },
            In = function(e, t, n) {
                if (n || 2 === arguments.length)
                    for (var r, o = 0, i = t.length; o < i; o++)
                        !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)), r[o] = t[o]);
                return e.concat(r || Array.prototype.slice.call(t))
            };
        !function(e) {
            e.ERRORS = "errors",
            e.PERFORMANCE = "performance",
            e.INTERACTION = "interaction",
            e.HTTP = "http"
        }(en || (en = {})),
        function(e) {
            e.PATH = "PATH",
            e.HASH = "HASH",
            e.PATH_AND_HASH = "PATH_AND_HASH"
        }(tn || (tn = {}));
        var _n = function() {
                function e(e, t, n, r) {
                    void 0 === r && (r = {}),
                    void 0 === n && (n = "us-west-2");
                    var o = An(An({}, {
                        unique: !1,
                        domain: window.location.hostname,
                        path: "/",
                        sameSite: "Strict",
                        secure: !0
                    }), r.cookieAttributes);
                    delete r.cookieAttributes,
                    this.config = An(An({
                        fetchFunction: fetch
                    }, function(e) {
                        return {
                            allowCookies: !1,
                            batchLimit: 100,
                            cookieAttributes: e,
                            disableAutoPageView: !1,
                            dispatchInterval: 5e3,
                            enableRumClient: !0,
                            enableXRay: !1,
                            endpoint: "https://dataplane.rum.us-west-2.amazonaws.com",
                            eventCacheSize: 200,
                            eventPluginsToLoad: [],
                            pageIdFormat: tn.PATH,
                            pagesToExclude: [],
                            pagesToInclude: [],
                            recordResourceUrl: !0,
                            sessionEventLimit: 200,
                            sessionLengthSeconds: 1800,
                            sessionSampleRate: 1,
                            telemetries: [],
                            userIdRetentionDays: 30
                        }
                    }(o)), r),
                    this.config.endpoint = this.getDataPlaneEndpoint(n, r),
                    this.eventCache = this.initEventCache(e, t),
                    this.dispatchManager = this.initDispatch(n),
                    this.pluginManager = this.initPluginManager(e, t),
                    this.config.enableRumClient ? this.enable() : this.disable()
                }
                return e.prototype.setAwsCredentials = function(e) {
                    this.dispatchManager.setAwsCredentials(e)
                }, e.prototype.addPlugin = function(e) {
                    this.pluginManager.addPlugin(e)
                }, e.prototype.dispatch = function() {
                    this.dispatchManager.dispatchFetch()
                }, e.prototype.dispatchBeacon = function() {
                    this.dispatchManager.dispatchBeacon()
                }, e.prototype.enable = function() {
                    this.eventCache.enable(),
                    this.pluginManager.enable(),
                    this.dispatchManager.enable()
                }, e.prototype.disable = function() {
                    this.dispatchManager.disable(),
                    this.pluginManager.disable(),
                    this.eventCache.disable()
                }, e.prototype.allowCookies = function(e) {
                    this.config.allowCookies = e
                }, e.prototype.recordPageView = function(e) {
                    this.eventCache.recordPageView(e)
                }, e.prototype.recordError = function(e) {
                    this.pluginManager.record(X, e)
                }, e.prototype.initEventCache = function(e, t) {
                    return new pe({
                        id: e,
                        version: t
                    }, this.config)
                }, e.prototype.initDispatch = function(e) {
                    var t = new Et(e, this.config.endpoint, this.eventCache, this.config);
                    return this.config.identityPoolId && this.config.guestRoleArn ? t.setAwsCredentials(new P(this.config).ChainAnonymousCredentialsProvider) : this.config.identityPoolId && t.setAwsCredentials(new R(this.config).ChainAnonymousCredentialsProvider), t
                }, e.prototype.initPluginManager = function(e, t) {
                    var n = this.constructBuiltinPlugins(),
                        r = In(In([], n, !0), this.config.eventPluginsToLoad, !0),
                        o = {
                            applicationId: e,
                            applicationVersion: t,
                            config: this.config,
                            record: this.eventCache.recordEvent,
                            recordPageView: this.eventCache.recordPageView,
                            getSession: this.eventCache.getSession
                        },
                        i = new j(o);
                    return this.config.disableAutoPageView || i.addPlugin(new Tn), r.forEach((function(e) {
                        i.addPlugin(e)
                    })), i
                }, e.prototype.constructBuiltinPlugins = function() {
                    var e = [],
                        t = this.telemetryFunctor();
                    return this.config.telemetries.forEach((function(n) {
                        "string" == typeof n && t[n.toLowerCase()] ? e = In(In([], e, !0), t[n.toLowerCase()]({}), !0) : Array.isArray(n) && t[n[0].toLowerCase()] && (e = In(In([], e, !0), t[n[0].toLowerCase()](n[1]), !0))
                    })), e
                }, e.prototype.getDataPlaneEndpoint = function(e, t) {
                    return t.endpoint ? t.endpoint : "https://dataplane.rum.${REGION}.amazonaws.com".replace("${REGION}", e)
                }, e.prototype.telemetryFunctor = function() {
                    var e;
                    return (e = {})[en.ERRORS] = function(e) {
                        return [new Z(e)]
                    }, e[en.PERFORMANCE] = function(e) {
                        return [new Tt, new Pt(e), new Xt]
                    }, e[en.INTERACTION] = function(e) {
                        return [new z(e)]
                    }, e[en.HTTP] = function(e) {
                        return [new bn(e), new Cn(e)]
                    }, e
                }, e
            }(),
            On = function() {
                return On = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e
                }, On.apply(this, arguments)
            },
            Pn = function(e, t, n, r) {
                return new (n || (n = Promise))((function(o, i) {
                    function s(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function a(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function c(e) {
                        var t;
                        e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                            e(t)
                        }))).then(s, a)
                    }
                    c((r = r.apply(e, t || [])).next())
                }))
            },
            kn = function(e, t) {
                var n,
                    r,
                    o,
                    i,
                    s = {
                        label: 0,
                        sent: function() {
                            if (1 & o[0])
                                throw o[1];
                            return o[1]
                        },
                        trys: [],
                        ops: []
                    };
                return i = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                    return this
                }), i;
                function a(i) {
                    return function(a) {
                        return function(i) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; s;)
                                try {
                                    if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done)
                                        return o;
                                    switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                    case 0:
                                    case 1:
                                        o = i;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: i[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        r = i[1],
                                        i = [0];
                                        continue;
                                    case 7:
                                        i = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!(o = s.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                            s.label = i[1];
                                            break
                                        }
                                        if (6 === i[0] && s.label < o[1]) {
                                            s.label = o[1],
                                            o = i;
                                            break
                                        }
                                        if (o && s.label < o[2]) {
                                            s.label = o[2],
                                            s.ops.push(i);
                                            break
                                        }
                                        o[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    i = t.call(e, s)
                                } catch (e) {
                                    i = [6, e],
                                    r = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & i[0])
                                throw i[1];
                            return {
                                value: i[0] ? i[1] : void 0,
                                done: !0
                            }
                        }([i, a])
                    }
                }
            },
            Ln = function(e) {
                return Pn(void 0, void 0, void 0, (function() {
                    var t,
                        n;
                    return kn(this, (function(r) {
                        switch (r.label) {
                        case 0:
                            return t = {}, n = {}, void 0 === e.u ? [3, 2] : [4, (o = e.u, Pn(void 0, void 0, void 0, (function() {
                                var e;
                                return kn(this, (function(t) {
                                    switch (t.label) {
                                    case 0:
                                        return t.trys.push([0, 3, , 4]), [4, fetch(o, {
                                            mode: "cors",
                                            method: "GET",
                                            headers: {
                                                Accept: "application/json",
                                                "Content-Type": "application/json"
                                            }
                                        })];
                                    case 1:
                                        return [4, t.sent().json()];
                                    case 2:
                                        return [2, t.sent()];
                                    case 3:
                                        throw e = t.sent(), new Error("CWR: Failed to load remote config: " + e);
                                    case 4:
                                        return [2]
                                    }
                                }))
                            })))];
                        case 1:
                            return n = r.sent(), t = On(On({}, n.clientConfig), e.c), [3, 3];
                        case 2:
                            void 0 !== e.c && (t = e.c),
                            r.label = 3;
                        case 3:
                            return [2, t]
                        }
                        var o
                    }))
                }))
            },
            Rn = function(e, t, n, r) {
                return new (n || (n = Promise))((function(o, i) {
                    function s(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function a(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function c(e) {
                        var t;
                        e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                            e(t)
                        }))).then(s, a)
                    }
                    c((r = r.apply(e, t || [])).next())
                }))
            },
            jn = function(e, t) {
                var n,
                    r,
                    o,
                    i,
                    s = {
                        label: 0,
                        sent: function() {
                            if (1 & o[0])
                                throw o[1];
                            return o[1]
                        },
                        trys: [],
                        ops: []
                    };
                return i = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                    return this
                }), i;
                function a(i) {
                    return function(a) {
                        return function(i) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; s;)
                                try {
                                    if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done)
                                        return o;
                                    switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                    case 0:
                                    case 1:
                                        o = i;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: i[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        r = i[1],
                                        i = [0];
                                        continue;
                                    case 7:
                                        i = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!(o = s.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                            s.label = i[1];
                                            break
                                        }
                                        if (6 === i[0] && s.label < o[1]) {
                                            s.label = o[1],
                                            o = i;
                                            break
                                        }
                                        if (o && s.label < o[2]) {
                                            s.label = o[2],
                                            s.ops.push(i);
                                            break
                                        }
                                        o[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    i = t.call(e, s)
                                } catch (e) {
                                    i = [6, e],
                                    r = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & i[0])
                                throw i[1];
                            return {
                                value: i[0] ? i[1] : void 0,
                                done: !0
                            }
                        }([i, a])
                    }
                }
            },
            Hn = function() {
                function e() {
                    var e = this;
                    this.commandHandlerMap = {
                        setAwsCredentials: function(t) {
                            e.orchestration.setAwsCredentials(t)
                        },
                        recordPageView: function(t) {
                            e.orchestration.recordPageView(t)
                        },
                        recordError: function(t) {
                            e.orchestration.recordError(t)
                        },
                        dispatch: function() {
                            e.orchestration.dispatch()
                        },
                        dispatchBeacon: function() {
                            e.orchestration.dispatchBeacon()
                        },
                        enable: function() {
                            e.orchestration.enable()
                        },
                        disable: function() {
                            e.orchestration.disable()
                        },
                        allowCookies: function(t) {
                            if ("boolean" != typeof t)
                                throw new Error("IncorrectParametersException");
                            e.orchestration.allowCookies(t)
                        }
                    }
                }
                return e.prototype.init = function(e) {
                    return Rn(this, void 0, void 0, (function() {
                        var t;
                        return jn(this, (function(n) {
                            switch (n.label) {
                            case 0:
                                return void 0 === e.u ? [3, 2] : [4, Ln(e)];
                            case 1:
                                return t = n.sent(), e.c = t, this.initCwr(e), [3, 3];
                            case 2:
                                this.initCwr(e),
                                n.label = 3;
                            case 3:
                                return [2]
                            }
                        }))
                    }))
                }, e.prototype.push = function(e) {
                    return Rn(this, void 0, void 0, (function() {
                        var t;
                        return jn(this, (function(n) {
                            if (!(t = this.commandHandlerMap[e.c]))
                                throw new Error("CWR: UnsupportedOperationException: " + e.c);
                            return t(e.p), [2]
                        }))
                    }))
                }, e.prototype.initCwr = function(e) {
                    var t = this;
                    this.orchestration = new _n(e.i, e.v, e.r, e.c),
                    window[e.n] = function(e, n) {
                        t.push({
                            c: e,
                            p: n
                        })
                    },
                    e.q.forEach((function(e) {
                        t.push(e)
                    })),
                    e.q = []
                }, e
            }();
        !window.AwsRumClient && window.AwsNexusTelemetry && (window.AwsRumClient = window.AwsNexusTelemetry),
        "function" == typeof fetch && "function" == typeof navigator.sendBeacon ? (new Hn).init(window.AwsRumClient) : window[window.AwsRumClient.n] = function() {}
    }()
}();

