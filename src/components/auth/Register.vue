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
                    Register
                </p>
            </div>
        </div>
        <div class="fs-mid">

            <div>
                
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
                            name="name" 
                            id="name" 
                            class="txt txt-primary-color"
                            placeholder="Full name"
                            required="required"
                            v-model="user.name">
                    </div>
                </div>
                <div class="padding-top-10px" v-if="frameErrName">
                    <div class="txt-site txt-11 txt-danger">
                        {{ messageName }}
                    </div>
                </div>

                <div class="padding-10px"></div>

                <div class="fs-block">
                    <div class="fs-left">
                        <div class="icn fa fa-lg fa-envelope"></div>
                    </div>
                    <div class="fs-right">
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            class="txt txt-primary-color"
                            placeholder="Your email"
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
                            placeholder="Create password"
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
                    <router-link to="/login">
                        <input 
                            type="button" 
                            value="Login" 
                            class="btn btn-main2-color" 
                            style="float: left;"
                    </router-link>
                    <input 
                        type="submit" 
                        :value="valRegister" 
                        @click="doRegister()"
                        class="btn btn-main-color">
                </div>

            </div>

        </div>
    </div>
</div>
</template>
<script>
export default {
    data () {
        return {
            url: this.baseUrl+'/api/auth/register',
            message: '',
            messageName: '',
            messageEmail: '',
            messagePass: '',
            valRegister: 'Register',
            disRegister: false,
            frameErr: false,
            frameErrName: false,
            frameErrEmail: false,
            frameErrPass: false,
            user: {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        doRegister () {
            var vm = this
            this.frameErr = false
            this.frameErrName = false
            this.frameErrEmail = false
            this.frameErrPass = false
            this.valRegister = 'Please Wait...'
            this.disRegister = true
            axios.post(this.url, {
                'name': this.user.name,
                'email': this.user.email,
                'password': this.user.password
            })
            .then(response => {
                if (response.data.status == 'unlogin') 
                {
                    vm.frameErr = true
                    vm.message = e.response.responseText
                    vm.valRegister = 'Success'
                    vm.disRegister = true
                }
                if (response.data.status == 'unauthorized') 
                {
                    vm.frameErr = true
                    vm.message = e.response.responseText
                    vm.valRegister = 'Try Again'
                    vm.disRegister = false
                }
                if (response.data.status === 'email-invalide') 
                {
                    vm.valLogin = 'Try again'
                    vm.disLogin = false
                    if (response.data.message) 
                    {
                        vm.frameErrEmail = true
                        vm.messageEmail = response.data.message
                    }
                }
                if (response.data.status === 'password-invalide') 
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
                    vm.valRegister = 'Success'
                    vm.disRegister = true
                    this.$cookie.set('jwt', response.data.me.access_token, 2)
                    this.$cookie.set('id', response.data.me.id, 2)
                    this.$cookie.set('name', response.data.me.name, 2)
                    this.$cookie.set('username', response.data.me.username, 2)
                    this.$cookie.set('foto', response.data.me.foto, 2)
                    // window.location = vm.initUrl
                    this.$router.go({name: 'home'})
                }
            })
            .catch(e => {
                //main error
                vm.frameErr = true
                vm.message = e.response.responseText
                vm.valRegister = 'Try Again'
                vm.disRegister = false
                console.log(e.response)
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