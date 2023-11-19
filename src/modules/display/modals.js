import { allProjects } from "../..";
import { addTask } from "../tasks/addTask";
import { editTask } from "../tasks/editTask";
import { render } from "./render";
import { changeCase } from "../misc/changeCase";
import { addProject } from "../projects/addProject";
import { deleteProject } from "../projects/deleteProject";
    
export const modal = function() {
    const modal = {};

    // Creates an Add Project Modal
    const addProjectModal = function () {
        const addProjectContainer = document.querySelector(".add-project-container");
 
        while (addProjectContainer.firstChild) {
            addProjectContainer.removeChild(addProjectContainer.firstChild);
        }
 
        // Dialog
        const addProjectDialog = document.createElement("dialog");
        addProjectDialog.classList.add("nes-dialog", "is-rounded");
        addProjectDialog.id = "add-project-dialog";
 
        // Form
        const form = document.createElement("form");
        form.method = "dialog";
        form.classList.add("add-project-form");
 
        // add-project-header
        const addProjectHeader = document.createElement("div");
        addProjectHeader.classList.add("add-project-header");
 
        const dialogTitle = document.createElement("h6");
        dialogTitle.classList.add("dialog-title", "add-project-title");
        dialogTitle.textContent = "Add A Project";
 
        addProjectHeader.appendChild(dialogTitle);
 
        // add-project-content
        const addProjectContent = document.createElement("div");
        addProjectContent.classList.add("add-project-content");
 
        const nesField = document.createElement("div");
        nesField.classList.add("nes-field");
 
        const label = document.createElement("label");
        label.htmlFor = "add-project_field";
        label.innerHTML = '<span class="required-symbol">*</span>Title:';
 
        const input = document.createElement("input");
        input.type = "text";
        input.id = "add-project_field";
        input.classList.add("nes-input");
        input.name = "add-project_field";
 
        const warningResult = document.createElement("p");
        warningResult.classList.add("warning-result");
 
        nesField.appendChild(label);
        nesField.appendChild(input);
        nesField.appendChild(warningResult);
 
        addProjectContent.appendChild(nesField);
 
        // add-project-menu
        const addProjectMenu = document.createElement("menu");
        addProjectMenu.classList.add("add-project-menu");
 
        const cancelButton = document.createElement("button");
        cancelButton.classList.add("nes-btn");
        cancelButton.id = "add-project-cancel";
        cancelButton.textContent = "Cancel";
 
        const confirmButton = document.createElement("button");
        confirmButton.classList.add("nes-btn", "is-primary");
        confirmButton.id = "add-project-confirm";
        confirmButton.textContent = "Confirm";
 
        addProjectMenu.appendChild(cancelButton);
        addProjectMenu.appendChild(confirmButton);
 
        form.appendChild(addProjectHeader);
        form.appendChild(addProjectContent);
        form.appendChild(addProjectMenu);
 
        // Append form to dialog
        addProjectDialog.appendChild(form);
 
        // Append dialog to add-project-container
        addProjectContainer.appendChild(addProjectDialog);

        const addProjectFormSubmission = function() {
            // handles addProject form being submitted
            const form = document.querySelector(".add-project-form");
            document.addEventListener("submit", (e) => {
                const addProjectDialog = document.getElementById("add-project-dialog");
                if (e.target.closest(".add-project-form")){
                    e.preventDefault();
                    const warning = document.querySelector(".warning-result");
        
                    // If Cancel - Close & Reset form, if cancel btn pressed
                    if (e.submitter.id === "add-project-cancel"){
                        addProjectDialog.close();
                        form.reset();
                        return;
                    // If Confirm - Obtain title value & add project
                    } else if (e.submitter.id === "add-project-confirm"){
                        const title = document.getElementById("add-project_field").value;
                        if (title === ""){
                            console.log("project title can't be empty");
                            return;
                        }
                        let addedProject = addProject(title);
                        if (!addedProject){
                            form.reset();
                            warning.textContent = "Project Name Taken";
                        } else if (addedProject) {
                            warning.textContent = "";
                            addProjectDialog.close();
                            form.reset();
                        } else {
                            console.log("uh oh ")
                        }
                    }
                }
            }, { once: true })
        }
        addProjectFormSubmission();
    }

    const projectManagerModal = function () {
        const displayController = render();
        const projectManagerDialog = document.getElementById("project-manager-dialog");
        const pmOptionSelect = document.getElementById("project-manager-option_select");
        const pmTargetSelect = document.getElementById("project-manager-target_select");
        const form = document.querySelector(".project-manager-form");
        const allProjectsArr = Object.keys(allProjects);

        while (pmTargetSelect.firstChild) {
            pmTargetSelect.removeChild(pmTargetSelect.firstChild);
        }

        allProjectsArr.forEach(proj => {
            const option = document.createElement("option");
            option.value = proj;
            option.textContent = proj;
            pmTargetSelect.appendChild(option);
        })

        projectManagerDialog.showModal();

        // Listen to changes made to the select field
        let modeSelection;
        let projectSelection;
        projectManagerDialog.addEventListener('change', () => {
            modeSelection = pmOptionSelect.value;
            projectSelection = pmTargetSelect.value;
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Close & Reset form, if cancel btn pressed
            if (e.submitter.id === "project-manager-cancel"){
                form.reset();
                projectManagerDialog.close();
                return;
            } else {
                if (modeSelection === "delete"){
                    console.log(`You are trying to delete : ${projectSelection}`)
                    deleteProject(projectSelection);
                    form.reset();
                    projectManagerDialog.close();
                } else if (modeSelection === "edit"){
                    console.log(`You are trying to edit : ${projectSelection}`)
                    console.log("editing")
                }
            }
        }, { once : true})
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
            let completed = document.getElementById("completed_select").value;
            let project = document.getElementById("project_field").value;

            if (title === "" || title === undefined){
                addTodoDialog.close();
                form.reset();  
                console.log("can't add empty task")
                return;
            }

            // If undefined value provided, set a string value.
            // title = title || "N/A"; 
            desc = desc || "N/A"; 
            priority = priority || "low"; 
            dueDate = dueDate || "N/A";
            project = project || "home"; 
            completed = completed === "true" ? true : false;
            addTask(title, desc, priority, dueDate, completed, project);

            addTodoDialog.close();
            form.reset();
            const displayController = render();
            displayController.renderTasks();
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

    modal.addProjectModal = addProjectModal;
    modal.projectManagerModal = projectManagerModal;
    modal.addTodoModal = addTodoModal;
    modal.infoModal = infoModal;
    modal.editModal = editModal;

    return modal;
};