<template>
  <div :style="{ fontSize: value.options.fontSize + 'px' }">
    <p>
      <medium-editor :text='value.content'
                      v-on:edit='processEditOperation'
                      :options="options"
                      v-on:focus.native="focus"
                      v-on:blur.native="blur">
      </medium-editor>
    </p>
  </div>
</template>

<script>
import editor from 'vue2-medium-editor'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/beagle.css'
import EventBus from '../classes/EventBus';
import Block from './Block';

EventBus.registerBlock({
  name: "TMParagraph",
  optionsName: "TMParagraphOptions",
  content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  options: {
    fontSize: null
  }
})

export default {
  mixins: [Block],
  props: {
    value: Object,
  },
  components: {
    'medium-editor': editor
  },
  methods: {
    processEditOperation: function (operation) {
      this.value.content = operation.api.origElements.innerHTML
    },
    focus() {
      this.$emit('focus')
    },
    blur() {
      this.$emit('blur')
    }
  },
  computed: {
    toS() {
      let template = `
<div style="font-size: ${this.value.options.fontSize}px">
  ${this.value.content}
</div>`

      return template
    }
  },
  data() {
    return {
      options: {
        placeholder: false,
        disableReturn: true,
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'anchor'],

        }
      }
    }
  },
  mounted() {
    let computedStyles = window.getComputedStyle(this.$el);
    this.value.options.fontSize = parseInt(computedStyles.fontSize)
  }
}
</script>

<style scoped>
[data-hovered=true] div {
  outline: 1px solid #9FDFFF  ;
}

.sorting div,
[contenteditable]:focus,
[data-active=true] div {
  outline: 1px solid #00aaff;
}

.medium-editor-element {
  min-height: 0 !important;
}
</style>