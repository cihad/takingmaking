<template>
  <div  class="item"
        v-on:mouseover.stop="state.hover = !state.focus"
        v-on:mouseout.stop="leaveBlock"
        v-on-clickaway="clickaway"
        v-on:mousedown.stop="state.focus = true"
        data-block>

    <div class="handle" v-on:mousedown="state.showOptions=false" :class="{ hover: state.hover, active: state.focus }"></div>

    <div class="vtm toolbar btn-group" v-if="state.hover || state.focus">
      <a  href="#"
          class="btn btn-xs btn-primary"
          :class="{ 'btn-light-blue': lightBlue, 'btn-danger': state.showRemove }"
          v-on:click.prevent="remove">
        <span>&#10005;</span>
        <span v-show="state.showRemove">remove</span>
      </a>

      <a  href="#"
          class="btn btn-xs btn-primary"
          :class="{ 'btn-light-blue': lightBlue }"
          v-on:click.prevent="state.showOptions = !state.showOptions">
        options
      </a>

      <a  href="#"
          class="btn btn-xs btn-primary handle"
          v-on:mousedown="state.showOptions=false"
          :class="{ 'btn-light-blue': lightBlue }">
        move
      </a>
    </div>

    <Tooltip :show="state.showOptions">
      <component  :is="value.optionsName"
                  v-model="value" />
    </Tooltip>

    <component  :is="value.viewName"
                v-model="value"
                :data-hovered="state.hover"
                :data-active="state.focus || state.showOptions"
                v-on:focus="focus"
                v-on:blur="blur" />
  </div>
</template>

<script>
import Tooltip from './Tooltip';
import { directive as onClickaway } from 'vue-clickaway';
import Blocks from '@/classes/Blocks';

export default {
  props: {
    blocks: Array,
    value: Object
  },
  components: {
    Tooltip
  },
  directives: { onClickaway },
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
  beforeMount() {
    var _this = this

    Blocks.blocks.forEach((block) => {
      _this.$options.components[block.viewName] = block.view
      _this.$options.components[block.optionsName] = block.options
    })
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
  z-index: 1;
}

.item > .handle {
  position: absolute;
  cursor: move;
  bottom: -5px;
  left: -5px;
  right: -5px;
  top: -5px;
  margin: 0;
  padding: 0;
  outline: 1px solid transparent;
  z-index: -1;
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