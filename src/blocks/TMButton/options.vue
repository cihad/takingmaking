<template>
  <div>
    <div class="form-group">
      <label for="buttonText">Button Text</label>
      <input type="text" class="form-control" v-model="value.buttonText">
    </div>

    <div class="form-group">
      <label for="font-size">Color:</label>
      <select v-model="value.options.color" class="form-control">
        <option>primary</option>
        <option>secondary</option>
        <option>success</option>
        <option>danger</option>
        <option>warning</option>
        <option>info</option>
        <option>light</option>
        <option>dark</option>
        <option>link</option>
      </select>
    </div>

    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="outline" v-model="value.options.outline">
      <label class="form-check-label" for="outline">Outline?</label>
    </div>

    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="block" v-model="value.options.block">
      <label class="form-check-label" for="block">Block?</label>
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