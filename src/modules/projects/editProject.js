import { allProjects } from "../..";
import { render } from "../display/render";
import { modal } from "../display/modals";

// Edits project name and updates allProject object.
export function editProject(ogProjectName, newProjectName) {
    if (!allProjects.hasOwnProperty(ogProjectName)){
        console.log("project does not exist")
        return false;
    } else if (allProjects.hasOwnProperty(newProjectName)) {
        console.log("project name already taken")
        return false;
    } else {
        // Logic HERE
        const displayController = render()
        const modalController = modal();
        displayController.renderProjects();
        modalController.addTodoModal();
        console.log("project edited")
        return true;
    }
}