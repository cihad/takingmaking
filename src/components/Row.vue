<template>
  <div  class="row mb-4"
        v-on:mouseover="state.hover = !state.focus"
        v-on:mouseout="state.hover = false"
        v-on-clickaway="clickaway"
        v-on-click-child-block="clickaway"
        v-on:mousedown="state.focus = true"
        v-on:click="state.hover = false"
        :active="state.focus">

    <div class="handle" :class="{ hover: state.hover, active: state.focus }"></div>

    <Blocks v-model="value[i]" :index='i' v-for="(column, i) in value" />

    <div class="vtm toolbar btn-group" v-if="state.hover || state.focus">
      <a href="#" class="btn btn-xs btn-success"  v-on:click.prevent="removeRow()">remove</a>
      <a href="#" class="btn btn-xs btn-success handle">move</a>
    </div>


    <a  href="#"
        :class="{disabled: !canAddColumn, active: state.focus}"
        class="add-column"
        v-on:click.prevent="addColumn()"
        v-if="state.hover || state.focus"
        title="Add column">+</a>

    <a  href="#"
        :class="{disabled: !canRemoveColumn, active: state.focus }"
        class="remove-column"
        v-on:click.prevent="removeColumn()"
        v-if="state.hover || state.focus"
        title="Remove column">-</a>

    <a  href="#"
        :class="{active: state.focus }"
        class="add-row"
        v-on:click="addRow()"
        v-if="state.hover || state.focus"
        title="Add row">+</a>
  </div>
</template>

<script>
import Blocks from "@/components/Blocks"
import { directive as onClickaway } from 'vue-clickaway';

if (!Element.prototype.matches)
    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1); 
        return null;
    };
}

export default {
  props: {
    value: Array,
    rows: Array,
    index: Number
  },
  directives: { 
    onClickaway,
    onClickChildBlock: {
      bind(el, binding, vnode) {
        var callback = binding.value;
        var vm = vnode.context;

        function clickHandler(ev) {
          var path = ev.path || (ev.composedPath ? ev.composedPath() : undefined);
          if ((path ? path.indexOf(el) > 0 : el.contains(ev.target)) && ev.target.closest('[data-block]')) {
            return callback.call(vm, ev);
          }
        }
        document.documentElement.addEventListener('click', clickHandler, false);
      }
    }
  },
  components: { Blocks },
  data() {
    return {
      state: {
        focus: false,
        hover: false,
        width: null
      }
    }
  },
  mounted() {
    this.width = this.$el.offsetWidth
  },
  methods: {
    clickaway() {
      this.state.hover = false
      this.state.focus = false
    },
    addRow() {
      this.rows.splice(this.index + 1, 0, [{ colSize: 12, blocks: [] }])
    },
    addColumn() {
      if (this.value.length >= 12) return

      var arr = this.value.map(block => block.colSize)

      var colSize = 1
      var equalColumns = arr.every(n => arr[0] == n)

      var regular = equalColumns && arr[0] > 3

      if (regular) {
        colSize = 12 / (arr.length+1)
        this.value.forEach(block => block.colSize = colSize)
      } else {
        this.value.slice().reverse().find(block => {
          if (block.colSize > colSize) {
            block.colSize -= colSize
            return true
          }
        })
      }

      this.value.push({
        colSize: colSize,
        blocks: []
      })
    },
    removeColumn() {
      if (this.value.length == 1) return

      var arr = this.value.map(block => block.colSize)
      var equalColumns = arr.every(n => arr[0] == n)
      var regular = equalColumns && arr[0] >= 3
      var irregular = !regular

      if (regular) {
        this.value.forEach(block => block.colSize = 12 / (arr.length-1))
      } else {
        var lng = this.value.length
        this.value[lng - 2].colSize += this.value[lng - 1].colSize
      }

      this.value.splice(this.value.length - 1, 1)
    },
    removeRow() {
      this.rows.splice(this.index, 1)
    }
  },
  computed: {
    canAddColumn() {
      return this.value.length < 12
    },
    canRemoveColumn() {
      return this.value.length > 1      
    }
  }
}
</script>

<style scoped>
.row {
  position: relative;
  z-index: 1;
}

.row > .handle {
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

.row > .handle.active {
  outline-color: #28a745;
}

.row > .handle.hover {
  outline-color: #b0e4bc;
}

.row .vtm.toolbar {
  position: absolute !important;
  top: -30px;
  right: -5px;
  display: flex !important;
  justify-content: flex-end;
}

.row > .add-row,
.row > .add-column,
.row > .remove-column {
  position: absolute;
  text-align: center;
  background-color: #b0e4bc;
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 20px;
  color:  white;
}


.row > .add-row {
  bottom: -15px;
  left: 50%;
  margin-left: -10px;
}

.row > .add-column {
  top: 50%;
  right: -15px;
  margin-top: -10px;
}

.row > .remove-column {
  top: 50%;
  left: -15px;
  margin-top: -10px;
}

.add-row:hover,
.add-row.active,
.add-column:hover,
.add-column.active,
.remove-column:hover,
.remove-column.active {
  background-color: #28a745;
  color: white;
  text-decoration: none;
}
</style>