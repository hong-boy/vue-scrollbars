<template>
    <div>
        <slot name="content"></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    import Scrollbar from './scrollbar'

    export default {
        name: 'Scrollbar',
        prop: {},
        data() {
            return {};
        },
        methods: {},
        created() {
            this.$nextTick(function () {
                let el = this.$slots.content[0].elm;
                let inst = new Scrollbar(el);
                this.__inst4scrollbar = inst;
                inst.init();
            });
        },
        mounted() {
            console.log('mounted', this.$slots.content[0].elm);
        },
        beforeDestroy(){
            this.__inst4scrollbar.destroy();
        },
    }
</script>

<style lang="less">

</style>
