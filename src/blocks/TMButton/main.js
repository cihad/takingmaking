import EventBus from "@/classes/EventBus"

class TMButton {
  constructor(htmlDoc) {
    this.htmlDoc = htmlDoc
  }

  serializeFromHtml() {
    var btn = this.htmlDoc.querySelector('a')

    return {
      name: "TMButton",
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
    EventBus.cihad.push(this.serializeFromHtml())
  }
}
export default TMButton