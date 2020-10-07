import React,{useState,useCallback,useRef}from 'react';
import {Button,Input,List} from 'antd';
import action,{ActionTypes}from './store/actionCreators';
// import store from './store/index';
import './App.css';
import {connect} from 'react-redux';
const App:React.FC<ReturnType<typeof mapStateToProps>&ReturnType<typeof mapDispatchToProps>> = function(props):JSX.Element {
    // const [data,setData] = useState(store.getState());
    const [val,setVal] = useState('');
    const ref = useRef<string>();
    ref.current = val;
    /* useEffect(()=>{
        store.subscribe(()=>{
            setData(()=>store.getState())
        });
    },[]); */
    const handleClick = useCallback((e)=>{
        props.ADD(ref.current!)
        setVal('');
    },[props]);
    const handleChange = useCallback(function(e:React.ChangeEvent<HTMLInputElement>){
            let val = e.currentTarget.value;
            setVal(val);
    },[]);
    const handleItemCLick = useCallback(function(index:number){
           props.DEL(index);
    },[props]);
   const {list} = props;
    return (
        
        <div className="todolist-wrapper">
            <div>
                <div className="input">
                    <Input value={val} onChange={handleChange}/>
                </div>
                <Button type="primary" onClick={handleClick}>添加</Button>
            </div>
                <div style={{marginTop:'20px'}}>
            <List 
                bordered
                dataSource={list}
                    renderItem={(item,index) => (
                    <List.Item onClick={()=>handleItemCLick(index)}>
                        {item}
                    </List.Item>
                )}
                />
                </div>
        </div>
    )
}
const mapStateToProps = function(state:{list:string[]}) {
    return {
        list:state.list
    }
}
const mapDispatchToProps = function(dispatch:Function) {
    return {
        ADD(val:string) {
            const addAction:ActionTypes = action.add(val);
            dispatch(addAction);
        },
        DEL(index:number) {
            const delAction:ActionTypes = action.del(index);
            dispatch(delAction);
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);