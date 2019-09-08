<template>
    <div class="col-full">
        <div class="width width-700px width-center padding-20px">
            <h1 class="txt-site txt-big txt-center txt-main txt-extra-bold txt-capital">
                {{ tag }}
            </h1>
            <p class="txt-site txt-11 txt-primary txt-center">
                Explore 100k more posts everyday!
            </p>
        </div>
        <div class="padding-top-20px">
            <frame-design :url="urlGetDesign"></frame-design>
        </div>
    </div>
</template>
<script>
import FrameDesign from '../post/Card';

export default {
    data () {
        return {
            tag: this.$route.params.ctr.replace('+', ' '),
            urlGetDesign: this.baseUrl+'/api/design/tag/'+this.$route.params.ctr+'?token='+this.$cookie.get('jwt'),
        }
    },
    created: function () {
        console.log(this.urlGetDesign);
        
    },
    components: {
        'frame-design': FrameDesign,
    },
    watch: {
        '$route': 'pullPath',
    }
}
</script>
