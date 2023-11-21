import { allProjects, saveToLocalStorage } from "../..";

export function deleteTask(taskTitle, projectName="home"){
    if (allProjects.hasOwnProperty(projectName)){
        const project = allProjects[projectName];
        if (project.hasOwnProperty(taskTitle)){
            delete project[taskTitle];
            console.log("task deleted");
            saveToLocalStorage();
        } else {
            console.log("task not found in project");
        }
    } else {
        console.log("project not found - task not deleted");
    }
}
