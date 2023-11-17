import { allProjects } from "../..";

export function deleteProject(projectName) {
    if (!allProjects.hasOwnProperty(projectName)){
        console.log("project does not exist")
        return false;
    } else {
        delete allProjects[projectName];
        console.log("project deleted")
        return true;
    }
}