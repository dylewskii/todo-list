import { allProjects } from "../..";
import { render } from "../display/render";
import { modal } from "../display/modals";

export function addProject(projectName) {
    // Returns False if allProject already has project name
    if (allProjects.hasOwnProperty(projectName)){
        return false;
    // Returns True if allProject does NOT have project name
    } else {
        allProjects[projectName] = {};
        const displayController = render()
        const modalController = modal();
        displayController.renderProjects();
        displayController.handleTabClick();
        modalController.addTodoModal();
        return true;
    }
}