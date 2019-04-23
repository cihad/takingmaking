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
        this.resizing = true
        this.startX = e.pageX
        this.currentWidth = this.$parent.$el.offsetWidth
        // TODO colSize'i degistirmedigimiz icin 2. sinde cortluyor.
        this.colWidth = this.$parent.$el.parentElement.offsetWidth / 12
        // this.colWidth = this.currentWidth / this.$parent.value.colSize
        this.nextElementCurrentWidth = this.$parent.$el.nextElementSibling.offsetWidth
        this.totalWidth = this.currentWidth + this.nextElementCurrentWidth
        this.$parent.$el.style.maxWidth = "none"
        this.$parent.$el.nextElementSibling.style.maxWidth = "none"
        document.addEventListener('mousemove', this.resizeHandler)
        document.addEventListener('mouseup', this.resizeStopHandler)
      },
      resizeHandler(e) {
        var diffX = e.pageX - this.startX

        var _this = this

        var edges = Array(11).fill(0).map(function(_, i) {
          return _this.colWidth * (i+1)
        })

        for (let edge of edges) {
          if (Math.abs(this.currentWidth + diffX - edge) < 10) {
            _this.$parent.$el.style.backgroundColor = "azure"
            _this.$parent.$el.style.flexBasis = edge + "px"
            _this.$parent.$el.nextElementSibling.style.flexBasis = _this.totalWidth - edge + "px"
            return
          }
        }
        
        this.$parent.$el.style.backgroundColor = "white"

        this.$parent.$el.style.flexBasis = this.currentWidth + diffX + "px"
        this.$parent.$el.nextElementSibling.style.flexBasis = this.nextElementCurrentWidth - diffX + "px"
      },
      resizeStopHandler() {
        this.resizing = false

        document.removeEventListener('mousemove', this.resizeHandler)
        document.removeEventListener('mouseup', this.resizeStopHandler)

        // burada mouse cekildigi zaman eger resize edilen column iki column
        // arasındaysa genisligi en yakın column genisligine cekiyoruz.
        var width = this.colWidth * Number((this.$parent.$el.offsetWidth / this.colWidth).toFixed(0))
        this.$parent.$el.style.transition = "all 200ms"
        this.$parent.$el.nextElementSibling.style.transition = "all 200ms"

        this.$parent.$el.addEventListener('transitionend', function() {
          this.style.transition = "none"
        }, false)

        this.$parent.$el.nextElementSibling.addEventListener('transitionend', function() {
          this.style.transition = "none"
        }, false)

        this.$parent.$el.style.backgroundColor = "white"
        this.$parent.$el.style.flexBasis = width + "px"
        this.$parent.$el.nextElementSibling.style.flexBasis = this.totalWidth - width + "px"
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