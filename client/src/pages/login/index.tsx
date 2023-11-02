import React from "react";
import { Typography, Card, Input, Button, Space } from "antd";
import type { FormItemProps } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';



const Login: React.FC = () => {

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#eaf7f0",
    }}>
    {/* <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
        height: "51%",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
      }}> */}
    <Card
      style={{
        width: "30%",
        marginTop: "16px",
        marginBottom: "16px",
        boxShadow: "rgba(0, 0, 0, 0.15)  0px 2px 8px"
      }}
      bordered>
      <div>
        <Typography.Title level={2}
          style={{
            textAlign: "center",
            color: "rgb(69, 90, 100)",
          }}>Log In</Typography.Title>
        <div>
          <Typography.Text>Email Address</Typography.Text>
          <Input
            placeholder="Email"

          />
          <Typography.Text>Password</Typography.Text>
          <Input.Password
            placeholder="Password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </div>
      </div>
    </Card>
  </div >

};

export default Login;
