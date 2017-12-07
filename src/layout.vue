<template>
    <div v-bar id="outer" class="scrollbar-dynamic outer-box">
        <section class="section">
            <h3>Demo - scrollbar-inner</h3>
            <section v-bar.disableBodyScroll class="scrollbar-inner panel">
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
                <p>aaaaaaaaaaaaaaaaaa</p>
            </section>
        </section>
        <section class="section">
            <h3>Demo - textarea</h3>
            <section class="panel">
                <textarea v-bar="{disableBodyScroll:true}"
                          class="textarea-scrollbar scrollbar-outer">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque. Phasellus ornare, ante vitae consectetuer consequat, purus sapien ultricies dolor, et mollis pede metus eget nisi. Praesent sodales velit quis augue. Cras suscipit, urna at aliquam rhoncus, urna quam viverra nisi, in interdum massa nibh nec erat.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque. Phasellus ornare, ante vitae consectetuer consequat, purus sapien ultricies dolor, et mollis pede metus eget nisi. Praesent sodales velit quis augue. Cras suscipit, urna at aliquam rhoncus, urna quam viverra nisi, in interdum massa nibh nec erat.
                </textarea>
            </section>
        </section>
        <section class="section">
            <h3>Demo - scrollbar component</h3>
            <scrollbar :disableBodyScroll="disableBodyScroll" @onScroll="onscroll">
                <section slot="content" class="scrollbar-inner panel">
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                    <p>aaaaaaaaaaaaaaaaaa</p>
                </section>
            </scrollbar>
        </section>
        <section class="section">
            <h3>Demo - page map</h3>
            <scrollbar :stepScrolling="false" @onInit="onInit4PageMap" @onUpdate="onUpdate4PageMap">
                <div slot="pageMap" class="scroll-element_outer">
                    <div class="scroll-element_size">
                        <div class="scroll-element_track"></div>
                        <div class="scroll-bar"></div>
                    </div>
                </div>
                <section slot="content" class="scrollbar-map">
                    <img src="./tarzan.jpg" height="900" width="1200"/>
                </section>
            </scrollbar>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                disableBodyScroll: false
            };
        },
        methods: {
            onscroll(...args){
                console.log(args)
            },
            onInit4PageMap(){

            },
            onUpdate4PageMap(){
            },
        },
        created(){
//            setTimeout(()=>{console.log('disabled scroll');this.disableBodyScroll = true}, 10000);
        }
    }
</script>

<style lang="less">
    *{
        margin:0;
        padding:0;
    }
    .outer-box{
        position:relative;
        border:1px solid #eee;
        height:calc(100vh);
    h3{
        line-height:2;
    }
    .textarea-scrollbar{
        height:250px;
        width:500px;
    }
    }
    .section{
        position:relative;
        margin:40px auto;
        width:80%;
        box-shadow:0 0 5px #e0b0b0;
        padding:5px 15px;
        overflow:hidden;
    >
    .panel{
        border:1px solid #eee;
    }
    }
    .panel{
        padding:5px;
        position:relative;
        width:100%;
        max-height:300px;
    }
</style>
