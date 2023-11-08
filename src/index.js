// --- CSS ---
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

// --- Main ---
export const allProjects = {
    "home": [],
    "gym": [],
    "work": []
};

let task1 = addTask("Cook Food", "Need to make dumplings", 'low');
let task2 = addTask("Play Futbol", "Need to play futball", 'high', '10/10/2010', "home");
// let task3 = addTask("Complete Coursework", "Maths needs completing", '14/14/2014', 'med', "work");

allProjects[task1.project].push(task1);
allProjects[task2.project].push(task2);
// allProjects[task3.project].push(task3);

console.log(allProjects)
