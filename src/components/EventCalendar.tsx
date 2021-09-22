import { Badge, Calendar } from 'antd';
import { Moment } from 'moment';
import { FC } from 'react';
import { formatDate } from '../API/date';
import {Ievent} from '../models/event';

interface EventCalendarProps{
    events:Ievent[]
}

export const EventCalendar:FC<EventCalendarProps> = (props)=>{

    function dateCellRender(value:Moment) {
        const formatedDate = formatDate(value.toDate())
        const currentDateEvents = props.events.filter(event=>event.date===formatedDate)
        return (
          <div>
            {currentDateEvents.map((ev,index)=><div key={index} >{ev.description}</div>)}
          </div>
        );
      }

    return <div><Calendar dateCellRender={dateCellRender}/></div>
}