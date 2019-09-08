<template>
    <div class="story-popup normal">
        <div class="frame-compose">
            <div class="fc-place width-small">
                <div class="fc-top">
                    <div class="sc-header">
                        <div class="sc-place">
                            <div class="sc-grid sc-grid-3x" style="height: 45px;">
                                <div class="sc-col-1"></div>
                                <div class="sc-col-2">
                                    <h3 class="ttl-head ttl-sekunder-color">
                                        Create Canvas
                                    </h3>
                                </div>
                                <div class="sc-col-3 txt-right">
                                    <button 
                                        class="btn btn-grey2-color btn-radius" 
                                        @click="$goBack()">
                                        <span class="fa fa-lg fa-times"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fc-mid no-grid">
                    <form @submit.prevent="doCreatecanvas">
                        <div class="fc-block no-margin-top">
                            <div class="fcb-top">
                                <p class="ttl ctn-main-font ctn-14px ctn-thin ctn-sek-color">
                                    Title
                                </p>
                            </div>
                            <div class="fcb-mid">
                                <input 
                                    type="text" 
                                    name="title" 
                                    id="title-design" 
                                    class="tg txt txt-primary-color" 
                                    placeholder="Such as Robot, Mobile Design etc."
                                    required="true"
                                    v-model="dt.title">
                            </div>
                        </div>
                        <div class="fc-block">
                            <div class="fcb-top">
                                <p class="ttl ctn-main-font ctn-14px ctn-thin ctn-sek-color">
                                    Description [optional]
                                </p>
                            </div>
                            <div class="fcb-mid">
                                <textarea
                                    name="write-design" 
                                    id="write-design" 
                                    class="txt edit-text txt-primary-color ctn ctn-main ctn-sans-serif"
                                    maxlength="250"
                                    placeholder="About your canvas"
                                    v-model="dt.description"></textarea>
                            </div>
                        </div>
                        <div class="fc-block">
                            <div class="fcb-top">
                                <p class="ttl ctn-main-font ctn-14px ctn-thin ctn-sek-color">
                                    Tags [optional]
                                </p>
                            </div>
                            <div class="fcb-mid">
                                <input 
                                type="text" 
                                name="tags" 
                                id="tags-design" 
                                class="tg txt txt-primary-color" 
                                placeholder="Tags1, Tags2, Tags N..."
                                v-model="dt.tags">
                            </div>
                        </div>
                        <div class="fc-block">
                            <div class="fcb-place-button">
                                <input 
                                    type="button" 
                                    value="Cancel" 
                                    class="btn btn-grey2-color"
                                    @click="$goBack()">
                                <input 
                                    type="submit" 
                                    value="Create" 
                                    class="btn btn-main-color">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            urlCreatecanvas: this.baseUrl+'/api/canvas/create/all?token='+this.$cookie.get('jwt'),
            dt: {
                title: '',
                description: '',
                tags: '',
            },
            idcanvas: '',
        }
    },
    methods: {
        doCreatecanvas: function () { 
            this.$openMessageLoading('open', 'Creating Daper');
            axios.post(this.urlCreatecanvas, {
                'title': this.dt.title,
                'description': this.dt.description,
                'tags': this.dt.tags,
            })
            .then(response => {
                this.$openMessageLoading('hide');
                if (response.data.status == 'successful') {
                    var vm = this;
                    this.dt.title = '';
                    this.dt.description = '';
                    this.dt.tags = '';
                    this.idcanvas = response.data.idcanvas;
                    this.$openMessageYesNo('Canvas created, visit now?', function () {
                        // vm.$router.push('/'+vm.$cookie.get('username')+'/canvas/'+vm.idcanvas);
                        // window.location = '/'+vm.$cookie.get('username')+'/canvas/'+vm.idcanvas;
                        vm.$router.replace({name: 'visit-canvas', params: {
                            username: vm.$cookie.get('username'),
                            idcanvas: vm.idcanvas
                        }});
                    });
                } else {
                    this.$openMessageOk(response.data.message);
                }
            })
            .catch(e => {
                this.$openMessageLoading('hide');
                this.$openMessageOk(e.response.statusText);
                console.log(e.response);
                
            });
        }
    }
}
</script>
