<template>
  <a class="p-4 flex items-center justify-center bg-black hover:bg-gray-900" :href="home">
    <div class="w-12 mr-4">
      <img src="@/assets/brand-logo.png" alt="TikTok Logo" class="w-full">
    </div>
    <h1 class="text-lg leading-tight text-white sm:text-2xl">
      TikTok Live Follower Count
    </h1>
  </a>
</template>

<script>
  export default {
    name: 'TheHeader',
    computed: {
      home() {
        return window.location.origin
      },
    },
  }
</script>
