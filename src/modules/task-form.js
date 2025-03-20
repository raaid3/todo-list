import { Project } from "./project";

const tModal = document.querySelector(".add-task-modal");
const tForm = document.querySelector("#task-form");
const tName = document.querySelector("#task-name");
tForm.addEventListener("submit", (event) => {
  Project.currentProject.addTask({ name: tName.value });
});

tModal.addEventListener("close", (event) => {
  tForm.reset();
});
