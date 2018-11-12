<template>
  <div class="vtm text-white bg-dark card card-options" v-show="show">
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
      placement: 'right-start'
    })

  }

}
</script>

<style scoped>
.vtm.card {
  z-index: 100;
}

.card-options {
	width: 200px !important;
}

.card-options > .card-body {
	padding: .75rem !important;
}
</style>