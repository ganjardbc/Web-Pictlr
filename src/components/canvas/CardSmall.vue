<template>
    <div>

        <div v-if="loading">
            <frame-loading></frame-loading>
        </div>

        <div v-if="emptyCanvas">
            <div class="frame-empty">
                <div class="icn fa fa-lg fa-thermometer-empty btn-main-color"></div>
                <div class="ttl padding-15px">Canvas Empty</div>
            </div>
        </div>

        <div v-if="placeCanvas">
            <div class="post-flex" id="nav-canvas">
                <span v-for="pp in canvas">
                    <div class="frame-paper-small" >
                        <div class="fps-top">
                            <router-link :to="{name: 'visit-canvas', params: {username: pp.username, idcanvas: pp.idcanvas}}">
                                <div v-if="pp.ttl_design != 0">
                                    <div class="pl-image-big">
                                        <div class="image-main">
                                            <div 
                                                class="bg-image image image-all" 
                                                :style="{'background-image': 'url('+urlThumbnailStory+pp.cover1+')'}" 
                                                alt="design"></div>
                                        </div>
                                        <div class="image-sekunder">
                                            <div 
                                                class="bg-image image image-all image-sekunder" 
                                                :style="{'background-image': 'url('+urlThumbnailStory+pp.cover2+')'}" 
                                                alt="design"></div>
                                            <div 
                                                class="bg-image image image-all image-sekunder" 
                                                :style="{'background-image': 'url('+urlThumbnailStory+pp.cover3+')'}" 
                                                alt="design"></div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="pl-icn" style="border-radius: 5px;">
                                        <span class="mn-icn fas fa-lg fa-th-large"></span>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div class="fps-mid">
                            <div class="fps-info">
                                <p>
                                    <router-link 
                                        class="txt-site txt-main txt-bold txt-12 txt-main-hover"
                                        :to="{name: 'visit-canvas', params: {username: pp.username, idcanvas: pp.idcanvas}}">
                                        {{ pp.title }}
                                    </router-link>
                                </p>
                                <p class="txt-site txt-10">
                                    <span class="txt-site txt-primary txt-thin">Created by</span>
                                    <router-link 
                                        class="txt-site txt-primary txt-bold"
                                        :to="{name: 'user', params: {username: pp.username}}">
                                        {{ pp.name }}
                                    </router-link>
                                </p>
                            </div>
                        </div>
                        <div class="fps-rig">
                            <button class="btn btn-grey2-color btn-circle">
                                <span class="fa fa-lg fa-plus"></span>
                            </button>
                        </div>
                    </div>
                </span>
            </div>
        </div>

    </div>
</template>
<script>
import FrameLoading from '../main/FrameLoading';

export default {
    props: ['msg', 'url'],
    data () {
        return {
            urlDesign: this.baseUrl+'/api/bookmark/save?token='+this.$cookie.get('jwt'),
            loading: false,
            emptyCanvas: false,
            placeCanvas: false,
            canvas: []
        }
    },
    created: function () {
        this.fetchCanvas();
    },
    components: {
        'frame-loading': FrameLoading,
    },
    methods: {
        fetchCanvas () {
            this.loading = true;
            axios.get(this.url)
            .then(response => {
                this.loading = false;
                if (response.data.canvas && response.data.canvas.length) {
                    this.placeCanvas = true;
                    this.canvas = response.data.canvas;
                } else {
                    this.emptyCanvas = true;
                }
            })
            .catch(e => {
                this.loading = false;
                console.log(e);
            })
        },
        doSave (idcanvas) {
            var id = this.$cookie.get('id');
            var idimage = this.$cookie.get('idimage');
            axios.post(
                this.urlDesign,
                {
                    'id': id,
                    'idimage': idimage,
                    'idcanvas': idcanvas
                }
            )
            .then(response => {
                if (response.data.status == 'bookmark') 
                {
                    this.$opCanvas('hide');
                    this.$openMessageBottom('open', response.data.message);
                }
                else 
                {
                    this.$opCanvas('hide');
                    this.$openMessageBottom('open', response.data.message);
                }
            })
            .catch(e => {
                this.$opCanvas('hide');
                this.$openMessageBottom('open', e.response.message);
                console.log(e.response);
            });
        }
    }
}
</script>