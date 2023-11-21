import { allProjects, saveToLocalStorage, retrieveFromLocalStorage} from "../..";
import { deleteTask } from "../tasks/deleteTask";
import { changeCase } from "../misc/changeCase";
import { modal } from "./modals";

const folderImg = require("../../assets/images/folder.png");
const folderImgActive = require("../../assets/images/folder-active.png")
const addFolderImg = require("../../assets/images/new-folder.png");
const addFolderImgActive = require("../../assets/images/new-folder-active.png");

export const render = function() {
    const controller = {};
    const modalController = modal();
    const tabContainer = document.querySelector(".tab-container");
    const taskContainer = document.querySelector(".task-container");

    // Updates # of remaining tasks and displays result on screen.
    const taskCounter = function(){
        const selectedTab = document.querySelector(".tab--active").textContent.toLowerCase();
        const taskCount = document.getElementById("task-count");
        const currTasks = Object.keys(allProjects[selectedTab]);
        let tasksLeft = currTasks.filter(task => !allProjects[selectedTab][task][4]);
        
        // if only 1 task left, change from plural
        const plural = tasksLeft.length === 1 ? "" : "s";
        taskCount.textContent = tasksLeft.length;
        taskCount.nextElementSibling.textContent = `task${plural} left today`;
    }

    // Renders every project currently held by allProjects object.
    const renderProjects = function() {
        const allProjectsArr = Object.keys(allProjects);
        console.log(allProjects)
        while (tabContainer.firstChild) {
            tabContainer.removeChild(tabContainer.firstChild);
        }

        allProjectsArr.forEach((project, index) => {
            const newTab = document.createElement("button");
            newTab.textContent = `${changeCase(project)}`;
            newTab.classList.add("tab-btn");
            newTab.setAttribute("data-for-tab", `${index + 1}`);
            tabContainer.appendChild(newTab);
        })

        const addProjectBtn = document.createElement("button");
        addProjectBtn.classList.add("add-project-btn");
        tabContainer.appendChild(addProjectBtn);

        const addProjectIcon = document.createElement("img");
        addProjectIcon.src = addFolderImg;
        addProjectIcon.alt = "add folder image"
        addProjectIcon.classList.add("add-project-icon", "nes-pointer");
        addProjectBtn.appendChild(addProjectIcon);

        addProjectBtn.addEventListener("mouseenter", () => {
            addProjectIcon.src = addFolderImgActive;
        })

        addProjectBtn.addEventListener("mouseleave", () => {
            addProjectIcon.src = addFolderImg;
        })

        const tabBtns = document.querySelectorAll(".tab-btn");
        tabContainer.addEventListener("click", (e) => {
            // add project click
            if (e.target.closest(".add-project-btn")) {
                // render addProjectModal & handle form if submitted
                modalController.addProjectModal();
                const addProjectDialog = document.getElementById("add-project-dialog");
                addProjectDialog.showModal();
            // tab-btn click
            } else if (e.target.closest(".tab-btn")){
                // Load tasks on tab click & update class to active
                tabBtns.forEach(otherBtn => {
                    otherBtn.classList.remove("tab--active");
                });
                e.target.classList.add("tab--active");
                taskCounter();
                renderTasks();
            }
        });

        // Ensure first page load is the 'Home' project tab
        const homeTab = Array.from(tabBtns).find(btn => btn.textContent.toLowerCase() === "home");
        homeTab.click();
    };

    // Renders every task of currently open project tab.
    const renderTasks = function(){
        const selectedTab = document.querySelector(".tab--active").textContent.toLowerCase();
        const selectedTabTasks = Object.keys(allProjects[selectedTab]);

        // remove current tasks on screen
        while (taskContainer.firstChild) {
            taskContainer.removeChild(taskContainer.firstChild);
        }

        selectedTabTasks.forEach(task => {
            // task div
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task");
            taskContainer.appendChild(taskDiv);
            
            // first child container
            const taskLabel = document.createElement("label");
            taskLabel.classList.add("task__checkbox");
            taskDiv.appendChild(taskLabel);

            const taskInput = document.createElement("input");
            taskInput.setAttribute("type", "checkbox");
            taskInput.classList.add("nes-checkbox", "checkbox");
            taskLabel.appendChild(taskInput);
            
            // render a green task if completed is true
            let taskArr = allProjects[selectedTab][task];
            if (taskArr[taskArr.length - 2]){
                taskDiv.classList.add("task--completed");
                taskInput.checked = true;
            }

            // toggle class & update allProjects completed status
            taskInput.addEventListener("click", () => {
                taskDiv.classList.toggle("task--completed", taskInput.checked);
                if (taskArr[taskArr.length - 2]){
                    allProjects[selectedTab][task].splice(4, 1, false);
                    saveToLocalStorage()
                    taskCounter()
                } else {
                    allProjects[selectedTab][task].splice(4, 1, true);
                    saveToLocalStorage()
                    taskCounter()
                }
            })

            const taskSpan = document.createElement("span");
            taskLabel.appendChild(taskSpan);

            // second child container
            const taskTitle = document.createElement("div");
            taskTitle.classList.add("task__title");

            const p = document.createElement("p");
            p.textContent = `${changeCase(task)}`;

            taskTitle.appendChild(p);
            taskDiv.appendChild(taskTitle);

            // third child container
            const taskControls = document.createElement("div");
            taskControls.classList.add("task__controls");

            const infoBtn = document.createElement("button");
            infoBtn.classList.add("task-btn", "nes-btn");
            infoBtn.id = "infoBtn";
            infoBtn.textContent = "Info";
            infoBtn.addEventListener("click", (e) => {
                modalController.infoModal(e);
            })

            const editBtn = document.createElement("button");
            editBtn.classList.add("task-btn", "nes-btn");
            editBtn.id = "editBtn";
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", (e) => {
                modalController.editModal(e);
            })

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("task-btn", "nes-btn", "is-error");
            deleteBtn.id = "deleteBtn";
            deleteBtn.innerHTML = `X`;
            deleteBtn.addEventListener("click", () => {
                deleteTask(task, selectedTab);
                taskCounter();
                renderTasks();
            })

            taskControls.appendChild(infoBtn);
            taskControls.appendChild(editBtn);
            taskControls.appendChild(deleteBtn);
            taskDiv.appendChild(taskControls);

            taskCounter();
        })
    }

    // Renders project manager button (used to delete/edit projects) 
    const renderControls = function() {
        const projectManagerBtn = document.querySelector(".project-manager-btn");
        const projectManagerIcon = document.createElement("img");
        projectManagerIcon.src = folderImg;
        projectManagerIcon.alt = "add folder image"
        projectManagerIcon.classList.add("project-manager-icon", "nes-pointer");
        projectManagerBtn.appendChild(projectManagerIcon);

        projectManagerBtn.addEventListener("mouseenter", () => {
            projectManagerIcon.src = folderImgActive;
        })
        projectManagerBtn.addEventListener("mouseleave", () => {
            projectManagerIcon.src = folderImg;
        })
        
        projectManagerBtn.addEventListener("click", () => {
            modalController.projectManagerModal();
        })
    }

    controller.renderProjects = renderProjects;
    controller.renderTasks = renderTasks;
    controller.renderControls = renderControls;

    return controller;
};