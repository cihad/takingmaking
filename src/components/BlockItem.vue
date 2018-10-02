<template>
  <div  class="item"
        v-on:mouseenter="isToolbarActive = true"
        v-on:mouseleave="isToolbarActive = false; isActiveRemoveButton = false">
    <div v-handle class="handle top"></div>
    <div v-handle class="handle bottom"></div>
    <div v-handle class="handle right"></div>
    <div v-handle class="handle left"></div>

    <div class="toolbar" :class="{ active: isToolbarActive }">
      <a  href="#"
          class="btn btn-xs"
          :class="{ 'btn-secondary': !isActiveRemoveButton, 'btn-danger': isActiveRemoveButton }"
          v-on:click="remove">
        <span>&#10005;</span>
        <span v-show="isActiveRemoveButton">remove</span>
      </a>
    </div>

    <component  :is="value.name"
                v-model="value"
                :data-hovered="isToolbarActive" />
  </div>
</template>

<script>
import TMParagraph from "./TMParagraph.vue"
import { ElementMixin, HandleDirective } from 'vue-slicksort';

export default {
  mixins: [ElementMixin],
  props: {
    blocks: Array,
    value: Object
  },
  components: {
    TMParagraph
  },
  directives: { handle: HandleDirective },
  data() {
    return {
      isToolbarActive: false,
      isActiveRemoveButton: false
    }
  },
  methods: {
    remove(e) {
      if (this.isActiveRemoveButton) {
        this.blocks.splice(this.index, 1)
      } else {
        this.isActiveRemoveButton = true
      }
    }
  }
}
</script>

<style>
.item {
  position: relative;
  padding: 10px;
  margin: 0 -10px;
}
.item > .handle {
  position: absolute;
  cursor: move;
}

.item > .handle.top {
  height: 10px;
  top: 0;
  right: 0;
  left: 0;
}

.item > .handle.bottom {
  height: 10px;
  bottom: 0;
  right: 0;
  left: 0;
}

.item > .handle.left {
  width: 10px;
  left: 0;
  top: 0;
  bottom: 0;
}

.item > .handle.right {
  width: 10px;
  right: 0;
  top: 0;
  bottom: 0;
}

.toolbar {
  position: absolute;
  top: 0;
  right: 20px;
  display: none;
  transition: all 2s;
}

.toolbar.active {
  display: flex;
  justify-content: flex-end;
}

.remove-button {
  background-color: rgba(0,0,0,.24);
  transition: width .2s,background-color .2s;
  padding: 0 5px 0 14px;
  color: #fff !important;
  font-size: 11px;
  line-height: 16px;
  overflow: hidden;
  width: 0;
}

</style>