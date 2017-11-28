'use strict';
import Vue from 'vue';
import './scrollbars/directive.js'

console.log(new Vue().$isServer);

window.Vue = Vue;

new Vue({
    el: '#layout',
    render: function (h) {
        return <div id="test">
            <p>aaaaaaaaaaaaaaaaaa</p>
            <p>aaaaaaaaaaaaaaaaaa</p>
            <p>aaaaaaaaaaaaaaaaaa</p>
            <p>aaaaaaaaaaaaaaaaaa</p>
            <p>aaaaaaaaaaaaaaaaaa</p>
            <p>aaaaaaaaaaaaaaaaaa</p>
            <p>aaaaaaaaaaaaaaaaaa</p>
        </div>
    }
});
