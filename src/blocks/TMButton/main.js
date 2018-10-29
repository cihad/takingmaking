import EventBus from "@/classes/EventBus"

class TMButton {
  constructor(htmlDoc) {
    this.htmlDoc = htmlDoc
  }

  serializeFromHtml() {
    var btn = this.htmlDoc.querySelector('a')

    return {
      name: "Button",
      viewName: "TMButton",
      optionsName: "TMButtonOptions",
      buttonText: btn.innerText,
      buttonUrl: btn.getAttribute("href"), 
      options: {
        color: 'primary',
        outline: false,
        block: false
      }
    }
  }

  addBlock() {
    EventBus.blocks.push(this.serializeFromHtml())
  }
}
export default TMButton