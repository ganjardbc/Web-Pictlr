<template>
    <div>
        <div class="frame-guess">
            <div class="grid-2x">
                <div class="grid-1">
                    <div class="detail">
                        <div class="padding-top-20px">
                            <h1 class="txt-site txt-white txt-big txt-extra-bold">
                                Built for Creators
                            </h1>
                        </div>
                        <div class="padding-bottom-10px">
                            <h1 class="txt-site txt-white txt-15 txt-thin">
                                What you can do?
                            </h1>
                        </div>
                        <ul>
                            <li>
                                <div class="icn fas fa-lg fa-image"></div>
                                <div class="ttl txt-site txt-white txt-11 txt-thin">
                                    Post much images.
                                </div>
                            </li>
                            <li>
                                <div class="icn fas fa-lg fa-star"></div>
                                <div class="ttl txt-site txt-white txt-11 txt-thin">
                                    Give a rate to posts.
                                </div>
                            </li>
                            <li>
                                <div class="icn fas fa-lg fa-comment-alt"></div>
                                <div class="ttl txt-site txt-white txt-11 txt-thin">
                                    Join on conversations.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="grid-2">
                    <div class="bl sign col-400px">
                        <div class="image image-all">
                            <img src="@/assets/img/Pictlr/9.png">
                        </div>
                        <div class="padding-20px">
                            <p class="txt-site txt-14 txt-bold txt-main">
                                An virtual canvas.
                            </p>
                        </div>
                        <div class="banner">
                            <div class="cover">
                                <div class="title">
                                    <div class="padding-10px">
                                        <p class="txt-site txt-11 txt-thin txt-main">
                                            Join pictlr today.
                                        </p>
                                    </div>
                                    <div class="frame-info width-all">
                                        <router-link to="/login">
                                            <button class="mrg-bottom create btn btn-sekunder-color" id="compose">
                                                <span class="ttl-post">Login</span>
                                            </button>
                                        </router-link>
                                        <router-link to="/register">
                                            <button class="btn btn-main-color" id="compose">
                                                <span class="ttl-post">Register</span>
                                            </button>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <ul>
                    <li>
                        <router-link to="/fresh">Fresh</router-link>
                    </li>
                    <li>
                        <router-link to="/trendings">Trendings</router-link>
                    </li>
                    <li>
                        <router-link to="/populars">Populars</router-link>
                    </li>
                    <li>
                        <a href="#">About Us</a>
                    </li>
                    <li>
                        <a href="#">Privacy</a>
                    </li>
                    <li>
                        <a href="#">Terms</a>
                    </li>
                    <li>
                        <a href="#">Policy</a>
                    </li>
                    <li>
                        <a href="#">FAQ</a>
                    </li>
                    <li>
                        <a href="#">Jobs</a>
                    </li>
                    <li>
                        <a href="#">Help</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    beforeCreate: function () {
        if (this.$cookie.get('jwt')) {
            this.$router.push('/');
        }
    }
}
</script>

