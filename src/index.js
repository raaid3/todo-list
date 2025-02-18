import "./styles/main.scss";
import "./modules/render";
import { pubsub } from "./modules/pubsub";
import { Project, addProject, getProjects } from "./modules/project";

// adding test projects
const newProj = new Project("ooga booga");
const notherOne = new Project("Anotha one");
const anotherProj = new Project("now");

addProject(notherOne);
addProject(newProj);
addProject(anotherProj);
