<template>
	<div id="app">

		<div id="header" class="hd-mobile">
            <div class="hd-place">
                <div class="hd-menu col-all">
                    <div class="hd-pos hd-lef">
                        <div class="logo" >
                            <router-link :to="{name: 'home'}">
                                <img src="@/assets/img/Pictlr/9.png" alt="Pictlr">
                            </router-link>
                        </div>
                    </div>
                    <div class="hd-pos hd-mid hd-mid-mobile">
                        <div class="main-search">
                            <form 
                                id="place-search" 
                                method="get" 
                                v-on:submit.prevent="doSearch">
                                <button 
                                    type="submit" 
                                    class="btn btn-circle btn-main4-color btn-radius btn-no-focus">
                                    <span class="fa fa-lg fa-search"></span>
                                </button>
                                <input 
                                    type="text" 
                                    name="q" 
                                    class="txt txt-main-color txt-no-shadow" 
                                    id="txt-search" 
                                    placeholder="Search.." 
                                    required="true"
                                    v-model="txtSearch">
                            </form>
                        </div>
                    </div>
                    <div class="hd-pos hd-rig">
                        <div class="main-menu">
                            <!--users-->
                            <!-- <button class="btn btn-main" @click="$logOut()">
                                Logout
                            </button> -->
                            <span v-if="menuUser">
                                <div class="list text mobile">
                                    <div>
                                        <router-link :to="{name: 'home'}" :class="navHome">
                                            <span class="txt-site txt-bold txt-11">Home Feeds</span>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="list circle">
                                    <div>
                                        <router-link :to="{name: 'trendings'}" :class="navTrend">
                                            <span class="icn fas fa-lg fa-compass txt-site txt-16"></span>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="list circle">
                                    <div>
                                        <router-link :to="{name: 'following'}" :class="navFollow">
                                            <span class="icn fas fa-lg fa-users txt-site txt-16"></span>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="list circle">
                                    <div>
                                        <router-link :to="{name: 'notif'}" :class="navNotif">
                                            <div class="icn fas fa-lg fa-bell"></div>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="list circle">
                                    <div>
                                        <router-link 
                                            :to="{
                                                name: 'user', 
                                                params: {
                                                    username: $cookie.get('username')
                                                }
                                            }"
                                            :class="navAccount">
                                            <div class="icn image image-30px image-circle" 
                                            :style="{
                                                'background-image': 'url('+urlThumbnailProfile+$cookie.get('foto')+')'
                                            }"></div>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="list create" style="margin-left: 15px;">
                                    <router-link :to="{name: 'create-post'}">
                                        <div class="btn btn-main-color btn-radius">
                                            <span class="fas fa-lg fa-plus txt-site txt-14"></span>
                                            <span class="ttl">Create Post</span>
                                        </div>
                                    </router-link>
                                </div>
                            </span>
                            <!--guess-->
                            <span v-if="menuGuest">
                                <div class="list">
                                    <div>
                                        <router-link to="/login">
                                            <div class="btn btn-grey2-color">
                                                Login
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="list">
                                    <div>
                                        <router-link to="/register">
                                            <div class="btn btn-main-color" style="margin-left: 5px;">
                                                <span>Register</span>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>


		<div id="body">
            <transition>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
            <transition>
                <keep-alive>
                    <router-view name="user" :key="$route.fullPath"></router-view>
                </keep-alive>
            </transition>
            <transition>
                <keep-alive>
                    <router-view name="content" :key="$route.fullPath"></router-view>
                </keep-alive>
            </transition>
            <transition>
                <keep-alive>
                    <router-view name="design" :key="$route.fullPath"></router-view>
                </keep-alive>
            </transition>
            <transition>
                <router-view name="fresh" :key="$route.fullPath"></router-view>
            </transition>
            <div class="padding-10px"></div>
        </div>


		<div>
            <frame-message-ok></frame-message-ok>
            <frame-message-yesno></frame-message-yesno>
            <frame-message-loading></frame-message-loading>
            <frame-message-bottom></frame-message-bottom>
        </div>


	</div>
</template>

<script>

import FrameMessageOk from '@/components/main/message/Ok'
import FrameMessageYesNo from '@/components/main/message/YesNo'
import FrameMessageLoading from '@/components/main/message/Loading'
import FrameMessageBottom from '@/components/main/message/Bottom'

export default {
	name: 'App',
	data () {
        return {
            url: this.baseUrl+'/api/me?token='+this.$cookie.get('jwt'),
            addMenu: false,
            menuUser: false,
            menuGuest: false,
            linkUser: '/',
            txtSearch: '',
            navHome: '',
            navTrend: '',
            navNotif: '',
            navAccount: '',
            navFollow: '',
        }
	},
	components: {
        'frame-message-ok': FrameMessageOk,
        'frame-message-yesno': FrameMessageYesNo,
        'frame-message-loading': FrameMessageLoading,
        'frame-message-bottom': FrameMessageBottom,
    },
    watch: {
        '$route': 'pullMainNav',
    },
    created: function () {
        if (this.$cookie.get('jwt')) {
            this.menuUser = true;
            this.menuGuest = false;
            this.linkUser = '/';
        } else {
            this.menuUser = false;
            this.menuGuest = true;
            this.linkUser = '/welcome';
        }
    },
    methods: {
        pullMainNav () {
            if  (
                    this.$route.name == 'search-posts' ||
                    this.$route.name == 'search-canvas' ||
                    this.$route.name == 'search-users'
                ) 
            {
                this.navHome = ''
                this.navTrend = ''
                this.navNotif = ''
                this.navAccount = ''
                this.navFollow = ''
            }

            if (this.$route.name == 'home') 
            {
                this.navHome = 'active'
                this.navTrend = ''
                this.navNotif = ''
                this.navAccount = ''
                this.navFollow = ''
            } 

            if  (
                    this.$route.name == 'trendings' ||
                    this.$route.name == 'fresh' ||
                    this.$route.name == 'populars' ||
                    this.$route.name == 'topics'
                ) 
            {
                this.navHome = ''
                this.navTrend = 'active'
                this.navNotif = ''
                this.navAccount = ''
                this.navFollow = ''
            }

            if  (
                    this.$route.name == 'following' ||
                    this.$route.name == 'post-following' ||
                    this.$route.name == 'canvas-following'
                ) 
            {
                this.navHome = ''
                this.navTrend = ''
                this.navNotif = ''
                this.navAccount = ''
                this.navFollow = 'active'
            }

            if  (
                    this.$route.name == 'notif' ||
                    this.$route.name == 'notifCtr'
                ) 
            {
                this.navHome = ''
                this.navTrend = ''
                this.navNotif = 'active'
                this.navAccount = ''
                this.navFollow = ''
            } 

            if (this.$route.params.username == this.$cookie.get('username')) 
            {
                this.navHome = ''
                this.navTrend = ''
                this.navNotif = ''
                this.navAccount = 'active'
                this.navFollow = ''
            } 
        },
        doSearch () {
            this.$router.push({
                name: 'search-posts',
                params: {
                    ctr: this.txtSearch.toLowerCase().replace(/ /g, '+'),
                }
            });
        },
        opAddMenu () {
            if (this.addMenu == false) {
                this.addMenu = true;
            } else {
                this.addMenu = false;
            }
        }
    }
}
</script>

<style>
	@import url('./assets/icons/fontawesome/css/all.min.css');
	@import url('./assets/sass/app.css');
</style>
