<template>
  <div class="text-white bg-dark p-2 rounded" v-show="show">
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

<style>
</style>