<template>
    <div>
        <slot name="content"></slot>
        <slot name="pageMap"></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    import Scrollbar from './scrollbar'

    export default {
        name: 'Scrollbar',
        props: {
            disableBodyScroll: {type: Boolean, default: false},
            autoScrollSize: {type: Boolean, default: true},
            autoUpdate: {type: Boolean, default: true},
            ignoreMobile: {type: Boolean, default: false},
            ignoreOverlay: {type: Boolean, default: false},
            isRtl: {type: Boolean, default: false},
            showArrows: {type: Boolean, default: false},
            stepScrolling: {type: Boolean, default: true},
            duration: {type: Number, default: 200},
            scrollStep: {type: Number, default: 30},
            onDestroy: {type: Function},
            onFallback: {type: Function},
            onInit: {type: Function},
            onScroll: {type: Function},
            onUpdate: {type: Function}
        },
        data() {
            return {};
        },
        methods: {},
        created() {
            this.$nextTick(function () {
                let self = this;
                let el = this.$slots.content[0].elm;

                let option = {
                    disableBodyScroll: this.disableBodyScroll,
                    autoScrollSize: this.autoScrollSize,
                    autoUpdate: this.autoUpdate,
                    ignoreMobile: this.ignoreMobile,
                    ignoreOverlay: this.ignoreOverlay,
                    isRtl: this.isRtl,
                    showArrows: this.showArrows,
                    stepScrolling: this.stepScrolling,
                    duration: this.duration,
                    scrollStep: this.scrollStep,
                };
                option.onScroll = function (...args) {
                    args = ['onScroll', this].concat(args);
                    self.$emit.apply(self, args);
                };
                option.onUpdate = function (...args) {
                    args = ['onUpdate', this].concat(args);
                    self.$emit.apply(self, args);
                };
                option.onInit = function (...args) {
                    args = ['onInit', this].concat(args);
                    self.$emit.apply(self, args);
                };
                option.onFallback = function (...args) {
                    args = ['onFallback', this].concat(args);
                    self.$emit.apply(self, args);
                };
                option.onDestroy = function (...args) {
                    args = ['onDestroy', this].concat(args);
                    self.$emit.apply(self, args);
                };
                let pageMap = this.$slots.pageMap ? this.$slots.pageMap[0].elm : null;
                if (pageMap) {
                    option.scrollx = pageMap;
                    option.scrolly = pageMap;
                    option.stepScrolling = false;
                }
                let inst = new Scrollbar(el, this.$el);
                this.__inst4scrollbar = inst;
                inst.init(option);
            });
        },
        mounted() {},
        updated() {
            let option = {
                disableBodyScroll: this.disableBodyScroll,
                autoScrollSize: this.autoScrollSize,
                autoUpdate: this.autoUpdate,
                ignoreMobile: this.ignoreMobile,
                ignoreOverlay: this.ignoreOverlay,
                isRtl: this.isRtl,
                showArrows: this.showArrows,
                duration: this.duration,
                scrollStep: this.scrollStep
            };
            this.__inst4scrollbar.update(option);
        },
        beforeDestroy(){
            this.__inst4scrollbar.destroy();
        },
    }
</script>

<style lang="less">

</style>
