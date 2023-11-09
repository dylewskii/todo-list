import { allProjects } from "..";

export function render() {
    const allProjectsArr = Object.keys(allProjects);
    const tabContainer = document.querySelector(".tab-container");
    const taskContainer = document.querySelector(".task-container");

    allProjectsArr.forEach((project, index) => {
        const newTab = document.createElement("button");
        newTab.textContent = `${project.toUpperCase()}`;
        newTab.classList.add("tab-btn");
        newTab.setAttribute("data-for-tab", `${index + 1}`);
        tabContainer.appendChild(newTab);

        newTab.addEventListener("click", (e) => {
            const tabName = e.target.textContent.toLowerCase();
            const tabIndex = e.target.dataset.forTab - 1;
            const projectTasks = Object.keys(allProjects[tabName])

            projectTasks.forEach(task => {
                // task div
                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task");
                taskDiv.setAttribute("data-tab", `${tabIndex}`)
                taskContainer.appendChild(taskDiv)
                
                // first child container
                const taskLabel = document.createElement("label");
                taskLabel.classList.add("task__checkbox");
                taskDiv.appendChild(taskLabel);

                const taskInput = document.createElement("input");
                taskInput.setAttribute("type", "checkbox");
                taskInput.classList.add("nes-checkbox", "checkbox");
                taskLabel.appendChild(taskInput);

                const taskSpan = document.createElement("span");
                taskLabel.appendChild(taskSpan);

                // second child container
                const taskTitle = document.createElement('div');
                taskTitle.classList.add('task__title');

                const p = document.createElement('p');
                p.textContent = 'Walk';

                taskTitle.appendChild(p);
                taskDiv.appendChild(taskTitle);

                // third child container
                const taskControls = document.createElement('div');
                taskControls.classList.add('task__controls');

                const infoBtn = document.createElement('button');
                infoBtn.classList.add('task-btn', 'nes-btn');
                infoBtn.id = 'infoBtn';
                infoBtn.textContent = 'Info';

                const editBtn = document.createElement('button');
                editBtn.classList.add('task-btn', 'nes-btn');
                editBtn.id = 'editBtn';
                editBtn.textContent = 'Edit';

                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('task-btn', 'nes-btn', 'is-error');
                deleteBtn.id = 'deleteBtn';
                deleteBtn.textContent = 'X';

                taskControls.appendChild(infoBtn);
                taskControls.appendChild(editBtn);
                taskControls.appendChild(deleteBtn);

                taskDiv.appendChild(taskControls);
            })
        })
    }) 
}