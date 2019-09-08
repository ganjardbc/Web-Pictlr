<template>
    <div class="col-full padding-bottom-20px">
        <div class="width width-center width-350px">
            <div class="navigator nav-3x nav-theme-3" id="user-nav">
                <ul>
                    <router-link :to="{
                        name: 'search-posts',
                        params: {
                            ctr: $route.params.ctr,
                        }
                    }">
                        <li :class="userPosts">
                            <div class="icn">Posts</div>
                        </li>
                    </router-link>
                    <router-link :to="{
                        name: 'search-canvas',
                        params: {
                            ctr: $route.params.ctr,
                        }
                    }">
                        <li :class="userPapers">
                            <div class="icn">Canvas</div>
                        </li>
                    </router-link>
                    <router-link :to="{
                        name: 'search-users',
                        params: {
                            ctr: $route.params.ctr,
                        }
                    }">
                        <li :class="userUsers">
                            <div class="icn">Users</div>
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            userPapers: '',
            userPosts: '',
            userUsers: '',
            txtSearch: this.$route.query.q,
            ctrSearch: this.$route.name,
        }
    },
    created: function () {
        if (this.ctrSearch == 'search-posts' || this.ctrSearch == 'search') {
            this.userPapers = '';
            this.userPosts = 'active';
            this.userUsers = '';
        }
        if (this.ctrSearch == 'search-canvas') {
            this.userPapers = 'active';
            this.userPosts = '';
            this.userUsers = '';
        }
        if (this.ctrSearch == 'search-users') {
            this.userPapers = '';
            this.userPosts = '';
            this.userUsers = 'active';
        }
    }
}
</script>
