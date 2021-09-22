import {Button, DatePicker, Form, Input, Row, Select} from 'antd';
import React, { FC, useState } from 'react';
import { IUser } from '../models/user_';
import { rules } from '../utils/rules';
import {Ievent} from '../models/event';
import { Moment } from 'moment';
import { formatDate } from '../API/date';
import { FormInstance } from 'antd/es/form';

interface EventFormProps{
guests:IUser[],
submit:(event:Ievent)=>void,
closeForm:()=>void
}


const EventForm:FC<EventFormProps> = (props:EventFormProps)=>{
    const { Option } = Select;
    const [event,setEvent] = useState<Ievent>({
        description:"",
        guest:"",
        date:"",
        author:""
    } as Ievent)
    
    const [form] = Form.useForm();

    const selectDate = (date:Moment | null)=>{
        
        
            setEvent({...event,date: date===null?"":formatDate(date.toDate())})
        
    }
    const onSubmit=(data:any)=>{
        
        props.submit({...event,author:localStorage.getItem("userName") as string})
        setEvent({...event,description:"",guest:"",date:""})
        //data.guest = ""
        props.closeForm()

        
            form.resetFields();
        
         
        
      
        

        
    }
    console.log('event',event)
    return(
       <Form
       
       onFinish={onSubmit}
       labelCol={{
        span: 8,
        }}
        wrapperCol={{
            span: 16,
        }}
        form={form}
      >
           <Form.Item
           label="Описание события"
           name="description"
           rules={[rules.required()]}
           
           >
           <Input onChange={(e)=>{
               setEvent({...event,description:e.target.value})
               
           }}/>
           </Form.Item>

           
           <Form.Item
           label="Выберите гостя"
           name="guest"
           rules={[rules.required()]}
           >
           <Select  onChange={(guest:string)=>{
               setEvent({
                   ...event,guest})}}>
                {
                  props.guests.map(guest=><Option value={guest.username} key={guest.username}>{guest.username}</Option>)
                }
            </Select>
           </Form.Item>


           <Form.Item
           label="Дата события"
           name="date"
           rules={event.date?( [rules.required(),rules.isDateAfter("Дата встречи меньше текущей")]):
           ( [rules.required()])
            }
           >    
           <DatePicker  onChange={(e)=>{
              selectDate(e)
           }} />
           </Form.Item>



            <Row justify="end">

                
           <Form.Item>
               
               <Button type="primary" htmlType="submit" disabled={!event.description || !event.guest || !event.date } >Создать</Button>
           </Form.Item>
           

            </Row>

       </Form>
    )
}


export default EventForm