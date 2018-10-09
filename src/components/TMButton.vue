<template>
  <div v-on:click="focus">
    <a :href="value.buttonUrl" class="btn" :class="[buttonClass, blockClass]">
      {{ value.buttonText }}
    </a>
  </div>
</template>

<script>
import EventBus from '../classes/EventBus';

EventBus.registerBlock({
  name: "TMButton",
  optionsName: "TMButtonOptions",
  buttonText: "Merhaba",
  buttonUrl: "example.com",
  options: {
    color: 'primary',
    outline: false,
    block: false
  }
})

export default {
  props: {
    value: Object,
  },
  computed: {
    buttonClass() {
      var str = ''

      str += 'btn-'
      if (this.value.options.outline) {
        str += 'outline-'
      }

      str += this.value.options.color

      return str
    },
    blockClass() {
      var str = ''

      if (this.value.options.block) {
        str += 'btn-block'
      }

      return str
    }
  },
  methods: {
    focus() {
      console.log('cccccccccccccccccccccccccccccc')
      this.$emit('focus')
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
[data-hovered=true] {
  outline: 1px solid #9FDFFF  ;
}

.sorting,
[data-active=true] {
  outline: 1px solid #00aaff;
}
</style>