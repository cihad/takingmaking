<template>
  <div class="vtm text-white bg-dark card-options rounded" v-show="show">
    <slot />
  </div>
</template>

<script>
import Popper from 'popper.js'

export default {
  props: {
    show: Boolean,  
  },
  mounted() {
    new Popper(this.$parent.$el, this.$el, {
      placement: 'right-start'
    })

  }

}
</script>

<style scoped>
.card-options {
  z-index: 19;
	width: 200px;
  padding: .75rem;
}
</style>