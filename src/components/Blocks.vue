<template>
  <div>
    <BlocksContainer lockAxis="y" appendTo=".main-wrapper html body" :useDragHandle="true" v-model="blocks" helperClass="sorting">
      <BlockItem v-for="(block, index) in blocks" :index="index" :key="index" v-model="blocks[index]" :blocks="blocks" ref="block" />
    </BlocksContainer>

    <hr>

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
      blocks: [],
      html: ""
    }
  },
  components: {
    BlocksContainer, BlockItem, popper
  },
  methods: {
    addBlock(block) {
      this.blocks.push(JSON.parse(JSON.stringify(block)))
    }
  },
  watch: {
    blocks: {
      handler: function(newBlocks) {
        var _this = this;

        this.$nextTick(function() {
          if (_this.$refs.block) {
            _this.html = ""
            _this.$refs.block.forEach(function(block, i) {
              block.$children.forEach(function(blc) {
                if (typeof blc.toS == 'string') {
                  _this.html += blc.toS
                }
              })
            })
          }

          EventBus.$emit('blocksHtmlChanged', _this.html);
        })

        EventBus.$emit('blocksChanged', newBlocks);
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style>
</style>
