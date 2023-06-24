interface Task {
    task: string,
    isCompleted: boolean
}

type TaskList = Task[];

interface Todo {
    todo: string,
    isCompleted: boolean
    _id: string,
    _v?: number
}

export {
    Task,
    TaskList,
    Todo
}