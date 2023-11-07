// CSS
import './style.css';
// Modules
import { addTask } from './modules/addTask';
import { deleteTask } from './modules/deleteTask';
import { editTask } from './modules/editTask';

export const allTasks = {};

let cookFood = addTask("Cook Food", "Need to make dumplings", '10/10/2010', 'low');
const taskName1 = cookFood.title;
let playFootball = addTask("Play Futbol", "Need to play futball", '11/11/2011', 'high');
const taskName2 = playFootball.title;

