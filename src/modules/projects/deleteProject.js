import { allProjects } from "../..";

export function deleteProject(projectName) {
    if (!allProjects.hasOwnProperty(projectName)){
        console.log("property does not exist")
        return
    } else {
        delete allProjects[projectName];
    }
}