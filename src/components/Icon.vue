<template>
  <i :class="className"></i>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      name: {
        type: String,
      },
    },
    computed: {
      className() {
        return `Icon-${this.name}`
      },
    },
  }
</script>

<style lang="scss">
  $icons: (
    facebook: '\ea90',
    instagram: '\ea92',
    twitter: '\ea96',
    checkmark: '\ea10',
  );

  [class^="Icon-"],
  [class*=" Icon-"] {
    font-family: theme('fontFamily.icon');
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  @each $name, $code in $icons {
    .Icon-#{$name}:before {
      content: $code;
    }
  }
</style>
