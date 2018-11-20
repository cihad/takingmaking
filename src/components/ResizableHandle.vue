<template>
  <div class="resizable-handle"
       v-on:mousedown="resizeStartHandler">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        resizing: false
      }
    },
    methods: {
      resizeStartHandler(e) {
        console.log('start resize')
        this.resizing = true
        this.startX = e.pageX
        this.colWidth = this.$parent.$el.offsetWidth / this.$parent.value.colSize
        document.addEventListener('mousemove', this.resizeHandler)
        document.addEventListener('mouseup', this.resizeStopHandler)
      },
      resizeHandler(e) {
        console.log('resizing')
        var diffX = e.pageX - this.startX

        if (Math.abs(diffX / this.colWidth) >= 1) {
          this.startX = e.pageX
          this.$emit('step', parseInt(diffX / this.colWidth))
        }
      },
      resizeStopHandler() {
        console.log('stop resize')
        this.resizing = false
        document.removeEventListener('mousemove', this.resizeHandler)
        document.removeEventListener('mouseup', this.resizeStopHandler)
      }
    }
  }
</script>

<style>
.row:hover .resizable-handle,
.row[active=true] .resizable-handle {
  display: block
}

.resizable-handle {
  position: absolute;
  font-size: 0.1px;
  display: none;
  top: 0;
  bottom: 0;
  width: 30px;
  right: -15px;
  z-index: 10;
  cursor: e-resize;
}

.resizable-handle:after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: -10px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #b0e4ec;
  box-shadow: 0 10px 0 #b0e4ec, 0 20px 0 #b0e4ec;
}

.row[active=true] .resizable-handle:after {
  background: #28a745;
  box-shadow: 0 10px 0 #28a745, 0 20px 0 #28a745;
}

</style>