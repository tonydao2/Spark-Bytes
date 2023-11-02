import React from "react";
import { useState } from "react";
import { Typography, Card, Input, Button, Space, Form } from "antd";
import type { FormItemProps } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { HomeOutlined } from '@ant-design/icons';



const Login: React.FC = () => {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false)
  const handleFormSubmit = async (value: any) => {
    console.log(value)
  }

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

        <Form labelCol={{ span: 8 }}
          wrapperCol={{ span: 0 }}
          style={{ maxWidth: 600, margin: '0 20px' }}
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          onFinish={handleFormSubmit}>


        <div style={{
          margin: "20px",
        }}>
            <Form.Item label="Email Address" name="Email"
              style={{ marginBottom: "5px", color: "rgb(69, 90, 100)", }}
              rules={[{ required: true }]}
            >
          <Input
            placeholder="Email"
                id="Email"
            style={{ marginBottom: "20px" }}
          />
            </Form.Item>


            <Form.Item label="Password" name="Password"
              style={{ marginBottom: "5px", color: "rgb(69, 90, 100)", }}
              rules={[{ required: true }]}
            >
          <Input.Password
            placeholder="Password"
                id="Passwors"
            style={{ marginBottom: "20px" }}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
            </Form.Item>

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

        </Form>


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
