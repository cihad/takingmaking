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
import '@/assets/custom-medium.css'

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
[contenteditable]:focus {
  outline: none;
}

.medium-editor-element {
  min-height: 0 !important;
}
</style>