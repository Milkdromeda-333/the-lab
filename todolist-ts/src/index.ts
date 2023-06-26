import type { Todo } from "./interfaces";
import {
    getAllTodos,
    createTodo,
    toggleTaskCompletion as toggleCompletion,
    deleteTask as deleteTodo,
    clearTasks
} from "./apiCalls";

const form = document.forms[0] as HTMLElement;
const list = document.getElementById('list') as HTMLElement;
const input = document.getElementById("task") as HTMLInputElement;
const submitBtn = document.getElementById("submitBtn") as HTMLInputElement;
const clearBtn = document.getElementById("clearBtn") as HTMLInputElement;


function appendListItem(task: Todo): void {

    //  CREATE TASK CONTAINER
    const taskNode = createElement({ type: 'li', classes: ["list-container__task"] });

    // CREATE TASK Checkbox and label
    const input = createElement({
        type: {
            element: 'input',
            inputType: "checkbox"
        },
        classes: ["list-container__task--input"]
    }) as HTMLInputElement;
    input.setAttribute("id", task.todo);
    if (task.isCompleted) {
        input.checked = true;
    }

    const labelClasses: string[] = [];
    if (task.isCompleted) {
        labelClasses.push("list-container__task-label--complete")
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
    })

    taskNode.insertAdjacentElement("beforeend", input);
    taskNode.insertAdjacentElement("beforeend", label);

    // CREATE delete BUTTON
    const deleteBtn = createElement({ type: 'button', content: 'Delete', classes: ["list-container__task-delete-btn", "list-container__task-btn"] });
    deleteBtn.addEventListener("click", async function () {
        await deleteTodo(task._id);
        list.innerHTML = ""
        loadList();
    });
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

function toggleError(state?: boolean): void {

    const removeError = () => {
        form.classList.remove("error");
        document.getElementsByClassName("form__error-message")[0].remove();
    }

    if (state === undefined || state === null) {
        form.classList.toggle("error");
        const errorText = createElement({ type: "span", classes: ["form__error-message"], content: "Value cannot be empty." });
        input.insertAdjacentElement("beforebegin", errorText);
    } else {
        if (state === true) {
            if (!form.classList.contains("error")) {
                form.classList.toggle("error");
                const errorText = createElement({ type: "span", classes: ["form__error-message"], content: "Value cannot be empty." });
                input.insertAdjacentElement("beforebegin", errorText);
            }

        } else {
            removeError();
        }
    }
}

// Loads up the todo items on load of the website
async function loadList(): Promise<void> {
    const fetchedTodos = await getAllTodos();
    list.innerHTML = "";
    if (fetchedTodos instanceof Array) {
        for (let i = 0; i < fetchedTodos.length; i++) {
            appendListItem(fetchedTodos[i]);
        }
    }
}
loadList();


submitBtn.addEventListener("click", async (e) => {
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


    const res = await createTodo(input.value);

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
        }

        input.value = '';

        appendListItem(newItem);
    }
})

clearBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    await clearTasks();
    await loadList();
})