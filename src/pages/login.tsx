import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Card, Col, Input, message, Row } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import Footer from '../components/GlobalFooter/index';
import '../static/css/login.css';
import servicePath from '../config/apiUrl';
import { request } from '../utils/axios';
import { setCookie } from '../utils/tools';
import { useHistory } from 'react-router-dom';

const Login: React.FC <{}> = () => {

  const [userName, setUserName] = useState<string>('');
  const [password, setPWD] = useState<string>('');
  const [isLoding, setIsLoading] = useState<boolean>(false);
  const [ifFocusName, setIfFocusName] = useState<boolean>(false);
  const [ifFocusPWD, setIfFocusPWD] = useState<boolean>(false);

  const history = useHistory();

  const handleLogin = (): void => {
    setIsLoading(true);
    if (!userName || !password) {
      setIsLoading(false);
      message.error('请完善登录信息');
      return;
    }
    let param = {
      'accountName': userName,
      'password': password,
    }
    request({
      url: servicePath.login,
      method: 'POST',
      params: param
    }).then((res) => {
      console.log('res: ', res);
      // 有效期设置为 8h
      setCookie('token', res.data.data.token, 8 * 60 * 60 * 1000);
      history.push('/index');
      // window.location.href = '/index';
    }).catch((err) => {
      console.log('err: ', err);
      setIsLoading(false);
      message.error('用户名/密码错误，请重新登录！');
    });
  }

  return (
    <>
      <Row align="middle" justify="center" style={{ minHeight: '96vh' }}>
        <Col >
          <Card 
            title="blog admin system" 
            bordered={true} 
            style={{ width: 400 }}
            headStyle={{ textAlign: 'center' }}
          >
            <Input 
              id="userName"
              size="large"
              placeholder="Please input your userName here"
              prefix={<UserOutlined style={{ color: ifFocusName ? '#40a9ff' : '' }} />}
              disabled={isLoding}
              onChange={(e): void => {
                setUserName(e.target.value);
              }}
              onFocus={(e): void => {
                setIfFocusName(true);
              }}
              onBlur={(e): void => {
                setIfFocusName(false);
              }}
            />
            <br /><br />
            <Input.Password 
              id="pwd"
              size="large"
              placeholder="Please input your password here"
              disabled={isLoding}
              prefix={<LockOutlined style={{ color: ifFocusPWD ? '#40a9ff' : '' }} />}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              onChange={(e): void => {
                setPWD(e.target.value);
              }}
              onFocus={(e): void => {
                setIfFocusPWD(true);
              }}
              onBlur={(e): void => {
                setIfFocusPWD(false);
              }}
            />
            <br /><br />

            {/* submit */}
            <Button 
              type="primary" 
              size="large" 
              block
              loading={isLoding} 
              onClick={(): void => {
                handleLogin();
              }}
            >
              {isLoding ? 'Submitting' : 'Submit'}
            </Button>
          </Card>
        </Col>
      </Row>
      <Row align="middle" justify="center" style={{ minHeight: '4vh' }}>
        <Footer />
      </Row>
    </>
  )
};

export default Login;
