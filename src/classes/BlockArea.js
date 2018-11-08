import Vue from 'vue';

const BlockArea = new Vue({
  data() {
    return {
      blocks: [],
      rows: [[{colSize:12, blocks: []}]]
    }
  },
  methods: {
    registerBlock(block) {
      this.blocks.push(block)
    }
  }
});

export default BlockArea;