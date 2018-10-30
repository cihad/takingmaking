import BlockArea from "@/classes/BlockArea"

class TMParagraph {
  constructor(htmlDoc) {
    if (htmlDoc) {
      this.htmlDoc = htmlDoc
      this.kontent = htmlDoc.innerHTML
      this.fontSize = htmlDoc.style.fontSize
    }
  }

  static get humanName() {
    return "Paragraph"
  }

  static get viewName() {
    return "TMParagraph"
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

  get kontent() {
    return this._content || `Lorem Ipsum is simply dummy text of the printing and typesetting
                             industry. Lorem Ipsum has been the industry's standard dummy text
                             ever since the 1500s, when an unknown printer took a galley of
                             type and scrambled it to make a type specimen book. It has
                             survived not only five centuries, but also the leap into
                             electronic typesetting, remaining essentially unchanged. It was
                             popularised in the 1960s with the release of Letraset sheets
                             containing Lorem Ipsum passages, and more recently with desktop
                             publishing software like Aldus PageMaker including versions of
                             Lorem Ipsum.`
  }

  set kontent(htmlString) {
    this._content = htmlString
  }

  set fontSize(fontSize) {
    this._fontSize = fontSize
  }

  get fontSize() {
    return this._fontSize
  }

  get blockObject() {
    var _this = this

    return {
      name: "Paragraph",
      viewName: TMParagraph.viewName,
      optionsName: TMParagraph.optionsName,
      content: _this.kontent,
      options: {
        fontSize: _this.fontSize,
      }
    }
  }

  addBlock() {
    BlockArea.blocks.push(this.blockObject)
  }
}
export default TMParagraph