<template>
    <div class="width width-1000px width-center post-grid">
        <div class="post-grid-1">
            <div class="mobile">
                <div class="post-compose">
                    <div class="pc-col-1">
                        <router-link :to="{path: '/'+$cookie.get('username')}">
                            <div 
                                class="image image-60px image-radius"
                                :style="{
                                    'background-image': 'url('+urlThumbnailProfile+$cookie.get('foto')+')'
                                }"></div>
                        </router-link>
                    </div>
                    <div class="pc-col-2">
                        <router-link :to="{name: 'create-post'}">
                            <div class="pc-info">
                                <div class="pc-icn fa fa-lg fa-plus txt-site txt-blue txt-20"></div>
                                <div class="pc-ttl txt-site txt-10 txt-main txt-thin">
                                    Create Post
                                </div>
                            </div>
                        </router-link>
                        <div class="dashed"></div>
                        <router-link :to="{name: 'create-canvas'}">
                            <div class="pc-info">
                                <div class="pc-icn fa fa-lg fa-th-large txt-site txt-orange txt-20"></div>
                                <div class="pc-ttl txt-site txt-10 txt-main txt-thin">
                                    Create Canvas
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div v-if="$cookie.get('jwt')">
                <frame-design :url="urlGetDesign"></frame-design>
            </div>
        </div>
        <div class="post-grid-2">
            <div class="pg-place-fixed">
                <div class="margin-15px">
                    <div>
                        <h3 class="txt-site txt-11 txt-primary txt-thin">Top Canvas</h3>
                    </div>
                    <div>
                        <frame-canvas :url="urlTopCanvas"></frame-canvas>
                    </div>
                </div>
                <div class="padding-top-5px"></div>
                <div class="margin-15px">
                    <div>
                        <h3 class="txt-site txt-11 txt-primary txt-thin">Tranding Nows</h3>
                    </div>
                    <div>
                        <frame-tag :url="urlTopTags"></frame-tag>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FrameDesign from '@/components/post/CardList';
import FrameCanvas from '@/components/canvas/CardSmall';
import FrameTag from '@/components/tags/CardSmall';

export default {
    data () {
        return {
            urlGetDesign: this.baseUrl+'/api/design/feeds?token='+this.$cookie.get('jwt'),
            urlTopCanvas: this.baseUrl+'/api/canvas/top/4?token='+this.$cookie.get('jwt'),
            urlTopTags: this.baseUrl+'/api/tag/limit/4?token='+this.$cookie.get('jwt'),
        }
    },
    beforeCreate () {
        if (!this.$cookie.get('jwt')) {
            this.$router.push('/fresh');
        }
    },
    components: {
        'frame-design': FrameDesign,
        'frame-canvas': FrameCanvas,
        'frame-tag': FrameTag,
    },
    methods: {
        fetchPaper () {

        },
    }
}
</script>

