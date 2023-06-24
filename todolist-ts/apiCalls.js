var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "http://localhost:3030/todo";
function fetchClient(url, options) {
    return fetch(url, options)
        .then(res => res.json())
        .then((data) => {
        return data;
    })
        .catch((err) => console.log(err));
}
// get all todos
function getAllTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetchClient(`${url}`);
        return data;
    });
}
// create a todo 
function createTodo(newItemName) {
    const data = fetchClient(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            todo: newItemName,
            isCompleted: false,
        })
    });
    return data;
}
// delete a todo
// delete all todos
// update a todo
// toggle completion of task
// function toggleTaskCompletion(id: number, isCompleted: boolean) {
//     const options: RequestInit = {
//         method: "PUT",
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         },
//         body: JSON.stringify({ isCompleted })
//     }
//     fetch(`${url}/id`, options)
// }
export { getAllTodos, createTodo };
