import React,{FC, useEffect, useState} from "react";
import {Button, Modal, Layout, Row} from 'antd';
import {EventCalendar} from '../components/EventCalendar';
import EventForm from "../components/EventForm";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Event:FC = ()=>{

    const [isModalVisible, setIsModalVisible] = useState(false);

    const{fetchGuests,createEvent,fetchEvents} =   useActions()

    const {guests,events} = useTypedSelector(state=>state.eventReducer)
    const { user }  = useTypedSelector(state=>state.authReducer)

    useEffect(()=>{
        
        fetchGuests()
        fetchEvents(user.username)
    
    },[])
    const closeForm = ()=>{
        setIsModalVisible(false)
    }
    
    const showModal = (el:any) => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        

        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const addNewEvent = ()=>{

      }
      //{JSON.stringify(events.filter(event=>event.author===user.username))}
    return(
        <Layout>
            <EventCalendar events={events}/>
            <Row justify="center">
                <Button type="primary" onClick={showModal}>Добавить событие</Button>
            </Row>
            <Modal title="Добавить встречу" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <EventForm  guests={guests} submit={(event)=>createEvent(event)} closeForm={closeForm}/>
            </Modal>              
        </Layout>
    )
}

export default Event