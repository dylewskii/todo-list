// --- CSS ---
import 'normalize.css';
import "nes.css/css/nes.min.css";
import './style.css';

// --- Modules ---
// project
import { addProject } from './modules/projects/addProject';
import { deleteProject } from './modules/projects/deleteProject';

// display
import { display } from './modules/display/render';
import { dialog } from './modules/display/modals';

// --- Main ---
export const allProjects = {
    home: {
        "do shopping": ["do groceries", "Need to get groceries", 'hi']
    },

    gym: {
        "workout": ["workout", "10 push ups", "hi"],
        "swim": ["swim", "10 laps", "med"],
    },

    food: {
        "cook food": ["cook food", "Need to make dumplings", 'low'],
        "make bread": ["make bread", "Need to make bread", 'med']
    }
};

const displayController = display();
const modalController = dialog();

document.addEventListener("DOMContentLoaded", displayController.renderTabs());
document.addEventListener("DOMContentLoaded", displayController.handleTabClick());
document.addEventListener("DOMContentLoaded", modalController.loadTaskAdd());