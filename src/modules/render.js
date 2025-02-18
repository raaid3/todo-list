import { pubsub } from "./pubsub";
import { Project, addProject, getProjects, removeProject } from "./project";

const sidebar = document.querySelector(".sidebar__projects");

// function to render a project on page
function renderProject(project) {
  const container = document.createElement("div");
  project.pageElement = container;
  container.textContent = project.name;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove me";
  removeButton.addEventListener("click", () => {
    removeProject(project);
  });
  container.appendChild(removeButton);

  sidebar.appendChild(container);
}

// function to un-render a project on page
function unRenderProject(project) {
  project.pageElement.remove();
}

// Subscribe to events
pubsub.sub("AddProject", (project) => renderProject(project));
pubsub.sub("RemoveProject", (project) => unRenderProject(project));
