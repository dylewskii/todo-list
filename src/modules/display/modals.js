import { allProjects } from "../..";
import { addTask } from "../tasks/addTask";

export const modal = function() {
    const modal = {};

    const taskFormSubmit = function (){
        const selectedTab = document.querySelector(".tab--active").textContent.toLowerCase();
        const confirmBtn = document.getElementById("dialog-confirm");
        const dialogRounded = document.getElementById("dialog-rounded");
        const form = document.querySelector(".task-form");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const title = document.getElementById("title_field").value;
            const desc = document.getElementById("desc_field").value;
            const priority = document.getElementById("priority_select").value;
            const dueDate = document.getElementById("date_field").value;
            const project = document.getElementById("project_field").value;
            
            addTask(title, desc, priority, dueDate, project);
            dialogRounded.close();

            form.reset();  
        })
    }

    modal.taskFormSubmit = taskFormSubmit;

    return modal;
}