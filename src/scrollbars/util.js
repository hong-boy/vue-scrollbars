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
    },
    scrollTop(el, pos, cb){
        let attr = 'scrollTop';
        if (typeof pos === 'undefined' && typeof duration === 'undefined') {
            return el[attr];
        }
        if (typeof pos === 'undefined') {
            throw `Illegal argument: pos[${pos}]`;
        }
        let original = el[attr];
        let distance = original - pos;
        let step = distance / 15;
        let id = null;

        function fn() {
            let scrollPos = el[attr];
            el[attr] = original = (scrollPos - step);

            if ((distance > 0 && original > pos)
                || (distance < 0 && original < pos)) {
                id = window.requestAnimationFrame(fn);
            } else {
                (typeof cb === 'function') && (cb(el));
                window.cancelAnimationFrame(id);
            }
        }

        id = window.requestAnimationFrame(fn);
    },
    scrollLeft(el, pos, cb){
        let attr = 'scrollLeft';
        if (typeof pos === 'undefined' && typeof duration === 'undefined') {
            return el[attr];
        }
        if (typeof pos === 'undefined') {
            throw `Illegal argument: pos[${pos}]`;
        }
        let original = el[attr];
        let distance = original - pos;
        let step = distance / 15;
        let id = null;

        function fn() {
            let scrollPos = el[attr];
            el[attr] = original = (scrollPos - step);

            if ((distance > 0 && original > pos)
                || (distance < 0 && original < pos)) {
                id = window.requestAnimationFrame(fn);
            } else {
                (typeof cb === 'function') && (cb(el));
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
    extend(){
        let options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {}, // 目标对象
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
        if (typeof target !== "object" && typeof target !== 'function') {
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
                    if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)) )) {
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
    isPlainObject(value){
        if (!(value != null && typeof value === 'object') || (Object.prototype.toString.call(value) !== '[object Object]')) {
            return false;
        }
        let proto = Object.getPrototypeOf(Object(value));
        if (proto == null) {
            return true;
        }
        var Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
        return typeof Ctor == 'function' && Ctor instanceof Ctor &&
            Function.prototype.toString.call(Ctor) == Function.prototype.toString.call(Object);
    },
}
