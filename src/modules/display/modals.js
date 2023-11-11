import { allProjects } from "../..";
import { addTask } from "../tasks/addTask";
import { changeCase } from "../misc/changeCase";

export const modal = function() {
    const modal = {};

    const addTodoModal = function (){
        const selectedTab = document.querySelector(".tab--active").textContent.toLowerCase();
        const confirmBtn = document.getElementById("dialog-confirm");
        const cancelBtn = document.getElementById("dialog-cancel");

        const addTodoDialog = document.getElementById("add-todo-dialog");
        const form = document.querySelector(".add-todo-form");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (e.submitter.id === "dialog-cancel"){
                addTodoDialog.close();
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

            addTodoDialog.close();
            form.reset();  
        })
    }

    const infoModal = function (e){
        const infoContent = document.querySelector(".info-form-content");
        const labels = ["Title:", "Description:", "Priority:", "Due Date:", "Project:"];

        while (infoContent.firstChild) {
            infoContent.removeChild(infoContent.firstChild);
        };

        const infoModalBtn = document.getElementById("info-dialog");
        infoModalBtn.showModal(e);

        const selectedTab = document.querySelector(".tab--active").textContent.toLowerCase();
        const clickedTask = changeCase(e.target.parentElement.parentElement.children[1].textContent, "lowercase");

        labels.forEach(label => {
            const infoContainer = document.createElement("div");
            infoContainer.classList.add("nes-container", "is-rounded", "with-title");

            const title = document.createElement("p");
            title.classList.add("title");
            title.textContent = label;

            const content = document.createElement("p");
            content.textContent = "";

            infoContainer.appendChild(title);
            infoContainer.appendChild(content);

            infoContent.appendChild(infoContainer);
        });



    }

    modal.addTodoModal = addTodoModal;
    modal.infoModal = infoModal;

    return modal;
}