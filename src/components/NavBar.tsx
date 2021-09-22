import React,{FC} from 'react';
import {Layout,Menu} from 'antd';
import {AuthActionCreators} from '../store/reducers/auth/action-creators';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useTypedSelector} from '../hooks/useTypedSelector';

const Navbar:FC = ()=>{
    const {auth,user}  = useTypedSelector(state=>state.authReducer)
    const dispatch = useDispatch()
    const history = useHistory()
    return(
        
        <Layout.Header style={{display:"flex",justifyContent:"flex-end"}}>
          
          
          <div style={{color:"white"}}>{`${auth?user.username:''}`}</div>
          <div>
            <Menu theme="dark" mode="horizontal" selectable={false} inlineCollapsed={false}> 
            <Menu.Item key={0} onClick={()=>{
                if (auth){
                    dispatch(AuthActionCreators.logout())
                }
                else{
                    history.push("/login")    
                }
            }}> 
            {auth?<>Logout&nbsp;&nbsp;&nbsp;&nbsp;</>:<>Login&nbsp;&nbsp;&nbsp;&nbsp;</>}</Menu.Item>              
            </Menu>
          </div>
            
        </Layout.Header>
    )
}
export default Navbar