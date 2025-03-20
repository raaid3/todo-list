export class TodoItem {
  static #counter = 0;

  static getTaskCount() {
    return TodoItem.#counter;
  }

  constructor(name, date, description, priority) {
    // Todo page element
    const container = document.createElement("div"); // wil be visible on page
    const h2 = document.createElement("h2"); // will be visible on page
    h2.textContent = name;
    container.appendChild(h2);

    // modal opens for details
    const modal = document.createElement("dialog");
    modal.id = `tmodal-${this.id}`;

    // Init form with provided information
    const form = document.createElement("form");
    form.method = "dialog";
    form.id = `tform-${this.id}`;
    form.addEventListener("submit", (event) => {
      this.name = form.children[1].value;

      this.reRender();
    });

    const tname = document.createElement("input");
    tname.type = "text";
    tname.id = `tname-${this.id}`;
    tname.required = true;
    tname.value = name;

    const label = document.createElement("label");
    label.for = tname.id;
    label.textContent = "Name: ";

    const button = document.createElement("button");
    button.addEventListener("click", (event) => {
      modal.showModal();
    });
    button.textContent = "Details";

    // adding properties
    this.name = name;
    this.date = date;
    this.description = description;
    this.priority = priority;
    this.pageElement = container;
    this.titleElement = h2;
    this.id = TodoItem.#counter++;

    // attaching everything to this.pageElement
    this.pageElement.appendChild(button);
    form.appendChild(label);
    form.appendChild(tname);
    modal.appendChild(form);
    this.pageElement.appendChild(modal);
  }

  updateElements() {
    this.titleElement.textContent = this.name;
  }

  render(parent) {
    parent.appendChild(this.pageElement);
  }
  unRender(parent) {
    parent.removeChild(this.pageElement);
  }
  reRender() {
    this.titleElement.textContent = this.name;
  }
}
