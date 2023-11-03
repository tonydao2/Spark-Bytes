import React from "react";
import { Typography, Card, Input, Button, Space } from "antd";
import type { FormItemProps } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { HomeOutlined } from '@ant-design/icons';



const Login: React.FC = () => {

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [isButtonHovered, setIsButtonHovered] = React.useState(false);

  return <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#eaf7f0",
    }}>

    <Card
      style={{
        width: "30%",
        marginTop: "16px",
        marginBottom: "16px",
        boxShadow: "rgba(0, 0, 0, 0.15)  0px 2px 8px"
      }}
    >
      <div>
        <Typography.Title level={2}
          style={{
            textAlign: "center",
            color: "rgb(69, 90, 100)",
          }}>Log In</Typography.Title>
        <div style={{
          margin: "20px",
        }}>
          <Typography.Text style={{
            marginBottom: "5px",
            color: "rgb(69, 90, 100)",
          }}>Email Address</Typography.Text>

          <Input
            placeholder="Email"
            style={{ marginBottom: "20px" }}
          />
          <Typography.Text style={{
            marginBottom: "5px",
            color: "rgb(69, 90, 100)"
          }}>Password</Typography.Text>
          <Input.Password
            placeholder="Password"
            style={{ marginBottom: "20px" }}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />

          <Button type="primary"
            style={{
              backgroundColor: "rgb(102, 187, 106)",
              border: "none",
              color: "white",
              width: "100%"
            }}
            icon={<HomeOutlined />}
          >Log In</Button>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            type="link"
            style={{
              color: isButtonHovered ? "#69B1FF" : "#439847",
              fontWeight: "550",
              fontSize: "30",
            }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Back to home
          </Button>
        </div>
      </div>
    </Card>
  </div >

};

export default Login;
