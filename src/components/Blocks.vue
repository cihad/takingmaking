<template>
  <div>
    <draggable v-model="blockAreaBlocks" :options="{handle: '.handle' }">
      <transition-group name="list-complete">
        <BlockItem v-for="(block, index) in blockAreaBlocks" :index="index" :key="index" v-model="blockAreaBlocks[index]" :blocks="blockAreaBlocks" ref="block" />
      </transition-group>
    </draggable>

    <popper trigger="click" :options="{placement: 'bottom'}">
      <div class="vtm card text-white bg-dark">
          <div class="card-header">
            <input type="text" class="text-white w-100" name="" placeholder="Search blocks..." style="background-color: transparent; border: 0; outline: none" autofocus="true">
          </div>
          <div class="list-group list-group-flush">
            <template v-for="(block, i) in Blocks.blocks">
              <a href="#" class="list-group-item list-group-item-action" v-on:click="addBlock(block)">{{ block.humanName }}</a>
            </template>
          </div>
      </div>

      <button class="btn btn-block btn-lg btn-light mt-4" slot="reference">&#10010;</button> 
    </popper>

    <details class="mt-5">
      <summary>Blocks</summary>
      <pre>{{blockAreaBlocks}}</pre>
    </details>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import BlocksContainer from "./BlocksContainer"
import BlockItem from "./BlockItem"
import popper from 'vue-popperjs';
import 'vue-popperjs/dist/css/vue-popper.css';
import BlockArea from '../classes/BlockArea';
import Blocks from '../classes/Blocks';

export default {
  data() {
    return {
      blockAreaBlocks: BlockArea.blocks,
      Blocks: Blocks,
      html: ""
    }
  },
  components: {
    BlocksContainer, BlockItem, popper, draggable
  },
  methods: {
    addBlock(block) {
      this.blockAreaBlocks.push((new block()).blockObject)
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

          BlockArea.$emit('blocksHtmlChanged', _this.html);
        })

        BlockArea.$emit('blocksChanged', newBlocks);
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style>
.list-complete-enter-active {
  overflow: hidden;
  transition: all 1s;
}

.list-complete-leave-active {
  margin-top: 0px;
  overflow: hidden;
  transition: all 1s;
}

.list-complete-enter, .list-complete-leave-to {
  height: 0px;
  opacity: 0;
  padding: 0px;
  margin-top: 0px;
  overflow: hidden;
}

.card .popper__arrow {
  display: none;
}

.card[x-placement] {
  width: 20vw;
}

.card[x-placement]::after,
.card[x-placement]::before {
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.card[x-placement^="top"] {
  margin-bottom: 5px;
}

.card[x-placement^="top"]::after,
.card[x-placement^="top"]::before {
  top: 100%;
  left: 50%;
}

.card[x-placement^="top"]::after  {
  border-color: rgba(255, 255, 255, 0);
  border-top-color: #343a40;
  border-width: 5px;
  margin-left: -5px;
}
  
.card[x-placement^="top"]::before  {
  border-color: rgba(0, 0, 0, 0);
  border-top-color: #000000;
  border-width: 6px;
  margin-left: -6px;
}

.card[x-placement^="bottom"] {
  margin-top: 5px;
}

.card[x-placement^="bottom"]::after,
.card[x-placement^="bottom"]::before {
  bottom: 100%;
  left: 50%;
}

.card[x-placement^="bottom"]::after {
  border-color: rgba(255, 255, 255, 0);
  border-bottom-color: #343a40;
  border-width: 5px;
  margin-left: -5px;
}
.card[x-placement^="bottom"]::before {
  border-color: rgba(0, 0, 0, 0);
  border-bottom-color: #000000;
  border-width: 6px;
  margin-left: -6px;
}

.card[x-placement^="right"] {
  margin-left: 5px;
}

.card[x-placement^="right"]::after,
.card[x-placement^="right"]::before {
  right: 100%;
  top: 50%;
}

.card[x-placement^="right"]::after {
  border-color: rgba(255, 255, 255, 0);
  border-right-color: #343a40;
  border-width: 5px;
  margin-top: -5px;
}
.card[x-placement^="right"]::before {
  border-color: rgba(0, 0, 0, 0);
  border-right-color: #000000;
  border-width: 6px;
  margin-top: -6px;
}

.card[x-placement^="left"] {
  margin-right: 5px;
}

.card[x-placement^="left"]::after,
.card[x-placement^="left"]::before {
  left: 100%;
  top: 50%;
}

.card[x-placement^="left"]::after {
  border-color: rgba(255, 255, 255, 0);
  border-left-color: #343a40;
  border-width: 5px;
  margin-top: -5px;
}

.card[x-placement^="left"]::before {
  border-color: rgba(0, 0, 0, 0);
  border-left-color: #000000;
  border-width: 6px;
  margin-top: -6px;
}
</style>
