<template>
<div class="story-popup normal">
    <div class="frm-sign">
        <div class="fs-top" style="
            width: 300px;
            height: 150px;
            margin: auto;
        ">
            <router-link to="/welcome">
                <div class="image image-all">
                    <img src="@/assets/img/Pictlr/9.png">
                </div>
            </router-link>
            <div class="padding-top-5px">
                <p class="txt-site txt-14 txt-primary txt-bold">
                    Login
                </p>
            </div>
        </div>
        <div class="fs-mid">

            <form @submit.prevent="doLogin()">
                
                <div class="fs-text" v-if="frameErr">
                    <div class="txt-site txt-11 txt-danger">
                        {{ message }}
                    </div>
                </div>

                <div class="fs-block">
                    <div class="fs-left">
                        <div class="icn fa fa-lg fa-user"></div>
                    </div>
                    <div class="fs-right">
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            class="txt txt-primary-color"
                            placeholder="Email or username"
                            required="required"
                            v-model="user.email">
                    </div>
                </div>
                <div class="padding-top-10px" v-if="frameErrEmail">
                    <div class="txt-site txt-11 txt-danger">
                        {{ messageEmail }}
                    </div>
                </div>

                <div class="padding-10px"></div>

                <div class="fs-block">
                    <div class="fs-left">
                        <div class="icn fa fa-lg fa-key"></div>
                    </div>
                    <div class="fs-right">
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            class="txt txt-primary-color"
                            required="required"
                            placeholder="Password"
                            v-model="user.password">
                    </div>
                </div>
                <div class="padding-top-10px" v-if="frameErrPass">
                    <div class="txt-site txt-11 txt-danger">
                        {{ messagePass }}
                    </div>
                </div>

                <div class="padding-10px"></div>

                <div class="fs-button">
                    <router-link to="/register">
                        <input 
                            type="button" 
                            value="Register" 
                            class="btn btn-main2-color" 
                            style="float: left">
                    </router-link>
                    <input 
                        type="submit" 
                        :value="valLogin" 
                        :disabled="disLogin"
                        class="btn btn-main-color">
                </div>

            </form>

        </div>
    </div>
</div>
</template>
<script>
export default {
    data () {
        return {
            url: this.baseUrl+'/api/auth/login',
            message: '',
            messageEmail: '',
            messagePass: '',
            valLogin: 'Login',
            disLogin: false,
            frameErr: false,
            frameErrEmail: false,
            frameErrPass: false,
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        doLogin () {
            var vm = this
            this.frameErr = false
            this.frameErrEmail = false
            this.frameErrPass = false
            this.valLogin = 'Please Wait...'
            this.disLogin = true
            axios.post(this.url, {
                'email': this.user.email,
                'password': this.user.password
            })
            .then(response => {
                console.log('response', response.data.me)
                if (response.data.status === 'unauthorized') 
                {
                    vm.frameErr = true
                    vm.message = e.response.responseText
                    vm.valLogin = 'Try Again'
                    vm.disLogin = false
                }
                if (response.data.status === 'email-invalid') 
                {
                    vm.valLogin = 'Try again'
                    vm.disLogin = false
                    if (response.data.message) 
                    {
                        vm.frameErrEmail = true
                        vm.messageEmail = response.data.message
                    }
                }
                if (response.data.status === 'password-invalid') 
                {
                    vm.valLogin = 'Try again'
                    vm.disLogin = false
                    if (response.data.message) 
                    {
                        vm.frameErrPass = true
                        vm.messagePass = response.data.message
                    }
                }
                if (response.data.status == 'success') 
                {
                    vm.valLogin = 'Success'
                    vm.disLogin = false
                    this.$cookie.set('jwt', response.data.me.access_token, 2)
                    this.$cookie.set('id', response.data.me.id, 2)
                    this.$cookie.set('name', response.data.me.name, 2)
                    this.$cookie.set('username', response.data.me.username, 2)
                    this.$cookie.set('foto', response.data.me.foto, 2)
                    // window.location = '#/'
                    this.$router.go({name: 'home'})
                }
            })
            .catch(e => {
                //main error
                if (e.response.status == 405) 
                {
                    var msg = e.response.statusText
                }
                if (e.response.status == 401) 
                {
                    var msg = 'There is an error, please try again'
                }
                vm.frameErr = true
                vm.message = msg
                vm.valLogin = 'Try Again'
                vm.disLogin = false
                console.log('error', e)
            })
        }
    },
    beforeCreate: function () {
        if (this.$cookie.get('jwt')) 
        {
            this.$router.push('/')
        }
    }
}
</script>