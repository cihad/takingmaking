import Vue from 'vue'
import App from '../App.vue'
import EventBus from './EventBus.js'

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

    EventBus.$on('blocksChanged', function(blocks) {
      document.querySelector(_this.output).value = JSON.stringify(blocks, undefined, 2)
    })
  }

  changed(callback) {
    EventBus.$on('blocksChanged', function(blocks) {
      callback(blocks);
    });
  }

  // TODO
  registerBlock(template) {

  }
}