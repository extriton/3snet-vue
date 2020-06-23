<template>
  <div id="app" class="container">
    <MainMenu />
    <router-view/>
  </div>
</template>

<script>
import MainMenu from '@/components/MainMenu.vue'

export default {
  components: {
    MainMenu
  }
}
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
