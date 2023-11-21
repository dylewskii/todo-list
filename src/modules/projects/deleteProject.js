import { allProjects, saveToLocalStorage, retrieveFromLocalStorage } from "../..";
import { render } from "../display/render";
import { modal } from "../display/modals";

// Deletes project from allProject object.
export function deleteProject(projectName) {
    const displayController = render()
    const modalController = modal();

    if (!allProjects.hasOwnProperty(projectName)){
        console.log("project does not exist")
        return false;
    } else {
        delete allProjects[projectName];
        saveToLocalStorage();

        displayController.renderProjects();
        modalController.addTodoModal();
        return true;
    }
}