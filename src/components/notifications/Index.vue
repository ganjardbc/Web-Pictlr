<template>
    <div>
        <div>
            <div class="frame-home frame-edit">
                <div class="grid-2x col-800px">
                    <div class="grid-1 mobile fixed">
                        <frame-menu-notifications></frame-menu-notifications>
                    </div>
                    <div class="grid-2">
                        <div>
                            <div class="padding-15px">
                                <h1 class="txt-site txt-small txt-main txt-extra-bold">
                                    Notifications
                                </h1>
                            </div>
                        </div>
                        <frame-notifications :url="urlGetNotif"></frame-notifications>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Menu from './Menu.vue';
import FrameNotifications from './Card';

export default {
    data () {
        return {
            urlGetNotif: '',
        }
    },
    created: function () {
        if (this.$route.name == 'notif') {
            this.urlGetNotif = this.baseUrl+'/api/notifications/all?token='+this.$cookie.get('jwt');   
        } else {
            this.urlGetNotif = this.baseUrl+'/api/notifications/topic/'+this.$route.params.ctr+'?token='+this.$cookie.get('jwt');
        }
    },
    components: {
        'frame-menu-notifications': Menu,
        'frame-notifications': FrameNotifications,
    }
}
</script>
