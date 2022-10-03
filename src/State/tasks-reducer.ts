import {TasksStateType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string,
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(),title: action.title,isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }


        default:
            throw new Error('I don\'t understand this type')
    }
}
export const removeTaskAC = (taskID: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId: todolistId, taskID: taskID}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}