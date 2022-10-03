import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {ControlPoint} from '@mui/icons-material';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <TextField value={newTaskTitle}
                       variant={'outlined'}
                       label={'Type value'}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addTaskHandler} color={'primary'}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
}