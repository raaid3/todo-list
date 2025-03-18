import "./styles/main.scss";
import "./modules/render";
import { pubsub } from "./modules/pubsub";
import { Project } from "./modules/project";
import { TodoItem } from "./modules/todo";

Project.addProject(new Project("Your Project"));
