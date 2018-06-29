
<template>
  <div id="app">
    <MenuEl />
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import MenuEl from './components/Menu/Menu.vue'
export default {
  components: {
    MenuEl
  }
}
</script>


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
