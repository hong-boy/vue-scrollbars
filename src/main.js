'use strict';
import Vue from 'vue';
import $ from 'jquery';
import scroll from './scrollbars/directive.js'
import Layout from './layout.vue'
import 'normalize.css'
import './scrollbars/scrollbar.css'

Vue.use(scroll);

window.$ = $;

new Vue({
    el: '#layout',
    render: function (h) {
        return h(Layout)
    }
});
