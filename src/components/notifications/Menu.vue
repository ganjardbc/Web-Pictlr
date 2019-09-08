<template>
    <div class="compose" id="create">
        <div class="main">
            <div class="edit-body">
                <div class="edit-block">
                    <div class="edit-block-sub-title">
                        Navigations
                    </div>
                    <ul id="nav-notif">
                        <router-link :to="{name: 'notif'}">
                            <li :class="allnotif">
                                <div class="ed-1">
                                    All Notifications
                                </div>
                                <div class="ed-2"></div>
                            </li>
                        </router-link>
                        <router-link :to="{name: 'notifCtr', params: {ctr: 'saves'}}">
                            <li :class="saves">
                                <div class="ed-1">
                                    Saves
                                </div>
                                <div class="ed-2"></div>
                            </li>
                        </router-link>
                        <!-- <router-link :to="{name: 'notifCtr', params: {ctr: 'likes'}}">
                            <li :class="likes">
                                <div class="ed-1">
                                    Likes
                                </div>
                                <div class="ed-2"></div>
                            </li>
                        </router-link> -->
                        <router-link :to="{name: 'notifCtr', params: {ctr: 'response'}}">
                            <li :class="response">
                                <div class="ed-1">
                                    Response
                                </div>
                                <div class="ed-2"></div>
                            </li>
                        </router-link>
                        <router-link :to="{name: 'notifCtr', params: {ctr: 'watch'}}">
                            <li :class="watch">
                                <div class="ed-1">
                                    Watched
                                </div>
                                <div class="ed-2"></div>
                            </li>
                        </router-link>
                    </ul>
                </div>
                <div class="edit-block">
                    <div class="edit-block-sub-title">
                        Others
                    </div>
                    <ul>
                        <li @click="$openMessageOk('Under constructions')">
                            <div class="ed-1 txt-site txt-danger">
                                Clear Notifications
                            </div>
                            <div class="ed-2"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            allnotif: '',
            saves: '',
            response: '',
            likes: '',
            watch: '',
        }
    },
    created: function () {
        if (this.$route.name == 'notif') {
            this.allnotif = 'active';
            this.saves = '';
            this.response = '';
            this.likes = '';
            this.watch = '';
        } else {
            if (this.$route.params.ctr == 'saves') {
                this.allnotif = '';
                this.saves = 'active';
                this.response = '';
                this.likes = '';
                this.watch = '';
            }
            if (this.$route.params.ctr == 'response') {
                this.allnotif = '';
                this.saves = '';
                this.response = 'active';
                this.likes = '';
                this.watch = '';
            }
            if (this.$route.params.ctr == 'likes') {
                this.allnotif = '';
                this.saves = '';
                this.response = '';
                this.likes = 'active';
                this.watch = '';
            }
            if (this.$route.params.ctr == 'watch') {
                this.allnotif = '';
                this.saves = '';
                this.response = '';
                this.likes = '';
                this.watch = 'active';
            }
        }
    }
}
</script>

