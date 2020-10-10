<template>
    <div class="story-popup normal">
        <div class="frame-compose">
            <div class="fc-place">
                <div class="fc-top">
                    <div class="sc-header">
                        <div class="sc-place">
                            <div>
                                <div class="sc-grid sc-grid-3x" style="height: 45px;">
                                    <div class="sc-col-1">
                                        <!--
                                        <button 
                                            class="btn btn-grey2-color btn-circle" 
                                            @click="$goBack()">
                                            <span class="fa fa-lg fa-chevron-left"></span>
                                        </button>
                                        -->
                                    </div>
                                    <div class="sc-col-2">
                                        <h3 class="ttl-head ttl-sekunder-color">
                                            Save Post
                                        </h3>
                                    </div>
                                    <div class="sc-col-3 txt-right">
                                        <button 
                                            class="btn btn-grey2-color btn-circle" 
                                            @click="$goBack()">
                                            <span class="fa fa-lg fa-times"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fc-mid">
                    <div class="fc-col-1">
                        <div class="fc-add-pict">
                            <div class="fc-image">
                                <div 
                                    class="image image-full image-radius" 
                                    :style="{'background-image': 'url('+$cookie.get('design')+')'}">
                                </div>
                                <div class="txt-site txt-11 txt-red txt-bold padding-top-10px">
                                    {{ messageFile }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fc-col-2">
                        <div v-if="choosePaper">
                            <div class="fc-choose-canvas">
                                <div class="fccc-top padding-bottom-5px">
                                    <p class="ttl ctn-main-font ctn-14px ctn-thin ctn-sek-color">
                                        Choose canvas
                                    </p>
                                </div>
                                <div class="fccc-mid">
                                    <div v-if="loading">
                                        <frame-loading></frame-loading>
                                    </div>
                                    <div v-if="frameSmallPaperEmpty">
                                        <div class="padding-20px">
                                            <div class="padding-20px"></div>
                                            <div class="frame-empty no-pad">
                                                <div class="icn fa fa-lg fa-thermometer-empty btn-main-color"></div>
                                                <div class="ctn-main-font ctn-sek-color ctn-18px">
                                                    Paper Empty
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="frameSmallPaperContent">
                                        <div v-for="(pp, idx) in paper" v-bind:key="idx">
                                            <div 
                                                class="frame-small-paper" 
                                                :id="'small-paper-'+pp.idcanvas">
                                                <div 
                                                    class="cover" 
                                                    :data-key="pp.idcanvas"
                                                    @click="doSave(pp.idcanvas)"></div>
                                                <div class="grid-1">
                                                    <div v-if="pp.cover">
                                                        <div 
                                                            class="image image-45px image-radius"
                                                            :data-key="baseUrl + '/img/story/thumbnails/' + pp.cover"
                                                            :style="{'background-image': 'url('+baseUrl + '/img/story/thumbnails/' + pp.cover+')'}">
                                                        </div>
                                                    </div>
                                                    <div v-else>
                                                        <div 
                                                            class="image image-45px image-radius"
                                                            data-key="empty">
                                                            <span class="icn fa fa-lg fa-th-large"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="grid-2">
                                                    <div class="ttl ctn-main-font ctn-font-normal ctn-16px ctn-sek-color ctn-bold">{{ pp.title }}</div>
                                                </div>
                                                <div class="grid-3">
                                                    <div v-if="dt.idcanvas == pp.idcanvas">
                                                        <button 
                                                            class="chk btn btn-circle btn-primary-color selected" 
                                                            :data-key="pp.idcanvas"
                                                            @click="doSave(pp.idcanvas)"
                                                            type="button">
                                                            <span class="fa fa-lg fa-bookmark"></span>
                                                        </button>
                                                    </div>
                                                    <div v-else>
                                                        <button 
                                                            class="chk btn btn-circle btn-primary-color" 
                                                            :data-key="pp.idcanvas"
                                                            @click="doSave(pp.idcanvas)"
                                                            type="button">
                                                            <span class="fa fa-lg fa-bookmark"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="fccc-bot">
                                    <div class="frame-small-paper" @click="showCreatePaper">
                                        <div class="grid-1">
                                            <button 
                                                class="chk btn btn-circle btn-main-color" 
                                                type="button"
                                                @click="showCreatePaper">
                                                <span class="fa fa-1x fa-plus"></span>
                                            </button>
                                        </div>
                                        <div class="grid-2">
                                            <div class="ttl ctn-main-font ctn-font-normal ctn-16px ctn-sek-color ctn-bold">
                                                Create Canvas
                                            </div>
                                        </div>
                                        <div class="grid-3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="createPaper">
                            <div class="fc-choose-canvas">
                                <div class="fccc-top">
                                    <p class="ttl ctn-main-font ctn-14px ctn-thin ctn-sek-color">
                                        Create canvas
                                    </p>
                                </div>
                                <div class="fccc-mid">
                                    <div class="fc-block">
                                        <div class="fcb-top">
                                            <p class="ttl ctn-main-font ctn-14px ctn-thin ctn-sek-color">
                                                Title [required]
                                            </p>
                                        </div>
                                        <div class="fcb-mid">
                                            <input 
                                                type="text" 
                                                name="title-paper" 
                                                id="title-paper" 
                                                class="tg txt txt-primary-color" 
                                                placeholder="Such as Robot, Mobile Design etc."
                                                v-model="titlePaper"
                                                required>
                                        </div>
                                        <div class="fc-block">
                                            <div class="fcb-place-button">
                                                <input 
                                                    type="button" 
                                                    value="Cancel" 
                                                    class="btn btn-grey2-color"
                                                    @click="cancelCreatePaper">
                                                <input 
                                                    type="submit" 
                                                    value="Create" 
                                                    class="btn btn-main-color"
                                                    @click="doCreatePaper">
                                            </div>
                                        </div>
                                    </div>
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
import FrameLoading from '../main/FrameLoading';

export default {
    data () {
        return {
            urlDesign: this.baseUrl+'/api/bookmark/save?token='+this.$cookie.get('jwt'),
            urlCheckDesign: this.baseUrl+'/api/bookmark/check?token='+this.$cookie.get('jwt'),
            urlGetPaper: this.baseUrl+'/api/canvas/get?token='+this.$cookie.get('jwt'),
            urlCreatePaper: this.baseUrl+'/api/canvas/create?token='+this.$cookie.get('jwt'),
            paper: [],
            titlePaper: '',
            placeTitlepaper: 'Choose Canvas',
            placeIdcanvas: '',
            placePictPaper: 'empty',
            icnPlus: true,
            txtMessage: false,
            messageFile: '',
            basicInfo: false,
            choosePaper: true,
            createPaper: false,
            frameSmallPaperContent: false,
            frameSmallPaperEmpty: false,
            refreshSmallPaper: true,
            framePaperMessage: false,
            loading: false,
            paperMessage: '',
            dt: {
                title: '',
                description: '',
                tags: '',
                idcanvas: ''
            },
        }
    },
    created: function () {
        this.doCheck();
        this.fetchDataPaper();
    },
    components: {
        'frame-loading': FrameLoading,
    },
    methods: {
        cancelDesign: function () {
            this.icnPlus = true;
            this.txtMessage = false;
            $('#add-design').hide();
        },
        showChoosePaper: function () {
            this.basicInfo = false;
            this.choosePaper = true;
            if (this.refreshSmallPaper == true) 
            {
                this.fetchDataPaper();
                this.refreshSmallPaper = false;
            }
        },
        cancelChoosePaper: function () {
            this.basicInfo = true;
            this.choosePaper = false;
        },
        showCreatePaper: function () {
            this.basicInfo = false;
            this.choosePaper = false;
            this.createPaper = true;
        },
        cancelCreatePaper: function () {
            this.choosePaper = true;
            this.createPaper = false;
            this.basicInfo = false;
        },
        doneChoosePaper: function () {
            this.basicInfo = true;
            this.choosePaper = false;
            this.createPaper = false;
            this.framePaperMessage = false;
            this.icnSelect = 'select place-paper';
        },
        doCheck () {
            var idimage = this.$cookie.get('idimage');
            axios.post(
                this.urlCheckDesign,
                {
                    'idimage': idimage,
                }
            )
            .then(response => {
                if (response.data.status == 'bookmark') {
                    this.txtMessage = true;
                    this.messageFile = response.data.message;
                    this.dt.idcanvas = response.data.idcanvas;
                }
            })
            .catch(e => {
                this.$openMessageBottom('open', e.response.message);
                console.log(e.response);
            });
        },
        doSave (idcanvas) {
            var id = this.$cookie.get('id');
            var idimage = this.$cookie.get('idimage');
            var idbookmark = this.$cookie.get('idbookmark');
            axios.post(
                this.urlDesign,
                {
                    'id': id,
                    'idbookmark': idbookmark,
                    'idimage': idimage,
                    'idcanvas': idcanvas,
                    'description': this.dt.description
                }
            )
            .then(response => {
                if (response.data.status == 'bookmark') 
                {
                    this.$openMessageBottom('open', response.data.message);
                    this.$goBack();
                }
                else 
                {
                    this.$openMessageBottom('open', response.data.message);
                    this.txtMessage = false;
                    this.messageFile = '';
                }
            })
            .catch(e => {
                if (e.response.status == 500) 
                {
                    this.$openMessageBottom('open', e.response.statusText);
                } else {
                    this.$openMessageBottom('open', e.response.message);   
                }
                console.log(e.response);
            });
        },
        doCreatePaper: function () {
            if (this.titlePaper) 
            {
                axios.post(this.urlCreatePaper, {
                    'title': this.titlePaper,
                    'content': '',
                })
                .then(response => {
                    this.placeTitlepaper = response.data.title;
                    this.placeIdcanvas = response.data.idcanvas;
                    this.dt.idcanvas = response.data.idcanvas;
                    this.refreshSmallPaper = true;
                    this.titlePaper = '';
                    this.cancelCreatePaper();
                    this.fetchDataPaper();
                    this.doSave(this.dt.idcanvas);
                })
                .catch(e => {
                    this.$openMessageOk(e.response.data.error);
                });
            } 
            else 
            {
                $('#title-paper').focus();
            }
        },
        fetchDataPaper: function () {
            var vm = this;
            vm.frameSmallPaperEmpty = false;
            vm.frameSmallPaperContent = false;
            this.loading = true;
            axios.get(this.urlGetPaper)
            .then(response => {
                this.loading = false;
                if (response.data.status == 'success') 
                {
                    vm.frameSmallPaperEmpty = false;
                    vm.frameSmallPaperContent = true;
                    vm.paper = response.data.canvas;
                } 
                else 
                {
                    vm.frameSmallPaperEmpty = true;
                    vm.frameSmallPaperContent = false;
                }
            })
            .catch(e => {
                this.loading = false;
                if (e.response.data.error) 
                {
                    this.$openMessageOk(e.response.data.error);
                } 
                else 
                {
                    this.$openMessageOk(e.response.statusText);
                }
            });
        }
    }
}
</script>
