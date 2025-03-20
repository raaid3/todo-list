import { pubsub } from "./pubsub";
import { TodoItem } from "./todo";

const tModal = document.querySelector(".add-task-modal");

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
  static projects = [];

  static currentProject;

  static get projects() {
    return Project.projects;
  }

  constructor(name) {
    this.tasks = []; // task objects
    this.name = name;
    this.pageElement = Project.#createPageElement(this);
    this.buttonElement = Project.#createProjectButton(this);
    this.pageElement.appendChild(Project.#createAddTaskButton(this));
    this.pageElement.appendChild(Project.#createRemoveButton(this));
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

    button.addEventListener("click", () => {
      tModal.showModal();
    });
    button.textContent = "Add task";
    return button;
  }

  static #createRemoveButton(proj) {
    const button = document.createElement("button");

    button.addEventListener("click", () => {
      Project.removeProject(proj);
    });
    button.textContent = "Remove";
    return button;
  }

  addTask(obj) {
    const { name } = obj;
    const todo = new TodoItem(name);
    this.tasks.push(todo);
    pubsub.pub("OpenProject", this);
  }

  static addProject(project) {
    // const project = new Project(name);

    Project.projects.push(project);

    pubsub.pub("AddProject", project);
    pubsub.pub("OpenProject", project);
  }

  static removeProject(project) {
    const index = Project.projects.indexOf(project);
    Project.currentProject = Project.projects[index - 1];
    Project.projects.splice(index, 1);
    pubsub.pub("RemoveProject", project);
  }
}

pubsub.sub("OpenProject", (project) => {
  Project.currentProject = project;
});
