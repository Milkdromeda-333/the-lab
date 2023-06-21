interface Task {
    task: string,
    isCompleted: boolean
}

type TaskList = Task[];

export {
    Task,
    TaskList
}