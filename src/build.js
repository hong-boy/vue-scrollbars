import './scrollbars/css/base.css';
import './scrollbars/css/chrome.css';
import './scrollbars/css/dynamic.css';
import './scrollbars/css/mac.css';
import './scrollbars/css/page-map.css';
import './scrollbars/css/simple-inner.css';
import './scrollbars/css/simple-outer.css';

import directive from './scrollbars/directive.js';
import Scrollbar from './scrollbars/component.vue';

const Bar = {};

Bar.install = function (Vue, options) {
    directive(Vue, options);
    Vue.component(Scrollbar.name, Scrollbar);
};

if (typeof Vue !== 'undefined') {
    Vue.use(Bar);
}

export default Bar;
