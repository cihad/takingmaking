import Vue from 'vue';

const EventBus = new Vue({
  data() {
    return {
      blocks: []
    }
  },
  methods: {
    registerBlock(block) {
      this.blocks.push(block)
    }
  }
});

export default EventBus;