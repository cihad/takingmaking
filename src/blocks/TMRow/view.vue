<template>
  <Row :key="uniqKey(this.value.content)" v-model="this.value.content" :rows="[this.value.content]" :index="0" />
</template>

<script>
import Row from '@/components/Row'

export default {
  props: {
    value: Object,
  },
  components: { Row },
  computed: {
    toS() {
      let template = ``
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
</style>