import {AuthAction, AuthActionEnum } from './types'
import AuthState from './types'
import {IUser} from '../../../models/user_'


const initialState:AuthState = {
    auth:false,
    isLoading:false,
    user:{} as IUser,
    error:""
}
export default function authReducer(state=initialState,action:AuthAction):AuthState{
        
    switch(action.type){

        case AuthActionEnum.SET_AUTH:
            return {...state,auth:action.payload}
        case AuthActionEnum.SET_ERROR:
            return {...state,error:action.payload}
        case AuthActionEnum.SET_IS_LOADING:
                return {...state,isLoading:action.payload}
        case AuthActionEnum.SET_USER:
            return {...state,user:action.payload}

        default:return state
    }

}