import React,{FC,useEffect} from 'react';
import NavBar from './components/NavBar';
import AppRouter from './components/AppRouter';
import './App.css';
import {Layout} from 'antd';
import {useActions} from './hooks/useActions';
import { IUser } from './models/user_';
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
      <Layout.Content>
        <AppRouter/>
      </Layout.Content>
    </Layout>
  );
}

export default App;
