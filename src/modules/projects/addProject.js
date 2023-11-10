import { allProjects } from "../..";

export function addProject(projectName) {
    if (allProjects.hasOwnProperty(projectName)){
        console.log("project name taken")
        return
    } else {
        allProjects[projectName] = [];
    }
}