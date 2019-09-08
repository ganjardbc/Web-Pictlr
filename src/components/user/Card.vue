<template>
    <div>

        <div v-if="loading">
            <frame-loading></frame-loading>
        </div>

        <div v-if="emptyUser">
            <div class="frame-empty">
                <div class="icn fa fa-lg fa-thermometer-empty btn-main-color"></div>
                <div class="ttl padding-15px">User Empty</div>
            </div>
        </div>

        <div v-if="placeUser">
            <div class="post-flex" id="nav-users">
                <span v-for="usr in users">
                    <div class="frame-paper-list">
                        <div class="top">
                            <div class="lef">
                                <div class="ph">
                                    <router-link 
                                        :to="{
                                            name: 'user', 
                                            params: {
                                                username: usr.username
                                            }}">
                                        <div 
                                            class="image image-full image-circle" 
                                            :style="{
                                                'background-image': 'url('+urlThumbnailProfile+usr.foto+')'
                                            }" 
                                            :alt="usr.username"></div>
                                    </router-link>
                                </div>
                            </div>
                            <div class="rig">
                                <router-link 
                                    :to="{
                                        name: 'user', 
                                        params: {
                                            username: usr.username,
                                        }
                                    }">
                                    <div v-if="usr.ttl_design != 0">
                                        <div class="pl-image">
                                            <div 
                                                class="bg-image image image-all" 
                                                :style="{'background-image': 'url('+urlThumbnailStory+usr.cover1+')'}" 
                                                alt="design"></div>
                                            <div 
                                                class="bg-image image image-all image-sekunder" 
                                                :style="{'background-image': 'url('+urlThumbnailStory+usr.cover2+')'}" 
                                                alt="design"></div>
                                            <div 
                                                class="bg-image image image-all image-sekunder" 
                                                :style="{'background-image': 'url('+urlThumbnailStory+usr.cover3+')'}" 
                                                alt="design"></div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="pl-icn" style="border-radius: 5px;">
                                            <span class="mn-icn fas fa-lg fa-th-large"></span>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                        <div class="mid">
                            <div>
                                <div class="padding-5px">
                                    <h3>
                                        <router-link 
                                            class="txt-site txt-18 txt-bold txt-main txt-main-hover"
                                            :to="{
                                                name: 'user', 
                                                params: {
                                                    username: usr.username,
                                                }
                                            }">
                                            {{ usr.name }}
                                        </router-link>
                                    </h3>
                                    <p>
                                        <router-link 
                                            class="txt-site txt-12 txt-thin txt-primary"
                                            :to="{
                                                name: 'user', 
                                                params: {
                                                    username: usr.username,
                                                }
                                            }">
                                            {{ usr.username }}
                                        </router-link>
                                    </p>
                                </div>
                            </div>
                            <div class="menu-val">
                                <ul>
                                    <li>
                                        <div class="val">{{ usr.ttl_designs }}</div>
                                        <div class="ttl">Posts</div>
                                    </li>
                                    <li>
                                        <div class="val">{{ usr.ttl_canvas }}</div>
                                        <div class="ttl">Canvas</div>
                                    </li>
                                    <!-- <li class="right">
                                        <router-link 
                                            :to="{
                                                name: 'user', 
                                                params: {
                                                    username: usr.username
                                                }
                                            }">
                                            <div 
                                                class="image image-40px image-circle" 
                                                :style="{'background-image': 'url('+urlThumbnailProfile+usr.foto+')'}" 
                                                :alt="usr.username"></div>
                                        </router-link>
                                    </li> -->
                                </ul>
                            </div>
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
            loading: false,
            emptyUser: false,
            placeUser: false,
            users: [],
        }
    },
    created: function () {
        this.fetchUser();
    },
    components: {
        'frame-loading': FrameLoading,
    },
    methods: {
        fetchUser: function () {
            this.loading = true;
            axios.get(this.url)
            .then(response => {
                this.loading = false;
                if (response.data.users && response.data.users.length) {
                    this.placeUser = true;
                    this.users = response.data.users;
                } else {
                    this.emptyUser = true;
                }
            })
            .catch(e => {
                this.loading = false;
                console.log(e);
            })
        }
    }
}
</script>