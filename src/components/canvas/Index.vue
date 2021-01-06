<template>
    <div>
        
        <div v-if="loading">
            <frame-loading></frame-loading>
        </div>

        <div v-if="emptyPaper">
            <div class="frame-empty">
                <div class="icn fa fa-lg fa-thermometer-empty btn-main-color"></div>
                <div class="ttl padding-15px">{{ emptyPaperMessage }}</div>
            </div>
        </div>

        <div v-if="detailCanvas">
            <div class="col-full padding-top-10px">
                <div class="paper-cover">
                    <div class="pl-cover">
                        <div class="pl-profile" :style="{'text-align': 'center'}">
                            <div class="ctn-main-font ctn-center ctn-white-color">
                                <router-link 
                                    :to="{name: 'user', params: {username: pp.username}}"
                                    style="display: inline-block; vertical-align: top;">
                                    <div class="image image-80px image-circle" 
                                        :style="{
                                            'background-image': 'url('+pp.foto+')',
                                            'margin': 'auto',
                                        }" />
                                </router-link>
                            </div>
                            <div class="padding-top-10px">
                                <h1 class="txt-site txt-white txt-micro txt-extra-bold txt-center">
                                    {{ pp.title }}
                                </h1>
                            </div>
                            <div>
                                <p class="txt-site txt-12 txt-white txt-thin txt-center">
                                    {{ pp.about }}
                                </p>
                            </div>
                            <div class="txt-site txt-12 txt-white txt-thin txt-center">
                                <span>Created on {{ pp.created | moment('from', 'now') }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="pp.designs >= 3" class="pl-icn pl-image">
                        <div 
                            class="bg-image image image-all" 
                            :style="{'background-image': 'url('+urlThumbnailStory+pp.cover1+')'}" 
                            alt="design"></div>
                        <div 
                            class="bg-image image image-all" 
                            :style="{'background-image': 'url('+urlThumbnailStory+pp.cover2+')'}" 
                            alt="design"></div>
                        <div 
                            class="bg-image image image-all" 
                            :style="{'background-image': 'url('+urlThumbnailStory+pp.cover3+')'}" 
                            alt="design"></div>
                    </div>
                    <div v-if="pp.designs >= 0" class="pl-icn">
                        <div 
                            class="bg-image image image-all" 
                            :style="{'background-image': 'url('+urlFotoStory+pp.cover1+')'}" 
                            alt="design"></div>
                    </div>
                </div>
            </div>
            <div class="col-full">
                <div class="padding-top-10px">
                    <div class="menu-val padding-5px">
                        <ul>
                            <li>
                                <div class="val">{{ pp.visited }}</div>
                                <div class="ttl">Visited</div>
                            </li>
                            <li>
                                <div class="val">{{ pp.designs }}</div>
                                <div class="ttl">Posts</div>
                            </li>
                            <li>
                                <div class="val">{{ pp.watchs }}</div>
                                <div class="ttl">Watchs</div>
                            </li>
                            <li class="right">
                                <span v-if="this.$cookie.get('id') != pp.id">
                                    <div v-if="iswatch == '0'">
                                        <button 
                                            :class="['btn btn-main-color watch-'+pp.idcanvas]" 
                                            @click="$watchPaper($cookie.get('id'), pp.id, pp.idcanvas)"
                                            id="unwatch">
                                            <span id="icn" class="fas fa-lg fa-plus btn-main-icon"></span>
                                            <span id="ttl">Watch</span>
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button 
                                            :class="['btn btn-grey2-color watch-'+pp.idcanvas]" 
                                            @click="$watchPaper($cookie.get('id'), pp.id, pp.idcanvas)"
                                            id="watched">
                                            <span id="icn" class="fas fa-lg fa-check btn-main-icon"></span>
                                            <span id="ttl">Unwatch</span>
                                        </button>
                                    </div>
                                </span>
                                <span v-if="this.$cookie.get('id') == pp.id">
                                    <router-link to="/compose">
                                        <button class="btn btn-circle btn-grey2-color">
                                            <span class="fas fa-lg fa-plus"></span>
                                        </button>
                                    </router-link>
                                    <router-link :to="{'path': '/'+this.$route.params.username+'/canvas/'+this.$route.params.idcanvas+'/edit'}" >
                                        <button class="btn btn-grey2-color">
                                            <span class="fas fa-lg fa-pencil-alt btn-main-icon"></span>
                                            <span>Edit</span>
                                        </button>
                                    </router-link>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="padding-bottom-15px">
                    <div v-if="tagPaper && tagPaper.length">
                        <div class="padding-10px">
                            <span v-for="(tag, idx) in tagPaper" v-bind:key="idx">
                                <router-link :to="{'path': '/tags/'+tag.tag}" class="frame-top-tag no-margin">
                                    {{tag.tag}}
                                </router-link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-full">
                <frame-design :url="urlGetDesign" :col="5"></frame-design>
            </div>

        </div>

    </div>
</template>
<script>
import FrameLoading from '../main/FrameLoading';
import FrameDesign from '../post/Card';

export default {
    data () {
        return {
            urldetailCanvas: this.baseUrl+'/api/canvas/detail/'+this.$route.params.idcanvas+'?token='+this.$cookie.get('jwt'),
            urlGetDesign: this.baseUrl+'/api/design/canvas/'+this.$route.params.idcanvas+'?token='+this.$cookie.get('jwt'),
            emptyPaper: false,
            emptyPaperMessage: '',
            loading: false,
            detailCanvas: false,
            tagPaper: [],
            iswatch: '0',
            pp: {
                idcanvas: '',
                id: '',
                title: '',
                about: '',
                visited: '0',
                designs: '0',
                watchs: '0',
                foto: '',
                username: '',
                created: '',
                cover1: '',
                cover2: '',
                cover3: '',
            }
        }
    },
    created: function () {
        this.fetchdetailCanvas();
    },
    components: {
        'frame-loading': FrameLoading,
        'frame-design': FrameDesign,
    },
    watch: {
        '$route': 'pullPath',
    },
    methods: {
        pullPath () {
            if (this.$route.params.idcanvas) {
                this.urldetailCanvas = this.baseUrl+'/api/canvas/detail/'+this.$route.params.idcanvas+'?token='+this.$cookie.get('jwt');
            }
            if (this.pp.idcanvas != this.$route.params.idcanvas) {
                this.fetchdetailCanvas();
            }
        },
        fetchdetailCanvas () {
            //this.loading = true;
            this.detailCanvas = false;
            this.emptyPaper = false;
            axios.get(this.urldetailCanvas)
            .then(response => {
                if (response.data.detail && response.data.detail.length) {
                    //this.loading = false;
                    this.detailCanvas = true;
                    this.pp.idcanvas = response.data.detail[0].idcanvas;
                    this.pp.id = response.data.detail[0].id;
                    this.pp.title = response.data.detail[0].title;
                    this.pp.about = response.data.detail[0].description;
                    this.pp.visited = response.data.detail[0].views;
                    this.pp.watchs = response.data.detail[0].ttl_watch;
                    this.pp.designs = response.data.detail[0].ttl_design;
                    this.pp.foto = this.urlThumbnailProfile+response.data.detail[0].foto;
                    this.pp.username = response.data.detail[0].username;
                    this.pp.created = response.data.detail[0].created;
                    this.pp.cover1 = response.data.detail[0].cover1;
                    this.pp.cover2 = response.data.detail[0].cover2;
                    this.pp.cover3 = response.data.detail[0].cover3;
                    this.iswatch = response.data.iswatch;
                    this.tagPaper = response.data.tags;
                } else {
                    this.detailCanvas = false;
                    this.emptyPaper = true;
                    this.emptyPaperMessage = 'Canvas Empty';
                }
            })
            .catch(e => {
                //this.loading = false;
                this.detailCanvas = false;
                this.emptyPaper = true;
                this.emptyPaperMessage = e.response.statusText;
            });
        }
    }
}
</script>

