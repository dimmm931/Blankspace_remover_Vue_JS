<template>
  <div id="app">
    <img src="./assets/logo.png" class="vue-logo">
    <router-view/> <!-- see current used component in /src/router/index.js -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.vue-logo{width: 2%;}

 /* Mobile */
 @media screen and (max-width: 480px) {
     .vue-logo{width: 11%;}
 }
</style>
