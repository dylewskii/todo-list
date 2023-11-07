export function addTask(title, description, dueDate, priority){
    const task = {};

    task.title = title;
    task.desc = description;
    task.dueDate = dueDate;
    task.title = title;
    task.priority = priority;

    return task;
}