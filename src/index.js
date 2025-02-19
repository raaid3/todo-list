import "./styles/main.scss";
import "./modules/render";
import { pubsub } from "./modules/pubsub";
import { Project } from "./modules/project";

// adding test projects
const newProj = new Project("One Proj");
const notherOne = new Project("Anotha one");
const anotherProj = new Project("now");

Project.addProject(notherOne);
Project.addProject(newProj);
Project.addProject(anotherProj);
