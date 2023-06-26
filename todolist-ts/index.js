var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllTodos, createTodo, toggleTaskCompletion as toggleCompletion, deleteTask as deleteTodo, clearTasks } from "./apiCalls";
const form = document.forms[0];
const list = document.getElementById('list');
const input = document.getElementById("task");
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
function appendListItem(task) {
    //  CREATE TASK CONTAINER
    const taskNode = createElement({ type: 'li', classes: ["list-container__task"] });
    // CREATE TASK Checkbox and label
    const input = createElement({
        type: {
            element: 'input',
            inputType: "checkbox"
        },
        classes: ["list-container__task--input"]
    });
    input.setAttribute("id", task.todo);
    if (task.isCompleted) {
        input.checked = true;
    }
    const labelClasses = [];
    if (task.isCompleted) {
        labelClasses.push("list-container__task-label--complete");
    }
    const label = createElement({
        type: "label",
        content: task.todo,
        classes: labelClasses
    });
    label.setAttribute("for", task.todo);
    input.addEventListener("change", function () {
        toggleCompletion(task._id, task.isCompleted);
        label.classList.toggle("list-container__task-label--complete");
    });
    taskNode.insertAdjacentElement("beforeend", input);
    taskNode.insertAdjacentElement("beforeend", label);
    // CREATE delete BUTTON
    const deleteBtn = createElement({ type: 'button', content: 'Delete', classes: ["list-container__task-delete-btn", "list-container__task-btn"] });
    deleteBtn.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield deleteTodo(task._id);
            list.innerHTML = "";
            loadList();
        });
    });
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
        const errorText = createElement({ type: "span", classes: ["form__error-message"], content: "Value cannot be empty." });
        input.insertAdjacentElement("beforebegin", errorText);
    }
    else {
        if (state === true) {
            if (!form.classList.contains("error")) {
                form.classList.toggle("error");
                const errorText = createElement({ type: "span", classes: ["form__error-message"], content: "Value cannot be empty." });
                input.insertAdjacentElement("beforebegin", errorText);
            }
        }
        else {
            removeError();
        }
    }
}
// Loads up the todo items on load of the website
function loadList() {
    return __awaiter(this, void 0, void 0, function* () {
        const fetchedTodos = yield getAllTodos();
        list.innerHTML = "";
        if (fetchedTodos instanceof Array) {
            for (let i = 0; i < fetchedTodos.length; i++) {
                appendListItem(fetchedTodos[i]);
            }
        }
    });
}
loadList();
submitBtn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
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
clearBtn.addEventListener("click", function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        yield clearTasks();
        yield loadList();
    });
});
