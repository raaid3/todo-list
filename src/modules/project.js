import { pubsub } from "./pubsub";
import { TodoItem } from "./todo";

const addButton = document.querySelector(".sidebar__addButton");
const modal = document.querySelector(".addProject-modal");
addButton.addEventListener("click", () => {
  modal.showModal();
});

const projForm = document.querySelector("#project-form");
const newProjName = document.querySelector("#project-name");
projForm.addEventListener("submit", (event) => {
  // console.log(`${newProjName.value}`);
  const proj = new Project(newProjName.value);
  Project.addProject(proj);
  newProjName.value = "";
});

const tModal = document.querySelector(".add-task-modal");
const tForm = document.querySelector("#task-form");
const tName = document.querySelector("#task-name");

export class Project {
  static #projects = [];

  static get projects() {
    return Project.#projects;
  }

  constructor(name) {
    this.tasks = []; // task objects
    this.name = name;
    this.pageElement = Project.#createPageElement(this);
    this.buttonElement = Project.#createProjectButton(this);
    this.pageElement.appendChild(Project.#createAddTaskButton(this));
  }

  static #createPageElement(proj) {
    const container = document.createElement("div");
    const title = document.createElement("h1");
    title.textContent = proj.name;
    container.appendChild(title);
    // console.log(proj.name);
    return container;
  }

  static #createProjectButton(proj) {
    const button = document.createElement("button");
    button.addEventListener("click", (target) => {
      pubsub.pub("OpenProject", proj);
    });
    button.textContent = proj.name;
    return button;
  }

  static #createAddTaskButton(proj) {
    const button = document.createElement("button");

    // const form = document.createElement("form");
    // form.method = "dialog";

    // if form is submitted, make a modal and form for each task
    tForm.addEventListener("submit", (event) => {
      let todo = new TodoItem(tName.value, 1, 1, 1, 1);

      const modal = document.createElement("dialog");
      modal.id = `tmodal-${todo.id}`;

      const form = document.createElement("form");
      form.method = "dialog";
      form.id = `tform-${todo.id}`;

      const input = document.createElement("input");
      input.type = "text";
      input.id = `tname-${todo.id}`;
      input.required = true;
      input.value = tName.value;

      const label = document.createElement("label");
      label.for = input.id;
      label.textContent = "Name: ";

      form.appendChild(label);
      form.appendChild(input);
      modal.appendChild(form);
      todo.pageElement.appendChild(modal);

      const tButton = document.createElement("button");
      tButton.addEventListener("click", (event) => {
        modal.showModal();
      });
      tButton.textContent = "Details";
      todo.pageElement.appendChild(tButton);

      proj.addTask(todo);
      pubsub.pub("OpenProject", proj);
    });

    tModal.addEventListener("close", (event) => {
      tForm.reset();
    });

    button.addEventListener("click", () => {
      console.log("clicked alright");

      tModal.showModal();
      // let taskCount = TodoItem.getTaskCount();
      // let tForm = document.createElement("form");
      // tForm.method = "dialog";
      // tForm.id = `tForm-${taskCount}`;
      // tForm.addEventListener("submit", (event) => {
      //   let task = new TodoItem(tName.value, 1, 1, 1);
      //   proj.addTask(task);
      //   pubsub.pub("OpenProject", proj);
      // });
      // let tLabel = document.createElement("label");
      // tLabel.for = tName.id;
      // tLabel.textContent = "Task name: ";
      // tForm.appendChild(tLabel);
      // let tName = document.createElement("input");
      // tName.id = `tName-${taskCount}`;
      // tName.type = "text";
      // tName.required = true;
      // tForm.appendChild(tName);
      // let tButton = document.createElement("button");
      // tButton.textContent = "Add task";
      // tForm.appendChild(tButton);
    });
    button.textContent = "Add task";
    return button;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  static addProject(project) {
    // const project = new Project(name);

    Project.#projects.push(project);

    pubsub.pub("AddProject", project);
    pubsub.pub("OpenProject", project);
  }

  static removeProject(project) {
    const index = projects.indexOf(project);
    projects.splice(index, 1);
    console.log(projects);
    pubsub.pub("RemoveProject", project);
  }
}
