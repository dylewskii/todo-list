import { allProjects } from "../..";
import { render } from "../display/screen";

export function addTask(title, description, priority, dueDate="none", projectName="home"){
    const task = {};

    task.title = title;
    task.desc = description;
    task.priority = priority;
    task.dueDate = dueDate;
    task.project = projectName;

    const taskValues = Object.values(task);
    allProjects[task.project][task.title] = taskValues;

    const displayController = render();
    displayController.renderTasks();
}