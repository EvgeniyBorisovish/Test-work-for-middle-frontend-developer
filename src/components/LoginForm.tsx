import {FC, useState} from 'react';
import {Form,Button,Input,Checkbox} from 'antd';
import {useDispatch} from 'react-redux';
import {AuthActionCreators} from '../store/reducers/auth/action-creators';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useActions} from '../hooks/useActions';
const LoginForm:FC = ()=>{

      const dispatch = useDispatch()

      const {error,isLoading} = useTypedSelector(state=>state.authReducer)

      const [username,setUsername] = useState("")

      const [password,setPassword] = useState("")

      const {login} = useActions()

      const [form] = Form.useForm();

      const submit = (values:any) => {
        login(values.username,values.password)
      };
    
      const onFinishFailed = (errorInfo:any) => {

      };

    return(
       <div>
    <Form name="basic"
      labelCol={{
        span: 11,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={submit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      {
        error && <div style={{color:'red'}}>
          {
            error
          }
          </div>
      }
      <Form.Item
        
        label="Имя пользователя"
        name="username"
        rules={[
          {
            required: true,
            message: 'Пожайлуста, введите имя пользователя',
          },
        ]}
      >
      <Input onChange={()=>{
          setUsername(form.getFieldValue("username"))
        }} />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: 'Пожайлуста, введите пароль',
          },
        ]}
        
      >
        <Input.Password onChange={()=>{
          setPassword(form.getFieldValue("password"))
        }}/>
      </Form.Item>

     
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        
        
        <Button type="primary" htmlType="submit" loading={isLoading} disabled={!username || !password} >
          Войти
        </Button>
      </Form.Item>
    </Form>

       </div>
    )
}

export default LoginForm