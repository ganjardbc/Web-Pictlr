<template>
    <div>
        <div v-if="rest && rest.length">
            <div v-for="(dt, idx) in rest" v-bind:key="idx">
                <div>
                    <div class="frame-comment comment-owner">
						<div class="dt-1">
							<router-link :to="{path: '/'+dt.username}">
								<div 
                                    class="image image-45px image-circle" 
                                    :style="{
                                        'background-image': 'url('+urlThumbnailProfile+dt.foto+')',
                                    }" ></div>
							</router-link>
						</div>
						<div class="dt-2">
							<div class="desk comment-owner-radius">
								<div class="comment-main">
                                    <router-link :to="{path: '/'+dt.username}">
                                        <strong class="comment-name">
                                            {{ dt.username }}
                                        </strong>
									</router-link>
									<span>{{ dt.description }}</span>
								</div>
							</div>
							<div class="tgl">
								{{ dt.created | moment("from", "now") }}
							</div>
						</div>
					</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['url'],
    data () {
        return {
            rest: [],
        }
    },
    created: function () {
        this.fetchGetResponse();
    },
    methods: {
        fetchGetResponse: function () {
            axios.get(this.url)
            .then(response => {
                this.rest = response.data.response;
            })
            .catch(e => {
                this.$openMessageBottom(e.response.statusText);
            });
        },
    }
}
</script>

