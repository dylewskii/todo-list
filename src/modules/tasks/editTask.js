import { allProjects } from "../..";
import { addTask } from "./addTask";

export function editTask(ogProject, ogTitle, editedValues) {
    // if (!allProjects[ogProject].hasOwnProperty(ogTitle)){
    //     console.log("Task not found");
    //     return "task not found";
    // }
    
    const editedProject = editedValues[editedValues.length - 1];
    const editedTitle = editedValues[0];

    // Project name edited?
    if (ogProject !== editedProject){
        delete allProjects[ogProject][ogTitle];
        addTask(editedValues[0], editedValues[1], editedValues[2], editedValues[3], editedValues[4]);
        return
    // Title edited?
    } else if (ogTitle !== editedTitle){
        delete allProjects[ogProject][ogTitle];
        allProjects[ogProject][editedTitle] = editedValues;
    // Neither project/task edited?
    } else if (ogProject === editedProject && ogTitle === editedTitle){
        allProjects[ogProject][ogTitle] = editedValues;
    } else {
        console.log("unexpected outcome")
    }
}