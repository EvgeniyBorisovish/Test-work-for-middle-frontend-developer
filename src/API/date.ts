import { Moment } from "moment";

export const formatDate = (date:Date):string=>{

    

    return  String(date.getFullYear())+"."+String(date.getMonth()+1).padStart(2,"0")+"."+String(date.getDate()).padStart(2,"0")

}