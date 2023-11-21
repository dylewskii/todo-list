import { allProjects, saveToLocalStorage} from "../..";
import { render } from "../display/render";

// Handles the addition of Todos, to allProjects object.
export function addTask(title, description="N/A", priority="low", dueDate="N/A", completed=false, projectName="home"){
    const task = {};
    const displayController = render();

    if (!allProjects.hasOwnProperty(projectName)){
        console.log("project does not exist")
        return false;
    }

    task.title = title;
    task.desc = description;
    task.priority = priority;
    task.dueDate = dueDate;
    task.completed = completed;
    task.project = projectName;

    const taskValues = Object.values(task);
    allProjects[task.project][task.title] = taskValues;
    saveToLocalStorage();
    console.log("task added");
    displayController.renderTasks();
}