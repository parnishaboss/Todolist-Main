type StateType = {
    age: number,
    childrenCount: number,
    name:string,
}

type ActionType = {
    type:string,
    [key:string]:any,
}

export const userReducer = (state: StateType, action: ActionType):StateType => {
    switch (action.type) {  //это If (если)
        case 'INCREMENT-AGE':             //можно так и так
            let newState = {...state}
            newState.age = state.age + 1
            return newState
        case 'INCREMENT-CHILDREN-COUNT':   //можно так и так
            return {
                ...state,
                childrenCount:state.childrenCount+1
            }
        case 'CHANGE-NAME':
            return {
                ...state,
                name:action.newName
            }



        default:
            throw new Error('I don\'t understand this type')
    }
}