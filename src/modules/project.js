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

    const form = document.createElement("form");
    form.method = "dialog";

    button.addEventListener("click", () => {
      let task = new TodoItem("hi", 1, 1, 1);

      let tForm = document.createElement("form");
      tForm.method = "dialog";
      tForm.id = `tForm-${task.id}`;

      let tName = document.createElement("input");
      tName.id = `tName-${task.id}`;
      tName.type = "text";
      tName.required = true;

      let tLabel = document.createElement("label");
      tLabel.for = tName.id;
      tLabel.textContent = "Task name: ";

      proj.addTask(task);
      pubsub.pub("OpenProject", proj);
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
