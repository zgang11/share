
import React, { useEffect } from 'react';
import LogoIcon from '../../asset/images/logo.svg';
import HTML from 'component/layout';
import { Card, message } from 'antd';
import './index.css';
import { qrCode, wxLogin } from '../../utils/api';
import { generateRandomString } from '../../utils/helper';
import { useState } from 'react';
import { useHistory } from "react-router-dom";


const Login = (props) => {
  const history = useHistory();
  debugger
  console.log(useHistory())
  const [code, setCode] = useState(null);
  
  const getQrCode = async (params) => {
    let result = await qrCode({
      params
    });
    if(result.code === 1000) {
      setCode(result.data);
    }
  }

  const judgeLogin = async (params) => {
    let result = await wxLogin({
      params
    });
    if(result.code === 1000) {
      sessionStorage.setItem('token', result.token);
      message.success('登录成功');
      history.push('/');
    }
  }

  useEffect(() => {
    const params = {
      qrcodeRandom: generateRandomString(),
      qrcodeTime: new Date().getTime()
    }
    getQrCode(params);
    var timer = setInterval(() => {
      judgeLogin(params);
    }, 3000);
    return () => {
      clearInterval(timer);
    }
  }, []);

  return <HTML>
      <div className='logo-wrapper'>
        <img className='img-wrapper' src={LogoIcon}  />
        <span className='logo-text-zh'>分享</span>
        <span className='logo-text'>·Share</span>
      </div>
      <div className='login-wrapper'>
        <Card
          style={{
             width: '40%',
             maxWidth: 500,
          }}
        >
          <div className='card-content'>
            <span className='text-c'>微信扫码关注公众号</span>
            <span className='text-c'>关注公众号即可登录，「已关注」扫码后即可登录</span>
            <img className='img-login' src={code} />
          </div>
        </Card>
      </div>
  </HTML>;
};

export default Login;
