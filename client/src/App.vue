
<template>
  <div id="app">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <span class="navbar-item" href="/">
          MOP
        </span>
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
          </div>
        </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class='navbar-item'>Jobs</router-link>
          <router-link to="/hackathons" class='navbar-item'>Hackathons</router-link>
          <router-link to="/excursions" class='navbar-item'>Excursions</router-link>
          <router-link to="/Profile" class='navbar-item'>Profile</router-link>
        </div>
        <div class="navbar-end">
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
      </nav>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<style lang="scss">
@import "~bulma/bulma";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
html{
  background: #fafafa;
}
</style>
