import Vue from 'vue'
import App from '../App.vue'
import BlockArea from './BlockArea.js'

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

    this.getBlocks()

    BlockArea.$on('blocksHtmlChanged', function(newHtml) {
      document.querySelector(_this.output).value = newHtml
    })
  }

  changed(callback) {
    BlockArea.$on('blocksChanged', callback);
  }

  // TODO
  registerBlock(template) {

  }

  getBlocks() {
    var html = document.querySelector(this.output).value

    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");

    doc.querySelectorAll("[data-tm-block]").forEach(block => {
      var bName = block.getAttribute('data-tm-block')

      var blockClass = require(`@/blocks/${bName}/main`).default
      var obj = new blockClass(block)

      obj.addBlock()
    })


  }
}