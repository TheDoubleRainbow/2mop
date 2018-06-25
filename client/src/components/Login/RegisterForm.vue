<template>
    <div class = "login-form column card is-4">
        <div class="column is-12">
                <div>
                    <div class="typeQuestion">Who are you?</div>
                    <div class="buttons has-addons is-centered">
                        <span @click="data.type = 1" class="switchButton button" v-bind:class="data.type === 1 ? 'is-link' : ''">Student</span>
                        <span @click="data.type = 2" class="switchButton button" v-bind:class="data.type === 2 ? 'is-link' : ''">Company</span>
                    </div>
                </div>
        </div>
        <form @submit.prevent = "checkForm(data)">
            <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left ">
                    <input v-model="data.email" class="input" type="email" placeholder="Email" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-left">
                    <input v-model="data.password" class="input" type="password" placeholder="Password" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-key"></i>
                    </span>
                </div>
            </div>
            <div class="field">
                <label class="label">Confirm password</label>
                <div class="control has-icons-left">
                    <input v-model="data.confirmPassword" class="input" type="password" placeholder="Confirm password" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-key"></i>
                    </span>
                </div>
            </div>
            <div v-if="error.status" class="errorBlock">{{error.text}}</div>
            <div class="loginButtonWrap">
                <button class="loginButton button is-dark">Register</button>
                <span class="or">OR</span>
                <router-link to='/login' class='button loginButton is-dark is-outlined'>
                    <span>Login</span>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'RegisterForm',
    props: {
      register: Function
    },
    data: function() {
        return {
            data: {
                type: 1,
                email: '',
                password: '',
                confirmPassword: '',
            },
            error: {
                staus: 0,
                text: '',
            }
        }
    },
    methods: {
        checkForm: function(data){
            if(data.password === data.confirmPassword && data.password && data.confirmPassword){
                this.register(data)
                this.nullErorr()
            }else{
                this.error = {
                    text: 'Passwords do not match',
                    status: 1
                }
            }
        },
        nullErorr: function(){
            this.error = {
                status: 0,
                text: ''
            }
        }
    }
}
</script>
