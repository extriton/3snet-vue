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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  &.container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
