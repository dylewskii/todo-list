import { allProjects } from "../..";
import { deleteTask } from "../tasks/deleteTask";
import { changeCase } from "../misc/changeCase";
import { modal } from "./modals";
const folderImg = require("../../assets/images/new-folder.png");
const activeFolderImg = require("../../assets/images/new-folder-active.png");

export const render = function() {
    const controller = {};
    const modalController = modal();
    const allProjectsArr = Object.keys(allProjects);
    const tabContainer = document.querySelector(".tab-container");
    const taskContainer = document.querySelector(".task-container");

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

    const renderProjects = function() {
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
    };

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
                    taskArr.splice(4, 1, false);
                    taskCounter()
                } else {
                    taskArr.splice(4, 1, true);
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

    const handleTabClick = function(initialTab) {
        const tabBtns = document.querySelectorAll(".tab-btn");
        let selectedTab;

        if (initialTab) {
            selectedTab = initialTab;
        } else {
            selectedTab = tabBtns[0].textContent.toLowerCase();
        }

        tabBtns.forEach(btn => {
            btn.addEventListener("click", (e) => { 
                // Add active class only to current button.
                tabBtns.forEach(otherBtn => {
                    otherBtn.classList.remove("tab--active");
                });
                btn.classList.add("tab--active");
                taskCounter();
                renderTasks();
            })
        })

        // Ensure first page load is the 'Home' project tab
        const selectedTabButton = Array.from(tabBtns).find(btn => btn.textContent.toLowerCase() === selectedTab);
        selectedTabButton.click();
    }

    const renderControls = function() {
        const addProjectBtn = document.querySelector(".add-project-btn");
        const addProjectIcon = document.createElement("img");
        addProjectIcon.src = folderImg;
        addProjectIcon.alt = "add folder image"
        addProjectIcon.classList.add("add-project-icon", "nes-pointer");
        addProjectBtn.appendChild(addProjectIcon);

        addProjectBtn.addEventListener("mouseenter", () => {
            addProjectIcon.src = activeFolderImg;
        })
        addProjectBtn.addEventListener("mouseleave", () => {
            addProjectIcon.src = folderImg;
        })
        
        addProjectBtn.addEventListener("click", () => {
            modalController.addProjectModal();
        })
    }

    controller.renderProjects = renderProjects;
    controller.renderTasks = renderTasks;
    controller.handleTabClick = handleTabClick;
    controller.renderControls = renderControls;

    return controller;
};