<template>
  <div>
    <div class="form-group">
      <label for="font-size">Font size:</label>
      <input type="range" class="form-control" name="font-size" min="0" max="100" v-model="value.options.fontSize" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Object
  }
}
</script>

<style>
</style>