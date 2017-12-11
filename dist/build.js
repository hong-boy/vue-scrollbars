/******/
(function (modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/
    var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/ 		// Check if module is in cache
        /******/
        if (installedModules[moduleId]) {
            /******/
            return installedModules[moduleId].exports;
            /******/
        }
        /******/ 		// Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/            i: moduleId,
            /******/            l: false,
            /******/            exports: {}
            /******/
        };
        /******/
        /******/ 		// Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Flag the module as loaded
        /******/
        module.l = true;
        /******/
        /******/ 		// Return the exports of the module
        /******/
        return module.exports;
        /******/
    }

    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    /******/ 	// define getter function for harmony exports
    /******/
    __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
            /******/
            Object.defineProperty(exports, name, {
                /******/                configurable: false,
                /******/                enumerable: true,
                /******/                get: getter
                /******/
            });
            /******/
        }
        /******/
    };
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/
    __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
            /******/            function getDefault() {
                return module['default'];
            } :
            /******/            function getModuleExports() {
                return module;
            };
        /******/
        __webpack_require__.d(getter, 'a', getter);
        /******/
        return getter;
        /******/
    };
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ 	// __webpack_public_path__
    /******/
    __webpack_require__.p = "";
    /******/
    /******/ 	// Load entry module and return exports
    /******/
    return __webpack_require__(__webpack_require__.s = 1);
    /******/
})
/************************************************************************/
/******/([
    /* 0 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _util = __webpack_require__(3);

        var _util2 = _interopRequireDefault(_util);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

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
            scrolls: new Set(), // restore mutiple instance of Scrollbar
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
            onUpdate: null //callback function on init/resize (before scrollbar size calculation
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

        var util = Object.assign(_util2.default, {
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
                        "border": "none",
                        "box-sizing": "content-box",
                        "height": "200px",
                        "margin": "0",
                        "padding": "0",
                        "width": "200px"
                    };
                    BROWSER.data.inner = document.createElement('div');
                    util.css(BROWSER.data.inner, css);
                    var outerCSS = Object.assign({
                        "left": "-1000px",
                        "overflow": "scroll",
                        "position": "absolute",
                        "top": "-1000px"
                    }, css);
                    BROWSER.data.outer = document.createElement('div');
                    util.css(BROWSER.data.outer, outerCSS);
                    BROWSER.data.outer.appendChild(BROWSER.data.inner);
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
                if (e.axis && e.axis === e.HORIZONTAL_AXIS) return false;
                if (e.wheelDeltaX) return false;
                return true;
            },
            storeHandlers: function storeHandlers(inst, eventName, element, handler) {
                inst._handlers.add({eventName: eventName, element: element, handler: handler});
            },
            removeHanlders: function removeHanlders(inst) {
                inst._handlers.forEach(function (bean) {
                    util.removeEvent(bean.element, bean.eventName, bean.handler);
                });
            },
            storeScrollHandlers: function storeScrollHandlers(inst, eventName, element, handler) {
                inst._disabledScrollHandlers.add({eventName: eventName, element: element, handler: handler});
            },
            removeScrollHanlders: function removeScrollHanlders(inst) {
                inst._disabledScrollHandlers.forEach(function (bean) {
                    util.removeEvent(bean.element, bean.eventName, bean.handler);
                });
            }
        });

        /**
         * Check if scroll content/container size is changed
         */
        var updateScrollbars = function () {
            var timer = null;
            return function (force) {
                BROWSER.scrolls.forEach(function (inst) {
                    var options = inst.options;
                    var el = inst.el;
                    var wrapper = inst.wrapper;
                    var scrollx = inst.scrollx;
                    var scrolly = inst.scrolly;
                    if (force || options.autoUpdate && wrapper && util.isVisible(wrapper) && (el.scrollWidth != scrollx.size || el.scrollHeight != scrolly.size || wrapper.clientWidth != scrollx.visible || wrapper.clientHeight != scrolly.visible)) {
                        inst.update();
                    }
                });
                clearTimeout(timer);
                timer = setTimeout(updateScrollbars, 300);
            };
        }();

        var Scrollbar = function () {
            function Scrollbar(el, wrapper) {
                _classCallCheck(this, Scrollbar);

                this.el = this.container = el;
                this.ns = '.scrollbar_' + BROWSER.data.index++;
                this._originalWrapper = wrapper;
                this.options = null;
                this.scrollx = {}; // horizional bar
                this.scrolly = {}; // vertical bar
                this._handlers = new Set(); // restore event handlers which would be removed on destroy
                this._disabledScrollHandlers = new Set();
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

            // init_bak(options) {
            //     let self = this;
            //     let el = self.el;
            //     let cw = self.containerWrapper || el;
            //     let wrapper = self.wrapper;
            //     let bar = {x: self.scrollx, y: self.scrolly};
            //     let initScroll = {
            //         scrollLeft: self.el.scrollLeft,
            //         scrollTop: self.el.scrollTop,
            //     };
            //     options = self.options = Object.assign({}, DEFAULTS, options);
            //     if (!wrapper) {
            //         // first init
            //         // render dom structure
            //         wrapper = self.wrapper = document.createElement('div');
            //         ['scroll-wrapper', util.attr(el, 'class')].join(' ').split(/\s/).forEach(className => {
            //             util.addClass(wrapper, className);
            //         });
            //         util.css(wrapper, {
            //             position: util.css(el, 'position') === 'absolute' ? 'absolute' : 'relative'
            //         });
            //         util.insertBefore(wrapper, el).appendChild(el);
            //
            //         if (options.isRTL) {
            //             util.addClass(wrapper, 'scroll--rtl')
            //         }
            //
            //         // check if textarea
            //         if (el.tagName.toLowerCase() === 'textarea') {
            //             cw = self.containerWrapper = document.createElement('div');
            //             util.insertBefore(cw, el).appendChild(el);
            //             util.addClass(wrapper, 'scroll-textarea');
            //         }
            //
            //         let css = {
            //             height: 'auto',
            //             "max-height": "",
            //             "margin-bottom": `${BROWSER.data.height * -1}px`
            //         };
            //         css[options.isRTL ? 'margin-right' : 'margin-left'] = `${BROWSER.data.width * -1}px`;
            //         util.addClass(cw, 'scroll-content');
            //         util.css(cw, css);
            //
            //         // scroll on el
            //         function scroll4el(e) {
            //             let scrollLeft = self.el.scrollLeft;
            //             let scrollTop = self.el.scrollTop;
            //             if (options.isRtl) {
            //                 // webkit   0:100
            //                 // ie/edge  100:0
            //                 // firefox -100:0
            //                 switch (true) {
            //                     case BROWSER.firefox:
            //                         scrollLeft = Math.abs(scrollLeft);
            //                     case BROWSER.msedge || BROWSER.msie:
            //                         scrollLeft = self.el.scrollWidth - self.el.clientWidth - scrollLeft;
            //                         break;
            //                 }
            //             }
            //             // onScroll handler
            //             if (typeof options.onScroll === 'function') {
            //                 options.onScroll.call(self, {
            //                     maxScroll: bar.y.maxScrollOffset,
            //                     scroll: scrollTop,
            //                     size: bar.y.size,
            //                     visible: bar.y.visible
            //                 }, {
            //                     maxScroll: bar.x.maxScrollOffset,
            //                     scroll: scrollLeft,
            //                     size: bar.x.size,
            //                     visible: bar.x.visible
            //                 });
            //             }
            //             bar.x.isVisible && (util.css(bar.x.scroll.bar, 'left', `${scrollLeft * bar.x.ratio}px`));
            //             bar.y.isVisible && (util.css(bar.y.scroll.bar, 'top', `${scrollTop * bar.y.ratio}px`));
            //         }
            //
            //         util.addEvent(el, 'scroll', scroll4el);
            //         util.storeHandlers(self, 'scroll', el, scroll4el);
            //         // prevent native scrollbars to be visible on #anchor click
            //         function scroll4wrapper(e) {
            //             wrapper.scrollTop = 0;
            //             wrapper.scrollLeft = 0;
            //         }
            //
            //         util.addEvent(wrapper, 'scroll', scroll4wrapper);
            //         util.storeHandlers(self, 'scroll', wrapper, scroll4wrapper);
            //         // if need disable body scroll
            //         if (options.disableBodyScroll) {
            //             var handleMouseScroll = function (event) {
            //                 util.isVerticalScroll(event) ?
            //                     bar.y.isVisible && bar.y.mousewheel(event) :
            //                     bar.x.isVisible && bar.x.mousewheel(event);
            //             };
            //
            //             util.addEvent(wrapper, 'MozMousePixelScroll', handleMouseScroll);
            //             util.addEvent(wrapper, 'mousewheel', handleMouseScroll);
            //             util.storeHandlers(self, 'MozMousePixelScroll', wrapper, handleMouseScroll);
            //             util.storeHandlers(self, 'mousewheel', wrapper, handleMouseScroll);
            //
            //             if (BROWSER.mobile) {
            //                 function touchstart4wrapper(e) {
            //                     let touch = e.originalEvent.touches && e.originalEvent.touches[0] || e;
            //                     let originalTouch = {
            //                         pageX: touch.pageX,
            //                         pageY: touch.pageY
            //                     };
            //                     let originalScroll = {
            //                         left: touch.scrollLeft,
            //                         top: touch.scrollTop
            //                     };
            //                     // touchmove
            //                     function touchmove4doc(e) {
            //                         let touch = e.originalEvent.touches && e.originalEvent.touches[0] || e;
            //                         el.scrollLeft = originalTouch.pageX + originalScroll.left - touch.pageX;
            //                         el.scrollTop = originalTouch.pageY + originalScroll.top - touch.pageY;
            //                         e.preventDefault();
            //                     }
            //
            //                     util.addEvent(document, 'touchmove', touchmove4doc);
            //                     // touchend
            //                     function touchend4doc(e) {
            //                         util.removeEvent(wrapper, 'touchstart', touchstart4wrapper);
            //                         util.removeEvent(document, 'touchmove', touchmove4doc);
            //                         util.removeEvent(document, 'touchend', touchend4doc);
            //                     }
            //
            //                     util.addEvent(document, 'touchend', touchend4doc);
            //                 }
            //
            //                 util.addEvent(wrapper, 'touchstart', touchstart4wrapper);
            //                 util.storeHandlers(self, 'touchstart', wrapper, touchstart4wrapper);
            //             }
            //         }
            //         if (typeof options.onInit === 'function') {
            //             options.onInit.call(this, el);
            //         }
            //     } else {
            //         // update
            //         let css = {
            //             height: 'auto',
            //             "max-height": "",
            //             "margin-bottom": `${BROWSER.data.height * -1}px`
            //         };
            //         css[options.isRTL ? 'margin-right' : 'margin-left'] = `${BROWSER.data.width * -1}px`;
            //         util.css(cw, css);
            //     }
            //     //初始化滚动条（绘制滚动条DOM结构，并计算大小）
            //     self._renderBars(bar);
            //     // reset styles
            //     self._reset4BarCSS(bar);
            //     // calc init sizes
            //     self._calcInitSize4Bars(bar);
            //     // update scrollbar visibility/dimensions
            //     self._updateScroll('x', self.scrollx);
            //     self._updateScroll('y', self.scrolly);
            //     if (typeof options.onUpdate === 'function') {
            //         options.onUpdate.apply(this, [self.el]);
            //     }
            //     // calc scrollbar size
            //     self._calcSize4Bars(bar);
            //
            //     self.el.scrollLeft = initScroll.scrollLeft;
            //     self.el.scrollTop = initScroll.scrollTop;
            //     util.trigger(self.el, 'scroll');
            // }

            _createClass(Scrollbar, [{
                key: 'init',
                value: function init(options) {
                    var self = this;
                    var el = self.el;
                    var cw = self.containerWrapper || el;
                    var wrapper = self.wrapper;
                    var bar = {x: self.scrollx, y: self.scrolly};
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
                        "max-height": "",
                        "margin-bottom": BROWSER.data.height * -1 + 'px'
                    };
                    css[options.isRTL ? 'margin-right' : 'margin-left'] = BROWSER.data.width * -1 + 'px';
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

                        util.addEvent(wrapper, 'MozMousePixelScroll', handleMouseScroll);
                        util.addEvent(wrapper, 'mousewheel', handleMouseScroll);
                        util.storeHandlers(self, 'MozMousePixelScroll', wrapper, handleMouseScroll);
                        util.storeHandlers(self, 'mousewheel', wrapper, handleMouseScroll);
                        util.storeScrollHandlers(self, 'MozMousePixelScroll', wrapper, handleMouseScroll);
                        util.storeScrollHandlers(self, 'mousewheel', wrapper, handleMouseScroll);

                        if (BROWSER.mobile) {
                            var _touchstart4wrapper = function _touchstart4wrapper(e) {
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
                                    util.removeEvent(wrapper, 'touchstart', _touchstart4wrapper);
                                    util.removeEvent(document, 'touchmove', touchmove4doc);
                                    util.removeEvent(document, 'touchend', touchend4doc);
                                }

                                util.addEvent(document, 'touchend', touchend4doc);
                            };

                            util.addEvent(wrapper, 'touchstart', _touchstart4wrapper);
                            util.storeHandlers(self, 'touchstart', wrapper, _touchstart4wrapper);
                            util.storeScrollHandlers(self, 'touchstart', wrapper, _touchstart4wrapper);
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
                    var bar = {x: self.scrollx, y: self.scrolly};
                    var initScroll = {
                        scrollLeft: self.el.scrollLeft,
                        scrollTop: self.el.scrollTop
                    };
                    var css = {
                        height: 'auto',
                        "max-height": "",
                        "margin-bottom": BROWSER.data.height * -1 + 'px'
                    };
                    css[options.isRTL ? 'margin-right' : 'margin-left'] = BROWSER.data.width * -1 + 'px';
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
                            var _touchstart4wrapper2 = function _touchstart4wrapper2(e) {
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
                                    util.removeEvent(wrapper, 'touchstart', _touchstart4wrapper2);
                                    util.removeEvent(document, 'touchmove', touchmove4doc);
                                    util.removeEvent(document, 'touchend', touchend4doc);
                                }

                                util.addEvent(document, 'touchend', touchend4doc);
                            };

                            util.addEvent(wrapper, 'touchstart', _touchstart4wrapper2);
                            util.storeHandlers(self, 'touchstart', wrapper, _touchstart4wrapper2);
                            util.storeScrollHandlers(self, 'touchstart', wrapper, _touchstart4wrapper2);
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

                    util.scrollLeft(self.el, initScroll.scrollLeft);
                    util.scrollTop(self.el, initScroll.scrollTop);
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
                    //remove listeners
                    util.removeHanlders(self);
                    delete self._handlers;
                    // restore DOM structure
                    util.insertBefore(self.el, self.wrapper);
                    util.css(self.el, {
                        "height": "",
                        "margin": "",
                        "max-height": ""
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
                                "height": AreaVisible + BROWSER.scroll.height + 'px',
                                "max-height": "none"
                            });
                        } else {
                            util.css(containerWrapper, {
                                //"height": "auto", // do not reset height value: issue with height:100%!
                                "max-height": AreaVisible + BROWSER.scroll.height + 'px'
                            });
                        }
                    }

                    if (scrollx.size != container.scrollWidth || scrolly.size != container.scrollHeight || scrollx.visible != wrapper.clientWidth || scrolly.visible != wrapper.clientHeight || scrollx.offset != (parseInt(util.css(container, 'left'), 10) || 0) || scrolly.offset != (parseInt(util.css(container, 'top'), 10) || 0)) {
                        Object.assign(this.scrollx, {
                            offset: parseInt(util.css(container, 'left'), 10) || 0,
                            size: container.scrollWidth,
                            visible: wrapper.clientWidth
                        });
                        Object.assign(this.scrolly, {
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
                    Object.keys(bar).sort().forEach(function (key) {
                        var item = bar[key];
                        var scrollClass = 'scroll-scroll' + key + '_visible';
                        var scrolly = key == "x" ? bar.y : bar.x;

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
                    Object.keys(bar).sort().forEach(function (key) {
                        var item = bar[key];
                        Object.assign(item, key == "x" ? {
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
                    Object.keys(bar).sort().forEach(function (key) {
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
                    Object.keys(bar).sort().forEach(function (key) {
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
                            if (scrollForward == 1 && currentOffset + scrollStep >= scroll2Value) currentOffset = self[offsetPos];
                            if (scrollForward == -1 && currentOffset + scrollStep <= scroll2Value) currentOffset = self[offsetPos];
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
                                if (scroll2Value < 0) scroll2Value = 0;
                                if (scroll2Value > maxScrollValue) scroll2Value = maxScrollValue;

                                self.scrollTo = self.scrollTo || {};
                                self.scrollTo[offsetPos] = scroll2Value;

                                if (self.scrollTo) {
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
                            if (event.which != 1) // lmb
                                return true;

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
                                scrollForward = util.hasClass(this, "scroll-arrow_more") ? 1 : -1;
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
                                if (key === 'x' && options.isRtl && (BROWSER.msie || BROWSER.msedge)) scrollForward = scrollForward * -1;
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
                                    //TODO use css animation
                                    // self.el[offsetPos]
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
                    var self = this;

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

        /***/
    }),
    /* 1 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _directive = __webpack_require__(2);

        var _directive2 = _interopRequireDefault(_directive);

        var _component = __webpack_require__(4);

        var _component2 = _interopRequireDefault(_component);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        exports.default = {
            install: function install(Vue, options) {
                _directive2.default.call(null, Vue, options);
                Vue.component(_component2.default.name, _component2.default);
            }
        };

        /***/
    }),
    /* 2 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = install;

        var _scrollbar = __webpack_require__(0);

        var _scrollbar2 = _interopRequireDefault(_scrollbar);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

// 指令名称
        var NAME = 'bar';

        function install(Vue, options) {
            if (new Vue().$isServer) {
                throw 'Not support SSR!';
            }
            Vue.directive(NAME, {
                bind: function bind(el, binding, vnode) {
                },
                inserted: function inserted(el, binding, vnode) {
                    var modifier = binding.modifiers;
                    var option = binding.value;
                    option = Object.assign({}, modifier, option);
                    new _scrollbar2.default(el).init(option);
                },
                update: function update(el, binding, vnode, oldVnode) {
                },
                componentUpdated: function componentUpdated(el, binding, vnode, oldVnode) {
                    var inst = el.__instance;
                    if (inst instanceof _scrollbar2.default) {
                        var modifier = binding.modifiers;
                        var option = binding.value;
                        option = Object.assign({}, modifier, option);
                        inst.update(option);
                    }
                },
                unbind: function unbind(el, binding, vnode) {
                    var inst = el.__instance;
                    inst && inst.destroy();
                }
            });
        }

        /***/
    }),
    /* 3 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        exports.default = {
            offset: function offset(el) {
                var rect = el.getBoundingClientRect(),
                    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
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
                    Object.keys(attrs).forEach(function (key) {
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
                if (el.attachEvent) el.attachEvent('on' + type, handler); else el.addEventListener(type, handler);
            },
            removeEvent: function removeEvent(el, type, handler) {
                if (el.detachEvent) el.detachEvent('on' + type, handler); else el.removeEventListener(type, handler);
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
                    var e = document.createEventObject();
                    e.eventType = type;
                    el.fireEvent('on' + e.eventType, e);
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
                if (typeof pos === 'undefined' && typeof duration === 'undefined') {
                    return el[attr];
                }
                if (typeof pos === 'undefined') {
                    throw 'Illegal argument: pos[' + pos + ']';
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
                        typeof cb === 'function' && cb(el);
                        window.cancelAnimationFrame(id);
                    }
                }

                id = window.requestAnimationFrame(fn);
            },
            scrollLeft: function scrollLeft(el, pos, cb) {
                var attr = 'scrollLeft';
                if (typeof pos === 'undefined' && typeof duration === 'undefined') {
                    return el[attr];
                }
                if (typeof pos === 'undefined') {
                    throw 'Illegal argument: pos[' + pos + ']';
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
                        typeof cb === 'function' && cb(el);
                        window.cancelAnimationFrame(id);
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
                if (typeof target === "boolean") {
                    deep = target;
                    target = arguments[1] || {};
                    // 跳过第一个参数（是否深度拷贝）和第二个参数（目标对象）
                    i = 2;
                }
                // 如果目标不是对象或函数，则初始化为空对象
                if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== "object" && typeof target !== 'function') {
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
                if (!(value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') || Object.prototype.toString.call(value) !== '[object Object]') {
                    return false;
                }
                var proto = Object.getPrototypeOf(Object(value));
                if (proto == null) {
                    return true;
                }
                var Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
                return typeof Ctor == 'function' && Ctor instanceof Ctor && Function.prototype.toString.call(Ctor) == Function.prototype.toString.call(Object);
            }
        };

        /***/
    }),
    /* 4 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {value: true});
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_component_vue__ = __webpack_require__(11);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_component_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_component_vue__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ace301da_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_component_vue__ = __webpack_require__(12);

        function injectStyle(ssrContext) {
            __webpack_require__(5)
        }

        var normalizeComponent = __webpack_require__(10);
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
            __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ace301da_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_component_vue__["a" /* default */],
            __vue_template_functional__,
            __vue_styles__,
            __vue_scopeId__,
            __vue_module_identifier__
        );

        /* harmony default export */
        __webpack_exports__["default"] = (Component.exports);


        /***/
    }),
    /* 5 */
    /***/ (function (module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
        var content = __webpack_require__(6);
        if (typeof content === 'string') content = [[module.i, content, '']];
        if (content.locals) module.exports = content.locals;
// add the styles to the DOM
        var update = __webpack_require__(8)("7d854076", content, true);

        /***/
    }),
    /* 6 */
    /***/ (function (module, exports, __webpack_require__) {

        exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
        exports.push([module.i, "", ""]);

// exports


        /***/
    }),
    /* 7 */
    /***/ (function (module, exports) {

        /*
         MIT License http://www.opensource.org/licenses/mit-license.php
         Author Tobias Koppers @sokra
         */
// css base code, injected by the css-loader
        module.exports = function (useSourceMap) {
            var list = [];

            // return the list of modules as css string
            list.toString = function toString() {
                return this.map(function (item) {
                    var content = cssWithMappingToString(item, useSourceMap);
                    if (item[2]) {
                        return "@media " + item[2] + "{" + content + "}";
                    } else {
                        return content;
                    }
                }).join("");
            };

            // import a list of modules into the list
            list.i = function (modules, mediaQuery) {
                if (typeof modules === "string")
                    modules = [[null, modules, ""]];
                var alreadyImportedModules = {};
                for (var i = 0; i < this.length; i++) {
                    var id = this[i][0];
                    if (typeof id === "number")
                        alreadyImportedModules[id] = true;
                }
                for (i = 0; i < modules.length; i++) {
                    var item = modules[i];
                    // skip already imported module
                    // this implementation is not 100% perfect for weird media query combinations
                    //  when a module is imported multiple times with different media queries.
                    //  I hope this will never occur (Hey this way we have smaller bundles)
                    if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
                        if (mediaQuery && !item[2]) {
                            item[2] = mediaQuery;
                        } else if (mediaQuery) {
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


        /***/
    }),
    /* 8 */
    /***/ (function (module, exports, __webpack_require__) {

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
                )
            }
        }

        var listToStyles = __webpack_require__(9);

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

        var stylesInDom = {
            /*
             [id: number]: {
             id: number,
             refs: number,
             parts: Array<(obj?: StyleObjectPart) => void>
             }
             */
        };

        var head = hasDocument && (document.head || document.getElementsByTagName('head')[0]);
        var singletonElement = null;
        var singletonCounter = 0;
        var isProduction = false;
        var noop = function () {
        };

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
        var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

        module.exports = function (parentId, list, _isProduction) {
            isProduction = _isProduction;

            var styles = listToStyles(parentId, list);
            addStylesToDom(styles);

            return function update(newList) {
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

        function addStylesToDom(styles /* Array<StyleObject> */) {
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
                    stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts}
                }
            }
        }

        function createStyleElement() {
            var styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            head.appendChild(styleElement);
            return styleElement
        }

        function addStyle(obj /* StyleObjectPart */) {
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

            return function updateStyle(newObj /* StyleObjectPart */) {
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

        function applyToSingletonTag(styleElement, index, remove, obj) {
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

        function applyToTag(styleElement, obj) {
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


        /***/
    }),
    /* 9 */
    /***/ (function (module, exports) {

        /**
         * Translates the list format produced by css-loader into something
         * easier to manipulate.
         */
        module.exports = function listToStyles(parentId, list) {
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
                    styles.push(newStyles[id] = {id: id, parts: [part]})
                } else {
                    newStyles[id].parts.push(part)
                }
            }
            return styles
        }


        /***/
    }),
    /* 10 */
    /***/ (function (module, exports) {

        /* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

        module.exports = function normalizeComponent(rawScriptExports,
                                                     compiledTemplate,
                                                     functionalTemplate,
                                                     injectStyles,
                                                     scopeId,
                                                     moduleIdentifier /* server only */) {
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
                    options.render = function renderWithStyleInjection(h, context) {
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


        /***/
    }),
    /* 11 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _scrollbar = __webpack_require__(0);

        var _scrollbar2 = _interopRequireDefault(_scrollbar);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        exports.default = {
            name: 'Scrollbar',
            props: {
                disableBodyScroll: {type: Boolean, default: false},
                autoScrollSize: {type: Boolean, default: true},
                autoUpdate: {type: Boolean, default: true},
                ignoreMobile: {type: Boolean, default: false},
                ignoreOverlay: {type: Boolean, default: false},
                isRtl: {type: Boolean, default: false},
                showArrows: {type: Boolean, default: false},
                stepScrolling: {type: Boolean, default: true},
                duration: {type: Number, default: 200},
                scrollStep: {type: Number, default: 30},
                onDestroy: {type: Function},
                onFallback: {type: Function},
                onInit: {type: Function},
                onScroll: {type: Function},
                onUpdate: {type: Function}
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
                        //                    onDestroy: this.onDestroy,
                        //                    onFallback: this.onFallback,
                        //                    onInit: this.onInit,
                        //                    onScroll: this.onScroll,
                        //                    onUpdate: this.onUpdate,
                    };
                    option.onScroll = function () {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                }

                        self.$emit('onScroll', args);
                    };
                    option.onUpdate = function () {
                        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            args[_key2] = arguments[_key2];
                        }

                        self.$emit('onUpdate', args);
                    };
                    option.onInit = function () {
                        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                            args[_key3] = arguments[_key3];
                        }

                        self.$emit('onInit', args);
                    };
                    option.onFallback = function () {
                        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                            args[_key4] = arguments[_key4];
                        }

                        self.$emit('onFallback', args);
                    };
                    option.onDestroy = function () {
                        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                            args[_key5] = arguments[_key5];
                        }

                        self.$emit('onDestroy', args);
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
            mounted: function mounted() {
                //            console.log('mounted', this.$slots.content[0].elm);
            },
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

        /***/
    }),
    /* 12 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c('div', [_vm._t("content"), _vm._v(" "), _vm._t("pageMap")], 2)
        };
        var staticRenderFns = [];
        var esExports = {render: render, staticRenderFns: staticRenderFns};
        /* harmony default export */
        __webpack_exports__["a"] = (esExports);

        /***/
    })
    /******/]);
