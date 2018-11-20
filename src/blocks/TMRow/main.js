import BlockArea from "@/classes/BlockArea"

class TMRow {
  constructor(htmlDoc) {
    if (htmlDoc) {
      this.htmlDoc = htmlDoc
      this.kontent = htmlDoc.innerHTML
      this.fontSize = htmlDoc.style.fontSize
    }
  }

  static get humanName() {
    return "Row"
  }

  get humanName() {
    return "Row"
  }

  static get viewName() {
    return "TMRow"
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

  get blockObject() {
    return {
      name: "Row",
      viewName: TMRow.viewName,
      optionsName: TMRow.optionsName,
      content: [
        {colSize:12, blocks: [] }
      ]
    }
  }

  addBlock() {
    BlockArea.blocks.push(this.blockObject)
  }
}
export default TMRow