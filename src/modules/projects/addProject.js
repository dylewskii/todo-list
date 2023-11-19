import { allProjects } from "../..";
import { render } from "../display/render";
import { modal } from "../display/modals";

// Adds new project to allProject object. Returns false if project name exists.
export function addProject(projectName) {
    if (allProjects.hasOwnProperty(projectName)){
        return false;
    } else {
        allProjects[projectName] = {};
        const displayController = render()
        const modalController = modal();
        displayController.renderProjects();
        modalController.addTodoModal();
        return true;
    }
}