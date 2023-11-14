import { allProjects } from "../..";
import { render } from "../display/render";
import { modal } from "../display/modals";

export function addProject(projectName) {
    if (allProjects.hasOwnProperty(projectName)){
        return false;
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