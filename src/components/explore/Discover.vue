<template>
    <div class="col-full">
        <div class="width width-700px width-center padding-20px">
            <h1 class="txt-site txt-big txt-center txt-main txt-extra-bold">
                Discover Topics
            </h1>
            <p class="txt-site txt-11 txt-primary txt-center">
                Explore 100k more posts everyday!
            </p>
        </div>
        <div>
            <frame-topic :url="urlGetTopic"></frame-topic>
        </div>
    </div>
</template>
<script>
import FrameTopic from '../tags/CardBig';

export default {
    data () {
        return {
            urlGetTopic: this.baseUrl+'/api/topic/top',
        }
    },
    components: {
        'frame-topic': FrameTopic,
    }
}
</script>
