import { allProjects } from "../..";
import { addTask } from "../tasks/addTask";

export const modal = function() {
    const modal = {};

    const taskFormSubmit = function (){
        const selectedTab = document.querySelector(".tab--active").textContent.toLowerCase();
        const confirmBtn = document.getElementById("dialog-confirm");
        const cancelBtn = document.getElementById("dialog-cancel");

        const dialogRounded = document.getElementById("dialog-rounded");
        const form = document.querySelector(".task-form");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (e.submitter.id === "dialog-cancel"){
                dialogRounded.close();
                form.reset();
                return;
            }

            let title = document.getElementById("title_field").value;
            let desc = document.getElementById("desc_field").value;
            let priority = document.getElementById("priority_select").value;
            let dueDate = document.getElementById("date_field").value;
            let project = document.getElementById("project_field").value;
            
            // If undefined value provided, set a string value.
            title = title || "N/A"; 
            desc = desc || "N/A"; 
            priority = priority || "low"; 
            dueDate = dueDate || "N/A";
            project = project || "home"; 

            addTask(title, desc, priority, dueDate, project);

            dialogRounded.close();
            form.reset();  
        })
    }

    modal.taskFormSubmit = taskFormSubmit;

    return modal;
}