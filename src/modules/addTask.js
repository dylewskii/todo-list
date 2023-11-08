export function addTask(title, description, priority, dueDate="none", projectName="home", completed=false){
    const task = {};

    task.title = title;
    task.desc = description;
    task.priority = priority;
    task.dueDate = dueDate;
    task.project = projectName;
    task.completed = completed;

    return task;
}