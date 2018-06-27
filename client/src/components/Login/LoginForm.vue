<template>
    <div class = "login-form column card is-4">
        <div class="column is-12">
            <div class="formHeader">Login</div>
        </div>
        <form @submit.prevent="login(data)">
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
            <div class="formError">{{errorText}}</div>
            <div class="loginButtonWrap">
                <button class="loginButton button is-dark">Login</button>
				<span class="or">OR</span>
				<router-link to="/register" class='button loginButton is-dark is-outlined'>
                <span>Register</span>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
      login: Function
  },
  data: function() {
      return {
          data: {
              email: '',
              password: '',
          }
      }
  },
  computed: {
      errorText: function(){
          return this.$store.state.authError
      }
  }
}
</script>
<style>

</style>
