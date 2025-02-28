import { pubsub } from "./pubsub";

const addButton = document.querySelector(".sidebar__addButton");
const modal = document.querySelector(".addProject-modal");
addButton.addEventListener("click", () => {
  modal.showModal();
});

const projForm = document.querySelector("#project-form");
const newProjName = document.querySelector("#project-name");
projForm.addEventListener("submit", (event) => {
  console.log(`${newProjName.value}`);
  Project.addProject(new Project(newProjName.value));
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

  addTask(task) {
    this.tasks.push(task);
  }

  static addProject(project) {
    Project.#projects.push(project);

    pubsub.pub("AddProject", project);
  }

  static removeProject(project) {
    const index = projects.indexOf(project);
    projects.splice(index, 1);
    console.log(projects);
    pubsub.pub("RemoveProject", project);
  }
}
