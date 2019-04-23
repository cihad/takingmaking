<template>
  <div class="canvas-menu bg-dark text-white vtm border-box" :class="[placementClass, { active: active }]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    placement: {
      type: String,
      default: "left"
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    placementClass() {
      return 'canvas-menu--' + this.placement
    }
  }
}
</script>

<style>
.canvas-menu {
  background-color: #ccc;
  width: 200px;
  overflow: auto;
  height: 100%;
  position: fixed;
  z-index: 2147483647;
  transition: 150ms ease all; 
}

.canvas-menu.active {
  transform: translateX(0);
  transform: translate3d(0, 0, 0);
}

.canvas-menu--left {
  transform: translateX(-200px);
  top: 0px;
  left: 0px;
}

.canvas-menu--right {
  transform: translateX(200px);
  top: 0px;
  right: 0px;
}
</style>