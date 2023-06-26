import { Todo } from "./interfaces";

const url = "http://localhost:3030/todo";

function fetchClient<T>(url: string, options?: RequestInit): Promise<void | T> {

    return fetch(url, options)
        .then(res => res?.json())
        .then((data: T) => {
            return data
        })
        .catch((err): void => { console.log(err) });
}

// get all todos
async function getAllTodos() {
    const data = await fetchClient<Todo[]>(`${url}`);
    return data
}

// create a todo 
function createTodo(newItemName: string) {

    const data = fetchClient<string>(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            todo: newItemName,
            isCompleted: false,
        })
    })
    return data
}
// delete a todo
async function deleteTask(id: string): Promise<void> {
    await fetchClient(`${url}/${id}`, {
        method: "DELETE"
    })
}

// delete all todos
async function clearTasks() {
    await fetchClient(`${url}/all`, {
        method: "DELETE"
    });
}

// toggle completion of task
function toggleTaskCompletion(id: string, isCompleted: boolean): void {

    fetchClient<void>(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ isCompleted: !isCompleted })
    });
}

export {
    getAllTodos,
    createTodo,
    toggleTaskCompletion,
    deleteTask,
    clearTasks
};