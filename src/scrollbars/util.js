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
    attr(el, name, value){
        if (typeof name === 'string' && typeof value === 'undefined') {
            // get attr
            return el.getAttribute(name)
        }
        if (typeof name === 'string') {
            el.setAttribute(name, value);
        } else {
            let attrs = name;
            Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
        }
    },
    addClass(el, className){
        if (!className) {
            return;
        }
        if (el.classList) {
            el.classList.add(className);
        } else if (!this.hasClass(el, className)) {
            el.className += ' ' + className;
        }
    },
    hasClass(el, className){
        return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
    },
    removeClass(el, className) {
        el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
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
    trigger(el, type){
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
    isVisible(el){
        let display = this.css(el, 'display');
        let visibility = this.css(el, 'visibility');
        let tagName = el.tagName.toLowerCase();
        if ((el.clientHeight == 0 && el.clientWidth == 0)
            || display === 'none'
            || visibility === 'hidden'
            || (tagName === 'input' && this.attr('type') === 'hidden')) {
            return false;
        }
        if (tagName === 'body') {
            return !((el.clientHeight == 0 && el.clientWidth == 0)
            || display === 'none'
            || visibility === 'hidden');
        }
        return this.isVisible(el.parentNode);
    },
    insertBefore(newNode, referredNode){
        let parent = referredNode.parentNode;
        return parent.insertBefore(newNode, referredNode);
    },
    cancelBubble(e){
        e.preventDefault();
        e.stopPropagation && e.stopPropagation();
        e.cancelBubble && (e.cancelBubble = true);
    }
}
