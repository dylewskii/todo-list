import { allProjects } from "../..";
import { addTask } from "../tasks/addTask";
import { editTask } from "../tasks/editTask";
import { render } from "./render";
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
        while (infoContent.firstChild) {
            infoContent.removeChild(infoContent.firstChild);
        };

        const infoDialog = document.getElementById("info-dialog");
        infoDialog.showModal(e);

        const selectedTab = document.querySelector(".tab--active").textContent.toLowerCase();
        const clickedTask = changeCase(e.target.parentElement.parentElement.children[1].textContent, "lowercase");
        const taskArr = allProjects[selectedTab][clickedTask];
        
        const labels = ["Title:", "Description:", "Priority:", "Due Date:", "Project:"];

        for (let i = 0; i < labels.length; i++){
            const infoContainer = document.createElement("div");
            infoContainer.classList.add("nes-container", "is-rounded", "with-title");

            const title = document.createElement("p");
            title.classList.add("title");
            title.textContent = labels[i];

            const content = document.createElement("p");
            content.textContent = `${taskArr[i]}`;

            infoContainer.appendChild(title);
            infoContainer.appendChild(content);

            infoContent.appendChild(infoContainer);
        }
    }

    const editModal = function (e){
        // Provide live color feedback when edits are made
        const changeColor = function (e) {
            let editedValue = e.value;
            if (editedValue === e){
                e.style.color = "green";
            } else {
                e.style.color = "red";
            }
        };

        const editForm = document.querySelector(".edit-form");
        const editFormContent = document.querySelector(".edit-form-content");
        const editDialog = document.getElementById("edit-dialog");
        editDialog.showModal(e);

        const selectedTab = document.querySelector(".tab--active").textContent.toLowerCase();
        const clickedTask = changeCase(e.target.parentElement.parentElement.children[1].textContent, "lowercase");
        const taskArr = allProjects[selectedTab][clickedTask];

        let currTitle = document.getElementById("edit_title_field");
        let currDesc = document.getElementById("edit_desc_field");
        let currPriority = document.getElementById("edit_priority_select");
        let currDate = document.getElementById("edit_date_field");
        let currProject = document.getElementById("edit_project_field");

        for (let i = 0; i < taskArr.length; i++){
            if (i === 0){
                currTitle.value = `${taskArr[0]}`
                // currTitle.addEventListener("input", changeColor(currTitle));
            } else if (i === 1){
                currDesc.value = `${taskArr[1]}`;
                // currDesc.addEventListener("input", changeColor(currDesc));
            } else if (i === 2){
                currPriority.value = `${taskArr[2]}`;
                // currPriority.addEventListener("input", changeColor(currPriority));
            } else if (i === 3){
                currDate.value = `${taskArr[3]}`;
                // currDate.addEventListener("input", changeColor(currDate));
            } else if (i === 4){
                currProject.value = `${taskArr[4]}`;
                // currProject.addEventListener("input", changeColor(currProject));
            } 
            else {
                console.log("Task has too many values");
            }
        }

        editForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (e.submitter.id === "edit-cancel"){
                editDialog.close();
                editForm.reset();
                return;
            }

            let editedValues = [
                currTitle.value,
                currDesc.value,
                currPriority.value,
                currDate.value,
                currProject.value
            ];
            
            let ogProject = taskArr[taskArr.length - 1];
            let ogTitle = taskArr[0];

            editTask(ogProject, ogTitle, editedValues);

            const displayController = render();
            displayController.renderTasks();
            editDialog.close()
        })
    }

    modal.addTodoModal = addTodoModal;
    modal.infoModal = infoModal;
    modal.editModal = editModal;

    return modal;
};