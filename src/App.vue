<template>
  <div class="main-wrapper" id="vtm">
    <Blocks />
  </div>
</template>

<script>
import Blocks from './components/Blocks.vue'

export default {
  name: 'app',
  props: {
    msg: String
  },
  components: {
    Blocks
  }
}
</script>

<style scoped lang="scss">
.main-wrapper /deep/ {
  @import "~bootstrap/dist/css/bootstrap";

  .vtm {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
  }

  .container {
    width: 900px;
  }

  .btn-xs {
    padding: .125rem .25rem;
    font-size: .75rem;
    line-height: 1.5;
    border-radius: .15rem;
  }


}


</style>
