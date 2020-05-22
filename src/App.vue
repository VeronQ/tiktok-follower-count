<template>
  <div id="app">
    <TheHeader/>
    <TheContent/>
    <TheFooter/>
  </div>
</template>

<script>
  import {TheHeader, TheContent, TheFooter} from './layout'
  import {DEFAULT_USER_ID} from './common/types'

  export default {
    name: 'App',
    components: {
      TheHeader,
      TheContent,
      TheFooter,
    },
    created() {
      if (!this.$route.params.id) {
        this.$router.push({
          name: 'user',
          params: {
            id: DEFAULT_USER_ID,
          },
        })
      }
    },
  }
</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
