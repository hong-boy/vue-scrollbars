'use strict';
import Scrollbar from './scrollbar';
// 指令名称
const NAME = 'bar';

export default function install(Vue, options) {
    if (new Vue().$isServer) {
        throw Error('Not support SSR!');
    }
    Vue.directive(NAME, {
        bind(el, binding, vnode) {
        },
        inserted(el, binding, vnode) {
            let modifier = binding.modifiers;
            let option = binding.value;
            option = Object.assign({}, modifier, option);
            new Scrollbar(el).init(option);
        },
        update(el, binding, vnode, oldVnode) {
        },
        componentUpdated(el, binding, vnode, oldVnode) {
            let inst = el.__instance;
            if (inst instanceof Scrollbar) {
                let modifier = binding.modifiers;
                let option = binding.value;
                option = Object.assign({}, modifier, option);
                inst.update(option);
            }
        },
        unbind(el, binding, vnode) {
            let inst = el.__instance;
            inst && inst.destroy();
        },
    });
}
