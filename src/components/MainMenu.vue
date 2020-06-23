<template>
  <ul class="main-menu">
    <router-link
      v-for="(item, index) in items"
      :key="index"
      class="main-menu__item"
      :to="item.path"
    >
      {{ item.title }}
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'MainMenu',
  data () {
    return {
      items: [
        { title: 'GENERAL', path: '/general' },
        { title: 'TRACKING', path: '/tracking' }
      ]
    }
  }
}
</script>

<style lang="scss">
.main-menu {
  text-align: left;
  border-bottom: 2px solid #999AA3;
  position: relative;
  &__item {
    display: inline-block;
    position: relative;
    padding: 20px 10px;
    margin-bottom: -2px;
    border-bottom: 2px solid #999AA3;
    color: #999AA3;
    text-decoration: none;
    &.router-link-active {
      color: #292929;
      font-weight: bold;
      border-bottom: 2px solid #3498DB;
    }
  }
}
</style>
