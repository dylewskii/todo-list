export function addTask(title, description, priority, dueDate="none", projectName="home"){
    const task = {};

    task.title = title;
    task.desc = description;
    task.priority = priority;
    task.dueDate = dueDate;
    task.project = projectName;

    return task;
}