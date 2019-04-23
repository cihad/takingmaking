<template>
  <div class="main-wrapper" id="vtm">

    <draggable :list="rows" :options="{ group: 'rows', handle: '.handle', animation: 150 }">
      <Row v-for="(row, i) in rows" :key="i" v-model="rows[i]" :rows="rows" :index="i" />
    </draggable>

    <popper trigger="click" :options="{placement: 'bottom'}">
      <div class="vtm card text-white bg-dark">
          <div class="card-header">
            <input type="text" class="text-white w-100" name="" placeholder="Search blocks..." style="background-color: transparent; border: 0; outline: none" autofocus="true">
          </div>
          <div class="list-group list-group-flush">
            <draggable :list="Blocks.blocks" :options="{ group: {name: 'blocks', pull: 'clone', put: false}, sort: false }" :clone="clone">
              <a href="#" v-for="(block, i) in Blocks.blocks" :key="i" class="list-group-item list-group-item-action" @click.prevent v-on:dragstart="startDrag" :style="{ cursor: 'move' }">{{ block.humanName }}</a>
            </draggable>
          </div>
      </div>

      <button class="btn btn-block btn-lg btn-light mt-4" slot="reference">&#10010;</button> 
    </popper>

    <details class="mt-5">
      <summary>Blocks</summary>
      <pre>{{rows}}</pre>
    </details>

    <div class="dragging-element" ref="draggingElement">BLOCK</div>

    <OffCanvas :placement="placement" :active="showPanel">
      <div class="card bg-dark">
        <div class="card-header d-flex justify-content-between">
          <strong>BLOCKS</strong> <span>{{ Blocks.blocks.length }}</span>
        </div>
        
        <div class="list-group list-group-flush">
          <draggable :list="Blocks.blocks" :options="{ group: {name: 'blocks', pull: 'clone', put: false}, sort: false }" :clone="clone">
            <a href="#" v-for="(block, i) in Blocks.blocks" :key="i" class="list-group-item list-group-item-action bg-dark text-white" @click.prevent v-on:dragstart="startDrag" :style="{ cursor: 'move' }">{{ block.humanName }}</a>
          </draggable>
        </div>    
      </div>
    </OffCanvas>


    <select v-model="placement">
      <option value="left">Left</option>
      <option value="right">Right</option>
    </select>
    <br>
    <input type="radio" id="one" :value="true" v-model="showPanel">
    <label for="one">Show</label>
    <br>
    <input type="radio" id="two" :value="false" v-model="showPanel">
    <label for="two">Hide</label>
    <br>

  </div>
</template>

<script>
import popper from 'vue-popperjs';
import 'vue-popperjs/dist/css/vue-popper.css';
import draggable from 'vuedraggable'
import BlocksComponent from './components/Blocks.vue'
import Blocks from '@/classes/Blocks'
import BlockArea from '@/classes/BlockArea'
import Row from '@/components/Row'
import OffCanvas from '@/components/OffCanvas'

export default {
  name: 'app',
  data() {
    return {
      Blocks: Blocks,
      rows: BlockArea.rows,
      placement: 'left',
      showPanel: true
    }
  },
  components: {
    Blocks: BlocksComponent, draggable, popper, Row, OffCanvas
  },
  methods: {
    addRow(...rows) {
      var arr = []

      rows.forEach(size => arr.push({ colSize: size, blocks: []}))

      this.rows.push(arr)
    },
    clone(block) {
      return (new block()).blockObject
    },
    startDrag(e) {
      var div = this.$refs.draggingElement
      e.dataTransfer.setDragImage(div, 45, 30);
    }
  },
  computed: {
    blocks() {
      var blocks = []

      Blocks.blocks.forEach(block => {
        blocks.push((new block()).blockObject)
      })

      return blocks
    }
  }
}
</script>

<style scoped lang="scss">
.main-wrapper /deep/ {
  @import "~bootstrap/dist/css/bootstrap";

  .vtm {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: .8rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
  }

  .vtm.card {
    z-index: 100
  }

  .container {
    width: 900px;
  }

  .btn-xs {
    padding: .125rem .25rem;
    font-size: .75rem;
    line-height: 1.5;
    border-radius: .15rem;
  }

  .dragging-element {
    background-color: #2aa9f4;
    border: 1px solid #247b9c;
    border-radius: 3px;
    box-shadow: 0 4px 3px 0 rgba(0,0,0,.15);
    color: #fff;
    cursor: move;
    height: 60px;
    position: relative;
    width: 90px;
    z-index: 12;
    text-align: center;
    line-height: 60px;
    transform: translateX(-9999px) 
  }
  


}


</style>