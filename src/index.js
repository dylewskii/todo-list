// --- CSS ---
import 'normalize.css';
import "nes.css/css/nes.min.css";
import './style.css';

// --- Modules ---
// project
import { addProject } from './modules/projects/addProject';
import { deleteProject } from './modules/projects/deleteProject';

// display
import { render } from './modules/display/render';
import { modal } from './modules/display/modals';

// --- Main ---
export const allProjects = {
    home: {
        "do groceries": ["do groceries", "Need to get groceries", "high", "13/10/2023", true, "home"]
    },

    gym: {
        "workout": ["workout", "10 push ups", "high", "13/10/2023", false, "gym"],
        "swim": ["swim", "10 laps", "medium", "13/12/2023", false, "gym"],
    },

    food: {
        "cook food": ["cook food", "prepate dumplings", "low", "13/10/2023", false, "food"],
        "make bread": ["make bread", "get bread ingredients", "low", "13/16/2023", false, "food"]
    }
};

const displayController = render();
const modalController = modal();

document.addEventListener("DOMContentLoaded", () => {
    displayController.renderProjects();
    modalController.addTodoModal();
    displayController.renderControls();
})