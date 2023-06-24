import type { Todo } from "./interfaces";
import { getAllTodos, createTodo } from "./apiCalls";

const form = document.forms[0] as HTMLElement;
const list = document.getElementById('list') as HTMLElement;
const input = document.getElementById("task") as HTMLInputElement;


function appendListItem(task: Todo): void {

    // console.log(task)

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
function toggleError(state?: boolean): void {

    const removeError = () => {
        form.classList.remove("error");
        document.getElementsByClassName("form__error-message")[0].remove();
    }

    if (state === undefined || state === null) {
        form.classList.toggle("error");
        const errorText = createElement({ type: "span", classes: ["form__error-message"], content: "An error occurred." });
        input.insertAdjacentElement("beforebegin", errorText);
    } else {
        if (state === true) {
            if (!form.classList.contains("error")) {
                form.classList.toggle("error");
                const errorText = createElement({ type: "span", classes: ["form__error-message"], content: "An error occurred." });
                input.insertAdjacentElement("beforebegin", errorText);
            }

        } else {
            removeError();
        }
    }
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

// Loads up the todo items on load of the website
async function addTodosOnLoad(): Promise<void> {
    const fetchedTodos: Todo[] = await getAllTodos();
    for (let i = 0; i < fetchedTodos.length; i++) {
        appendListItem(fetchedTodos[i]);
    }
}
addTodosOnLoad();


form.addEventListener("submit", (e) => {
    e.preventDefault();

    // if input value is not valid, put up an error.
    if (input.value == null || input.value == undefined || input.value === '') {
        console.log("Has to have a value!");
        toggleError(true);
        return;
    }

    // if the error is already present, turn it off
    if (document.getElementsByClassName("form__error-message")[0]) {
        toggleError(false);
    }

    const res = createTodo(input.value);

    if (res instanceof Error) {
        console.log("An error has ocurred! : ", res);
        toggleError(true);
        return;
    }

    const newItem = {
        todo: input.value,
        isCompleted: false,
        _id: res
    }

    appendListItem(newItem);
})