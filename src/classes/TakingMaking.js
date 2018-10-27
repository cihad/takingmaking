import Vue from 'vue'
import App from '../App.vue'
import EventBus from './EventBus.js'
// import deneme from "../blocks/TMCihad/main"
// import Cihad from "../blocks/TMCihad/view"


const REQ = require.context('@/blocks', true, /main\.js$/i);

// console.log((new (req(req.keys()[0]).default)()).toS())
// req.keys().forEach(fileName => {
//   const name = fileName.match(/\w+/)[0];
//   // return Vue.component(name, req(fileName))
// });

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

    // console.log(deneme)
    // console.log(Cihad)

    var _this = this;

    this.getBlocks()

    EventBus.$on('blocksHtmlChanged', function(newHtml) {
      document.querySelector(_this.output).value = newHtml
    })
  }

  changed(callback) {
    EventBus.$on('blocksChanged', callback);
  }

  // TODO
  registerBlock(template) {

  }

  getBlocks() {
    var html = `<div style="font-size: 34px" data-tm-block="TMParagraph">
  Lorem Ipsum Nedir?

</div>
<div style="font-size: 16px" data-tm-block="TMParagraph">
  <b>Lorem Ipsum</b>, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.
</div>
<div style="text-align: center;" data-tm-block="TMButton">
  <a href="example.com" class="btn btn-primary btn-block">
    HEMEN AL
  </a>
</div>`

    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");


    // var b = doc.querySelectorAll("[data-tm-block]")[0]
    // var bName = b.getAttribute('data-tm-block')

    // var blockClass = require(`@/blocks/${bName}/main`).default
    // var obj = new blockClass()

    // console.log(obj.serializeFromHtml(b))
    // debugger

    doc.querySelectorAll("[data-tm-block]").forEach(block => {
      var bName = block.getAttribute('data-tm-block')

      var blockClass = require(`@/blocks/${bName}/main`).default
      var obj = new blockClass(block)

      // obj.addBlock()
    })


  }
}