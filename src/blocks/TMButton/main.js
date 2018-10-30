import BlockArea from "@/classes/BlockArea"

class TMButton {
  constructor(htmlDoc) {
    if (htmlDoc) {
      this.htmlDoc = htmlDoc
      var btn = this.htmlDoc.querySelector('a')

      this.buttonText = btn.innerText
      this.buttonUrl = btn.getAttribute("href")
    }
  }

  static get humanName() {
    return "Button"
  }

  static get viewName() {
    return "TMButton"
  }

  static get optionsName() {
    return this.viewName + "Options"
  }

  static get view() {
    return require(`./view`).default
  }

  static get options() {
    return require(`./options`).default
  }

  set buttonText(text) {
    this._buttonText = text
  }

  get buttonText() {
    return this._buttonText || "Merhaba"
  }

  set buttonUrl(url) {
    this._buttonUrl = url
  }

  get buttonUrl() {
    return this._buttonUrl || "#"
  }

  get blockObject() {
    var _this = this

    return {
      name: TMButton.humanName,
      viewName: TMButton.viewName,
      optionsName: TMButton.optionsName,
      buttonText: _this.buttonText,
      buttonUrl: _this.buttonUrl,
      options: {
        color: 'primary',
        outline: false,
        block: false
      }
    }
  }

  addBlock() {
    BlockArea.blocks.push(this.blockObject)
  }
}

export default TMButton