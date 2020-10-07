import {ActionTypes} from './actionCreators';
import types from './actionTypes'
interface State {
    list:string[]
}
const defaultState:State = {
    list:['1','2']
};

export function reducers(state=defaultState,action:ActionTypes) {
    let curState = JSON.parse(JSON.stringify(state));

    switch(action.type) {
        case types.ADD:
        curState.list.push(action.payload.text);
        return {
           ...curState
        }    
        ;break;
        case types.DELETE:
            curState.list.splice(action.payload.index,1);
            return {
                ...curState
            }   
            ;break;
    }
    return state;
}
