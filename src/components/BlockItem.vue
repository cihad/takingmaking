<template>
  <div  class="item"
        v-on:mouseenter="state.hover = !state.focus"
        v-on:mouseleave="leaveBlock"
        v-on-clickaway="clickaway"
        v-on:mousedown="state.focus = true">
    <div v-handle class="handle top"></div>
    <div v-handle class="handle bottom"></div>
    <div v-handle class="handle right"></div>
    <div v-handle class="handle left"></div>

    <div class="toolbar btn-group" v-if="state.hover || state.focus">
      <a  href="#"
          class="btn btn-xs btn-primary"
          :class="{ 'btn-light-blue': lightBlue, 'btn-danger': state.showRemove }"
          v-on:click="remove">
        <span>&#10005;</span>
        <span v-show="state.showRemove">remove</span>
      </a>

      <a  href="#"
          class="btn btn-xs btn-primary"
          :class="{ 'btn-light-blue': lightBlue }"
          v-on:click="state.showOptions = !state.showOptions">
        conf
      </a>

      <a  href="#"
          class="btn btn-xs btn-primary"
          :class="{ 'btn-light-blue': lightBlue }"
          v-handle>
        move
      </a>
    </div>

    <Tooltip :show="state.showOptions">
      <component  :is="value.optionsName"
                  v-model="value" />
    </Tooltip>

    <component  :is="value.name"
                v-model="value"
                :data-hovered="state.hover"
                :data-active="state.focus || state.showOptions"
                v-on:focus="focus"
                v-on:blur="blur" />
  </div>
</template>

<script>
import TMParagraph from "./TMParagraph.vue"
import TMParagraphOptions from "./TMParagraphOptions.vue"
import TMButton from "./TMButton.vue"
import TMButtonOptions from "./TMButtonOptions.vue"
import { ElementMixin, HandleDirective } from 'vue-slicksort';
import Tooltip from './Tooltip';
import { directive as onClickaway } from 'vue-clickaway';

export default {
  mixins: [ElementMixin],
  props: {
    blocks: Array,
    value: Object
  },
  components: {
    TMParagraph, Tooltip, TMParagraphOptions, TMButton, TMButtonOptions
  },
  directives: { handle: HandleDirective, onClickaway },
  data() {
    return {
      state: {
        focus: false,
        hover: false,
        showOptions: false,
        showRemove: false,
      }
    }
  },
  methods: {
    remove() {
      console.log('BlockItem remove')
      if (this.state.showRemove) {
        this.blocks.splice(this.index, 1)
      } else {
        this.state.showRemove = true
      }
    },
    leaveBlock() {
      console.log('BlockItem leaveBlock')
      if (!this.state.showOptions) {
        this.state.hover = false;
        this.state.showRemove = false;
      }
    },
    clickaway() {
      console.log('BlockItem clickaway')
      this.state.hover = false
      this.state.focus = false

      if (this.state.showOptions) {
        this.state.showOptions = false
      }
    },
    focus() {
      console.log('BlockItem focus')
      this.state.focus = true
      this.state.hover = false
    },
    blur() {
      console.log('BlockItem blur')
      this.state.hover = true
      this.state.focus = false
    },
  },
  computed: {
    lightBlue() {
      return this.state.hover && !this.state.focus && !this.state.showOptions
    }
  }
}
</script>

<style>
.item {
  position: relative;
}

.item > .handle {
  position: absolute;
  cursor: move;
}

.item > .handle.top {
  height: 10px;
  top: -5px;
  right: 0;
  left: 0;
}

.item > .handle.bottom {
  height: 10px;
  bottom: -5px;
  right: 0;
  left: 0;
}

.item > .handle.left {
  width: 10px;
  left: -5px;
  top: 0;
  bottom: 0;
}

.item > .handle.right {
  width: 10px;
  right: -5px;
  top: 0;
  bottom: 0;
}

.toolbar {
  position: absolute !important;
  top: -25px;
  right: 0;
  transition: all 2s;
  display: flex !important;
  justify-content: flex-end;
}

.btn-light-blue {
  background-color: #9FDFFF !important;
  border-color: #9FDFFF !important;
}

.sorting .btn-light-blue {
  background-color: #007bff !important;
  border-color: #007bff !important; 
}

.toolbar.btn-group > .btn:last-child {
  border-bottom-right-radius: 0;
}

.toolbar.btn-group > .btn:first-child {
  border-bottom-left-radius: 0;
}

.toolbar.btn-group {
  margin-right: -1px;
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