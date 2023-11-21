import { allProjects, saveToLocalStorage } from "../..";
import { addTask } from "./addTask";
import { render } from "../display/render";

export function editTask(ogProject, ogTitle, editedValues) {  
    const displayController = render();
    const editedProject = editedValues[editedValues.length - 1];
    const editedTitle = editedValues[0];

    // Project name edited?
    if (ogProject !== editedProject){
        delete allProjects[ogProject][ogTitle];
        addTask(editedValues[0], editedValues[1], editedValues[2], editedValues[3], editedValues[4], editedValues[5]);
        return;
    // Title edited?
    } else if (ogTitle !== editedTitle){
        delete allProjects[ogProject][ogTitle];
        allProjects[ogProject][editedTitle] = editedValues;
    // Neither project/task edited?
    } else if (ogProject === editedProject && ogTitle === editedTitle){
        allProjects[ogProject][ogTitle] = editedValues;
        displayController.renderTasks();
    } else {
        console.log("unexpected outcome");
    }
}