import Vue from 'vue';

const BlockArea = new Vue({
  data() {
    return {
      blocks: [],
      rows: [
        [
          {
            colSize: 12,
            blocks: []
          }
        ]
      ]
    }
  },
  methods: {
    registerBlock(block) {
      this.blocks.push(block)
    }
  },
  watch: {
    rows: {
      handler() {
        var html = `<div class="container">`

        this.rows.forEach(row => {
          html += `<div class="row">`

          row.forEach(column => {
            html += `<div class="col-${column.colSize}">`

            column.blocks.forEach(block => {
              html += block.html
            })

            html += `</div>`
        })

          html += `</div>`
        })

        html += `</div>`
        
        console.log(html)
        this.$emit('htmlChanged', html)
        this.$emit('changed', this.rows)
      },
      deep: true,
      immediate: true
    }
  }
});

export default BlockArea;