<template>
    <div class="story-popup normal">
        <div class="frame-compose">
            <div v-if="loading">
                <frame-loading :post="center"></frame-loading>
            </div>
            <div v-if="emptyCanvas">
                <div class="fc-place width-small">
                    <div class="frame-empty">
                        <div class="icn fa fa-lg fa-thermometer-empty btn-main-color"></div>
                        <div class="ttl padding-15px">{{ emptyMessage }}</div>
                    </div>
                </div>
            </div>
            <div v-if="placeCanvas">
                <div class="fc-place width-small">
                    <div class="fc-top">
                        <div class="sc-header">
                            <div class="sc-place">
                                <div class="sc-grid sc-grid-3x" style="height: 45px;">
                                    <div class="sc-col-1">
                                        <button 
                                            class="btn btn-grey2-color btn-circle" 
                                            @click="$goBack()">
                                            <span class="fa fa-lg fa-chevron-left"></span>
                                        </button>
                                    </div>
                                    <div class="sc-col-2">
                                        <h3 class="ttl-head ttl-sekunder-color">
                                            Edit Canvas
                                        </h3>
                                    </div>
                                    <div class="sc-col-3 txt-right">
                                        <button 
                                            class="btn btn-grey2-color btn-radius" 
                                            @click="$deletePaper($route.params.idcanvas)">
                                            <span class="fa fa-lg fa-trash-alt"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fc-mid no-grid">
                        <form @submit.prevent="doEditCanvas">
                            <div class="fc-block no-margin-top">
                                <div class="fcb-top">
                                    <p class="ttl txt-site txt-10 txt-primary txt-thin">
                                        Title [required]
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
                                    <p class="ttl txt-site txt-10 txt-primary txt-thin">
                                        Description
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
                                    <p class="ttl txt-site txt-10 txt-primary txt-thin">
                                        Tags
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
                                        value="Save" 
                                        class="btn btn-main-color">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FrameLoading from '../main/FrameLoading';

export default {
    data () {
        return {
            urlDetailCanvas: this.baseUrl+'/api/canvas/detail/'+this.$route.params.idcanvas+'?token='+this.$cookie.get('jwt'),
            urlEditCanvas: this.baseUrl+'/api/canvas/edit?token='+this.$cookie.get('jwt'),
            dt: {
                idcanvas: '',
                title: '',
                description: '',
                tags: '',
            },
            center: 'center',
            loading: false,
            placeCanvas: false,
            emptyCanvas: false,
            emptyMessage: 'Canvas Empty',
        }
    },
    created: function () {
        this.fecthDetailCanvas();
    },
    components: {
        'frame-loading': FrameLoading,
    },
    methods: {
        fecthDetailCanvas: function () {
            this.loading = true;
            this.detailCanvas = false;
            this.emptyCanvas = false;
            axios.get(this.urlDetailCanvas)
            .then(response => {
                this.loading = false;
                if (response.data.detail && response.data.detail.length) {
                    this.placeCanvas = true;
                    this.dt.idcanvas = response.data.detail[0].idcanvas;
                    this.dt.title = response.data.detail[0].title;
                    this.dt.description = response.data.detail[0].description;
                    //this.dt.tags = response.data.detail[0].tags;
                } else {
                    this.emptyCanvas = true;
                    this.emptyMessage = 'Canvas Empty';
                }
            })
            .catch(e => {
                this.loading = false;
            });
        },
        doEditCanvas: function () { 
            var vm = this;
            this.$openMessageLoading('open', 'Editing Daper');
            axios.post(this.urlEditCanvas, {
                'idcanvas': this.dt.idcanvas,
                'title': this.dt.title,
                'description': this.dt.description,
                'tags': this.dt.tags,
            })
            .then(response => {
                this.$openMessageLoading('hide');
                if (response.data.status == 'successful') {
                    /*this.dt.title = '';
                    this.dt.description = '';
                    this.dt.tags = '';*/
                    this.idcanvas = response.data.idcanvas;
                    // this.$openMessageYesNo('Canvas edited, visit now?', function () {
                    //     //vm.$router.push('/'+vm.$cookie.get('username')+'/canvas/'+vm.idcanvas);
                    //     // window.location = '/'+vm.$cookie.get('username')+'/canvas/'+vm.idcanvas;
                    //     vm.$router.replace({name: 'visit-canvas', params: {
                    //         username: vm.$cookie.get('username'),
                    //         idcanvas: vm.idcanvas
                    //     }});
                    // });
                    vm.$router.push({name: 'visit-canvas', params: {
                        username: vm.$cookie.get('username'),
                        idcanvas: vm.idcanvas
                    }});
                } else {
                    this.$openMessageOk(response.data.message);
                }
            })
            .catch(e => {
                this.$openMessageLoading('hide');
                this.$openMessageOk(e.response.statusText);
            });
        }
    }
}
</script>
