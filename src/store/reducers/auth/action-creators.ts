
import {SetUserAction,SetIsloadingAction,SetErrorAction,SetAuthAction,AuthActionEnum} from './types'
import {IUser} from '../../../models/user_'
import {AppDispatch} from '../../index'
import axios from 'axios'
import { useStore } from 'react-redux'
import UserService from '../../../API/userService'
export const AuthActionCreators = {
    setUser:(user:IUser):SetUserAction=>({
        type:AuthActionEnum.SET_USER,payload:user
    }),
    setIsAuth:(auth:boolean):SetAuthAction=>({type:AuthActionEnum.SET_AUTH,payload:auth}),
    setIsLoading:(loading:boolean):SetIsloadingAction=>({type:AuthActionEnum.SET_IS_LOADING,payload:loading}),
    setError:(error:string):SetErrorAction=>({type:AuthActionEnum.SET_ERROR,payload:error}),
    login:(username:string,password:string)=>async(dispatch:AppDispatch)=>{
        try {
            dispatch(AuthActionCreators.setIsLoading(true))  

            setTimeout( async ()=>{
                
            const mockUsers =  await UserService.getUsers()//await axios.get<IUser[]>('./users.json')//UserService.getUsers()//
            
            
            
            if (mockUsers.data.filter(user=>user.username===username && user.password===password).length>0){
                
                localStorage.setItem('auth','true')
                localStorage.setItem('userName',username)
                dispatch(AuthActionCreators.setUser({username,password}))
                dispatch(AuthActionCreators.setIsAuth(true))
                //dispatch(AuthActionCreators.setIsLoading(false)) 
                
            }
            else{
                //dispatch(AuthActionCreators.setIsLoading(false)) 
                //dispatch(AuthActionCreators.setIsAuth(true))
                dispatch(AuthActionCreators.setError("Неккоретное имя пользователя или пароль"))
                 
            }
            dispatch(AuthActionCreators.setIsLoading(false)) 

        },2000)




        } catch (error) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при логине'))
        }
    },
    //logout:(username:string,password:string)=>async(dispatch:AppDispatch)=>{

    logout:()=>async(dispatch:AppDispatch)=>{
        try {
            localStorage.removeItem("auth")
            localStorage.removeItem("userName")
            dispatch(AuthActionCreators.setUser({} as IUser))
            dispatch(AuthActionCreators.setIsAuth(false))
        } catch (error) {
            
        }
    }
}