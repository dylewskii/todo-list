import { allProjects } from "../..";
import { render } from "../display/render";

// Handles the addition of Todos, to allProjects object.
export function addTask(title, description="N/A", priority="low", dueDate="N/A", completed=false, projectName="home"){
    const task = {};

    task.title = title;
    task.desc = description;
    task.priority = priority;
    task.dueDate = dueDate;
    task.completed = completed;
    task.project = projectName;

    const taskValues = Object.values(task);
    allProjects[task.project][task.title] = taskValues;
    console.log("task added");
    const displayController = render();
    displayController.renderTasks();
}