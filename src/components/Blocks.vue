<template>
  <div>
    <div class="main-side">
      <BlocksContainer lockAxis="y" :useDragHandle="true" v-model="blocks">
        <BlockItem v-for="(block, index) in blocks" :index="index" :key="index" v-model="blocks[index]" :blocks="blocks" />
      </BlocksContainer>


      <div class="card">
        <div class="card-body text-center">
            <popper trigger="click" :options="{placement: 'bottom'}">
              <div class="popper">
                <template v-for="(block, i) in bus.blocks">
                  <a href="#" v-on:click="addBlock(block)">{{ block.name }}</a>
                </template>

              </div>

              <button class="btn btn-sm btn-success" slot="reference">&#10133;</button> 
            </popper>
        </div>
      </div>

      <details class="mt-5">
        <summary>Blocks</summary>
        <pre>{{blocks}}</pre>
      </details>
    </div>

  </div>
</template>

<script>
import BlocksContainer from "./BlocksContainer"
import BlockItem from "./BlockItem"
import popper from 'vue-popperjs';
import 'vue-popperjs/dist/css/vue-popper.css';
import EventBus from '../classes/EventBus';

export default {
  data() {
    return {
      bus: EventBus,
      blocks: []
    }
  },
  components: {
    BlocksContainer, BlockItem, popper
  },
  methods: {
    addBlock(block) {
      this.blocks.push(Object.assign({}, block))
    }
  },
  watch: {
    blocks: {
      handler: function(newBlocks) {
        EventBus.$emit('blocksChanged', newBlocks);
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style>
.main-side {
  width: 680px;
  margin: auto;
}
</style>
