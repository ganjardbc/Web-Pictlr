<template>
    <div>
        <div>
            <frame-menu-user></frame-menu-user>
        </div>
		<div class="padding-15px">
            <frame-design :url="urlGetDesign"></frame-design>
        </div>
    </div>
</template>
<script>
import FrameDesign from '../post/Card';
import Menu from './Menu.vue';

export default {
    data () {
        return {
            urlGetDesign: this.baseUrl+'/api/design/saved/'+this.$route.params.username,
        }
    },
    beforeCreate: function () {
        if (!this.$cookie.get('jwt')) {
            this.$router.push('/welcome');
        }
    },
    components: {
        'frame-design': FrameDesign,
        'frame-menu-user': Menu,
    },
	created: function () {
		$('#user-nav ul li').each(function () {
            $(this).removeClass('active');
        });
        $('#user-nav ul .user-saved').addClass('active');
	}
}
</script>

