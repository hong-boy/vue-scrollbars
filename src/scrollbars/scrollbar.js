import common from './util'

const BROWSER = {
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

const DEFAULTS = {
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
    onUpdate: null  //callback function on init/resize (before scrollbar size calculation
};

const BAR_TYPES = {
    advanced: function () {
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

        let el = document.createElement('div');
        util.addClass(el, 'scroll-element');

        let el4corner = document.createElement('div');
        util.addClass(el4corner, 'scroll-element_corner');
        let el4arrowless = document.createElement('div');
        util.addClass(el4arrowless, 'scroll-arrow scroll-element-arrow_less');
        let el4arrowmore = document.createElement('div');
        util.addClass(el4arrowmore, 'scroll-arrow scroll-element-arrow_more');
        let el4outer = document.createElement('div');
        util.addClass(el4outer, 'scroll-element_outer');
        let el4size = document.createElement('div');
        util.addClass(el4size, 'scroll-element_size');

        let el4innerwrapper = document.createElement('div');
        util.addClass(el4innerwrapper, 'scroll-element-inner_wrapper');
        let el4inner = document.createElement('div');
        util.addClass(el4inner, 'scroll-element-inner scroll-element_track');
        let el4innerbottom = document.createElement('div');
        util.addClass(el4innerbottom, 'scroll-element-inner_bottom');

        let el4bar = document.createElement('div');
        util.addClass(el4bar, 'scroll-element-bar');
        let el4barbody = document.createElement('div');
        util.addClass(el4barbody, 'scroll-element-bar_body');
        let el4barbodyinner = document.createElement('div');
        util.addClass(el4barbodyinner, 'scroll-element-bar_body-inner');

        let el4bottom = document.createElement('div');
        util.addClass(el4bottom, 'scroll-element-bottom');
        let el4center = document.createElement('div');
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
    simple: function () {
        // [
        //     '<div class="scroll-element">',
        //     '<div class="scroll-element_outer">',
        //     '<div class="scroll-element_size"></div>', // required! used for scrollbar size calculation !
        //     '<div class="scroll-element_track"></div>', // used for handling scrollbar click
        //     '<div class="scroll-bar"></div>', // required
        //     '</div>',
        //     '</div>'
        // ].join('')
        let el = document.createElement('div');
        util.addClass(el, 'scroll-element');
        let el4outer = document.createElement('div');
        util.addClass(el4outer, 'scroll-element_outer');
        let el4size = document.createElement('div');
        util.addClass(el4size, 'scroll-element_size');
        let el4track = document.createElement('div');
        util.addClass(el4track, 'scroll-element_track');
        let el4bar = document.createElement('div');
        util.addClass(el4bar, 'scroll-bar');

        el.appendChild(el4outer);
        el4outer.appendChild(el4size);
        el4outer.appendChild(el4track);
        el4outer.appendChild(el4bar);

        return el;
    }
};

let util = Object.assign(common, {
    /* ADDITIONAL FUNCTIONS */
    /**
     * Get native browser scrollbar size (height/width)
     *
     * @param {Boolean} actual size or CSS size, default - CSS size
     * @returns {Object} with height, width
     */
    getBrowserScrollSize(actualSize) {

        if (BROWSER.webkit && !actualSize) {
            return {
                height: 0,
                width: 0
            };
        }

        if (!BROWSER.data.outer) {
            let css = {
                "border": "none",
                "box-sizing": "content-box",
                "height": "200px",
                "margin": "0",
                "padding": "0",
                "width": "200px"
            };
            BROWSER.data.inner = document.createElement('div');
            util.css(BROWSER.data.inner, css);
            let outerCSS = Object.assign({
                "left": "-1000px",
                "overflow": "scroll",
                "position": "absolute",
                "top": "-1000px"
            }, css);
            BROWSER.data.outer = document.createElement('div');
            util.css(BROWSER.data.outer, outerCSS);
            BROWSER.data.outer.appendChild(BROWSER.data.inner);
            BROWSER.body = BROWSER.body || document.querySelector('body');
            BROWSER.body.appendChild(BROWSER.data.outer);
        }

        BROWSER.data.outer.scrollLeft = 1000;
        BROWSER.data.outer.scrollTop = 1000;

        let offsetInner = util.offset(BROWSER.data.inner);
        let offsetOuter = util.offset(BROWSER.data.outer);

        return {
            height: Math.ceil((offsetOuter.top - offsetInner.top) || 0),
            width: Math.ceil((offsetOuter.left - offsetInner.left) || 0)
        };
    },
    /**
     * Check if native browser scrollbars overlay content
     *
     * @returns {Boolean}
     */
    isScrollOverlaysContent(){
        var scrollSize = this.getBrowserScrollSize(true);
        return !(scrollSize.height || scrollSize.width);
    },
    isVerticalScroll(event) {
        var e = event;
        if (e.axis && e.axis === e.HORIZONTAL_AXIS)
            return false;
        if (e.wheelDeltaX)
            return false;
        return true;
    },
    storeHandlers(inst, eventName, element, handler){
        inst._handlers.add({eventName, element, handler});
    },
    removeHanlders(inst){
        inst._handlers.forEach(bean => {
            util.removeEvent(bean.element, bean.eventName, bean.handler);
        });
    },
    storeScrollHandlers(inst, eventName, element, handler){
        inst._disabledScrollHandlers.add({eventName, element, handler});
    },
    removeScrollHanlders(inst){
        inst._disabledScrollHandlers.forEach(bean => {
            util.removeEvent(bean.element, bean.eventName, bean.handler);
        });
    },
});

/**
 * Check if scroll content/container size is changed
 */
let updateScrollbars = (function () {
    let timer = null;
    return function (force) {
        BROWSER.scrolls.forEach(inst => {
            let options = inst.options;
            let el = inst.el;
            let wrapper = inst.wrapper;
            let scrollx = inst.scrollx;
            let scrolly = inst.scrolly;
            if (force || (options.autoUpdate && wrapper
                && util.isVisible(wrapper)
                && (el.scrollWidth != scrollx.size
                    || el.scrollHeight != scrolly.size
                    || wrapper.clientWidth != scrollx.visible
                    || wrapper.clientHeight != scrolly.visible
                ))) {
                inst.update();
            }
        });
        clearTimeout(timer);
        timer = setTimeout(updateScrollbars, 300);
    };
})();

export default class Scrollbar {
    constructor(el, wrapper) {
        this.el = this.container = el;
        this.ns = `.scrollbar_${BROWSER.data.index++}`;
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
            let resize = util.throttle(function (e) {
                let force = false;
                if (BROWSER.scroll && (BROWSER.scroll.height || BROWSER.scroll.width)) {
                    let currentScroll = util.getBrowserScrollSize();
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

    init(options) {
        let self = this;
        let el = self.el;
        let cw = self.containerWrapper || el;
        let wrapper = self.wrapper;
        let bar = {x: self.scrollx, y: self.scrolly};
        let initScroll = {
            scrollLeft: self.el.scrollLeft,
            scrollTop: self.el.scrollTop,
        };
        options = self.options = util.extend(true, {}, DEFAULTS, options);
        // first init
        // render dom structure
        wrapper = self.wrapper = self._originalWrapper || document.createElement('div');
        ['scroll-wrapper', util.attr(el, 'class')].join(' ').split(/\s/).forEach(className => util.addClass(wrapper, className));
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

        let css = {
            height: 'auto',
            "max-height": "",
            "margin-bottom": `${BROWSER.data.height * -1}px`
        };
        css[options.isRTL ? 'margin-right' : 'margin-left'] = `${BROWSER.data.width * -1}px`;
        util.addClass(cw, 'scroll-content');
        util.css(cw, css);

        // scroll on el
        function scroll4el(e) {
            let scrollLeft = self.el.scrollLeft;
            let scrollTop = self.el.scrollTop;
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
            bar.x.isVisible && (util.css(bar.x.scroll.bar, 'left', `${scrollLeft * bar.x.ratio}px`));
            bar.y.isVisible && (util.css(bar.y.scroll.bar, 'top', `${scrollTop * bar.y.ratio}px`));
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
            var handleMouseScroll = function (event) {
                util.isVerticalScroll(event) ?
                    bar.y.isVisible && bar.y.mousewheel(event) :
                    bar.x.isVisible && bar.x.mousewheel(event);
            };

            util.addEvent(wrapper, 'MozMousePixelScroll', handleMouseScroll);
            util.addEvent(wrapper, 'mousewheel', handleMouseScroll);
            util.storeHandlers(self, 'MozMousePixelScroll', wrapper, handleMouseScroll);
            util.storeHandlers(self, 'mousewheel', wrapper, handleMouseScroll);
            util.storeScrollHandlers(self, 'MozMousePixelScroll', wrapper, handleMouseScroll);
            util.storeScrollHandlers(self, 'mousewheel', wrapper, handleMouseScroll);

            if (BROWSER.mobile) {
                function touchstart4wrapper(e) {
                    let touch = e.originalEvent.touches && e.originalEvent.touches[0] || e;
                    let originalTouch = {
                        pageX: touch.pageX,
                        pageY: touch.pageY
                    };
                    let originalScroll = {
                        left: touch.scrollLeft,
                        top: touch.scrollTop
                    };
                    // touchmove
                    function touchmove4doc(e) {
                        let touch = e.originalEvent.touches && e.originalEvent.touches[0] || e;
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
                }

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

    update(options) {
        let self = this;
        let original = self.options;
        options = self.options = util.extend(true, {}, original, options);
        let bar = {x: self.scrollx, y: self.scrolly};
        let initScroll = {
            scrollLeft: self.el.scrollLeft,
            scrollTop: self.el.scrollTop,
        };
        let css = {
            height: 'auto',
            "max-height": "",
            "margin-bottom": `${BROWSER.data.height * -1}px`
        };
        css[options.isRTL ? 'margin-right' : 'margin-left'] = `${BROWSER.data.width * -1}px`;
        util.css(self.containerWrapper || self.el, css);

        // if need disable body scroll
        if (options.disableBodyScroll && !original.disableBodyScroll) {
            // add listener
            let wrapper = self.wrapper;
            var handleMouseScroll = function (event) {
                util.isVerticalScroll(event) ?
                    bar.y.isVisible && bar.y.mousewheel(event) :
                    bar.x.isVisible && bar.x.mousewheel(event);
            };

            util.addEvent(wrapper, 'MozMousePixelScroll', handleMouseScroll);
            util.addEvent(wrapper, 'mousewheel', handleMouseScroll);
            util.storeHandlers(self, 'MozMousePixelScroll', wrapper, handleMouseScroll);
            util.storeHandlers(self, 'mousewheel', wrapper, handleMouseScroll);
            util.storeScrollHandlers(self, 'MozMousePixelScroll', wrapper, handleMouseScroll);
            util.storeScrollHandlers(self, 'mousewheel', wrapper, handleMouseScroll);

            if (BROWSER.mobile) {
                function touchstart4wrapper(e) {
                    let touch = e.originalEvent.touches && e.originalEvent.touches[0] || e;
                    let originalTouch = {
                        pageX: touch.pageX,
                        pageY: touch.pageY
                    };
                    let originalScroll = {
                        left: touch.scrollLeft,
                        top: touch.scrollTop
                    };
                    // touchmove
                    function touchmove4doc(e) {
                        let touch = e.originalEvent.touches && e.originalEvent.touches[0] || e;
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
                }

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

        util.scrollLeft(self.el, initScroll.scrollLeft);
        util.scrollTop(self.el, initScroll.scrollTop);
        util.trigger(self.el, 'scroll');
    }

    destroy() {
        let self = this;
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
        'scroll-content scroll-scrollx_visible scroll-scrolly_visible'.split(/\s/).forEach(className => {
            util.removeClass(self.el, className)
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

    _updateScroll(d, scrollx) {
        var container = this.el,
            containerWrapper = this.containerWrapper || container,
            scrollClass = 'scroll-scroll' + d + '_visible',
            scrolly = (d === 'x') ? this.scrolly : this.scrollx,
            offset = parseInt(util.css(container, (d === 'x') ? 'left' : 'top'), 10) || 0,
            wrapper = this.wrapper;

        var AreaSize = scrollx.size;
        var AreaVisible = scrollx.visible + offset;

        scrollx.isVisible = (AreaSize - AreaVisible) > 1; // bug in IE9/11 with 1px diff
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
                    "height": (AreaVisible + BROWSER.scroll.height) + 'px',
                    "max-height": "none"
                });
            } else {
                util.css(containerWrapper, {
                    //"height": "auto", // do not reset height value: issue with height:100%!
                    "max-height": (AreaVisible + BROWSER.scroll.height) + 'px'
                });
            }
        }

        if (scrollx.size != container.scrollWidth
            || scrolly.size != container.scrollHeight
            || scrollx.visible != wrapper.clientWidth
            || scrolly.visible != wrapper.clientHeight
            || scrollx.offset != (parseInt(util.css(container, 'left'), 10) || 0)
            || scrolly.offset != (parseInt(util.css(container, 'top'), 10) || 0)
        ) {
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

    _reset4BarCSS(bar) {
        let self = this;
        // remove classes & reset applied styles
        Object.keys(bar).sort().forEach(function (key) {
            let item = bar[key];
            var scrollClass = 'scroll-scroll' + key + '_visible';
            var scrolly = (key == "x") ? bar.y : bar.x;

            util.removeClass(item.scroll, scrollClass);
            util.removeClass(scrolly.scroll, scrollClass);
            util.removeClass(self.containerWrapper || self.el, scrollClass);
        });
    }

    _calcInitSize4Bars(bar) {
        // remove classes & reset applied styles
        let self = this;
        Object.keys(bar).sort().forEach(function (key) {
            let item = bar[key];
            Object.assign(item, (key == "x") ? {
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

    _calcSize4Bars(bar) {
        // calculate scroll size
        let self = this;
        Object.keys(bar).sort().forEach(function (key) {
            let item = bar[key];
            var cssOffset = (key === 'x') ? 'left' : 'top';
            var cssFullSize = (key === 'x') ? 'width' : 'height';
            var cssSize = (key === 'x') ? 'width' : 'height';
            var offset = parseInt(util.css(self.el, cssOffset), 10) || 0;

            var AreaSize = item.size;
            var AreaVisible = item.visible + offset;

            var scrollSize = parseInt(util.css(item.scroll.size, cssFullSize), 10) + (parseInt(util.css(item.scroll.size, cssOffset), 10) || 0);

            if (self.options.autoScrollSize) {
                item.scrollbarSize = parseInt(scrollSize * AreaVisible / AreaSize, 10);
                util.css(item.scroll.bar, cssSize, `${item.scrollbarSize}px`);
            }

            item.scrollbarSize = parseInt(util.css(item.scroll.bar, cssFullSize), 10);
            item.ratio = ((scrollSize - item.scrollbarSize) / (AreaSize - AreaVisible)) || 1;
            item.maxScrollOffset = AreaSize - AreaVisible;
        });
    }

    /**
     * 初始化滚动条
     * @param bar
     * @private
     */
    _renderBars(bar) {
        let self = this;
        let options = self.options;
        Object.keys(bar).sort().forEach(key => {
            let item = bar[key];
            if (item.scroll) {
                // rendered already
                return;
            }
            // first init
            let scrollCallback = null;
            let scroll2Value = 0;
            let scrollForward = 1;
            let scrollStep = options.scrollStep;
            let offsetPos = key === 'x' ? 'scrollLeft' : 'scrollTop';
            let scrollTo = function () {
                var currentOffset = self.el[offsetPos];
                self.el[offsetPos] = (currentOffset + scrollStep);
                if (scrollForward == 1 && (currentOffset + scrollStep) >= scroll2Value)
                    currentOffset = self[offsetPos];
                if (scrollForward == -1 && (currentOffset + scrollStep) <= scroll2Value)
                    currentOffset = self[offsetPos];
                if (self.el[offsetPos] == currentOffset && scrollCallback) {
                    scrollCallback();
                }
            };

            let scroll = item.scroll = self._getBar(options[`scroll${key}`]);
            util.addClass(scroll, `scroll-${key}`);

            if (options.showArrows) {
                util.addClass(scroll, 'scroll-element_arrows_visible');
            }

            item.mousewheel = function (e) {
                if (!item.isVisible || (key === 'x' && util.isVerticalScroll(e))) {
                    return true;
                }
                if (key === 'y' && !util.isVerticalScroll(e)) {
                    bar.x.mousewheel(e);
                    return;
                }
                let delta = e.wheelDelta * -1 || e.detail;
                let maxScrollValue = item.size - item.visible - item.offset;
                // fix new mozilla
                if (!delta) {
                    if (key === 'x' && !!e.deltaX) {
                        delta = e.deltaX * 40;
                    } else if (key === 'y' && !!e.deltaY) {
                        delta = e.deltaY * 40;
                    }
                }

                if ((delta > 0 && scroll2Value < maxScrollValue)
                    || (delta < 0 && scroll2Value > 0)) {
                    scroll2Value = scroll2Value + delta;
                    if (scroll2Value < 0)
                        scroll2Value = 0;
                    if (scroll2Value > maxScrollValue)
                        scroll2Value = maxScrollValue;

                    self.scrollTo = self.scrollTo || {};
                    self.scrollTo[offsetPos] = scroll2Value;

                    if (self.scrollTo) {
                        util[offsetPos].call(util, self.el, self.scrollTo[offsetPos], function () {
                            scroll2Value = self.el[offsetPos];
                            self.scrollTo = null;
                        })
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
            let mousedown = function (event) {
                if (event.which != 1) // lmb
                    return true;

                scrollForward = 1;
                var data = {
                    eventOffset: event[(key === 'x') ? 'pageX' : 'pageY'],
                    maxScrollValue: item.size - item.visible - item.offset,
                    scrollbarOffset: util.offset(item.scroll.bar)[(key === 'x') ? 'left' : 'top'],
                    scrollbarSize: item.scroll.bar[(key === 'x') ? 'offsetWidth' : 'offsetHeight']
                };
                var timeout = 0, timer = 0;

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
                    scrollForward = (data.eventOffset > (data.scrollbarOffset + data.scrollbarSize) ? 1
                        : (data.eventOffset < data.scrollbarOffset ? -1 : 0));
                    if (key === 'x' && options.isRtl && (BROWSER.msie || BROWSER.msedge))
                        scrollForward = scrollForward * -1;
                    scrollStep = Math.round(item.visible * 0.75) * scrollForward;
                    scroll2Value = (data.eventOffset - data.scrollbarOffset -
                    (options.stepScrolling ? (scrollForward == 1 ? data.scrollbarSize : 0)
                        : Math.round(data.scrollbarSize / 2)));
                    scroll2Value = self.el[offsetPos] + (scroll2Value / item.ratio);
                }

                self.scrollTo = self.scrollTo || {};
                self.scrollTo[offsetPos] = options.stepScrolling ? self.el[offsetPos] + scrollStep : scroll2Value;

                if (options.stepScrolling) {
                    scrollCallback = function () {
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
            let el4scrollarrow = item.scroll.querySelector('.scroll-arrow');
            el4scrollarrow && util.addEvent(el4scrollarrow, 'mousedown', mousedown);
            el4scrollarrow && util.storeHandlers(self, 'mousedown', el4scrollarrow, mousedown);
            util.addEvent(item.scroll.querySelector('.scroll-element_track'), 'mousedown', mousedown);
            util.storeHandlers(self, 'mousedown', item.scroll.querySelector('.scroll-element_track'), mousedown);

            // handle scrollbar drag'n'drop
            function mousedown4bar(e) {
                if (e.which != 1) {
                    return;
                }
                let pos = e[key === 'x' ? 'pageX' : 'pageY'];
                let init4offset = self.el[offsetPos];
                util.addClass(item.scroll, 'scroll-draggable');
                function mousemove4doc(e) {
                    let diff = parseInt((e[key === 'x' ? 'pageX' : 'pageY'] - pos) / item.ratio, 10);
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

    _getBar(type) {
        let tpl = null;
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

    _handleMouseDown(callback, event, eventHandler) {
        let self = this;

        function blur4doc(e) {
            let body = document.querySelector('body');
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
}
