import EventBus from "@/classes/EventBus"

class TMParagraph {
  constructor(htmlDoc) {
    this.htmlDoc = htmlDoc
  }

  serializeFromHtml() {
    var _this = this

    return {
      name: _this.htmlDoc.getAttribute('data-tm-block'),
      optionsName: `${_this.htmlDoc.getAttribute('data-tm-block')}Options`,
      content: _this.htmlDoc.innerHTML,
      options: {
        fontSize: _this.htmlDoc.style.fontSize,
      }
    }
  }

  addBlock() {
    EventBus.cihad.push(this.serializeFromHtml())
  }
}
export default TMParagraph