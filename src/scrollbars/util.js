'use strict';
export default {
    offset(el) {
        var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
    },
    css(el, key, value) {
        if (typeof key === 'string' && typeof value === 'undefined') {
            // get css style
            let style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
            return style[key];
        }
        // set css style
        if (typeof key === 'string') {
            el.style[key] = value;
        } else {
            let styles = key;
            for (var property in styles)
                el.style[property] = styles[property];
        }
    },
    addClass(el, className){
        if (el.classList) {
            el.classList.add(className);
        } else if (!util.hasClass(el, className)) {
            el.className += ' ' + className;
        }
    },
    hasClass(el, className){
        return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
    },
    removeClass(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        } else {
            el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
        }
    },
    addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent('on' + type, handler); else el.addEventListener(type, handler);
    },
    removeEvent(el, type, handler) {
        if (el.detachEvent) el.detachEvent('on' + type, handler); else el.removeEventListener(type, handler);
    },
    /**
     * make sure your fn only be called once during dealy period
     */
    debounce(fn, delay = 50) {
        var timer = null;
        return function (...args) {
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
    throttle(fn, threshold = 50, scope){
        let last, timer;
        return function (...args) {
            let now = Date.now();
            let ctx = scope || this;
            if (last && now < (last + threshold)) {
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
}
