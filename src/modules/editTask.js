import { allTasks } from "..";

export function editTask(taskName, taskProperty, newTaskProperty) {
    if (!allTasks.hasOwnProperty(taskName)){
        console.log("Task not found");
        return "task not found";
    }
    allTasks[taskName][taskProperty] = `${newTaskProperty}`;
    console.log(taskName + " edit");
}