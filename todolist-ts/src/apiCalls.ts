const url = "http://localhost:3030/todo";

// get all todos
function getAllTodos() {
    const data = fetch(url)
        .then(data => data.json())
        .then(data => {
            console.log(data)
            return data
        })
        .catch(err => console.log(err))
    return data
}

// create a todo 
function createTodo(newItemName: string) {

    const options: {
        method: string,
        headers: {
            "Content-type": string
        }
        body: string
    } = {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            todo: newItemName,
            isCompleted: false,
        })

    }
    const id = fetch(url, options)
        .then(data => data.json())
        .then(data => data)
        .catch(err => {
            console.log(err);
            return err;
        });

    return id;
}
// delete a todo

// delete all todos

// update a todo

export {
    getAllTodos,
    createTodo
};