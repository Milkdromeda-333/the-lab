import type { Todo } from "./interfaces";
import { getAllTodos, createTodo } from "./apiCalls";

const form = document.forms[0] as HTMLElement;
const list = document.getElementById('list') as HTMLElement;


function appendListItem(task: Todo): void {

    //  CREATE TASK CONTAINER
    const taskNode = createElement({ type: 'li', classes: ["list-container__task"] });

    // CREATE TASK
    const input = createElement({ type: { element: 'input', inputType: "checkbox" }, classes: ["list-container__task--incomplete", "list-container__task"] });
    input.setAttribute("id", task.todo);
    const label = createElement({ type: "label", content: task.todo });
    label.setAttribute("for", task.todo);
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

function createElement(data: {
    type: string | { element: string, inputType: string },
    classes?: string[],
    content?: string
}): HTMLElement | HTMLInputElement {

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

    if (classes?.length) {
        ele.classList.add(...classes);
    }

    return ele;
}

// TODO: WRITE ERROR STATE
function toggleError(): void {

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

async function addTodosOnLoad(): Promise<void> {
    const fetchedTodos: Todo[] = await getAllTodos();
    for (let i = 0; i <= fetchedTodos.length; i++) {
        appendListItem(fetchedTodos[i]);
    }
}
addTodosOnLoad();


form.addEventListener("submit", (e) => {
    e.preventDefault();

    if ((document.getElementById("task") as HTMLInputElement).value == null || (document.getElementById("task") as HTMLInputElement).value == undefined) {
        console.log("Has to have a value!");
        toggleError();
        return;
    }

    const res = createTodo((document.getElementById("task") as HTMLInputElement).value);

    if (res instanceof Error) {
        console.log("An error has ocurred! : ", res);
        toggleError();
        return;
    }

    const newItem = {
        todo: (document.getElementById("task") as HTMLInputElement).value,
        isCompleted: false,
        _id: res
    }

    appendListItem(newItem);
})