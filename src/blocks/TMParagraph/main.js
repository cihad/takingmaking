import EventBus from "@/classes/EventBus"

class TMParagraph {
  constructor(htmlDoc) {
    this.htmlDoc = htmlDoc
  }

  serializeFromHtml() {
    var _this = this

    return {
      name: "Text",
      viewName: _this.htmlDoc.getAttribute('data-tm-block'),
      optionsName: `${_this.htmlDoc.getAttribute('data-tm-block')}Options`,
      content: _this.htmlDoc.innerHTML,
      options: {
        fontSize: _this.htmlDoc.style.fontSize,
      }
    }
  }

  addBlock() {
    EventBus.blocks.push(this.serializeFromHtml())
  }
}
export default TMParagraph