import { allTasks } from "..";

export function deleteTask(taskName) {
    if (!allTasks.hasOwnProperty(taskName)){
        console.log("Task not found");
        return "task not found";
    }
    delete allTasks[taskName];
    console.log(taskName + " deleted from allTasks");
}