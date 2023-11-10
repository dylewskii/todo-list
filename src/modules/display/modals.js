import { allProjects } from "../..";

export const dialog = function() {
    const controller = {};

    const loadTaskAdd = function (){
        const selectedTab = document.querySelector(".tab--active").textContent.toLowerCase();
        const confirmBtn = document.getElementById("dialog-confirm");
        const form = document.querySelector(".task-form");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("title_field").value;
            const desc = document.getElementById("desc_field").value;
            const priority = document.getElementById("priority_select").value;
            const dueDate = document.getElementById("date_field").value;
            const project = document.getElementById("project_field").value;
  
        })
    }

    controller.loadTaskAdd = loadTaskAdd;

    return controller;
}