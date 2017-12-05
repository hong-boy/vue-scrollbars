<template>
    <div id="outer" class="outer-box">
        <section class="section">
            <h3>Demo - scrollbar-inner</h3>
            <section class="scrollbar-inner panel">
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
                <textarea v-bar class="scrollbar-outer" style="width:300px; height:200px; max-height: 200px;">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque. Phasellus ornare, ante vitae consectetuer consequat, purus sapien ultricies dolor, et mollis pede metus eget nisi. Praesent sodales velit quis augue. Cras suscipit, urna at aliquam rhoncus, urna quam viverra nisi, in interdum massa nibh nec erat.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque. Phasellus ornare, ante vitae consectetuer consequat, purus sapien ultricies dolor, et mollis pede metus eget nisi. Praesent sodales velit quis augue. Cras suscipit, urna at aliquam rhoncus, urna quam viverra nisi, in interdum massa nibh nec erat.
                </textarea>
            </section>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style lang="less">
    *{
        margin:0;
        padding:0;
    }
    .outer-box{
        border:1px solid #eee;
        height:100%;
        width:100%;
    h3{
        line-height:2;
    }
    }
    .section{
        position:relative;
        margin:40px auto;
        width:80%;
        box-shadow:0 0 5px #e0b0b0;
        padding:5px 15px;
        overflow:hidden;
    }
    .panel{
        position:relative;
        width:100%;
        max-height:300px;
    }
</style>
