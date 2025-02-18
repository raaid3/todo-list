import { pubsub } from "./pubsub";

const projects = [];

export class Project {
  constructor(name) {
    this.tasks = []; // task objects
    this.name = name;
  }
}

export function addProject(project) {
  projects.push(project);
  pubsub.pub("AddProject", project);
}

export function removeProject(project) {
  const index = projects.indexOf(project);
  projects.splice(index, 1);
  console.log(projects);
  pubsub.pub("RemoveProject", project);
}

export function getProjects() {
  return projects;
}
