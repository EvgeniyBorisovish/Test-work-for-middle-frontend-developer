import axios from "axios";
import { AppDispatch } from "../..";
import UserService from "../../../API/userService";
import { Ievent } from "../../../models/event";
import { IUser } from "../../../models/user_";
import { EventActionEnum, SetEventsAction, SetGuestsAction } from "./type";

export const  EventActionCreators={
    setGuests:(payload:IUser[]):SetGuestsAction=>({
    type:EventActionEnum.SET_GUESTS,
    payload
    }),
    setEvents:(payload:Ievent[]):SetEventsAction=>({
        type:EventActionEnum.SET_EVENTS,
        payload
        }),
    fetchGuests:()=>async (dispatch:AppDispatch)=>{
            try {
                const mockUsers =  await UserService.getUsers()//await axios.get<IUser[]>('./users.json')

                dispatch(EventActionCreators.setGuests(mockUsers.data))

            } catch (error) {
                
            }
        },
        createEvent:(event:Ievent)=>async (dispatch:AppDispatch)=>{

            try {
                
                const events = localStorage.getItem("events") || '[]'
                const json = JSON.parse(events as string) as Ievent[]
                
              //  if (Object.keys(event).length){
                    json.push(event)
              //  }
                
                    dispatch(EventActionCreators.setEvents(json))
                    localStorage.setItem("events",JSON.stringify(json))
                
            } catch (error) {
                
            }

        },
        fetchEvents:(athorName: string )=>async (dispatch:AppDispatch)=>{
            try {
                const events = localStorage.getItem("events") || '[]'
                
                const json = JSON.parse(events as string) as Ievent[]

                const currentUserEvents = json.filter(event=>event.author===athorName)

                dispatch(EventActionCreators.setEvents(currentUserEvents))

            } catch (error) {
                
            }
        }


}