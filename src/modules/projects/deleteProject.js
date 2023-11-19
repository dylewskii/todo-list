import { allProjects } from "../..";
import { render } from "../display/render";
import { modal } from "../display/modals";

export function deleteProject(projectName) {
    if (!allProjects.hasOwnProperty(projectName)){
        console.log("project does not exist")
        return false;
    } else {
        delete allProjects[projectName];
        const displayController = render()
        const modalController = modal();
        displayController.renderProjects();
        modalController.addTodoModal();
        console.log("project deleted")
        return true;
    }
}