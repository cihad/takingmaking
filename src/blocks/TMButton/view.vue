<template>
  <div v-on:click="focus" style="text-align: center" class="mb-3">
    <a :href="value.buttonUrl" class="btn" :class="[buttonClass, blockClass]" v-on:click.prevent>
      {{ value.buttonText }}
    </a>
  </div>
</template>

<script>
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
  watch: {
    value: {
      handler() {
      let template = `
<div style="text-align: center;" data-tm-block="TMButton">
  <a href="${this.value.buttonUrl}" class="btn ${this.buttonClass} ${this.blockClass}">
    ${this.value.buttonText}
  </a>
</div>`

      this.value.html = template
      return template
      },
      deep: true
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
</style>