interface Task {
    task: string,
    isCompleted: boolean
}

type TaskList = Task[];

interface Todo {
    todo: string,
    isCompleted: boolean
}

export {
    Task,
    TaskList,
    Todo
}