'use strict';
import Vue from 'vue';
import scroll from './scrollbars/directive.js'
import Scrollbar from './scrollbars/component.vue'
import Layout from './layout.vue'
import 'normalize.css'
import './scrollbars/css/base.css'
import './scrollbars/css/simple-outer.css'
import './scrollbars/css/simple-inner.css'

Vue.use(scroll);
Vue.component(Scrollbar.name, Scrollbar);

new Vue({
    el: '#layout',
    render: function (h) {
        return h(Layout)
    }
});
