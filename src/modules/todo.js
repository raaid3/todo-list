export class TodoItem {
  static #counter = 0;

  static getTaskCount() {
    return TodoItem.#counter;
  }

  constructor(name, date, description, priority) {
    // properties that the user can interact with
    this.name = name;
    this.date = date;
    this.description = description;
    this.priority = priority;

    // properties used behind the scenes
    this.id = TodoItem.#counter++;

    const container = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.textContent = this.name;
    container.appendChild(h2);

    this.titleElement = h2;
    this.pageElement = container;
  }

  updateElements() {
    this.titleElement.textContent = this.name;
  }
  // static #createPageElement(item) {

  // }
}
