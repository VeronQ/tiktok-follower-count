<template>
  <div v-show="isVisible" v-out="hide">
    <slot></slot>
  </div>
</template>

<script>
  import {eventBus} from '../common/event-bus'
  import {out} from '../common/directives'
  import {CLOSE_MODAL} from '../common/types'

  export default {
    name: 'Modal',
    directives: {
      out,
    },
    props: {
      trigger: String,
    },
    data() {
      return {
        isVisible: false,
      }
    },
    created() {
      eventBus.$on(CLOSE_MODAL, () => this.hide())
    },
    mounted() {
      const triggerEls = document.querySelectorAll(this.trigger);
      [...triggerEls].forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.stopPropagation()
          this.show()
        })
      })
    },
    methods: {
      show() {
        this.isVisible = true
      },
      hide() {
        this.isVisible = false
      },
    },
  }
</script>
