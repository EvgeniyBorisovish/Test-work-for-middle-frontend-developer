import { Ievent } from "../../../models/event";
import { IUser } from "../../../models/user_";

export interface EventState{
    guests:IUser[];
    events:Ievent[];
}
export enum EventActionEnum{
    SET_GUESTS='SET_GUESTS',
    SET_EVENTS='SET_EVENTS'
}

export interface SetGuestsAction{
    type:EventActionEnum.SET_GUESTS,
    payload:IUser[]

}

export interface SetEventsAction{
    type:EventActionEnum.SET_EVENTS,
    payload:Ievent[]

}
export type EventAction = SetGuestsAction | SetEventsAction