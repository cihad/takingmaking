import Vue from 'vue'
import App from '../App.vue'
import BlockArea from './BlockArea.js'
import uniqKey from '@/mixins/uniqKey'

Vue.mixin({
  methods: { uniqKey }
})

export default class TakingMaking {
  constructor(config) {
    this.selector = config.selector;
    this.output = config.output;
    this.initApp();
  }

  initApp() {
    new Vue({
      render: h => h(App)
    }).$mount(this.selector)

    var _this = this;

    var obj = this.getObject()

    BlockArea.rows.splice(0, BlockArea.rows.length, ...obj);

    BlockArea.$on('htmlChanged', function(newHtml) {
      document.querySelector(_this.output).value = newHtml
    })
  }

  changed(callback) {
    BlockArea.$on('changed', callback);
  }

  htmlChanged(callback) {
    BlockArea.$on('htmlChanged', callback);
  }

  // TODO
  registerBlock() {

  }

  getObject() {
    var html = document.querySelector(this.output).value

    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");

    var rows = []
    
    doc.querySelectorAll(".row").forEach(row => {
      var rowObj = []

      row.querySelectorAll("div[class^=col-]").forEach(col => {
        
        var colRegex = /^col-(\d+)$/
        var colClass = [].find.call(col.classList, klass => colRegex.test(klass))
        var colSize = colClass ? Number(colClass.match(colRegex)[1]) : 12

        var colObj = {
          colSize: colSize,
          blocks: []
        }

        col.querySelectorAll("[data-tm-block]").forEach(block => {
          var bName = block.getAttribute('data-tm-block')

          var blockClass = require(`@/blocks/${bName}/main`).default
          var obj = new blockClass(block)
          colObj.blocks.push(obj.blockObject)
        })

        rowObj.push(colObj)
      })

      rows.push(rowObj)
    })

    return rows;
  }
}