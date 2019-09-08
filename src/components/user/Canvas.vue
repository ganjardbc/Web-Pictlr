<template>
    <div>
		<div>
            <frame-menu-user :name="'canvas'"></frame-menu-user>
        </div>
        <div class="col-full">
            <frame-canvas :url="urlGetCanvas"></frame-canvas>
        </div>
    </div>
</template>
<script type="text/javascript">
import Canvas from '../canvas/Card';
import Menu from './Menu';

export default {
	data () {
		return {
			urlGetCanvas: this.baseUrl+'/api/canvas/user/'+this.$route.params.username,
		}
	},
	components: {
		'frame-canvas': Canvas,
		'frame-menu-user': Menu,
	}
}
</script>
