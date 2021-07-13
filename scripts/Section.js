export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._container = containerSelector;
    this._renderer = renderer;
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }
  setItem(element) {
    this._container.append(element);
  }

}