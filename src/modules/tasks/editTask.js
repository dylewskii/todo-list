import { allProjects } from "../..";

export function editTask(taskName, taskProperty, newTaskProperty, projectName="home") {
    if (!allProjects[projectName].hasOwnProperty(taskName)){
        console.log("Task not found");
        return "task not found";
    }
    allProjects[projectName][taskName][taskProperty] = `${newTaskProperty}`;
    console.log(taskName + " edited");
}