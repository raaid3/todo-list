import { pubsub } from "./pubsub";
import { Project } from "./project";

const sidebar = document.querySelector(".sidebar__projects");
const projDisplay = document.querySelector(".project-display");

// function to render a project on page
function renderProject(project) {
  const container = document.createElement("div");
  container.textContent = project.name;
  project.pageElement = container;

  container.addEventListener("click", () => {
    pubsub.pub("OpenProject", project);
  });

  // container.textContent = project.name;

  // Remove button for testing
  // const removeButton = document.createElement("button");
  // removeButton.textContent = "Remove me";
  // removeButton.addEventListener("click", () => {
  //   removeProject(project);
  // });
  // container.appendChild(removeButton);

  sidebar.appendChild(container);
}

// function to un-render a project on page
function unRenderProject(project) {
  project.pageElement.remove();
  delete project.pageElement;
}

function displayOpenProject(project) {
  projDisplay.innerHTML = "";
  const header = document.createElement("h1");
  header.textContent = project.name;

  projDisplay.appendChild(header);
}

// Subscribe to events
pubsub.sub("AddProject", (project) => renderProject(project));
pubsub.sub("RemoveProject", (project) => unRenderProject(project));
pubsub.sub("OpenProject", (project) => displayOpenProject(project));
