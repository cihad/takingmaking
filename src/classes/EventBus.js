import Vue from 'vue';

const EventBus = new Vue({
  data() {
    return {
      blocks: [],
      cihad: []
    }
  },
  methods: {
    registerBlock(block) {
      this.blocks.push(block)
    }
  }
});

export default EventBus;