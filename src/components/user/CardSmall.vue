<template>
    <div>
        <div v-if="placeUsers">
            <div class="place-users">
                <span v-for="user in users">
                    <div class="frame-user">
                        <div class="top">
                            <router-link :to="{path: '/'+user.username}">
                                <div 
                                    class="icn-circle image image-circle image-150px" 
                                    :style="{'background-image': 'url('+urlThumbnailProfile+user.foto+')'}"></div>
                            </router-link>
                        </div>
                        <div class="mid">
                            {{ user.name }}
                        </div>
                        <div class="bot">
                            <ul class="menu">
                                <li>{{ user.ttl_designs }} Designs</li>
                                <li class="icn">
                                    <span class="fa fa-lg fa-circle"></span>
                                </li>
                                <li>{{ user.ttl_papers }} Papers</li>
                            </ul>
                        </div>
                    </div>
                </span>
            </div>
        </div>

        <div v-if="emptyUser">
            <div class="frame-empty">
                <div class="icn fa fa-lg fa-thermometer-empty btn-main-color"></div>
                <div class="ttl padding-15px">{{ emptyMessage }}</div>
            </div>
        </div>

        <div v-if="loading">
            <frame-loading></frame-loading>
        </div>

    </div>
</template>
<script>
import FrameLoading from '../main/FrameLoading';

export default {
    props: ['url'],
    data () {
        return {
            users: [],
            emptyMessage: '',
            emptyUser: false,
            loading: false,
            placeUsers: false,
        }
    },
    components: {
        'frame-loading': FrameLoading,
    },
    created: function () {
        this.fetchUser();
    },
    methods: {
        fetchUser () {
            this.emptyUser = false
            this.loading = true
            axios
            .get(this.url)
            .then(response => {
                this.loading = false
                if (response.data.users.length) {
                    this.placeUsers = true
                    this.users = response.data.users
                }
                if (response.data.users.length == 0) {
                    this.emptyUser = true
                    this.emptyMessage = 'User empty'
                }
                if (response.data.status != 'success') {
                    this.emptyUser = true
                    this.emptyMessage = response.data.message
                }
            })
            .catch(e => {
                this.loading = false
                this.emptyMessage = e.response.statusText
                this.emptyUser = true
            })
        }
    }
}
</script>

