<template>
    <div>
        <div v-if="loading">
			<frame-loading></frame-loading>
		</div>
        
        <div>

            <div v-if="emptyProfile">
                <div class="frame-empty">
                    <div class="ctn-main-font ctn-sek-color ctn-big">
                        <div class="fa fa-lg fa-thermometer-empty"></div>
                    </div>
                    <div class="ttl padding-15px">{{ emptyProfileMessage }}</div>
                </div>
            </div>

            <div v-if="frameProfile" class="frame-profile">
                <div>
                    <div class="col-700px">
                        <div class="profile">
                            <div class="info">
                                <div style="min-height: 65px;">
                                    <h1>
                                        <router-link 
                                            class="txt-site txt-main txt-big txt-extra-bold txt-main-hover"
                                            :to="{name: 'user', params: {username: pp.username}}" >
                                            {{ pp.name }}
                                        </router-link>
                                    </h1>
                                    <p>
                                        <router-link 
                                            class="txt-site txt-main txt-12 txt-extra-bold txt-main-hover"
                                            :to="{name: 'user', params: {username: pp.username}}" >
                                            {{ pp.username }}
                                        </router-link>
                                    </p>
                                </div>
                                <div class="txt-site txt-12 txt-main txt-thin padding-bottom-5px">
                                    <span v-if="pp.about">
                                        {{ pp.about }}
                                    </span>
                                </div>
                                <div class="txt-site txt-12 txt-primary txt-bold">
                                    <a :href="pp.website" target="_blank">{{ pp.website }}</a>
                                </div>
                            </div>
                            <div class="foto">
                                <router-link :to="{name: 'user', params: {username: pp.username}}">
                                    <div 
                                        class="image image-130px image-circle" 
                                        id="place-picture" 
                                        :style="{
                                            'background-image': 'url('+pp.foto+')',
                                        }"></div>
                                </router-link>
                            </div>
                        </div>
                        <div>
                            <div class="menu-val">
                                <ul>
                                    <li>
                                        <router-link :to="{name: 'user', params: {username: pp.username}}">
                                            <div class="val">{{ pp.ttl_designs }}</div>
                                            <div class="ttl">Posts</div>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name: 'user-canvas', params: {username: pp.username}}">
                                            <div class="val">{{ pp.ttl_canvas }}</div>
                                            <div class="ttl">Canvas</div>
                                        </router-link>
                                    </li>
                                    <li class="right">
                                        <div v-if="$cookie.get('id') == pp.id">
                                            <router-link :to="{name: 'setting-profile'}">
                                                <button class="btn btn-circle btn-main2-color btn-focus">
                                                    <span class="fas fa-lg fa-pencil-alt"></span>
                                                </button>
                                            </router-link>
                                            <router-link :to="{name: 'user-setting'}">
                                                <button class="btn btn-radius btn-main2-color btn-focus">
                                                    <span class="fas fa-lg fa-cog btn-main-icon"></span>
                                                    <span>Setting</span>
                                                </button>
                                            </router-link>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
        
    </div>
</template>
<script>
import FrameLoading from '../main/FrameLoading';

export default {
    data () {
        return {
            url: this.baseUrl+'/api/user/'+this.$route.params.username,
            pp: {
                id: '0',
                foto: '',
                name: '',
                username: '',
                ttl_canvas: '0',
                ttl_designs: '0',
                ttl_saved: '0',
                about: '',
                website: ''
            },
            profile: [],
            loading: false,
            frameProfile: true,
            emptyProfile: false,
            emptyProfileMessage: '',
        }
    },
    components: {
        'frame-loading': FrameLoading,
    },
    created: function () {
        this.fetchProfile();
    },
    watch: {
        '$route': 'pullPath',
    },
    methods: {
        pullPath () {
            if (this.$route.params.username) {
                this.url = this.baseUrl+'/api/user/'+this.$route.params.username;
            }
            if (this.pp.username != this.$route.params.username) {
                this.fetchProfile();
            }
        },
        fetchProfile () {
            //this.loading = true;
            //this.frameProfile = false;
            this.emptyProfile = false;
            axios.get(this.url)
            .then(response => {
                //this.loading = false;
                //this.frameProfile = true;
                this.emptyProfile = false;
                this.pp.id = response.data[0].id;
                this.pp.foto = this.urlThumbnailProfile+response.data[0].foto;
                this.pp.name = response.data[0].name;
                this.pp.username = response.data[0].username;
                this.pp.ttl_canvas = response.data[0].ttl_canvas;
                this.pp.ttl_designs = response.data[0].ttl_designs;
                this.pp.ttl_saved = response.data[0].ttl_saved;
                this.pp.about = response.data[0].about;
                this.pp.website = response.data[0].website;
            })
            .catch(e => {
                //this.loading = false;
                //this.frameProfile = false;
                this.emptyProfile = true;
                this.emptyProfileMessage = e.response.statusText;
            });
        }
    }
}
</script>
