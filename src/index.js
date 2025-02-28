import "./styles/main.scss";
import "./modules/render";
import { pubsub } from "./modules/pubsub";
import { Project } from "./modules/project";
import { TodoItem } from "./modules/todo";

// adding test projects
// const newProj = new Project("One Proj");
const notherOne = new Project("Anotha one");
const anotherProj = new Project("now");

Project.addProject(notherOne);
// Project.addProject(newProj);
Project.addProject(anotherProj);
anotherProj.addTask(new TodoItem("clean up", "clean stuff", "sf", 4));
anotherProj.addTask(new TodoItem("nope", 9, 9, 9));

pubsub.sub("AddProject", (project) => {
  console.log(Project.projects);
});
