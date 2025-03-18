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

  console.log(project.pageElement.children.length);
  for (let task of project.tasks) {
    // console.log(project.pageElement.children);
    task.updateElements();
    project.pageElement.appendChild(task.pageElement);
    // console.log(project.pageElement);
  }
  projDisplay.appendChild(project.pageElement);
}

function renderTodo(todo) {
  todo.updateElements();
}

// Subscribe to events
pubsub.sub("AddProject", (project) => updateSidebar(project));
// pubsub.sub("RemoveProject", (project) => unRenderProject(project));
pubsub.sub("OpenProject", (project) => renderProject(project));
pubsub.sub("RenderTodo", (todo) => {
  renderTodo(todo);
});
