<template>
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <span class="navbar-item" href="/">
          <img src="./../../assets/chew.png"><span class="siteName">CHEW</span>
        </span>
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
          </div>
        </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link active-class='active' v-if="true" to="/courses" class='navbar-item'>Courses</router-link>
          <router-link active-class='active' v-if="true" to="/hackathons" class='navbar-item'>Hackathons</router-link>
          <router-link active-class='active' v-if="true" to="/excursions" class='navbar-item'>Excursions</router-link>
          <router-link active-class='active' v-if="true" to="/" class='navbar-item'>Work</router-link>
          <router-link active-class='active' to="/profile" class='navbar-item'>Profile</router-link>
          <router-link active-class='active' v-if="isCompany" to="/add" class='navbar-item'>Add event</router-link>
        </div>
        <div v-if="!isLogined" class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <router-link to="/login" class='button is-black'>
                <span>Login</span>
                  </router-link>
                 </p>
              </div>
            </div>
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <router-link to="/register" class='button is-black'>
                <span>Register</span>
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="isLogined" class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <button @click="logout" class='button is-black'>
                    <span>Logout</span>
                </button>
                 </p>
              </div>
            </div>
        </div>
      </nav>
</template>

<script>
export default {
    name: 'menuEl',
    computed: {
        isLogined: function(){
            return this.$store.state.auth.authToken ? true : false
        },
        isCompany: function(){
           return this.$store.state.auth.userType == 'company' ? true : false
        }
    },
    methods: {
        logout(){
            this.$store.commit('logout')
        }
    }
}
</script>

<style>
    .siteName{
      margin-left: 10px;
    }
    .router-link-exact-active{
        background: #292929;;
    }
</style>

