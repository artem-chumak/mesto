export default class Section {
  constructor({render, containerSelector}) {
    this._containerSelector = document.querySelector(containerSelector);
    this._render = render;
  }

  renderItems(renderItems) {
    renderItems.forEach(item => {
      this._render(item)
    });

  }

  addItem(element, order = true) {
    if (order) {
      this._containerSelector.append(element);
    } else {
      this._containerSelector.prepend(element);
    }
  }
}