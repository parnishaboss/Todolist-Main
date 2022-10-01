import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

export type tasksType = {
    id: string
    title: string
    isDone: boolean
}
type propsType = {
    id: string
    title: string
    tasks: Array<tasksType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}
export const Todolist = (props: propsType) => {
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {props.tasks.map((t) => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }

                    return (
                        <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox
                                checked={t.isDone}
                                onChange={onChangeStatusHandler}
                            />
                            <EditableSpan title={t.title}
                                          onChange={onChangeTitleHandler}/>
                            <IconButton onClick={onRemoveHandler}>
                                <Delete/>
                            </IconButton>
                        </div>)
                })}
            </div>
            <div>
                <Button color={'inherit'} variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>all
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>completed
                </Button>
            </div>
        </div>
    )
}
