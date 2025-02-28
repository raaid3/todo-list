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
    project.pageElement.appendChild(task.pageElement);
  }
  projDisplay.appendChild(project.pageElement);
}

// Subscribe to events
pubsub.sub("AddProject", (project) => updateSidebar(project));
// pubsub.sub("RemoveProject", (project) => unRenderProject(project));
pubsub.sub("OpenProject", (project) => renderProject(project));
