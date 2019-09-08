<template>
    <div>

        <div v-if="loading">
            <frame-loading></frame-loading>
        </div>

        <div v-if="emptyTopic">
            <div class="frame-empty">
                <div class="icn fa fa-lg fa-thermometer-empty btn-main-color"></div>
                <div class="ttl padding-15px">Tags Empty</div>
            </div>
        </div>

        <div v-if="placeTopic">
            <div class="frame-topic mn-color" v-for="tag in topics">
                <div 
                    class="bg-cover"
                    :style="{
                        'background-image': 'url('+urlThumbnailStory+tag.images+')'
                    }">
                    <div class="bg-black"></div>
                </div>
                <router-link 
                    :to="{
                        name: 'index-tags', 
                        params: {
                            ctr: tag.tag.toLowerCase().replace(/ /g, '+')
                        }
                    }">
                    <span class="fa fa-lg fa-hashtag"></span>
                    {{ tag.tag }}
                </router-link>
            </div>
        </div>

    </div>
</template>
<script>
import FrameLoading from '../main/FrameLoading';

export default {
    props: ['msg', 'url'],
    data () {
        return {
            loading: false,
            emptyTopic: false,
            placeTopic: false,
            topics: [],
        }
    },
    created: function () {
        this.fetchPaper();
    },
    components: {
        'frame-loading': FrameLoading,
    },
    methods: {
        fetchPaper: function () {
            this.loading = true;
            axios.get(this.url)
            .then(response => {
                this.loading = false;
                if (response.data.tags && response.data.tags.length) {
                    this.placeTopic = true;
                    this.topics = response.data.tags;
                } else {
                    this.placeTopic = true;
                    //this.emptyTopic = true;
                }
            })
            .catch(e => {
                this.placeTopic = true;
                this.loading = false;
                console.log(e);
            })
        }
    }
}
</script>