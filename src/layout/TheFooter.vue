<template>
  <div class="p-4">
    <div class="flex items-center justify-center">
      <a v-for="(url, media, index) in social"
         :href="url"
         :key="index"
         :title="media | capitalize"
         class="mx-2 text-xl p-2 transition hover:scale-xs"
         rel="noopener noreferrer"
         target="_blank">
        <Icon :name="media"/>
      </a>
    </div>
    <div class="text-center text-sm text-gray-800">
      {{ copyright }}
    </div>
  </div>
</template>

<script>
  import {Icon} from '../components'
  import {capitalize} from '../common/filters'

  export default {
    name: 'TheFooter',
    filters: {
      capitalize,
    },
    components: {
      Icon,
    },
    data() {
      return {
        year: new Date().getFullYear(),
        social: {
          twitter: 'https://twitter.com/livefollowcount',
          facebook: 'https://www.facebook.com/LiveFollowerCount',
        },
      }
    },
    computed: {
      copyright() {
        return `© ${this.year} LiveFollowerCount.com - All Rights Reserved`
      },
    },
  }
</script>
