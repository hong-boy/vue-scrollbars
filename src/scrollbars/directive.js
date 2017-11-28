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
    isVerticalScroll(event) {
        var e = event.originalEvent;
        if (e.axis && e.axis === e.HORIZONTAL_AXIS)
            return false;
        if (e.wheelDeltaX)
            return false;
        return true;
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
        let initScroll = {
            scrollLeft: self.el.scrollLeft,
            scrollTop: self.el.scrollTop,
        };
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
        // reset styles
        self._reset4BarCSS(bar);
        // calc init sizes
        self._calcInitSize4Bars(bar);
        // update scrollbar visibility/dimensions
        self._updateScroll('x', self.scrollx);
        self._updateScroll('y', self.scrolly);
        if (typeof options.onUpdate === 'function') {
            options.onUpdate.apply(this, [self.el]);
        }
        // calc scrollbar size
        self._calcSize4Bars(bar);

        self.el.scrollLeft = initScroll.scrollLeft;
        self.el.scrollTop = initScroll.scrollTop;
        util.trigger(self.el, 'scroll');
    }

    destroy() {
    }

    _updateScroll(d, scrollx) {
        var container = this.el,
            containerWrapper = this.containerWrapper || container,
            scrollClass = 'scroll-scroll' + d + '_visible',
            scrolly = (d === 'x') ? this.scrolly : this.scrollx,
            offset = parseInt(util.css(this.container, (d === 'x') ? 'left' : 'top'), 10) || 0,
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
                offset: parseInt(container.css('top'), 10) || 0,
                size: this.container.scrollHeight,
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
            util.removeClass(self.containerWrapper, scrollClass);
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
            var cssFullSize = (key === 'x') ? 'offsetWidth' : 'offsetHeight';
            var cssSize = (key === 'x') ? 'clientWidth' : 'clientHeight';
            var offset = parseInt(util.css(self.el, cssOffset), 10) || 0;

            var AreaSize = item.size;
            var AreaVisible = item.visible + offset;

            var scrollSize = item.scroll.size[cssFullSize] + (parseInt(util.css(item.scroll.size, cssOffset), 10) || 0);

            if (self.options.autoScrollSize) {
                item.scrollbarSize = parseInt(scrollSize * AreaVisible / AreaSize, 10);
                item.scroll.bar[cssSize] = item.scrollbarSize; //.css(cssSize, item.scrollbarSize + 'px');
            }

            item.scrollbarSize = item.scroll.bar[cssFullSize];
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
            let offsetPos = key === 'x' ? 'offsetLeft' : 'offsetTop';
            let scrollTo = function () {
                var currentOffset = self.el[offsetPos]();
                self.el[offsetPos](currentOffset + scrollStep);
                if (scrollForward == 1 && (currentOffset + scrollStep) >= scroll2Value)
                    currentOffset = self[offsetPos]();
                if (scrollForward == -1 && (currentOffset + scrollStep) <= scroll2Value)
                    currentOffset = self[offsetPos]();
                if (self[offsetPos]() == currentOffset && scrollCallback) {
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
                    bar.x.mousewheel(e);
                    return;
                }
                let delta = e.originalEvent.wheelDelta * -1 || e.originalEvent.detail;
                let maxScrollValue = item.size - item.visible - item.offset;
                // fix new mozilla
                if (!delta) {
                    if (key === 'x' && !!e.originalEvent.deltaX) {
                        delta = e.originalEvent.deltaX * 40;
                    } else if (key === 'y' && !!e.originalEvent.deltaY) {
                        delta = e.originalEvent.deltaY * 40;
                    }
                }

                if ((delta > 0 && scroll2Value < maxScrollValue) || (delta < 0 && scroll2Value > 0)) {
                    scroll2Value = scroll2Value + delta;
                    if (scroll2Value < 0)
                        scroll2Value = 0;
                    if (scroll2Value > maxScrollValue)
                        scroll2Value = maxScrollValue;

                    self.scrollTo = self.scrollTo || {};
                    self.scrollTo[offsetPos] = scroll2Value;
                    window.requestAnimationFrame(function () {
                        if (self.scrollTo) {
                            //TODO use css animation
                            self.el[offsetPos] = self.scrollTo;
                            scroll2Value = self.scrollTo;
                            self.scrollTo = null;
                        }
                    });
                }

                e.preventDefault();
                e.stopPropagation && e.stopPropagation();
                e.cancelBubble && e.cancelBubble();
            };

            util.addEvent(item.scroll, 'wheel', item.mousewheel);
            util.storeHandlers(self, 'wheel', item.scroll, item.mousewheel);
            util.addEvent(item.scroll, 'mouseenter', item.mousewheel);
            util.storeHandlers(self, 'mouseenter', item.scroll, item.mousewheel);

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
                    scroll2Value = self.el[offsetPos]() + (scroll2Value / item.ratio);
                }

                self.scrollTo = self.scrollTo || {};
                self.scrollTo[offsetPos] = options.stepScrolling ? self.el[offsetPos]() + scrollStep : scroll2Value;

                if (options.stepScrolling) {
                    scrollCallback = function () {
                        scroll2Value = self.el[offsetPos]();
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
        util.addEvent(document, 'blur', function blur4doc(e) {
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


        util.addEvent(document, 'mouseup', function blur4doc(e) {
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
        event.stopPropagation && event.stopPropagation();
        event.cancelBubble && event.cancelBubble();
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
