(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vuescrollbars"] = factory();
	else
		root["Vuescrollbars"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 251);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(59)('wks');
var uid = __webpack_require__(44);
var Symbol = __webpack_require__(8).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(21);
var IE8_DOM_DEFINE = __webpack_require__(85);
var toPrimitive = __webpack_require__(52);
var dP = Object.defineProperty;

exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(18)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var core = __webpack_require__(6);
var ctx = __webpack_require__(30);
var hide = __webpack_require__(16);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var createDesc = __webpack_require__(43);
module.exports = __webpack_require__(10) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(17);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(53);
var defined = __webpack_require__(55);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(84);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(87);
var enumBugKeys = __webpack_require__(60);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(55);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 44 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(9).f;
var has = __webpack_require__(19);
var TAG = __webpack_require__(7)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(30);
var call = __webpack_require__(152);
var isArrayIter = __webpack_require__(153);
var anObject = __webpack_require__(21);
var toLength = __webpack_require__(56);
var getIterFn = __webpack_require__(154);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(17);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(54);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 55 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(57);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 57 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(59)('keys');
var uid = __webpack_require__(44);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 60 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 61 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(63);
var $export = __webpack_require__(14);
var redefine = __webpack_require__(93);
var hide = __webpack_require__(16);
var has = __webpack_require__(19);
var Iterators = __webpack_require__(33);
var $iterCreate = __webpack_require__(145);
var setToStringTag = __webpack_require__(46);
var getPrototypeOf = __webpack_require__(94);
var ITERATOR = __webpack_require__(7)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(21);
var dPs = __webpack_require__(146);
var enumBugKeys = __webpack_require__(60);
var IE_PROTO = __webpack_require__(58)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(86)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(147).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(44)('meta');
var isObject = __webpack_require__(17);
var has = __webpack_require__(19);
var setDesc = __webpack_require__(9).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(18)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(7);


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var core = __webpack_require__(6);
var LIBRARY = __webpack_require__(63);
var wksExt = __webpack_require__(66);
var defineProperty = __webpack_require__(9).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(130), __esModule: true };

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(10) && !__webpack_require__(18)(function () {
  return Object.defineProperty(__webpack_require__(86)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(17);
var document = __webpack_require__(8).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(19);
var toIObject = __webpack_require__(22);
var arrayIndexOf = __webpack_require__(133)(false);
var IE_PROTO = __webpack_require__(58)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = __webpack_require__(89);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(137);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(138);

var _createClass3 = _interopRequireDefault(_createClass2);

var _assign = __webpack_require__(83);

var _assign2 = _interopRequireDefault(_assign);

var _set = __webpack_require__(142);

var _set2 = _interopRequireDefault(_set);

var _util = __webpack_require__(167);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BROWSER = {
    body: document.querySelector('body'),
    data: {
        index: 0,
        name: 'scrollbar'
    },
    firefox: /firefox/i.test(navigator.userAgent),
    macosx: /mac/i.test(navigator.platform),
    msedge: /edge\/\d+/i.test(navigator.userAgent),
    msie: /(msie|trident)/i.test(navigator.userAgent),
    mobile: /android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),
    overlay: null, // check if browser overlays scrollbar which means the scrollbars totally floated
    scroll: null, // restore browser scrollbar size info:scrollbar size
    scrolls: new _set2.default(), // restore mutiple instance of Scrollbar
    webkit: /webkit/i.test(navigator.userAgent) && !/edge\/\d+/i.test(navigator.userAgent)
};

var DEFAULTS = {
    autoScrollSize: true, // automatically calculate scrollsize
    autoUpdate: true, // update scrollbar if content/container size changed
    debug: false, // debug mode
    disableBodyScroll: false, // disable body scroll if mouse over container
    duration: 200, // scroll animate duration in ms
    ignoreMobile: false, // ignore mobile devices
    ignoreOverlay: false, // ignore browsers with overlay scrollbars (mobile, MacOS)
    isRtl: false, // is RTL
    scrollStep: 30, // scroll step for scrollbar arrows
    showArrows: false, // add class to show arrows
    stepScrolling: true, // when scrolling to scrollbar mousedown position

    scrollx: null, // horizontal scroll element
    scrolly: null, // vertical scroll element

    onDestroy: null, // callback function on destroy,
    onFallback: null, // callback function if scrollbar is not initialized
    onInit: null, // callback function on first initialization
    onScroll: null, // callback function on content scrolling
    onUpdate: null // callback function on init/resize (before scrollbar size calculation
};

var BAR_TYPES = {
    advanced: function advanced() {
        // [ // For picture bar
        //     '<div class="scroll-element">',
        //     '<div class="scroll-element_corner"></div>',
        //     '<div class="scroll-arrow scroll-arrow_less"></div>',
        //     '<div class="scroll-arrow scroll-arrow_more"></div>',
        //     '<div class="scroll-element_outer">',
        //     '<div class="scroll-element_size"></div>', // required! used for scrollbar size calculation !
        //     '<div class="scroll-element_inner-wrapper">',
        //     '<div class="scroll-element_inner scroll-element_track">', // used for handling scrollbar click
        //     '<div class="scroll-element_inner-bottom"></div>',
        //     '</div>',
        //     '</div>',
        //     '<div class="scroll-bar">', // required
        //     '<div class="scroll-bar_body">',
        //     '<div class="scroll-bar_body-inner"></div>',
        //     '</div>',
        //     '<div class="scroll-bar_bottom"></div>',
        //     '<div class="scroll-bar_center"></div>',
        //     '</div>',
        //     '</div>',
        //     '</div>'
        // ].join('');

        var el = document.createElement('div');
        util.addClass(el, 'scroll-element');

        var el4corner = document.createElement('div');
        util.addClass(el4corner, 'scroll-element_corner');
        var el4arrowless = document.createElement('div');
        util.addClass(el4arrowless, 'scroll-arrow scroll-element-arrow_less');
        var el4arrowmore = document.createElement('div');
        util.addClass(el4arrowmore, 'scroll-arrow scroll-element-arrow_more');
        var el4outer = document.createElement('div');
        util.addClass(el4outer, 'scroll-element_outer');
        var el4size = document.createElement('div');
        util.addClass(el4size, 'scroll-element_size');

        var el4innerwrapper = document.createElement('div');
        util.addClass(el4innerwrapper, 'scroll-element-inner_wrapper');
        var el4inner = document.createElement('div');
        util.addClass(el4inner, 'scroll-element-inner scroll-element_track');
        var el4innerbottom = document.createElement('div');
        util.addClass(el4innerbottom, 'scroll-element-inner_bottom');

        var el4bar = document.createElement('div');
        util.addClass(el4bar, 'scroll-element-bar');
        var el4barbody = document.createElement('div');
        util.addClass(el4barbody, 'scroll-element-bar_body');
        var el4barbodyinner = document.createElement('div');
        util.addClass(el4barbodyinner, 'scroll-element-bar_body-inner');

        var el4bottom = document.createElement('div');
        util.addClass(el4bottom, 'scroll-element-bottom');
        var el4center = document.createElement('div');
        util.addClass(el4center, 'scroll-element-center');

        el4barbody.appendChild(el4barbodyinner);
        el4bar.appendChild(el4barbody);
        el4bar.appendChild(el4bottom);
        el4bar.appendChild(el4center);

        el4inner.appendChild(el4innerbottom);
        el4innerwrapper.appendChild(el4inner);
        el4outer.appendChild(el4size);
        el4outer.appendChild(el4innerwrapper);
        el4outer.appendChild(el4bar);

        el.appendChild(el4corner);
        el.appendChild(el4arrowless);
        el.appendChild(el4arrowmore);
        el.appendChild(el4outer);

        return el;
    },
    simple: function simple() {
        // [
        //     '<div class="scroll-element">',
        //     '<div class="scroll-element_outer">',
        //     '<div class="scroll-element_size"></div>', // required! used for scrollbar size calculation !
        //     '<div class="scroll-element_track"></div>', // used for handling scrollbar click
        //     '<div class="scroll-bar"></div>', // required
        //     '</div>',
        //     '</div>'
        // ].join('')
        var el = document.createElement('div');
        util.addClass(el, 'scroll-element');
        var el4outer = document.createElement('div');
        util.addClass(el4outer, 'scroll-element_outer');
        var el4size = document.createElement('div');
        util.addClass(el4size, 'scroll-element_size');
        var el4track = document.createElement('div');
        util.addClass(el4track, 'scroll-element_track');
        var el4bar = document.createElement('div');
        util.addClass(el4bar, 'scroll-bar');

        el.appendChild(el4outer);
        el4outer.appendChild(el4size);
        el4outer.appendChild(el4track);
        el4outer.appendChild(el4bar);

        return el;
    }
};

var util = (0, _assign2.default)(_util2.default, {
    /* ADDITIONAL FUNCTIONS */
    /**
     * Get native browser scrollbar size (height/width)
     *
     * @param {Boolean} actual size or CSS size, default - CSS size
     * @returns {Object} with height, width
     */
    getBrowserScrollSize: function getBrowserScrollSize(actualSize) {

        if (BROWSER.webkit && !actualSize) {
            return {
                height: 0,
                width: 0
            };
        }

        if (!BROWSER.data.outer) {
            var css = {
                'border': 'none',
                'box-sizing': 'content-box',
                'height': '200px',
                'margin': '0',
                'padding': '0',
                'width': '200px'
            };
            BROWSER.data.inner = document.createElement('div');
            util.css(BROWSER.data.inner, css);
            var outerCSS = (0, _assign2.default)({
                'left': '-1000px',
                'overflow': 'scroll',
                'position': 'absolute',
                'top': '-1000px'
            }, css);
            BROWSER.data.outer = document.createElement('div');
            util.css(BROWSER.data.outer, outerCSS);
            BROWSER.data.outer.appendChild(BROWSER.data.inner);
            BROWSER.body = BROWSER.body || document.querySelector('body');
            BROWSER.body.appendChild(BROWSER.data.outer);
        }

        BROWSER.data.outer.scrollLeft = 1000;
        BROWSER.data.outer.scrollTop = 1000;

        var offsetInner = util.offset(BROWSER.data.inner);
        var offsetOuter = util.offset(BROWSER.data.outer);

        return {
            height: Math.ceil(offsetOuter.top - offsetInner.top || 0),
            width: Math.ceil(offsetOuter.left - offsetInner.left || 0)
        };
    },

    /**
     * Check if native browser scrollbars overlay content
     *
     * @returns {Boolean}
     */
    isScrollOverlaysContent: function isScrollOverlaysContent() {
        var scrollSize = this.getBrowserScrollSize(true);
        return !(scrollSize.height || scrollSize.width);
    },
    isVerticalScroll: function isVerticalScroll(event) {
        var e = event;
        if (e.axis && e.axis === e.HORIZONTAL_AXIS) {
            return false;
        }
        if (e.wheelDeltaX) {
            return false;
        }
        return true;
    },
    storeHandlers: function storeHandlers(inst, eventName, element, handler) {
        inst._handlers.add({ eventName: eventName, element: element, handler: handler });
    },
    removeHanlders: function removeHanlders(inst) {
        inst._handlers.forEach(function (bean) {
            util.removeEvent(bean.element, bean.eventName, bean.handler);
        });
    },
    storeScrollHandlers: function storeScrollHandlers(inst, eventName, element, handler) {
        inst._disabledScrollHandlers.add({ eventName: eventName, element: element, handler: handler });
    },
    removeScrollHanlders: function removeScrollHanlders(inst) {
        inst._disabledScrollHandlers.forEach(function (bean) {
            util.removeEvent(bean.element, bean.eventName, bean.handler);
        });
    }
});
var debug = false;
/**
 * Check if scroll content/container size is changed
 */
var updateScrollbars = function () {
    var timer = null,
        timerCounter = 0;
    return function (force) {
        BROWSER.scrolls.forEach(function (inst) {
            var options = inst.options;
            var el = inst.el;
            var wrapper = inst.wrapper;
            var scrollx = inst.scrollx;
            var scrolly = inst.scrolly;
            if (force || options.autoUpdate && wrapper && util.isVisible(wrapper) && (el.scrollWidth != scrollx.size || el.scrollHeight != scrolly.size || wrapper.clientWidth != scrollx.visible || wrapper.clientHeight != scrolly.visible)) {
                inst.update();
                if (options.debug) {
                    window.console && console.log({
                        scrollHeight: el.scrollHeight + ':' + scrolly.size,
                        scrollWidth: el.scrollWidth + ':' + scrollx.size,
                        visibleHeight: wrapper.clientHeight + ':' + scrolly.visible,
                        visibleWidth: wrapper.clientWidth + ':' + scrollx.visible
                    }, true);
                    timerCounter++;
                }
            }
        });
        if (debug && timerCounter > 10) {
            window.console && console.log('Scroll updates exceed 10');
            updateScrollbars = function updateScrollbars() {};
        } else {
            clearTimeout(timer);
            timer = setTimeout(updateScrollbars, 300);
        }
    };
}();

var Scrollbar = function () {
    function Scrollbar(el, wrapper) {
        (0, _classCallCheck3.default)(this, Scrollbar);

        this.el = this.container = el;
        this.ns = '.scrollbar_' + BROWSER.data.index++;
        this._originalWrapper = wrapper;
        this.options = null;
        this.scrollx = {}; // horizional bar
        this.scrolly = {}; // vertical bar
        this._handlers = new _set2.default(); // restore event handlers which would be removed on destroy
        this._disabledScrollHandlers = new _set2.default();
        el.__instance = this;
        if (!BROWSER.scroll) {
            BROWSER.overlay = util.isScrollOverlaysContent();
            BROWSER.scroll = util.getBrowserScrollSize();
            // monit scrollbar size changed
            updateScrollbars();
            // add global resize listener
            var resize = util.throttle(function (e) {
                var force = false;
                if (BROWSER.scroll && (BROWSER.scroll.height || BROWSER.scroll.width)) {
                    var currentScroll = util.getBrowserScrollSize();
                    if (currentScroll.height != BROWSER.scroll.height || currentScroll.width != BROWSER.scroll.width) {
                        force = true;
                        BROWSER.scroll = currentScroll;
                    }
                }
                updateScrollbars(force);
            });
            util.addEvent(window, 'resize', resize);
            util.storeHandlers(this, 'resize', window, resize);
        }
        BROWSER.scrolls.add(this);
    }

    (0, _createClass3.default)(Scrollbar, [{
        key: 'init',
        value: function init(options) {
            var self = this;
            var el = self.el;
            var cw = self.containerWrapper || el;
            var wrapper = self.wrapper;
            var bar = { x: self.scrollx, y: self.scrolly };
            var initScroll = {
                scrollLeft: self.el.scrollLeft,
                scrollTop: self.el.scrollTop
            };
            options = self.options = util.extend(true, {}, DEFAULTS, options);
            // first init
            // render dom structure
            wrapper = self.wrapper = self._originalWrapper || document.createElement('div');
            ['scroll-wrapper', util.attr(el, 'class')].join(' ').split(/\s/).forEach(function (className) {
                return util.addClass(wrapper, className);
            });
            util.css(wrapper, {
                position: util.css(el, 'position') === 'absolute' ? 'absolute' : 'relative'
            });
            !self._originalWrapper && util.insertBefore(wrapper, el).appendChild(el);

            if (options.isRTL) {
                util.addClass(wrapper, 'scroll--rtl');
            }

            // check if textarea
            if (el.tagName.toLowerCase() === 'textarea') {
                cw = self.containerWrapper = document.createElement('div');
                util.insertBefore(cw, el).appendChild(el);
                util.addClass(wrapper, 'scroll-textarea');
            }

            var css = {
                height: 'auto',
                'max-height': '',
                'margin-bottom': BROWSER.scroll.height * -1 + 'px'
            };
            css[options.isRTL ? 'margin-left' : 'margin-right'] = BROWSER.scroll.width * -1 + 'px';
            util.addClass(cw, 'scroll-content');
            util.css(cw, css);

            // scroll on el
            function scroll4el(e) {
                var scrollLeft = self.el.scrollLeft;
                var scrollTop = self.el.scrollTop;
                if (options.isRtl) {
                    // webkit   0:100
                    // ie/edge  100:0
                    // firefox -100:0
                    switch (true) {
                        case BROWSER.firefox:
                            scrollLeft = Math.abs(scrollLeft);
                        case BROWSER.msedge || BROWSER.msie:
                            scrollLeft = self.el.scrollWidth - self.el.clientWidth - scrollLeft;
                            break;
                    }
                }
                // onScroll handler
                if (typeof options.onScroll === 'function') {
                    options.onScroll.call(self, {
                        maxScroll: bar.y.maxScrollOffset,
                        scroll: scrollTop,
                        size: bar.y.size,
                        visible: bar.y.visible
                    }, {
                        maxScroll: bar.x.maxScrollOffset,
                        scroll: scrollLeft,
                        size: bar.x.size,
                        visible: bar.x.visible
                    });
                }
                // TODO - It feels like zombie under IE, need smooth animation
                bar.x.isVisible && util.css(bar.x.scroll.bar, 'left', scrollLeft * bar.x.ratio + 'px');
                bar.y.isVisible && util.css(bar.y.scroll.bar, 'top', scrollTop * bar.y.ratio + 'px');
            }

            util.addEvent(el, 'scroll', scroll4el);
            util.storeHandlers(self, 'scroll', el, scroll4el);

            // prevent native scrollbars to be visible on #anchor click
            function scroll4wrapper(e) {
                wrapper.scrollTop = 0;
                wrapper.scrollLeft = 0;
            }

            util.addEvent(wrapper, 'scroll', scroll4wrapper);
            util.storeHandlers(self, 'scroll', wrapper, scroll4wrapper);

            // if need disable body scroll
            if (options.disableBodyScroll) {
                var handleMouseScroll = function handleMouseScroll(event) {
                    util.isVerticalScroll(event) ? bar.y.isVisible && bar.y.mousewheel(event) : bar.x.isVisible && bar.x.mousewheel(event);
                };

                // util.addEvent(wrapper, 'MozMousePixelScroll', handleMouseScroll);
                util.addEvent(wrapper, 'mousewheel', handleMouseScroll);
                // util.storeHandlers(self, 'MozMousePixelScroll', wrapper, handleMouseScroll);
                util.storeHandlers(self, 'mousewheel', wrapper, handleMouseScroll);
                // util.storeScrollHandlers(self, 'MozMousePixelScroll', wrapper, handleMouseScroll);
                util.storeScrollHandlers(self, 'mousewheel', wrapper, handleMouseScroll);

                if (BROWSER.mobile) {
                    var touchstart4wrapper = function touchstart4wrapper(e) {
                        var touch = e.originalEvent.touches && e.originalEvent.touches[0] || e;
                        var originalTouch = {
                            pageX: touch.pageX,
                            pageY: touch.pageY
                        };
                        var originalScroll = {
                            left: touch.scrollLeft,
                            top: touch.scrollTop
                        };
                        // touchmove
                        function touchmove4doc(e) {
                            var touch = e.originalEvent.touches && e.originalEvent.touches[0] || e;
                            el.scrollLeft = originalTouch.pageX + originalScroll.left - touch.pageX;
                            el.scrollTop = originalTouch.pageY + originalScroll.top - touch.pageY;
                            e.preventDefault();
                        }

                        util.addEvent(document, 'touchmove', touchmove4doc);
                        // touchend
                        function touchend4doc(e) {
                            util.removeEvent(wrapper, 'touchstart', touchstart4wrapper);
                            util.removeEvent(document, 'touchmove', touchmove4doc);
                            util.removeEvent(document, 'touchend', touchend4doc);
                        }

                        util.addEvent(document, 'touchend', touchend4doc);
                    };
                    util.addEvent(wrapper, 'touchstart', touchstart4wrapper);
                    util.storeHandlers(self, 'touchstart', wrapper, touchstart4wrapper);
                    util.storeScrollHandlers(self, 'touchstart', wrapper, touchstart4wrapper);
                }
            }

            // callback for init
            if (typeof options.onInit === 'function') {
                options.onInit.call(self, el);
            }

            // render bars
            self._renderBars(bar);
            // reset styles
            self._reset4BarCSS(bar);
            // calc init sizes
            self._calcInitSize4Bars(bar);
            // update scrollbar visibility/dimensions
            self._updateScroll('x', self.scrollx);
            self._updateScroll('y', self.scrolly);
            if (typeof options.onUpdate === 'function') {
                options.onUpdate.apply(self, [self.el]);
            }
            // calc scrollbar size
            self._calcSize4Bars(bar);

            util.scrollLeft(self.el, initScroll.scrollLeft);
            util.scrollTop(self.el, initScroll.scrollTop);
            util.trigger(self.el, 'scroll');
        }
    }, {
        key: 'update',
        value: function update(options) {
            var self = this;
            var original = self.options;
            options = self.options = util.extend(true, {}, original, options);
            var bar = { x: self.scrollx, y: self.scrolly };
            var initScroll = {
                scrollLeft: self.el.scrollLeft,
                scrollTop: self.el.scrollTop
            };
            var css = {
                height: 'auto',
                'max-height': '',
                'margin-bottom': BROWSER.scroll.height * -1 + 'px'
            };
            css[options.isRTL ? 'margin-left' : 'margin-right'] = BROWSER.scroll.width * -1 + 'px';
            util.css(self.containerWrapper || self.el, css);

            // if need disable body scroll
            if (options.disableBodyScroll && !original.disableBodyScroll) {
                // add listener
                var wrapper = self.wrapper;
                var handleMouseScroll = function handleMouseScroll(event) {
                    util.isVerticalScroll(event) ? bar.y.isVisible && bar.y.mousewheel(event) : bar.x.isVisible && bar.x.mousewheel(event);
                };

                util.addEvent(wrapper, 'MozMousePixelScroll', handleMouseScroll);
                util.addEvent(wrapper, 'mousewheel', handleMouseScroll);
                util.storeHandlers(self, 'MozMousePixelScroll', wrapper, handleMouseScroll);
                util.storeHandlers(self, 'mousewheel', wrapper, handleMouseScroll);
                util.storeScrollHandlers(self, 'MozMousePixelScroll', wrapper, handleMouseScroll);
                util.storeScrollHandlers(self, 'mousewheel', wrapper, handleMouseScroll);

                if (BROWSER.mobile) {
                    var touchstart4wrapper = function touchstart4wrapper(e) {
                        var touch = e.originalEvent.touches && e.originalEvent.touches[0] || e;
                        var originalTouch = {
                            pageX: touch.pageX,
                            pageY: touch.pageY
                        };
                        var originalScroll = {
                            left: touch.scrollLeft,
                            top: touch.scrollTop
                        };
                        // touchmove
                        function touchmove4doc(e) {
                            var touch = e.originalEvent.touches && e.originalEvent.touches[0] || e;
                            el.scrollLeft = originalTouch.pageX + originalScroll.left - touch.pageX;
                            el.scrollTop = originalTouch.pageY + originalScroll.top - touch.pageY;
                            e.preventDefault();
                        }

                        util.addEvent(document, 'touchmove', touchmove4doc);
                        // touchend
                        function touchend4doc(e) {
                            util.removeEvent(wrapper, 'touchstart', touchstart4wrapper);
                            util.removeEvent(document, 'touchmove', touchmove4doc);
                            util.removeEvent(document, 'touchend', touchend4doc);
                        }

                        util.addEvent(document, 'touchend', touchend4doc);
                    };
                    util.addEvent(wrapper, 'touchstart', touchstart4wrapper);
                    util.storeHandlers(self, 'touchstart', wrapper, touchstart4wrapper);
                    util.storeScrollHandlers(self, 'touchstart', wrapper, touchstart4wrapper);
                }
            } else if (!options.disableBodyScroll && original.disableBodyScroll) {
                // remove listener
                util.removeScrollHanlders(self);
            }

            // render bars
            self._renderBars(bar);
            // reset styles
            self._reset4BarCSS(bar);
            // calc init sizes
            self._calcInitSize4Bars(bar);
            // update scrollbar visibility/dimensions
            self._updateScroll('x', self.scrollx);
            self._updateScroll('y', self.scrolly);
            if (typeof options.onUpdate === 'function') {
                options.onUpdate.apply(self, [self.el]);
            }
            // calc scrollbar size
            self._calcSize4Bars(bar);

            // util.scrollLeft(self.el, initScroll.scrollLeft);
            // util.scrollTop(self.el, initScroll.scrollTop);
            self.el.scrollLeft = initScroll.scrollLeft;
            self.el.scrollTop = initScroll.scrollTop;
            util.trigger(self.el, 'scroll');
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var self = this;
            if (!self.wrapper) {
                return;
            }
            delete self.el.__instance;
            BROWSER.scrolls.delete(self);
            // remove listeners
            util.removeHanlders(self);
            delete self._handlers;
            // restore DOM structure
            util.insertBefore(self.el, self.wrapper);
            util.css(self.el, {
                'height': '',
                'margin': '',
                'max-height': ''
            });
            'scroll-content scroll-scrollx_visible scroll-scrolly_visible'.split(/\s/).forEach(function (className) {
                util.removeClass(self.el, className);
            });
            util.removeClass(self.scrollx.scroll, 'scroll-scrollx_visible');
            util.removeClass(self.scrolly.scroll, 'scroll-scrolly_visible');

            if (!self._originalWrapper) {
                self.wrapper.remove();
            }

            // onDestroy handler
            if (typeof self.options.onDestroy === 'function') {
                self.options.onDestroy.call(self, self.el);
            }
        }
    }, {
        key: '_updateScroll',
        value: function _updateScroll(d, scrollx) {
            var container = this.el,
                containerWrapper = this.containerWrapper || container,
                scrollClass = 'scroll-scroll' + d + '_visible',
                scrolly = d === 'x' ? this.scrolly : this.scrollx,
                offset = parseInt(util.css(container, d === 'x' ? 'left' : 'top'), 10) || 0,
                wrapper = this.wrapper;

            var AreaSize = scrollx.size;
            var AreaVisible = scrollx.visible + offset;

            scrollx.isVisible = AreaSize - AreaVisible > 1; // bug in IE9/11 with 1px diff
            if (scrollx.isVisible) {
                util.addClass(scrollx.scroll, scrollClass);
                util.addClass(scrolly.scroll, scrollClass);
                util.addClass(containerWrapper, scrollClass);
            } else {
                util.removeClass(scrollx.scroll, scrollClass);
                util.removeClass(scrolly.scroll, scrollClass);
                util.removeClass(containerWrapper, scrollClass);
            }

            if (d === 'y') {
                if (container.tagName.toLowerCase() === 'textarea' || AreaSize < AreaVisible) {
                    util.css(containerWrapper, {
                        'height': AreaVisible + BROWSER.scroll.height + 'px',
                        'max-height': 'none'
                    });
                } else {
                    util.css(containerWrapper, {
                        // "height": "auto", // do not reset height value: issue with height:100%!
                        'max-height': AreaVisible + BROWSER.scroll.height + 'px'
                    });
                }
            }

            if (scrollx.size != container.scrollWidth || scrolly.size != container.scrollHeight || scrollx.visible != wrapper.clientWidth || scrolly.visible != wrapper.clientHeight || scrollx.offset != (parseInt(util.css(container, 'left'), 10) || 0) || scrolly.offset != (parseInt(util.css(container, 'top'), 10) || 0)) {
                (0, _assign2.default)(this.scrollx, {
                    offset: parseInt(util.css(container, 'left'), 10) || 0,
                    size: container.scrollWidth,
                    visible: wrapper.clientWidth
                });
                (0, _assign2.default)(this.scrolly, {
                    offset: parseInt(util.css(container, 'top'), 10) || 0,
                    size: container.scrollHeight,
                    visible: wrapper.clientHeight
                });
                this._updateScroll(d === 'x' ? 'y' : 'x', scrolly);
            }
        }
    }, {
        key: '_reset4BarCSS',
        value: function _reset4BarCSS(bar) {
            var self = this;
            // remove classes & reset applied styles
            (0, _keys2.default)(bar).sort().forEach(function (key) {
                var item = bar[key];
                var scrollClass = 'scroll-scroll' + key + '_visible';
                var scrolly = key == 'x' ? bar.y : bar.x;

                util.removeClass(item.scroll, scrollClass);
                util.removeClass(scrolly.scroll, scrollClass);
                util.removeClass(self.containerWrapper || self.el, scrollClass);
            });
        }
    }, {
        key: '_calcInitSize4Bars',
        value: function _calcInitSize4Bars(bar) {
            // remove classes & reset applied styles
            var self = this;
            (0, _keys2.default)(bar).sort().forEach(function (key) {
                var item = bar[key];
                (0, _assign2.default)(item, key == 'x' ? {
                    offset: parseInt(util.css(self.el, 'left'), 10) || 0,
                    size: self.el.scrollWidth,
                    visible: self.wrapper.clientWidth
                } : {
                    offset: parseInt(util.css(self.el, 'top'), 10) || 0,
                    size: self.el.scrollHeight,
                    visible: self.wrapper.clientHeight
                });
            });
        }
    }, {
        key: '_calcSize4Bars',
        value: function _calcSize4Bars(bar) {
            // calculate scroll size
            var self = this;
            (0, _keys2.default)(bar).sort().forEach(function (key) {
                var item = bar[key];
                var cssOffset = key === 'x' ? 'left' : 'top';
                var cssFullSize = key === 'x' ? 'width' : 'height';
                var cssSize = key === 'x' ? 'width' : 'height';
                var offset = parseInt(util.css(self.el, cssOffset), 10) || 0;

                var AreaSize = item.size;
                var AreaVisible = item.visible + offset;

                var scrollSize = parseInt(util.css(item.scroll.size, cssFullSize), 10) + (parseInt(util.css(item.scroll.size, cssOffset), 10) || 0);

                if (self.options.autoScrollSize) {
                    item.scrollbarSize = parseInt(scrollSize * AreaVisible / AreaSize, 10);
                    util.css(item.scroll.bar, cssSize, item.scrollbarSize + 'px');
                }

                item.scrollbarSize = parseInt(util.css(item.scroll.bar, cssFullSize), 10);
                item.ratio = (scrollSize - item.scrollbarSize) / (AreaSize - AreaVisible) || 1;
                item.maxScrollOffset = AreaSize - AreaVisible;
            });
        }

        /**
         * 初始化滚动条
         * @param bar
         * @private
         */

    }, {
        key: '_renderBars',
        value: function _renderBars(bar) {
            var self = this;
            var options = self.options;
            (0, _keys2.default)(bar).sort().forEach(function (key) {
                var item = bar[key];
                if (item.scroll) {
                    // rendered already
                    return;
                }
                // first init
                var scrollCallback = null;
                var scroll2Value = 0;
                var scrollForward = 1;
                var scrollStep = options.scrollStep;
                var offsetPos = key === 'x' ? 'scrollLeft' : 'scrollTop';
                var scrollTo = function scrollTo() {
                    var currentOffset = self.el[offsetPos];
                    self.el[offsetPos] = currentOffset + scrollStep;
                    if (scrollForward == 1 && currentOffset + scrollStep >= scroll2Value) {
                        currentOffset = self[offsetPos];
                    }
                    if (scrollForward == -1 && currentOffset + scrollStep <= scroll2Value) {
                        currentOffset = self[offsetPos];
                    }
                    if (self.el[offsetPos] == currentOffset && scrollCallback) {
                        scrollCallback();
                    }
                };

                var scroll = item.scroll = self._getBar(options['scroll' + key]);
                util.addClass(scroll, 'scroll-' + key);

                if (options.showArrows) {
                    util.addClass(scroll, 'scroll-element_arrows_visible');
                }

                item.mousewheel = function (e) {
                    if (!item.isVisible || key === 'x' && util.isVerticalScroll(e)) {
                        return true;
                    }
                    if (key === 'y' && !util.isVerticalScroll(e)) {
                        bar.x.mousewheel(e);
                        return;
                    }
                    var delta = e.wheelDelta * -1 || e.detail;
                    var maxScrollValue = item.size - item.visible - item.offset;
                    // fix new mozilla
                    if (!delta) {
                        if (key === 'x' && !!e.deltaX) {
                            delta = e.deltaX * 40;
                        } else if (key === 'y' && !!e.deltaY) {
                            delta = e.deltaY * 40;
                        }
                    }

                    if (delta > 0 && scroll2Value < maxScrollValue || delta < 0 && scroll2Value > 0) {
                        scroll2Value = scroll2Value + delta;
                        if (scroll2Value < 0) {
                            scroll2Value = 0;
                        }
                        if (scroll2Value > maxScrollValue) {
                            scroll2Value = maxScrollValue;
                        }

                        self.scrollTo = self.scrollTo || {};
                        self.scrollTo[offsetPos] = scroll2Value;

                        if (self.scrollTo) {
                            // requestAnimationFrame(function () {
                            //     self.el[offsetPos] = self.scrollTo[offsetPos];
                            //     scroll2Value = self.el[offsetPos];
                            //     self.scrollTo = null;
                            // })
                            // TODO - 当disableBodyScroll=true时，若用户快速滑动滚动条会出现延迟bug
                            util[offsetPos].call(util, self.el, self.scrollTo[offsetPos], function () {
                                scroll2Value = self.el[offsetPos];
                                self.scrollTo = null;
                            });
                        }
                    }
                    util.cancelBubble(e);
                };

                util.addEvent(item.scroll, 'wheel', item.mousewheel);
                util.storeHandlers(self, 'wheel', item.scroll, item.mousewheel);
                function mouseenter4scroll() {
                    scroll2Value = self.el[offsetPos];
                }

                util.addEvent(item.scroll, 'mouseenter', mouseenter4scroll);
                util.storeHandlers(self, 'mouseenter', item.scroll, mouseenter4scroll);

                // For .scroll-arrow and .scroll-element_track click
                var mousedown = function mousedown(event) {
                    if (event.which != 1) {
                        return true;
                    }

                    scrollForward = 1;
                    var data = {
                        eventOffset: event[key === 'x' ? 'pageX' : 'pageY'],
                        maxScrollValue: item.size - item.visible - item.offset,
                        scrollbarOffset: util.offset(item.scroll.bar)[key === 'x' ? 'left' : 'top'],
                        scrollbarSize: item.scroll.bar[key === 'x' ? 'offsetWidth' : 'offsetHeight']
                    };
                    var timeout = 0,
                        timer = 0;

                    if (util.hasClass(this, 'scroll-arrow')) {
                        scrollForward = util.hasClass(this, 'scroll-arrow_more') ? 1 : -1;
                        scrollStep = options.scrollStep * scrollForward;
                        scroll2Value = scrollForward > 0 ? data.maxScrollValue : 0;
                        if (options.isRtl) {
                            switch (true) {
                                case BROWSER.firefox:
                                    scroll2Value = scrollForward > 0 ? 0 : data.maxScrollValue * -1;
                                    break;
                                case BROWSER.msie || BROWSER.msedge:
                                    break;
                            }
                        }
                    } else {
                        scrollForward = data.eventOffset > data.scrollbarOffset + data.scrollbarSize ? 1 : data.eventOffset < data.scrollbarOffset ? -1 : 0;
                        if (key === 'x' && options.isRtl && (BROWSER.msie || BROWSER.msedge)) {
                            scrollForward = scrollForward * -1;
                        }
                        scrollStep = Math.round(item.visible * 0.75) * scrollForward;
                        scroll2Value = data.eventOffset - data.scrollbarOffset - (options.stepScrolling ? scrollForward == 1 ? data.scrollbarSize : 0 : Math.round(data.scrollbarSize / 2));
                        scroll2Value = self.el[offsetPos] + scroll2Value / item.ratio;
                    }

                    self.scrollTo = self.scrollTo || {};
                    self.scrollTo[offsetPos] = options.stepScrolling ? self.el[offsetPos] + scrollStep : scroll2Value;

                    if (options.stepScrolling) {
                        scrollCallback = function scrollCallback() {
                            scroll2Value = self.el[offsetPos];
                            clearInterval(timer);
                            clearTimeout(timeout);
                            timeout = 0;
                            timer = 0;
                        };
                        timeout = setTimeout(function () {
                            timer = setInterval(scrollTo, 40);
                        }, options.duration + 100);
                    }

                    setTimeout(function () {
                        if (self.scrollTo) {
                            // c.animate(S.scrollTo, o.duration);
                            // TODO use css animation
                            // self.el[offsetPos]
                            util[offsetPos](self.scrollTo[offsetPos]);
                            self.scrollTo = null;
                        }
                    }, 1);

                    self._handleMouseDown(scrollCallback, event);
                };
                var el4scrollarrow = item.scroll.querySelector('.scroll-arrow');
                el4scrollarrow && util.addEvent(el4scrollarrow, 'mousedown', mousedown);
                el4scrollarrow && util.storeHandlers(self, 'mousedown', el4scrollarrow, mousedown);
                util.addEvent(item.scroll.querySelector('.scroll-element_track'), 'mousedown', mousedown);
                util.storeHandlers(self, 'mousedown', item.scroll.querySelector('.scroll-element_track'), mousedown);

                // handle scrollbar drag'n'drop
                function mousedown4bar(e) {
                    if (e.which != 1) {
                        return;
                    }
                    var pos = e[key === 'x' ? 'pageX' : 'pageY'];
                    var init4offset = self.el[offsetPos];
                    util.addClass(item.scroll, 'scroll-draggable');
                    function mousemove4doc(e) {
                        var diff = parseInt((e[key === 'x' ? 'pageX' : 'pageY'] - pos) / item.ratio, 10);
                        if (key === 'x' && options.isRtl && (BROWSER.msie || BROWSER.msedge)) {
                            diff = diff * -1;
                        }
                        self.el[offsetPos] = init4offset + diff;
                    }

                    util.addEvent(document, 'mousemove', mousemove4doc);

                    function mouseup4bar(e) {
                        util.removeEvent(document, 'mousemove', mousemove4doc);
                        util.removeEvent(document, 'mouseup', mouseup4bar);
                        util.cancelBubble(e);
                    }

                    util.addEvent(document, 'mouseup', mouseup4bar);

                    self._handleMouseDown(function () {
                        util.removeClass(item.scroll, 'scroll-draggable');
                        scroll2Value = self.el[offsetPos];
                    }, e);
                }

                util.addEvent(item.scroll.bar, 'mousedown', mousedown4bar);
                util.storeHandlers(self, 'mousedown', item.scroll.bar, mousedown4bar);
            });
        }
    }, {
        key: '_getBar',
        value: function _getBar(type) {
            var tpl = null;
            if (!type) {
                tpl = BAR_TYPES['simple']();
            }
            if (typeof type === 'string') {
                tpl = BAR_TYPES[typeof BAR_TYPES[type] === 'function' ? type : 'simple']();
            } else if (type instanceof Element) {
                tpl = type;
            }
            this.wrapper.appendChild(tpl);
            tpl.bar = tpl.querySelector('.scroll-bar');
            tpl.size = tpl.querySelector('.scroll-element_size');
            tpl.track = tpl.querySelector('.scroll-element_track');
            return tpl;
        }
    }, {
        key: '_handleMouseDown',
        value: function _handleMouseDown(callback, event, eventHandler) {
            // let self = this;

            function blur4doc(e) {
                var body = document.querySelector('body');
                util.removeEvent(document, 'dragstart', dragstart4doc);
                util.removeEvent(body, 'selectstart', selectstart4doc);
                util.removeEvent(document, 'blur', blur4doc);
                callback && callback();
            }

            util.addEvent(document, 'blur', blur4doc);
            // util.storeHandlers(self, 'blur', document, blur4doc);

            function dragstart4doc(e) {
                util.cancelBubble(e);
            }

            util.addEvent(document, 'dragstart', dragstart4doc);
            // util.storeHandlers(self, 'dragstart', document, dragstart4doc);


            util.addEvent(document, 'mouseup', blur4doc);

            function selectstart4doc(e) {
                util.cancelBubble(e);
            }

            util.addEvent(document.querySelector('body'), 'selectstart', selectstart4doc);
            // util.storeHandlers(self, 'selectstart', document.querySelector('body'), selectstart4doc);

            util.cancelBubble(event);
        }
    }]);
    return Scrollbar;
}();

exports.default = Scrollbar;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(135), __esModule: true };

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(14);
var core = __webpack_require__(6);
var fails = __webpack_require__(18);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 91 */
/***/ (function(module, exports) {



/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(144)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(62)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(19);
var toObject = __webpack_require__(32);
var IE_PROTO = __webpack_require__(58)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(148);
var global = __webpack_require__(8);
var hide = __webpack_require__(16);
var Iterators = __webpack_require__(33);
var TO_STRING_TAG = __webpack_require__(7)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(16);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(54);
var TAG = __webpack_require__(7)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(17);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(54);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(87);
var hiddenKeys = __webpack_require__(60).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(121);

__webpack_require__(123);

__webpack_require__(124);

__webpack_require__(125);

__webpack_require__(126);

__webpack_require__(127);

__webpack_require__(128);

var _directive = __webpack_require__(129);

var _directive2 = _interopRequireDefault(_directive);

var _component = __webpack_require__(182);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bar = {};

Bar.install = function (Vue, options) {
    (0, _directive2.default)(Vue, options);
    Vue.component(_component2.default.name, _component2.default);
};

if (typeof Vue !== 'undefined') {
    Vue.use(Bar);
}

exports.default = Bar;

/***/ }),
/* 121 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 122 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 123 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 124 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 125 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 126 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 127 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 128 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(83);

var _assign2 = _interopRequireDefault(_assign);

exports.default = install;

var _scrollbar = __webpack_require__(88);

var _scrollbar2 = _interopRequireDefault(_scrollbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 指令名称
var NAME = 'bar';

function install(Vue, options) {
    if (new Vue().$isServer) {
        throw Error('Not support SSR!');
    }
    Vue.directive(NAME, {
        bind: function bind(el, binding, vnode) {},
        inserted: function inserted(el, binding, vnode) {
            var modifier = binding.modifiers;
            var option = binding.value;
            option = (0, _assign2.default)({}, modifier, option);
            new _scrollbar2.default(el).init(option);
        },
        update: function update(el, binding, vnode, oldVnode) {},
        componentUpdated: function componentUpdated(el, binding, vnode, oldVnode) {
            var inst = el.__instance;
            if (inst instanceof _scrollbar2.default) {
                var modifier = binding.modifiers;
                var option = binding.value;
                option = (0, _assign2.default)({}, modifier, option);
                inst.update(option);
            }
        },
        unbind: function unbind(el, binding, vnode) {
            var inst = el.__instance;
            inst && inst.destroy();
        }
    });
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(131);
module.exports = __webpack_require__(6).Object.assign;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(14);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(132) });


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(31);
var gOPS = __webpack_require__(61);
var pIE = __webpack_require__(45);
var toObject = __webpack_require__(32);
var IObject = __webpack_require__(53);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(18)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(22);
var toLength = __webpack_require__(56);
var toAbsoluteIndex = __webpack_require__(134);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(57);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(136);
module.exports = __webpack_require__(6).Object.keys;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(32);
var $keys = __webpack_require__(31);

__webpack_require__(90)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(139);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(140), __esModule: true };

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(141);
var $Object = __webpack_require__(6).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(14);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(10), 'Object', { defineProperty: __webpack_require__(9).f });


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(143), __esModule: true };

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(91);
__webpack_require__(92);
__webpack_require__(95);
__webpack_require__(150);
__webpack_require__(160);
__webpack_require__(163);
__webpack_require__(165);
module.exports = __webpack_require__(6).Set;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(57);
var defined = __webpack_require__(55);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(64);
var descriptor = __webpack_require__(43);
var setToStringTag = __webpack_require__(46);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(16)(IteratorPrototype, __webpack_require__(7)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var anObject = __webpack_require__(21);
var getKeys = __webpack_require__(31);

module.exports = __webpack_require__(10) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(8).document;
module.exports = document && document.documentElement;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(149);
var step = __webpack_require__(96);
var Iterators = __webpack_require__(33);
var toIObject = __webpack_require__(22);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(62)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 149 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(151);
var validate = __webpack_require__(100);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(156)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(9).f;
var create = __webpack_require__(64);
var redefineAll = __webpack_require__(97);
var ctx = __webpack_require__(30);
var anInstance = __webpack_require__(98);
var forOf = __webpack_require__(47);
var $iterDefine = __webpack_require__(62);
var step = __webpack_require__(96);
var setSpecies = __webpack_require__(155);
var DESCRIPTORS = __webpack_require__(10);
var fastKey = __webpack_require__(65).fastKey;
var validate = __webpack_require__(100);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(21);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(33);
var ITERATOR = __webpack_require__(7)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(99);
var ITERATOR = __webpack_require__(7)('iterator');
var Iterators = __webpack_require__(33);
module.exports = __webpack_require__(6).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(8);
var core = __webpack_require__(6);
var dP = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(10);
var SPECIES = __webpack_require__(7)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(8);
var $export = __webpack_require__(14);
var meta = __webpack_require__(65);
var fails = __webpack_require__(18);
var hide = __webpack_require__(16);
var redefineAll = __webpack_require__(97);
var forOf = __webpack_require__(47);
var anInstance = __webpack_require__(98);
var isObject = __webpack_require__(17);
var setToStringTag = __webpack_require__(46);
var dP = __webpack_require__(9).f;
var each = __webpack_require__(157)(0);
var DESCRIPTORS = __webpack_require__(10);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(30);
var IObject = __webpack_require__(53);
var toObject = __webpack_require__(32);
var toLength = __webpack_require__(56);
var asc = __webpack_require__(158);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(159);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(17);
var isArray = __webpack_require__(101);
var SPECIES = __webpack_require__(7)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(14);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(161)('Set') });


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(99);
var from = __webpack_require__(162);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(47);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(164)('Set');


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(14);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(166)('Set');


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(14);
var aFunction = __webpack_require__(84);
var ctx = __webpack_require__(30);
var forOf = __webpack_require__(47);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(168);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _typeof2 = __webpack_require__(171);

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = __webpack_require__(89);

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    offset: function offset(el) {
        var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    },
    css: function css(el, key, value) {
        if (typeof key === 'string' && typeof value === 'undefined') {
            // get css style
            var style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
            return style[key];
        }
        // set css style
        if (typeof key === 'string') {
            el.style[key] = value;
        } else {
            var styles = key;
            for (var property in styles) {
                el.style[property] = styles[property];
            }
        }
    },
    attr: function attr(el, name, value) {
        if (typeof name === 'string' && typeof value === 'undefined') {
            // get attr
            return el.getAttribute(name);
        }
        if (typeof name === 'string') {
            el.setAttribute(name, value);
        } else {
            var attrs = name;
            (0, _keys2.default)(attrs).forEach(function (key) {
                return el.setAttribute(key, attrs[key]);
            });
        }
    },
    addClass: function addClass(el, className) {
        if (!className) {
            return;
        }
        if (el.classList) {
            el.classList.add(className);
        } else if (!this.hasClass(el, className)) {
            el.className += ' ' + className;
        }
    },
    hasClass: function hasClass(el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
    },
    removeClass: function removeClass(el, className) {
        el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
    },
    addEvent: function addEvent(el, type, handler) {
        if (el.attachEvent) {
            el.attachEvent('on' + type, handler);
        } else {
            el.addEventListener(type, handler);
        }
    },
    removeEvent: function removeEvent(el, type, handler) {
        if (el.detachEvent) {
            el.detachEvent('on' + type, handler);
        } else {
            el.removeEventListener(type, handler);
        }
    },

    /**
     * make sure your fn only be called once during dealy period
     */
    debounce: function debounce(fn) {
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

        var timer = null;
        return function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var context = this;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    },

    /**
     * make sure your fn only be called once at each threshold period
     */
    throttle: function throttle(fn) {
        var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
        var scope = arguments[2];

        var last = void 0,
            timer = void 0;
        return function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var now = Date.now();
            var ctx = scope || this;
            if (last && now < last + threshold) {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    last = now;
                    fn.apply(ctx, args);
                }, threshold);
            } else {
                last = now;
                fn.apply(ctx, args);
            }
        };
    },
    trigger: function trigger(el, type) {
        if ('createEvent' in document) {
            // modern browsers, IE9+
            var e = document.createEvent('HTMLEvents');
            e.initEvent(type, false, true);
            el.dispatchEvent(e);
        } else {
            // IE 8
            var _e = document.createEventObject();
            _e.eventType = type;
            el.fireEvent('on' + _e.eventType, _e);
        }
    },
    isVisible: function isVisible(el) {
        var display = this.css(el, 'display');
        var visibility = this.css(el, 'visibility');
        var tagName = el.tagName.toLowerCase();
        if (el.clientHeight == 0 && el.clientWidth == 0 || display === 'none' || visibility === 'hidden' || tagName === 'input' && this.attr('type') === 'hidden') {
            return false;
        }
        if (tagName === 'body') {
            return !(el.clientHeight == 0 && el.clientWidth == 0 || display === 'none' || visibility === 'hidden');
        }
        return this.isVisible(el.parentNode);
    },
    insertBefore: function insertBefore(newNode, referredNode) {
        var parent = referredNode.parentNode;
        return parent.insertBefore(newNode, referredNode);
    },
    cancelBubble: function cancelBubble(e) {
        e.preventDefault();
        e.stopPropagation && e.stopPropagation();
        e.cancelBubble && (e.cancelBubble = true);
    },
    scrollTop: function scrollTop(el, pos, cb) {
        var attr = 'scrollTop';
        if (typeof pos === 'undefined') {
            return el[attr];
        }
        if (typeof pos === 'undefined') {
            throw Error('Illegal argument: pos[' + pos + ']');
        }
        var original = el[attr];
        var distance = original - pos;
        var step = distance / 15;
        var id = null;

        function fn() {
            var scrollPos = el[attr];
            el[attr] = original = scrollPos - step;

            if (distance > 0 && original > pos || distance < 0 && original < pos) {
                id = window.requestAnimationFrame(fn);
            } else {
                window.cancelAnimationFrame(id);
                typeof cb === 'function' && cb(el);
            }
        }

        id = window.requestAnimationFrame(fn);
    },
    scrollLeft: function scrollLeft(el, pos, cb) {
        var attr = 'scrollLeft';
        if (typeof pos === 'undefined') {
            return el[attr];
        }
        if (typeof pos === 'undefined') {
            throw Error('Illegal argument: pos[' + pos + ']');
        }
        var original = el[attr];
        var distance = original - pos;
        var step = distance / 15;
        var id = null;

        function fn() {
            var scrollPos = el[attr];
            el[attr] = original = scrollPos - step;

            if (distance > 0 && original > pos || distance < 0 && original < pos) {
                id = window.requestAnimationFrame(fn);
            } else {
                window.cancelAnimationFrame(id);
                typeof cb === 'function' && cb(el);
            }
        }

        id = window.requestAnimationFrame(fn);
    },

    /**
     * 对象合并
     * 同jQuery.extend
     * @return {*|{}}
     */
    extend: function extend() {
        var options = void 0,
            name = void 0,
            src = void 0,
            copy = void 0,
            copyIsArray = void 0,
            clone = void 0,
            target = arguments[0] || {},
            // 目标对象
        i = 1,
            length = arguments.length,
            deep = false;
        // 处理深度拷贝情况（第一个参数是boolean类型且为true）
        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[1] || {};
            // 跳过第一个参数（是否深度拷贝）和第二个参数（目标对象）
            i = 2;
        }
        // 如果目标不是对象或函数，则初始化为空对象
        if ((typeof target === 'undefined' ? 'undefined' : (0, _typeof3.default)(target)) !== 'object' && typeof target !== 'function') {
            target = {};
        }
        // 如果只指定了一个参数，则使用jQuery自身作为目标对象
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }
                    // 如果对象中包含了数组或者其他对象，则使用递归进行拷贝
                    if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        // 处理数组
                        if (copyIsArray) {
                            copyIsArray = false;
                            // 如果目标对象不存在该数组，则创建一个空数组；
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && this.isPlainObject(src) ? src : {};
                        }
                        // 从不改变原始对象，只做拷贝
                        target[name] = this.extend(deep, clone, copy);
                        // 不拷贝undefined值
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        // 返回已经被修改的对象
        return target;
    },
    isPlainObject: function isPlainObject(value) {
        if (!(value != null && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') || Object.prototype.toString.call(value) !== '[object Object]') {
            return false;
        }
        var proto = (0, _getPrototypeOf2.default)(Object(value));
        if (proto == null) {
            return true;
        }
        var Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
        return typeof Ctor === 'function' && Ctor instanceof Ctor && Function.prototype.toString.call(Ctor) == Function.prototype.toString.call(Object);
    }
};

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(169), __esModule: true };

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(170);
module.exports = __webpack_require__(6).Object.getPrototypeOf;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(32);
var $getPrototypeOf = __webpack_require__(94);

__webpack_require__(90)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(172);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(174);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(173), __esModule: true };

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(92);
__webpack_require__(95);
module.exports = __webpack_require__(66).f('iterator');


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(175), __esModule: true };

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(176);
__webpack_require__(91);
__webpack_require__(180);
__webpack_require__(181);
module.exports = __webpack_require__(6).Symbol;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(8);
var has = __webpack_require__(19);
var DESCRIPTORS = __webpack_require__(10);
var $export = __webpack_require__(14);
var redefine = __webpack_require__(93);
var META = __webpack_require__(65).KEY;
var $fails = __webpack_require__(18);
var shared = __webpack_require__(59);
var setToStringTag = __webpack_require__(46);
var uid = __webpack_require__(44);
var wks = __webpack_require__(7);
var wksExt = __webpack_require__(66);
var wksDefine = __webpack_require__(67);
var enumKeys = __webpack_require__(177);
var isArray = __webpack_require__(101);
var anObject = __webpack_require__(21);
var toIObject = __webpack_require__(22);
var toPrimitive = __webpack_require__(52);
var createDesc = __webpack_require__(43);
var _create = __webpack_require__(64);
var gOPNExt = __webpack_require__(178);
var $GOPD = __webpack_require__(179);
var $DP = __webpack_require__(9);
var $keys = __webpack_require__(31);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(102).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(45).f = $propertyIsEnumerable;
  __webpack_require__(61).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(63)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(16)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(31);
var gOPS = __webpack_require__(61);
var pIE = __webpack_require__(45);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(22);
var gOPN = __webpack_require__(102).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(45);
var createDesc = __webpack_require__(43);
var toIObject = __webpack_require__(22);
var toPrimitive = __webpack_require__(52);
var has = __webpack_require__(19);
var IE8_DOM_DEFINE = __webpack_require__(85);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(10) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(67)('asyncIterator');


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(67)('observable');


/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_component_vue__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_component_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_component_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6588cfad_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_component_vue__ = __webpack_require__(189);
function injectStyle (ssrContext) {
  __webpack_require__(183)
}
var normalizeComponent = __webpack_require__(187);
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false;
/* styles */
var __vue_styles__ = injectStyle;
/* scopeId */
var __vue_scopeId__ = null;
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null;
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_component_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6588cfad_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_component_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
);

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(184);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(185)("2e8f413c", content, true);

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(122)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined';

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(186);

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/};

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0]);
var singletonElement = null;
var singletonCounter = 0;
var isProduction = false;
var noop = function () {};

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction;

  var styles = listToStyles(parentId, list);
  addStylesToDom(styles);

  return function update (newList) {
    var mayRemove = [];
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];
      domStyle.refs--;
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList);
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i];
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
};

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    if (domStyle) {
      domStyle.refs++;
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = [];
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  head.appendChild(styleElement);
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove;
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]');

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++;
    styleElement = singletonElement || (singletonElement = createStyleElement());
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement();
    update = applyToTag.bind(null, styleElement);
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj);

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = [];

  return function (index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n')
  }
})();

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css;

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = styleElement.childNodes;
    if (childNodes[index]) styleElement.removeChild(childNodes[index]);
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 186 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 187 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule;
  var scriptExports = rawScriptExports = rawScriptExports || {};

  // ES6 modules interop
  var type = typeof rawScriptExports.default;
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports;
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports;

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render;
    options.staticRenderFns = compiledTemplate.staticRenderFns;
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook;
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    };
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional;
    var existing = functional
      ? options.render
      : options.beforeCreate;

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook;
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context);
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scrollbar = __webpack_require__(88);

var _scrollbar2 = _interopRequireDefault(_scrollbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'Scrollbar',
    props: {
        disableBodyScroll: { type: Boolean, default: false },
        autoScrollSize: { type: Boolean, default: true },
        autoUpdate: { type: Boolean, default: true },
        ignoreMobile: { type: Boolean, default: false },
        ignoreOverlay: { type: Boolean, default: false },
        isRtl: { type: Boolean, default: false },
        showArrows: { type: Boolean, default: false },
        stepScrolling: { type: Boolean, default: true },
        duration: { type: Number, default: 200 },
        scrollStep: { type: Number, default: 30 },
        onDestroy: { type: Function },
        onFallback: { type: Function },
        onInit: { type: Function },
        onScroll: { type: Function },
        onUpdate: { type: Function }
    },
    data: function data() {
        return {};
    },

    methods: {},
    created: function created() {
        this.$nextTick(function () {
            var self = this;
            var el = this.$slots.content[0].elm;

            var option = {
                disableBodyScroll: this.disableBodyScroll,
                autoScrollSize: this.autoScrollSize,
                autoUpdate: this.autoUpdate,
                ignoreMobile: this.ignoreMobile,
                ignoreOverlay: this.ignoreOverlay,
                isRtl: this.isRtl,
                showArrows: this.showArrows,
                stepScrolling: this.stepScrolling,
                duration: this.duration,
                scrollStep: this.scrollStep
            };
            option.onScroll = function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                args = ['onScroll', this].concat(args);
                self.$emit.apply(self, args);
            };
            option.onUpdate = function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                args = ['onUpdate', this].concat(args);
                self.$emit.apply(self, args);
            };
            option.onInit = function () {
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                }

                args = ['onInit', this].concat(args);
                self.$emit.apply(self, args);
            };
            option.onFallback = function () {
                for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                    args[_key4] = arguments[_key4];
                }

                args = ['onFallback', this].concat(args);
                self.$emit.apply(self, args);
            };
            option.onDestroy = function () {
                for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                    args[_key5] = arguments[_key5];
                }

                args = ['onDestroy', this].concat(args);
                self.$emit.apply(self, args);
            };
            var pageMap = this.$slots.pageMap ? this.$slots.pageMap[0].elm : null;
            if (pageMap) {
                option.scrollx = pageMap;
                option.scrolly = pageMap;
                option.stepScrolling = false;
            }
            var inst = new _scrollbar2.default(el, this.$el);
            this.__inst4scrollbar = inst;
            inst.init(option);
        });
    },
    mounted: function mounted() {},
    updated: function updated() {
        var option = {
            disableBodyScroll: this.disableBodyScroll,
            autoScrollSize: this.autoScrollSize,
            autoUpdate: this.autoUpdate,
            ignoreMobile: this.ignoreMobile,
            ignoreOverlay: this.ignoreOverlay,
            isRtl: this.isRtl,
            showArrows: this.showArrows,
            duration: this.duration,
            scrollStep: this.scrollStep
        };
        this.__inst4scrollbar.update(option);
    },
    beforeDestroy: function beforeDestroy() {
        this.__inst4scrollbar.destroy();
    }
}; //
//
//
//
//
//
//

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("content"),_vm._v(" "),_vm._t("pageMap")],2)};
var staticRenderFns = [];
var esExports = { render: render, staticRenderFns: staticRenderFns };
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(120);


/***/ })
/******/ ]);
});
