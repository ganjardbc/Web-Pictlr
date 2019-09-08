<template>
<div>
    <div class="frame-home frame-edit">
        <div class="grid-2x col-800px">
            <div class="grid-1">
                <frame-menu-setting></frame-menu-setting>
            </div>
            <div class="grid-2">
                <div>
                    <div v-if="loading">
                        <frame-loading></frame-loading>
                    </div>
                    <div v-if="emptyProfile">
                        <div class="frame-empty">
                            <div class="ctn-main-font ctn-sek-color ctn-big">
                                <div class="fa fa-lg fa-thermometer-empty"></div>
                            </div>
                            <div class="ttl padding-15px">{{ message }}</div>
                        </div>
                    </div>
                    <div v-if="frameProfile">
                        <div>
                            <div>
                                <form id="form-edit-profile" @submit.prevent="doSave">
                                    <div class="sc-header">
                                        <div class="sc-place">
                                            <div class="">
                                                <div class="sc-grid sc-grid-1x">
                                                    <div class="sc-col-1 padding-top-15px">
                                                        <h3 class="txt-site txt-small txt-main txt-extra-bold">
                                                            Basic Informations
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="frame-home frame-edit">
                                        <div class="compose" id="create">
                                            <div class="main">
                                                <div class="edit-body">
                                                    <div class="edit-block">
                                                        <div class="place-edit">
                                                            <div class="pe-1">
                                                                Your email address
                                                            </div>
                                                            <div class="pe-2">
                                                                <input 
                                                                    type="text" 
                                                                    name="edit-email" 
                                                                    class="txt txt-primary-color" 
                                                                    id="edit-email" 
                                                                    required="true" 
                                                                    v-model="pp.email"
                                                                    placeholder="Email">
                                                            </div>
                                                        </div>
                                                        <div class="place-edit">
                                                            <div class="pe-1">
                                                                About you
                                                            </div>
                                                            <div class="pe-2">
                                                                <textarea 
                                                                    class="txt edit-text txt-primary-color" 
                                                                    id="edit-about" 
                                                                    v-model="pp.about"
                                                                    placeholder="About you"></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="place-edit">
                                                            <div class="pe-1">
                                                                Your website
                                                            </div>
                                                            <div class="pe-2">
                                                                <input 
                                                                    type="url" 
                                                                    name="edit-website" 
                                                                    class="txt txt-primary-color" 
                                                                    id="edit-website" 
                                                                    v-model="pp.website"
                                                                    placeholder="website">
                                                            </div>
                                                        </div>
                                                        <div class="place-edit">
                                                            <div class="pe-1"></div>
                                                            <div class="pe-2 pe-btn">
                                                                <input 
                                                                    type="button" 
                                                                    name="edit-cancel" 
                                                                    class="btn btn-grey2-color" 
                                                                    value="Cancel"
                                                                    @click="$goBack()">
                                                                <input 
                                                                    type="submit" 
                                                                    name="edit-save" 
                                                                    class="btn btn-main-color" 
                                                                    value="Save">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="padding-bottom-15px"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import FrameLoading from '../../main/FrameLoading';
import SettingMenu from './SettingMenu.vue';

export default {
    data () {
        return {
            url: this.baseUrl+'/api/user/'+this.$cookie.get('username'),
            urlSave: this.baseUrl+'/api/me/basic?token='+this.$cookie.get('jwt'),
            pp: {
                email: '',
                about: '',
                website: ''
            },
            loading: false,
            frameProfile: false,
            emptyProfile: false,
            message: ''
        }
    },
    components: {
        'frame-menu-setting': SettingMenu,
        'frame-loading': FrameLoading,
    },
    created: function () {
        this.fetchData();
    },
    methods: {
        doSave: function () {
            this.$openMessageLoading('open', 'Saving informations');
            axios.post(this.urlSave, {
                'email': this.pp.email,
                'about': this.pp.about,
                'website': this.pp.website
            })
            .then(response => {
                this.$openMessageLoading('hide');
                if (response.data.status == 'successfull') {
                    this.$openMessageOk(response.data.message);
                } else {
                    this.$openMessageOk(response.data.message);
                }
            })
            .catch(e => {
                this.$openMessageLoading('hide');
                this.$openMessageOk(e.response.data.error);
            });
        },
        fetchData: function () {
            this.frameProfile = false;
            this.emptyProfile = false;
            this.loading = true;
            axios.get(this.url)
            .then(response => {
                if (response.data && response.data.length) {
                    this.frameProfile = true;
                    this.pp.email = response.data[0].email;
                    this.pp.about = response.data[0].about;
                    this.pp.website = response.data[0].website;
                } else {
                    this.message = 'User Empty';
                    this.emptyProfile = true;
                }
                this.loading = false;
            })
            .catch(e => {
                this.message = 'There is an error';
                this.loading = false;
            });
        }
    }
}
</script>
