<template>
    <div class="col-full">
        <div class="width width-center width-300px padding-bottom-20px">
            <div class="navigator nav-2x nav-theme-3" id="user-nav">
                <ul>
                    <!-- <router-link :to="{name: 'user-overviews', params: {username: $route.params.username}}">
                        <li :class="userOverviews">
                            <div class="icn">Overviews</div>
                        </li>
                    </router-link> -->
                    <router-link :to="{name: 'user-posts', params: {username: $route.params.username}}">
                        <li :class="userDesigns">
                            <div class="icn">Posts</div>
                        </li>
                    </router-link>
                    <router-link :to="{name: 'user-canvas', params: {username: $route.params.username}}">
                        <li :class="userCanvas">
                            <div class="icn">Canvas</div>
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['name'],
    data () {
        return {
            userCanvas: '',
            userDesigns: '',
            userSaved: '',
            userOverviews: '',
        }
    },
    created: function () {
        if (this.name == 'design') {
            this.userCanvas = '';
            this.userDesigns = 'active';
            this.userSaved = '';
            this.userOverviews = '';
        }
        if (this.name == 'canvas') {
            this.userCanvas = 'active';
            this.userDesigns = '';
            this.userSaved = '';
            this.userOverviews = '';
        }
        if (this.name == 'saved') {
            this.userCanvas = '';
            this.userDesigns = '';
            this.userSaved = 'active';
            this.userOverviews = '';
        }
        if (this.name == 'overview') {
            this.userCanvas = '';
            this.userDesigns = '';
            this.userSaved = '';
            this.userOverviews = 'active';
        }
    }
}
</script>
