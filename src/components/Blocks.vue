<template>
  <div style="display: flex">
    <div class="main-side">
      <BlocksContainer lockAxis="y" :useDragHandle="true" v-model="blocks">
        <BlockItem v-for="(block, index) in blocks" :index="index" :key="index" v-model="blocks[index]" :blocks="blocks" />
      </BlocksContainer>


      <div class="card">
        <div class="card-body text-center">
          <button class="btn btn-sm btn-success">&#10133;</button>
        </div>
      </div>
      <pre>{{blocks}}</pre>
    </div>

    <div class="right-side">
      <a href="#" v-on:click="addBlock">Add</a>
    </div>
  </div>
</template>

<script>
import BlocksContainer from "./BlocksContainer"
import BlockItem from "./BlockItem"

export default {
  data() {
    return {
      blocks: [
        {
          name: "TMParagraph",
          content: "Merhaba"
        },
        {
          name: "TMParagraph",
          content: "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir."
        }
      ]
    }
  },
  components: {
    BlocksContainer, BlockItem
  },
  methods: {
    addBlock() {
      this.blocks.push(Object.assign({}, this.blocks[0]))
    }
  }
}
</script>

<style>
.right-side {
  flex: 0 0 200px;
  margin-left: 20px;
}

.main-side {
  flex: 0 0 680px;
}
</style>
