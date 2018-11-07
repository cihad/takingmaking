<template>
  <div class="main-wrapper" id="vtm">

    <draggable :list="rows" :options="{ group: 'rows', handle: '.handle' }">
      <Row v-for="(row, i) in rows" :key="i" v-model="rows[i]" :rows="rows" :index="i" />
    </draggable>

    <ul>
      <li v-on:click="addRow(12)">12</li>
      <li v-on:click="addRow(6,6)">6/6</li>
      <li v-on:click="addRow(4,8)">4/8</li>
      <li v-on:click="addRow(8,4)">8/4</li>
      <li v-on:click="addRow(4,4,4)">4/4/4</li>
    </ul>

    <ul>
      <draggable :list="Blocks.blocks" :options="{ group: {name: 'blocks', pull: 'clone', put: false}, sort: false }" :clone="clone">
        <li v-for="block in Blocks.blocks">{{ block.humanName }}</li>
      </draggable>
    </ul>

    <popper trigger="click" :options="{placement: 'bottom'}">
      <div class="vtm card text-white bg-dark">
          <div class="card-header">
            <input type="text" class="text-white w-100" name="" placeholder="Search blocks..." style="background-color: transparent; border: 0; outline: none" autofocus="true">
          </div>
          <div class="list-group list-group-flush">
            <draggable :list="Blocks.blocks" :options="{ group: {name: 'blocks', pull: 'clone', put: false}, sort: false }" :clone="clone">
              <a href="#" v-for="block in Blocks.blocks" class="list-group-item list-group-item-action" @click.prevent>{{ block.humanName }}</a>
            </draggable>
          </div>
      </div>

      <button class="btn btn-block btn-lg btn-light mt-4" slot="reference">&#10010;</button> 
    </popper>

    <details class="mt-5">
      <summary>Blocks</summary>
      <pre>{{rows}}</pre>
    </details>

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

export default {
  name: 'app',
  data() {
    return {
      Blocks: Blocks,
      rows: BlockArea.rows
    }
  },
  components: {
    Blocks: BlocksComponent, draggable, popper, Row
  },
  methods: {
    addRow(...rows) {
      var arr = []

      rows.forEach(size => arr.push({ colSize: size, blocks: []}))

      this.rows.push(arr)
    },
    clone(block) {
      return (new block()).blockObject
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

  .container {
    width: 900px;
  }

  .btn-xs {
    padding: .125rem .25rem;
    font-size: .75rem;
    line-height: 1.5;
    border-radius: .15rem;
  }


}


</style>
