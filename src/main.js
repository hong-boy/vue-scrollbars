'use strict';
import Vue from 'vue';
import scroll from './scrollbars/directive.js';
import Scrollbar from './scrollbars/component.vue';
// import Bar from '../dist/bundle.js'
import Layout from './layout.vue';
import 'normalize.css';
import './scrollbars/css/base.css';
import './scrollbars/css/dynamic.css';
import './scrollbars/css/simple-outer.css';
import './scrollbars/css/simple-inner.css';
import './scrollbars/css/page-map.css';

Vue.use(scroll);
Vue.component(Scrollbar.name, Scrollbar);
// Vue.use(Bar);

new Vue({
    el: '#layout',
    render(h) {
        return h(Layout);
    },
});
