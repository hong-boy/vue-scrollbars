'use strict';
import directive from './scrollbars/directive.js'
import Scrollbar from './scrollbars/component.vue'

export default {
    install(Vue, options){
        directive.call(null, Vue, options);
        Vue.component(Scrollbar.name, Scrollbar);
    }
};
