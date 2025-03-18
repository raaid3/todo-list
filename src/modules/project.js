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

tForm.addEventListener("submit", (event) => {
  let todo = new TodoItem("", 0, 0, 0, 0);

  function updateTodoInfo() {
    todo.name = name.value;
    pubsub.pub("RenderTodo", todo);
  }

  const modal = document.createElement("dialog");
  modal.id = `tmodal-${todo.id}`;
  modal.addEventListener("close", updateTodoInfo);

  const form = document.createElement("form");
  form.method = "dialog";
  form.id = `tform-${todo.id}`;
  form.addEventListener("submit", updateTodoInfo);

  const name = document.createElement("input");
  name.type = "text";
  name.id = `tname-${todo.id}`;
  name.required = true;
  name.value = tName.value;
  todo.name = name.value;

  const label = document.createElement("label");
  label.for = name.id;
  label.textContent = "Name: ";

  form.appendChild(label);
  form.appendChild(name);
  modal.appendChild(form);
  todo.pageElement.appendChild(modal);

  const button = document.createElement("button");
  button.addEventListener("click", (event) => {
    modal.showModal();
  });
  button.textContent = "Details";
  todo.pageElement.appendChild(button);

  Project.currentProject.addTask(todo);
  // console.log(proj);
  pubsub.pub("OpenProject", Project.currentProject);
});

export class Project {
  static #projects = [];

  static currentProject;

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

    tModal.addEventListener("close", (event) => {
      tForm.reset();
    });

    button.addEventListener("click", () => {
      console.log("clicked alright");

      tModal.showModal();
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

pubsub.sub("OpenProject", (project) => {
  Project.currentProject = project;
});
