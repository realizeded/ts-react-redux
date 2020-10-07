import types from './actionTypes';
interface ADD {
    type:types.ADD
    payload:{
        text:string
    }
}
interface DEl {
    type:types.DELETE
    payload:{
            index:number
    }
}
const add = function(str:string):ADD{
    return {
        type:types.ADD,
        payload:{text:str}
    };
};
const del = function(index:number):DEl {
    return {
        type:types.DELETE,
        payload:{
            index
        }
    };
};
export type ActionTypes = ADD|DEl;
export default {
    add,
    del
};
