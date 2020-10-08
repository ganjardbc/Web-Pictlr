<template>
    <div class="col-full">
        <div v-if="$cookie.get('jwt')">
            <frame-design :url="urlGetDesign"></frame-design>
        </div>
    </div>
</template>
<script>
import FrameDesign from '../post/Card';

export default {
    beforeCreate: function () {
        if (!this.$cookie.get('jwt')) {
            this.$router.push('/trendings');
        }
    },
    data () {
        return {
            urlGetDesign: this.baseUrl+'/api/design/feeds?token='+this.$cookie.get('jwt'),
        }
    },
    components: {
        'frame-design': FrameDesign,
    }
}
</script>
