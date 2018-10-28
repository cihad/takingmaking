<template>
  <div v-on:click="focus" style="text-align: center">
    <a :href="value.buttonUrl" class="btn" :class="[buttonClass, blockClass]" v-on:click.prevent>
      {{ value.buttonText }}
    </a>
  </div>
</template>

<script>
import EventBus from '@/classes/EventBus';

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
    },
    toS() {
      let template = `
<div style="text-align: center;">
  <a href="${this.value.buttonUrl}" class="btn ${this.buttonClass} ${this.blockClass}">
    ${this.value.buttonText}
  </a>
</div>`
      return template
    }
  },
  methods: {
    focus() {
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