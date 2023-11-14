import { allProjects } from "../..";
import { render } from "../display/render";

export function addProject(projectName) {
    if (allProjects.hasOwnProperty(projectName)){
        return false;
    } else {
        allProjects[projectName] = {};
        const displayController = render()
        // displayController.renderProjects();
        // displayController.handleTabClick();
        // displayController.renderTasks();
        return true;
    }
}