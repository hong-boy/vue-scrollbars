'use strict';
import common from './util'

// 指令名称
const NAME = 'bar';

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

        let fragment = docuemnt.createDocumentFragment();
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

        fragment.appendChild(el);
        return fragment;
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
        let fragment = docuemnt.createDocumentFragment();
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

        fragment.appendChild(el);
        return fragment;
    }
};

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
    scrolls: [], // restore mutiple instance of Scrollbar
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
        var scrollSize = getBrowserScrollSize(true);
        return !(scrollSize.height || scrollSize.width);
    },
    storeHandlers(inst, eventName, element, handler){
        inst._handlers.set(eventName, {element: element, handler: handler});
    }
});

class Scrollbar {
    constructor(el) {
        if (!BROWSER.scroll) {
            BROWSER.overlay = util.isScrollOverlaysContent();
            BROWSER.scroll = util.getBrowserScrollSize();
            // monit scrollbar size changed
            updateScrollbars();
            // add global resize listener
            util.addEvent(window, 'resize', util.throttle(function (e) {
                let force = false;
                if (BROWSER.scroll && (BROWSER.scroll.height || BROWSER.scroll.width)) {
                    let currentScroll = util.getBrowserScrollSize();
                    if (currentScroll.height != BROWSER.scroll.height || currentScroll.width != BROWSER.scroll.width) {
                        force = true;
                        BROWSER.scroll = currentScroll;
                    }
                }
                updateScrollbars(force);
            }));

        }
        this.el = el;
        this.ns = `.scrollbar_${BROWSER.data.index++}`;
        this.options = null;
        this.scrollx = {}; // horizional bar
        this.scrolly = {}; // vertical bar
        this._handlers = new Map(); // restore event handlers which would be removed on destroy
        el.__instance = this;
        BROWSER.scrolls.push(this);
    }

    init(options) {
        let self = this;
        let el = self.el;
        let cw = self.containerWrapper || el;
        let wrapper = self.wrapper;
        options = self.options = Object.assign({}, DEFAULTS, options);
        if (!wrapper) {
            // first init
            // render dom structure
            let wrapper = document.createElement('div');
            util.addClass(wrapper, `scroll-wrapper ${el.getAttribute('class')}`);
            util.css(wrapper, {
                position: util.css(el, 'position') === 'absolute' ? 'absolute' : 'relative'
            });
            wrapper.insertBefore(el).appendChild(el);

            if (options.isRTL) {
                util.addClass(wrapper, 'scroll--rtl')
            }

            // check if textarea
            if (el.tagName.toLowerCase() === 'textarea') {
                cw = self.containerWrapper = document.createElement('div');
                cw.insertBefore(el).appendChild(el);
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
            util.addEvent(el, 'scroll', function scroll4el(e) {
                //TODO 控制滚动条滑块滚动
            });
            util.storeHandlers(self, 'scroll', el, scroll4el);
            // prevent native scrollbars to be visible on #anchor click
            util.addEvent(wrapper, 'scroll', function scroll4wrapper(e) {
                wrapper.scrollTop = 0;
                wrapper.scrollLeft = 0;
            });
            util.storeHandlers(self, 'scroll', wrapper, scroll4wrapper);
            // if need disable body scroll
            if (options.disableBodyScroll) {
                //TODO
                if (browser.mobile) {
                    util.addEvent(wrapper, 'touchstart', function touchstart4wrapper(e) {
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
                        util.addEvent(document, 'touchmove', function touchmove4doc(e) {
                            let touch = e.originalEvent.touches && e.originalEvent.touches[0] || e;
                            el.scrollLeft = originalTouch.pageX + originalScroll.left - touch.pageX;
                            el.scrollTop = originalTouch.pageY + originalScroll.top - touch.pageY;
                            e.preventDefault();
                        });
                        // touchend
                        util.addEvent(document, 'touchend', function touchend4doc(e) {
                            util.removeEvent(wrapper, 'touchstart', touchstart4wrapper);
                            util.removeEvent(document, 'touchmove', touchmove4doc);
                            util.removeEvent(document, 'touchend', touchend4doc);
                        })
                    });
                }
            }
            if (typeof options.onInit === 'function') {
                options.onInit.call(this, el);
            }
        } else {
            // update
            let css = {
                height: 'auto',
                "max-height": "",
                "margin-bottom": `${BROWSER.data.height * -1}px`
            };
            css[options.isRTL ? 'margin-right' : 'margin-left'] = `${BROWSER.data.width * -1}px`;
            util.css(cw, css);
        }
        //初始化滚动条（绘制滚动条DOM结构，并计算大小）
        let bar = {x: self.scrollx, y: self.scrolly};
        self._renderBars(bar);
    }

    destroy() {
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
            let scroll2Value = 0;
            let offsetPos = key === 'x' ? 'offsetLeft' : 'offsetTop';
            let scroll = item.scroll = self._getBar(options[`scroll${key}`]);
            util.addClass(scroll, `scroll-${key}`);

            if (options.showArrows) {
                util.addClass(scroll, 'scroll-element_arrows_visible');
            }

            item.mousewheel = function (e) {

            };

            util.addEvent(item.scroll, 'wheel', item.mousewheel);
            util.storeHandlers(self, 'wheel', item.scroll, item.mousewheel);
            util.addEvent(item.scroll, 'mouseenter', item.mousewheel);
            util.storeHandlers(self, 'mouseenter', item.scroll, item.mousewheel);

            // For .scroll-arrow and .scroll-element_track click
            let mousedown = function (e) {
                //TODO
            };
            util.addEvent(item.scroll.querySelector('.scroll-arrow'), 'mousedown', mousedown);
            util.storeHandlers(self, 'mousedown', item.scroll.querySelector('.scroll-arrow'), mousedown);
            util.addEvent(item.scroll.querySelector('.scroll-element_track'), 'mousedown', mousedown);
            util.storeHandlers(self, 'mousedown', item.scroll.querySelector('.scroll-element_track'), mousedown);

            // handle scrollbar drag'n'drop
            util.addEvent(item.scroll.bar, 'mousedown', function mousedown4bar(e) {
                if (e.which != 1) {
                    return;
                }
                let pos = e[key === 'x' ? 'pageX' : 'pageY'];
                let init4offset = self.el[offsetPos];
                util.addClass(item.scroll, 'scroll-draggable');

                util.addEvent(document, 'mousemove', function mousemove4doc(e) {
                    let diff = parseInt((e[key === 'x' ? 'pageX' : 'pageY'] - pos) / item.ratio, 10);
                    if (key === 'x' && options.isRtl && (BROWSER.msie || BROWSER.msedge)) {
                        diff = diff * -1;
                    }
                    self.el[offsetPos] = init4offset + diff;
                });
                util.storeHandlers(self, 'mousemove', document, mousemove4doc);

                self._handleMouseDown(function () {
                    util.removeClass(item.scroll, 'scroll-draggable');
                    scroll2Value = self.el[offsetPos];
                }, e);
            });
            util.storeHandlers(self, 'mousedown', item.scroll.bar, mousedown4bar);
        });
    }

    _getBar(type) {
        let tpl = BAR_TYPES[type];
        if (!tpl) {
            tpl = BAR_TYPES['simple'];
        }
        this.wrapper.appendChild(tpl);
        Object.assign(tpl, {
            bar: tpl.querySelector('.scroll-bar'),
            size: tpl.querySelector('.scroll-element_size'),
            track: tpl.querySelector('.scroll-element_track')
        });
        return tpl;
    }

    _handleMouseDown(callback, event) {
        let self = this;
        util.addEvent(document, 'blur', function blur4doc() {
            let body = document.querySelector('body');
            util.removeEvent(document, 'blur', blur4doc);
            util.removeEvent(document, 'dragstart', dragstart4doc);
            util.removeEvent(body, 'selectstart', selectstart4doc);
            callback && callback();
        });
        // util.storeHandlers(self, 'blur', document, blur4doc);


        util.addEvent(document, 'dragstart', function dragstart4doc(e) {
            e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            e.cancelBubble && e.cancelBubble();
        });
        // util.storeHandlers(self, 'dragstart', document, dragstart4doc);


        util.addEvent(document, 'mouseup', function blur4doc() {
            let body = document.querySelector('body');
            util.removeEvent(document, 'blur', blur4doc);
            util.removeEvent(document, 'dragstart', dragstart4doc);
            util.removeEvent(body, 'selectstart', selectstart4doc);
            callback && callback();
        });

        util.addEvent(document.querySelector('body'), 'selectstart', function selectstart4doc(e) {
            e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            e.cancelBubble && e.cancelBubble();
        });
        // util.storeHandlers(self, 'selectstart', document.querySelector('body'), selectstart4doc);

        event && event.preventDefault();
        e.stopPropagation && e.stopPropagation();
        e.cancelBubble && e.cancelBubble();
    }
}

/**
 * Check if scroll content/container size is changed
 */
let updateScrollbars = (function () {
    let timer = null;
    let counter = 0;
    return function (force) {
        //TODO
    };
})();

// expose to Vue.use()
export default function install() {
    if (new Vue().$isServer) {
        throw 'Not support SSR!'
    }
    Vue.directive(NAME, {
        bind (el, binding, vnode) {
        },
        inserted (el, binding, vnode) {
        },
        update (el, binding, vnode, oldVnode) {
        },
        componentUpdated (el, binding, vnode, oldVnode) {
        },
        unbind (el, binding, vnode) {
        }
    });
};
