const form = document.forms[0];
const list = document.getElementById('list');
function appendListItem(task) {
    //  CREATE TASK CONTAINER
    const taskNode = createElement({ type: 'li', classes: ["list-container__task"] });
    // CREATE TASK
    const input = createElement({ type: { element: 'input', inputType: "checkbox" }, classes: ["list-container__task--incomplete", "list-container__task"] });
    input.setAttribute("id", task);
    const label = createElement({ type: "label", content: task });
    label.setAttribute("for", task);
    taskNode.insertAdjacentElement("beforeend", input);
    taskNode.insertAdjacentElement("beforeend", label);
    // CREATE EDIT BUTTON
    const editBtn = createElement({ type: 'button', content: 'Edit', classes: ["list-container__task-edit-btn", "list-container__task-btn"] });
    editBtn.addEventListener("click", editTask);
    taskNode.insertAdjacentElement("beforeend", editBtn);
    // CREATE delete BUTTON
    const deleteBtn = createElement({ type: 'button', content: 'Delete', classes: ["list-container__task-delete-btn", "list-container__task-btn"] });
    deleteBtn.addEventListener("click", deleteTask);
    taskNode.insertAdjacentElement("beforeend", deleteBtn);
    list.appendChild(taskNode);
}
function createElement(data) {
    const { type, content, classes } = data;
    // SOO not a good way to do this 😅
    let ele = document.createElement("span");
    if (type instanceof Object) {
        ele = document.createElement(type.element);
        ele.setAttribute("type", type.inputType);
    }
    if (typeof type === "string") {
        ele = document.createElement(type);
    }
    if (content) {
        ele.textContent = content;
    }
    if (classes === null || classes === void 0 ? void 0 : classes.length) {
        ele.classList.add(...classes);
    }
    return ele;
}
// TODO: WRITE ERROR STATE
function toggleError() {
    return;
}
// TODO: add ability to toggle if a task is complete
function toggleTaskCompletion() {
    console.log("toggle");
}
// TODO: add edit task functionality
function editTask() {
    console.log("edit");
}
// TODO: add delete task functionality
function deleteTask() {
    console.log("delete");
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskTitle = document.getElementById('task').value;
    if (taskTitle === null || taskTitle === undefined) {
        // set error logic before this can work
        toggleError();
        console.log("Task title = ", typeof taskTitle);
    }
    appendListItem(taskTitle);
});
export {};
