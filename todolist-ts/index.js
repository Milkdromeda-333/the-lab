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
function addTodosOnLoad() {
    return __awaiter(this, void 0, void 0, function* () {
        const fetchedTodos = yield getAllTodos();
        for (let i = 0; i <= fetchedTodos.length; i++) {
            appendListItem(fetchedTodos[i]);
        }
    });
}
addTodosOnLoad();
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (document.getElementById("task").value == null || document.getElementById("task").value == undefined) {
        console.log("Has to have a value!");
        toggleError();
        return;
    }
    const res = createTodo(document.getElementById("task").value);
    if (res instanceof Error) {
        console.log("An error has ocurred! : ", res);
        toggleError();
        return;
    }
    const newItem = {
        todo: document.getElementById("task").value,
        isCompleted: false,
        _id: res
    };
    appendListItem(newItem);
});
