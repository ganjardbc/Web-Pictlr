<template>
    <div class="place-canvas" id="place-canvas">
        <div class="top">
            <div class="grid grid-2x">
                <div class="column-1">
                    <h3 class="ctn-main-font ctn-20px ctn-sek-color ctn-line padding-top-10px">
                        Saved to Canvas
                    </h3>
                </div>
                <div class="column-2 content-right">
                    <button 
                        class="btn btn-circle btn-grey2-color" 
                        @click="$opCanvas('hide')">
                        <span class="fa fa-lg fa-times"></span>
                    </button>
                </div>
            </div>
        </div>
        <div class="mid">
            <div class="pc-image">
                <div 
                    class="img image image-80px image-radius"
                    :style="{'background-image': 'url('+design+')'}"></div>
                <div>
                    <textarea
                        name="write-design" 
                        id="write-design" 
                        class="tx txt edit-text txt-primary-color ctn ctn-main ctn-sans-serif"
                        maxlength="250"
                        v-model="desc"
                        placeholder="About your design"></textarea>
                </div>
            </div>
            <div class="padding-top-10px">
                <h4 class="ctn-main-font ctn-14px ctn-sek-color ctn-line">
                    Choose one canvas
                </h4>
            </div>
        </div>
        <div class="mid mid-canvas">
            <frame-canvas :url="urlGetCanvas"></frame-canvas>
        </div>
    </div>
</template>
<script>
import Canvas from '../../main/frame/Canvas-small';
export default {
    data () {
		return {
            urlGetCanvas: this.baseUrl+'/api/canvas/user/'+this.$cookie.get('username'),
            desc: this.$cookie.get('desc'),
            design: this.$cookie.get('design')
		}
	},
	components: {
		'frame-canvas': Canvas,
	}
}
</script>
