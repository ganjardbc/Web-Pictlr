<template>
    <div>
        <div>
            <frame-menu></frame-menu>
        </div>
        <div class="col-full">
            <frame-user :url="urlGetUser"></frame-user>
        </div>
    </div>
</template>
<script>
import Menu from './Menu.vue';
import FrameUser from '../user/Card';

export default {
    data () {
        return {
            urlGetUser: this.baseUrl+'/api/user/search/'+this.$route.params.ctr,
        }
    },
    components: {
        'frame-menu': Menu,
        'frame-user': FrameUser,
    }
}
</script>

