<template>
  <div class="flex flex-auto flex-col lg:flex-row">
    <div class="p-12 lg:w-1/6"></div>
    <router-view/>
    <div class="p-12 lg:w-1/6"></div>
  </div>
</template>

<script>
  export default {
    name: 'TheContent',
  }
</script>
