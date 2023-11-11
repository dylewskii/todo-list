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
        "do shopping": ["do groceries", "Need to get groceries", "high", "13/10/2023", "home"]
    },

    gym: {
        "workout": ["workout", "10 push ups", "high", "13/10/2023", "gym"],
        "swim": ["swim", "10 laps", "medium", "13/12/2023", "gym"],
    },

    food: {
        "cook food": ["cook food", "Need to make dumplings", "low", "13/10/2023", "food"],
        "make bread": ["make bread", "Need to make bread", "low", "13/16/2023", "food"]
    }
};

const displayController = render();
const modalController = modal();

document.addEventListener("DOMContentLoaded", displayController.renderTabs());
document.addEventListener("DOMContentLoaded", displayController.handleTabClick());
document.addEventListener("DOMContentLoaded", modalController.addTodoModal());