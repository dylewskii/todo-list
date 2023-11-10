import { allProjects } from "../..";

export function deleteTask(taskTitle, projectName="home"){
    if (allProjects.hasOwnProperty(projectName)){
        const project = allProjects[projectName];
        if (project.hasOwnProperty(taskTitle)){
            console.log("task deleted");
            delete project[taskTitle];
        } else {
            console.log("task not found in project");
        }
    } else {
        console.log("project not found - task not deleted");
    }
}
