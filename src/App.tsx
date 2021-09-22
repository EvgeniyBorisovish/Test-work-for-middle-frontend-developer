import React,{FC,useEffect, useState} from 'react';
import NavBar from './components/NavBar';
import AppRouter from './components/AppRouter';
import './App.css';
import {Card, Layout} from 'antd';
import {useActions} from './hooks/useActions';
import { IUser } from './models/user_';
import UserService from './API/userService';
import { useTypedSelector } from './hooks/useTypedSelector';
const  App:FC =()=>{
const {setUser,setIsAuth} = useActions()
  useEffect(() => {
    if ( localStorage.getItem('auth') && localStorage.getItem('userName') ) {
        setUser({username:localStorage.getItem('userName') || ''} as IUser)
        setIsAuth(true)
    }

  },[]);






  return (
    
    

    
    <Layout>
      <NavBar/>
      <Layout.Content style={{position:"relative"}}>
         <PoolUsers/>
        <AppRouter/>
      </Layout.Content>
    </Layout>
    
  );
}


const PoolUsers:FC = ()=>{

  const {auth} = useTypedSelector(state=>state.authReducer)

  const [pullUsers,setPullUsers] = useState([] as IUser[])
  useEffect(() => {
    
    UserService.getUsers().then((res)=>{
      setPullUsers(res.data as IUser[])
    })
  },[]);


if (auth){ return null}

  
  return !auth && <div style={{position:"absolute"}}>

        <Card title="Доступные пользователи" bordered={false} style={{ width: 300,opacity:"0.5", left:"20px" , top:"20px"}}>
          {
              pullUsers.map(user=><p>{` пользователь: ${user.username} пароль:${user.password}`}</p>)
          }
          
        </Card>
      </div> 
}

export default App;
