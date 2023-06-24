var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllTodos, createTodo } from "./apiCalls";
const form = document.forms[0];
const list = document.getElementById('list');
const input = document.getElementById("task");
function appendListItem(task) {
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
    editBtn.addEventListener("click", editTaskName);
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
function toggleError(state) {
    const removeError = () => {
        form.classList.remove("error");
        document.getElementsByClassName("form__error-message")[0].remove();
    };
    if (state === undefined || state === null) {
        form.classList.toggle("error");
        const errorText = createElement({ type: "span", classes: ["form__error-message"], content: "An error occurred." });
        input.insertAdjacentElement("beforebegin", errorText);
    }
    else {
        if (state === true) {
            if (!form.classList.contains("error")) {
                form.classList.toggle("error");
                const errorText = createElement({ type: "span", classes: ["form__error-message"], content: "An error occurred." });
                input.insertAdjacentElement("beforebegin", errorText);
            }
        }
        else {
            removeError();
        }
    }
}
// TODO: add ability to toggle if a task is complete
function toggleTaskCompletion() {
    console.log("toggle");
}
// TODO: add edit task functionality
function editTaskName() {
    console.log("edit name");
}
// TODO: add delete task functionality
function deleteTask() {
    console.log("delete");
}
// Loads up the todo items on load of the website
function addTodosOnLoad() {
    return __awaiter(this, void 0, void 0, function* () {
        const fetchedTodos = yield getAllTodos();
        if (fetchedTodos instanceof Array) {
            for (let i = 0; i < fetchedTodos.length; i++) {
                appendListItem(fetchedTodos[i]);
            }
        }
    });
}
addTodosOnLoad();
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
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
    const res = yield createTodo(input.value);
    if (typeof res !== 'string') {
        console.log("An error has ocurred! : ", res);
        toggleError(true);
        return;
    }
    if (typeof res === "string") {
        const newItem = {
            todo: input.value,
            isCompleted: false,
            _id: res
        };
        input.value = '';
        appendListItem(newItem);
    }
}));
