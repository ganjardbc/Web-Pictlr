<template>
    <div class="compose" id="create">
        <div class="main">
            <div class="edit-body">
                <div class="edit-block padding-top-15px">
                    <div class="edit-block-sub-title">Setting</div>
                    <ul>
                        <router-link :to="{name: 'setting-basic'}">
                            <li :class="basic">
                                <div class="ed-1">
                                    Basic Informations
                                </div>
                                <div class="ed-2"></div>
                            </li>
                        </router-link>
                        <router-link :to="{name: 'setting-profile'}">
                            <li :class="profile">
                                <div class="ed-1">
                                    Profile
                                </div>
                                <div class="ed-2"></div>
                            </li>
                        </router-link>
                        <router-link :to="{name: 'setting-password'}">
                            <li :class="password">
                                <div class="ed-1">
                                    Change Password
                                </div>
                                <div class="ed-2"></div>
                            </li>
                        </router-link>
                    </ul>
                </div>
                <div class="edit-block">
                    <div class="edit-block-sub-title">Others</div>
                    <ul>
                        <li @click="$openMessageOk('Under constructions')">
                            <div class="ed-1 txt-site txt-danger">
                                Delete this Account
                            </div>
                            <div class="ed-2"></div>
                        </li>
                        <li @click="$logOut()">
                            <div class="ed-1 txt-site txt-safe">
                                Logout
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
            basic: '',
            profile: '',
            password: '',
        }
    },
    created: function () {
        if (this.$route.name == 'setting-basic' || this.$route.name == 'user-setting') {
            this.basic = 'active';
            this.profile = '';
            this.password = '';
        }
        if (this.$route.name == 'setting-profile') {
            this.basic = '';
            this.profile = 'active';
            this.password = '';
        }
        if (this.$route.name == 'setting-password') {
            this.basic = '';
            this.profile = '';
            this.password = 'active';
        }
    },
    beforeCreate () {
        if (!this.$cookie.get('jwt')) {
            this.$router.push('/welcome');
        }
    },
}
</script>

