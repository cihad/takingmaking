import Vue from 'vue';

const BlockArea = new Vue({
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

export default BlockArea;