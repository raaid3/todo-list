export class TodoItem {
  constructor(name, date, description, priority) {
    this.name = name;
    this.date = date;
    this.description = description;
    this.priority = priority;
    this.pageElement = TodoItem.#createPageElement(this);
  }

  static #createPageElement(item) {
    const container = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.textContent = item.name;
    container.appendChild(h2);
    return container;
  }
}
