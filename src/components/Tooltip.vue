<template>
  <div class="card card-options text-white bg-dark" v-show="show">
    <div class="card-body">
      <slot />
    </div>
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
      placement: 'right'
    })

  }

}
</script>

<style>
.card-options .card-body {
  padding: .75rem !important;
}
</style>