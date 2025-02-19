import { pubsub } from "./pubsub";

const projects = [];

export class Project {
  constructor(name) {
    this.tasks = []; // task objects
    this.name = name;
  }

  addTask(task) {
    tasks.push(task);
  }

  static addProject(project) {
    projects.push(project);
    pubsub.pub("AddProject", project);
  }

  static removeProject(project) {
    const index = projects.indexOf(project);
    projects.splice(index, 1);
    console.log(projects);
    pubsub.pub("RemoveProject", project);
  }

  static getProjects() {
    return projects;
  }
}
