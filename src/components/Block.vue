<template>
  <div  class="item"
        v-on:mouseover.stop="state.hover = !state.focus"
        v-on:mouseout.stop="mouseout"
        v-on-clickaway="clickaway"
        v-on:mousedown.stop="state.focus = true"
        data-block>

    <div class="control">
      <div class="handle handle-top"></div>
      <div class="handle handle-left"></div>
      <div class="handle handle-right"></div>
      <div class="handle handle-bottom"></div>

      <div class="vtm toolbar btn-group" v-if="state.hover || state.focus">
        <button
          class="btn btn-xs btn-primary"
          :class="{ 'btn-light-blue': lightBlue }"
          v-on:click.prevent="remove">
          <span>&#10005;</span>
        </button>

        <button
          class="btn btn-xs btn-primary"
          :class="{ 'btn-light-blue': lightBlue }"
          v-on:click.prevent="state.showOptions = !state.showOptions">
          options
        </button>

        <button
          class="btn btn-xs btn-primary handle"
          v-on:mousedown="state.showOptions=false"
          :class="{ 'btn-light-blue': lightBlue }">
          move
        </button>
      </div>

      <Popup :show="state.showOptions">
        <component  :is="value.optionsName"
                    v-model="value" />
      </Popup>
    </div>

    <component  :is="value.viewName"
                v-model="value"
                :data-hovered="state.hover"
                :data-active="state.focus || state.showOptions"
                v-on:focus="focus"
                v-on:blur="blur"
                ref="component" />
  </div>
</template>

<script>
import Popup from './Popup';
import { directive as onClickaway } from 'vue-clickaway';
import Blocks from '@/classes/Blocks';

export default {
  props: {
    blocks: Array,
    value: Object
  },
  components: {
    Popup
  },
  directives: { onClickaway },
  data() {
    return {
      state: {
        focus: false,
        hover: false,
        showOptions: false
      }
    }
  },
  beforeMount() {
    var _this = this

    Blocks.blocks.forEach((block) => {
      _this.$options.components[block.viewName] = block.view
      _this.$options.components[block.optionsName] = block.options
    })
  },
  methods: {
    remove() {
      // console.log('BlockItem remove')
      this.blocks.splice(this.index, 1)
    },
    mouseout() {
      // console.log('BlockItem leaveBlock')
      if (!this.state.showOptions) {
        this.state.hover = false;
        this.state.showRemove = false;
      }
    },
    clickaway() {
      // console.log('BlockItem clickaway')
      this.state.hover = false
      this.state.focus = false
      this.state.showOptions = false
    },
    focus() {
      // console.log('BlockItem focus')
      this.state.focus = true
      this.state.hover = false
    },
    blur() {
      // console.log('BlockItem blur')
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

.control {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  outline: 1px solid red;
}

.control .handle {
  pointer-events: all;
  position: absolute;
  cursor: move;
}

.control .handle-top,
.control .handle-bottom {
  height: 10px;
  left: 0;
  right: 0;
}

.control .handle-top {
  top: 0;
}

.control .handle-bottom {
  bottom: 0;
}

.control .handle-left,
.control .handle-right {
  width: 10px;
  top: 0;
  bottom: 0;
}

.control .handle-left {
  left: 0;
}

.control .handle-right {
  right: 0;
}

.item > .handle.active {
  outline-color: #0af;
}

.item > .handle.hover {
  outline-color: #9FDFFF;
}

.item .toolbar {
  position: absolute !important;
  top: -30px;
  right: -5px;
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
</style>