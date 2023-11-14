import { allProjects } from "../..";
import { addTask } from "../tasks/addTask";
import { editTask } from "../tasks/editTask";
import { render } from "./render";
import { changeCase } from "../misc/changeCase";
import { addProject } from "../projects/addProject";
    
export const modal = function() {
    const modal = {};

    const addProjectModal = function () {
        const addProjectDialog = document.getElementById("add-project-dialog");
        const form = document.querySelector(".add-project-form");
        addProjectDialog.showModal();

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const warning = document.querySelector(".warning-result");

            // Close & Reset form, if cancel btn pressed
            if (e.submitter.id === "add-project-cancel"){
                addProjectDialog.close();
                form.reset();
                return;
            // Obtain title value & add project, if confirm btn pressed
            } else {
                let title = document.getElementById("add-project_field").value;
                const addedProject = addProject(title);
                if (!addedProject){
                    warning.textContent = "Project Name Taken";
                } else {
                    warning.textContent = "";
                    addProjectDialog.close();
                    form.reset();
                    console.log(allProjects)
                }
            }
        })
    }

    const addTodoModal = function (){
        const addTodoDialog = document.getElementById("add-todo-dialog");
        const form = document.querySelector(".add-todo-form");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Close & Reset form if cancel button pressed
            if (e.submitter.id === "dialog-cancel"){
                addTodoDialog.close();
                form.reset();
                return;
            }

            // Task Values
            let title = document.getElementById("title_field").value;
            let desc = document.getElementById("desc_field").value;
            let priority = document.getElementById("priority_select").value;
            let dueDate = document.getElementById("date_field").value;
            let project = document.getElementById("project_field").value;
            let completed = document.getElementById("completed_select").value;

            // If undefined value provided, set a string value.
            title = title || "N/A"; 
            desc = desc || "N/A"; 
            priority = priority || "low"; 
            dueDate = dueDate || "N/A";
            project = project || "home"; 
            completed = completed === "true" ? true : false;
            addTask(title, desc, priority, dueDate, completed, project);

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
        
        const labels = ["Title:", "Description:", "Priority:", "Due Date:", "Completed:", "Project:"];

        for (let i = 0; i < labels.length; i++){
            const infoContainer = document.createElement("div");
            infoContainer.classList.add("nes-container", "is-rounded", "with-title");

            const title = document.createElement("p");
            title.classList.add("title");
            title.textContent = labels[i];

            const content = document.createElement("p");
            if (typeof(taskArr[i]) === "boolean"){
                if (taskArr[i] === true){
                    console.log()
                    content.textContent = "Yes";
                } else {
                    content.textContent = "No";
                }
            } else {
                content.textContent = `${taskArr[i]}`;
            }

            infoContainer.appendChild(title);
            infoContainer.appendChild(content);

            infoContent.appendChild(infoContainer);
        }
    }

    const editModal = function (e){
        // NEED TO FIX -  Provide live color feedback when edits are made
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
        let currCompleted = document.getElementById("edit_completed_select");
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
                currCompleted.value = `${taskArr[4]}`;
                // currDate.addEventListener("input", changeColor(currCompleted));
            } else if (i === 5){
                currProject.value = `${taskArr[5]}`;
                // currProject.addEventListener("input", changeColor(currProject));
            } else {
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
            currCompleted = currCompleted.value === "true" ? true : false;

            let editedValues = [
                currTitle.value,
                currDesc.value,
                currPriority.value,
                currDate.value,
                currCompleted,
                currProject.value
            ];
            
            let ogProject = taskArr[taskArr.length - 1];
            let ogTitle = taskArr[0];

            editTask(ogProject, ogTitle, editedValues);

            const displayController = render()
            displayController.renderTasks();
            editDialog.close()
        })
    }

    modal.addTodoModal = addTodoModal;
    modal.infoModal = infoModal;
    modal.editModal = editModal;
    modal.addProjectModal = addProjectModal;

    return modal;
};