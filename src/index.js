// --- CSS ---
import 'normalize.css';
import "nes.css/css/nes.min.css";
import './style.css';

// --- Modules ---
// project
import { addProject } from './modules/projects/addProject';
import { deleteProject } from './modules/projects/deleteProject';

// display
import { render } from './modules/display/screen';
import { modal } from './modules/display/modals';

// --- Main ---
export const allProjects = {
    home: {
        "do shopping": ["do groceries", "Need to get groceries", "hi"]
    },

    gym: {
        "workout": ["workout", "10 push ups", "hi"],
        "swim": ["swim", "10 laps", "med"],
    },

    food: {
        "cook food": ["cook food", "Need to make dumplings", "low"],
        "make bread": ["make bread", "Need to make bread", "med"]
    }
};

const displayController = render();
const modalController = modal();

document.addEventListener("DOMContentLoaded", displayController.renderTabs());
document.addEventListener("DOMContentLoaded", displayController.handleTabClick());
document.addEventListener("DOMContentLoaded", modalController.taskFormSubmit());