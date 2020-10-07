import React from 'react';
import {Store} from 'redux'
import {storeContext} from './components/Provider';
const connect = function(mapState:Function,mapDistpatch:Function|Object) {
        return function(InComponent:React.ComponentType<{}>){
            return class WrapperComponent extends React.Component<{},{}> {
                static contextType =  storeContext;
                constructor(props:any) {
                     super(props);
                 }   
                 render() {
                     return (<InComponent {...this.state}/>);
                 }                        
                 componentDidMount() {
                     const store:Store = this.context; 

                     store.subscribe(()=>this.setState(()=>{
                        const stateProps = handleProps(store.getState(),mapState); 
                        const dispatchProps = handleDispatch(store.dispatch,mapDistpatch);
                        return {...stateProps,...dispatchProps};
                     }));
                     
                 }
            }
        }
}
function handleProps(state:any,mapState:Function) {
    const stateToProps =  mapState(state);
    return stateToProps;
}
function handleDispatch(dispatch:any,mapDispatch:Function|Object) {
    if(mapDispatch instanceof Function) {
        return handleDispatchFunction(dispatch,mapDispatch);
    } else {
        return handleDispatchObject(dispatch,mapDispatch);
    }
}
function handleDispatchFunction(dispatch:any,mapDispatch:Function) {
    return mapDispatch(dispatch);
}
function handleDispatchObject(dispatch:any,mapDispatch:any) {
    let map:any= {};
    Object.keys(mapDispatch).forEach(key=>{
        map[key] = ()=>{dispatch(mapDispatch[key])};
    });  
    return map;
}
export default connect;