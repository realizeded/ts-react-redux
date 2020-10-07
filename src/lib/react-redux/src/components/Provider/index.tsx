import React,{createContext}from 'react';
import {Store} from 'redux';
interface Props {
    store:Store
}
export const storeContext = createContext({});
class Provider extends React.Component<Props,{}>{
    constructor(props:Props) {
        super(props);
    }
    render() {
        const {children,store} = this.props;
        return (
            <storeContext.Provider value={store}>
                {
                    children
                }
            </storeContext.Provider>
        );
    }
}
export default Provider;