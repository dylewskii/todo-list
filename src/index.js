// --- CSS ---
import 'normalize.css';
import "nes.css/css/nes.min.css";
import './style.css';

// --- Modules ---
// project
import { addProject } from './modules/addProject';
import { deleteProject } from './modules/deleteProject';
// tasks
import { addTask } from './modules/addTask';
import { deleteTask } from './modules/deleteTask';
import { editTask } from './modules/editTask';
// display
import { display } from './modules/render';

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
    },
};

// let task1 = addTask("Cook Food", "Need to make dumplings", 'low');
// let task2 = addTask("Play Futbol", "Need to play futball", 'high', '10/10/2010', "home");
// let task3 = addTask("Complete Coursework", "Maths needs completing", '14/14/2014', 'med', "work");

// allProjects[task1.project][task1.title] = task1;
// allProjects[task2.project][task2.title] = task2;
// console.log(allProjects)
const displayController = display();


document.addEventListener("DOMContentLoaded", displayController.renderTabs());
document.addEventListener("DOMContentLoaded", displayController.handleTabClick());

