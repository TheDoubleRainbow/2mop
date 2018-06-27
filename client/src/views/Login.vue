<template>
    <div class = "container loginPage">
        <div class="columns is-multiline is-centered">
            <LoginForm v-bind:login="login" v-if="tab === 1"  />
            <RegisterForm v-bind:register="register" v-if="tab === 2" />
            <RecoveryForm v-bind:recover="recover" v-bind:email="recoveryEmail" v-if="tab === 3" />
            <div v-if="tab !== 3" class="column is-12 forgotButtonWrapper">
                <router-link to='/recover' class='forgotButton is-dark is-outlined'>
                  <span>Forgot your password?</span>
                </router-link> 
            </div>
        </div> 
      </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
import RecoveryForm from "@/components/Login/RecoveryForm.vue";

export default {
  name: "Login",
  data: function() {
    return {
      tab: this.$route.path === "/login" ? 1 : this.$route.path === "/register" ? 2 : 3,
      location: this.$route.path,
    };
  },
  methods: {
      recover(email){
          console.log('recovering...', email)
      },
      login(data){
          this.$store.commit('login', data)
      },
      register(data){
          this.$store.commit('register', data)
      }
  },
  created: function() {
  },
  updated: function() {
      this.tab = this.$route.path === "/login" ? 1 : this.$route.path === "/register" ? 2 : 3
  },
  components: {
    LoginForm,
    RegisterForm,
    RecoveryForm
  }
};
</script>

<style>
.errorBlock{
        color: red;
}

.switchButton {
  width: 100px;
}

.loginPage {
  padding-top: 65px;
}

.login-form .field .label{
    text-align: left;
}

.login-form{
    padding: 20px;
}

.loginButton {
  margin: 0 auto;
  width: 130px;
}

.loginButtonWrap {
  padding-top: 10px;
  text-align: center;
}

.loginButtonWrap .or {
  margin: 5px 30px 0px 30px;
  display: inline-block;
}

.typeQuestion {
  text-align: center;
  padding-bottom: 10px;
}

.formHeader {
  text-align: center;
  padding-bottom: 5px;
  font-size: 30px;
}

.forgotButtonWrapper {
  text-align: center;
}
</style>

