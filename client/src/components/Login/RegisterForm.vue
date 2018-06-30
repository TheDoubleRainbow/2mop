<template>
    <div class = "login-form column card is-4">
        <div class="column is-12">
                <div>
                    <div class="typeQuestion">Who are you?</div>
                    <div class="buttons has-addons is-centered">
                        <span @click="changeType('user')" class="switchButton button" v-bind:class="data.type === 'user' ? 'is-link' : ''">Student</span>
                        <span @click="changeType('company')" class="switchButton button" v-bind:class="data.type === 'company' ? 'is-link' : ''">Company</span>
                    </div>
                </div>
        </div>
        <form @submit.prevent = "checkForm(data)">
            <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left ">
                    <input v-model="data.userData.email" class="input" type="email" placeholder="Email" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </div>
            </div>
            <div v-if="data.type !== 'user'" class="field">
                <label class="label">Company name</label>
                <div class="control has-icons-left ">
                    <input v-model="data.userData.name" class="input" type="text" placeholder="Company name" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-building"></i>
                    </span>
                </div>
            </div>
            <div v-if="data.type !== 'user'" class="field">
                <label class="label">Location</label>
                <div class="control has-icons-left ">
                    <vue-google-autocomplete
                        ref="address"
                        id="map"
                        classname="input"
                        autocomplete="nope"
                        placeholder="Enter your location"
                        v-on:placechanged="getAddressData"
                        country=""
                        types="(cities)">
                    </vue-google-autocomplete>
                    <span class="icon is-small is-left">
                        <i class="fas fa-map-marker-alt"></i>
                    </span>
                </div>
            </div>
            <div v-if="data.type === 'user'" class="field">
                <label class="label">First name</label>
                <div class="control has-icons-left ">
                    <input v-model="data.userData.name.first" class="input" type="text" placeholder="First name" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </div>
            </div>
            <div v-if="data.type === 'user'" class="field">
                <label class="label">Last name</label>
                <div class="control has-icons-left ">
                    <input v-model="data.userData.name.last" class="input" type="text" placeholder="Last name" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </div>
            </div>
            <div v-if="data.type !== 'user'" class="field">
                <label class="label">Website</label>
                <div class="control has-icons-left">
                    <input v-model="data.userData.webSite" class="input" type="phone" placeholder="Website" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-globe"></i>
                    </span>
                </div>
            </div>
            <!-- <div class="field">
                <label class="label">Birth date</label>
                <div class="control has-icons-left">
                    <input v-model="data.userData.birthDate" class="input" type="date" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-calendar-alt"></i>
                    </span>
                </div>
            </div> -->
            <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-left">
                    <input v-model="data.userData.password" class="input" type="password" placeholder="Password" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-key"></i>
                    </span>
                </div>
            </div>
            <div class="field">
                <label class="label">Confirm password</label>
                <div class="control has-icons-left">
                    <input v-model="data.userData.confirmPassword" class="input" type="password" placeholder="Confirm password" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-key"></i>
                    </span>
                </div>
            </div>
            <div v-if="error.status" class="errorBlock">{{error.text}}</div>
            <div class="formError">{{errorText}}</div>
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
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
    name: 'RegisterForm',
    props: {
      register: Function
    },
    components: {
        VueGoogleAutocomplete
    },
    data: function() {
        return {
            data: {
                type: 'user',
                userData: {
                    email: '',
                    password: '',
                    confirmPassword: '',
                    name: {
                        first: '',
                        last: ''
                    },
                    avatar: '',
                    //phoneNumber: '',
                    webSite: '',
                    location: '',
                    // birthDate: '',
                }
            },
            error: {
                staus: 0,
                text: '',
            }
        }
    },
    methods: {
        changeType: function(type){
            this.data.type = type;
            this.data.userData.name = type == 'user' ?  {
                    first: '',
                    last: ''
                } :
            '';
        },
        checkForm: function(data){
            if(data.userData.password === data.userData.confirmPassword && data.userData.password && data.userData.confirmPassword){
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
        },
        getAddressData: function (addressData, placeResultData) {
                //console.log(addressData, placeResultData, id)
                this.data.userData.location = placeResultData.place_id;
        }
    },
    computed: {
      errorText: function(){
          return this.$store.state.authError
      }
    },
    created: function(){
        
    }
}
</script>
