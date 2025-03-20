import { pubsub } from "./pubsub";
import { Project } from "./project";

const sidebar = document.querySelector(".sidebar__projects");
const projDisplay = document.querySelector(".project-display");

// Rendering buttons on the sidebar
function updateSidebar(project) {
  sidebar.appendChild(project.buttonElement);
}

function renderProject(project) {
  projDisplay.innerHTML = "";

  for (let task of project.tasks) {
    task.render(project.pageElement);
  }
  projDisplay.appendChild(project.pageElement);
}

function unRenderProject(project) {
  projDisplay.innerHTML = "";
  sidebar.removeChild(project.buttonElement);
  delete project.pageElement;
  delete project.buttonElement;

  // ---
  console.log(Project.projects.indexOf(project));
  // ---

  pubsub.pub("OpenProject", Project.currentProject);
}

function renderTodo(todo) {
  todo.updateElements();
}

// Subscribe to events
pubsub.sub("AddProject", (project) => updateSidebar(project));
pubsub.sub("RemoveProject", (project) => unRenderProject(project));
pubsub.sub("OpenProject", (project) => renderProject(project));
pubsub.sub("RenderTodo", (todo) => {
  renderTodo(todo);
});
