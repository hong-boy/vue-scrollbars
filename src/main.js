'use strict';
import Vue from 'vue';
import App from './app.vue'

console.log('aa');
new Vue({
    el: '#layout',
    render(h){
        console.log('aa');
        return h(App)
    }
});
