import {FC} from 'react';
import {Form,Button,Input,Checkbox} from 'antd';
import {useDispatch} from 'react-redux';
import {AuthActionCreators} from '../store/reducers/auth/action-creators';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useActions} from '../hooks/useActions';
const LoginForm:FC = ()=>{
  
      const dispatch = useDispatch()
      const {error,isLoading} = useTypedSelector(state=>state.authReducer)
      
      const {login} = useActions()

      const submit = (values:any) => {

        
        //dispatch(AuthActionCreators.login(values.username,values.password))
        login(values.username,values.password)
      };
    
      const onFinishFailed = (errorInfo:any) => {
       // console.log('Failed:', errorInfo);
      };

    return(
       <div>
    <Form name="basic"
      labelCol={{
        span: 8,
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
      <Input />
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
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Войти
        </Button>
      </Form.Item>
    </Form>

       </div>
    )
}

export default LoginForm