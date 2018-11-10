<template>
  <div :class="sizeClass" class="column" :style="{ flexBasis: widthPx }">
    <draggable  :list="value.blocks"
                class="draggable-area"
                :class="{ 'no-block': value.blocks.length == 0 }"
                :options="{handle: '.handle', group: 'blocks', animation: 150 }">
      <Block  v-for="(block, ind) in value.blocks"
              :index="ind"
              :key="uniqKey(block)"
              v-model="value.blocks[ind]"
              :blocks="value.blocks"
              ref="block" />
    </draggable>
    <resizable-handle v-if="!isLastCol()" v-on:step="step"></resizable-handle>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Block from "./Block"
import Blocks from '../classes/Blocks';
import ResizableHandle from '@/components/ResizableHandle';

export default {
  props: { 
    value: Object,
    index: Number
  },
  data() {
    return {
      Blocks: Blocks,
      html: "",
      nextCol: null,
      width: null
    }
  },
  components: {
    Block, draggable, ResizableHandle
  },
  methods: {
    addBlock(block) {
      this.value.push((new block()).blockObject)
    },
    isLastCol() {
      return this.$parent.value.length - 1 == this.index
    },
    step(step) {
      console.log(step) 
      this.value.colSize += step
      this.$parent.value[this.index + 1].colSize -= step
    }
  },
  watch: {
    blocks: {
      handler: function(newBlocks) {
        var _this = this;

        this.$nextTick(function() {
          if (_this.$refs.block) {
            _this.html = ""
            _this.$refs.block.forEach(function(block) {
              block.$children.forEach(function(blc) {
                if (typeof blc.toS == 'string') {
                  _this.html += blc.toS
                }
              })
            })
          }

          // BlockArea.$emit('blocksHtmlChanged', _this.html);
        })

        // BlockArea.$emit('blocksChanged', newBlocks);
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    sizeClass() {
      var str = "col"

      if (this.value.colSize)
        str += "-" + this.value.colSize

      return str
    },
    widthPx() {
      return this.width + "px"
    }
  }
}
</script>

<style>
.draggable-area.no-block {
  height: 50px;
}

.draggable-area.no-block:before {
  content: 'drag block here';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 15px;
  left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ghostwhite;
  border-radius: 4px;
}

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
