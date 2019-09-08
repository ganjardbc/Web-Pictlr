<template>
    <div>
        <div>
            <frame-menu-user></frame-menu-user>
        </div>
        <div class="col-full">
            <frame-design :url="urlGetDesign" :col="5"></frame-design>
        </div>
    </div>
</template>
<script>
import FrameDesign from '../post/Card';
import Menu from './Menu.vue';

export default {
    data () {
        return {
            urlGetDesign: this.baseUrl+'/api/design/search/'+this.$route.params.ctr+'?token='+this.$cookie.get('jwt'),
        }
    },
    components: {
        'frame-design': FrameDesign,
        'frame-menu-user': Menu,
    }
}
</script>

