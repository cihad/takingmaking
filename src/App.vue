<template>
  <div id="app" class="main-wrapper">
    <html>
    <body>
      <Blocks /> 
    </body>
    </html>
  </div>
</template>

<script>
import Blocks from './components/Blocks.vue'

export default {
  name: 'app',
  components: {
    Blocks
  }
}
</script>

<style scoped lang="scss">
.main-wrapper /deep/ {
  @import "~bootstrap/dist/css/bootstrap.min";

  .btn-xs {
    padding: .125rem .25rem;
    font-size: .75rem;
    line-height: 1.5;
    border-radius: .15rem;
  }
}
</style>
