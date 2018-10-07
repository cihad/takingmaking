<template>
  <div :style="{ fontSize: value.options.fontSize + 'px' }">
    <medium-editor :text='value.content' v-on:edit='processEditOperation' :options="options">
    </medium-editor>
  </div>
</template>

<script>
import editor from 'vue2-medium-editor'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/beagle.css'
import EventBus from '../classes/EventBus';

EventBus.registerBlock({
  name: "TMParagraph",
  optionsName: "TMParagraphOptions",
  content: "Merhaba",
  options: {
    fontSize: 20
  }
})

export default {
  props: {
    value: Object,
  },
  components: {
    'medium-editor': editor
  },
  methods: {
    processEditOperation: function (operation) {
      this.value.content = operation.api.origElements.innerHTML
    }
  },
  data() {
    return {
      options: {
        placeholder: false,
        disableReturn: true
      }
    }
  }
}
</script>

<style scoped>
[data-hovered=true] div {
  outline: 1px solid #9FDFFF  ;
}

[contenteditable]:focus {
  outline: 1px solid #00aaff;
}

.medium-editor-element {
  min-height: 0 !important;
}
</style>