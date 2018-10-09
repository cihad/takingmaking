<template>
  <div class="main-wrapper">
    {{msg}}
    <html>
    <body>
      <div class="container">
        <div class="row">

          <div class="col-8 offset-2">
            <Blocks />
          </div>
        </div>
      </div>
    </body>
    </html>
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
  @import "~bootstrap/dist/css/bootstrap.min";

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
