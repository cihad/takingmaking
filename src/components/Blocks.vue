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
      cihad: EventBus.cihad,
      html: ""
    }
  },
  components: {
    BlocksContainer, BlockItem, popper
  },
  methods: {
    addBlock(block) {
      this.cihad.push(JSON.parse(JSON.stringify(block)))
    }
  },
  watch: {
    cihad: {
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
.card .popper__arrow {
  display: none;
}

.card[x-placement] {
  width: 25vw;
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
