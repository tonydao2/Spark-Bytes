import React from "react";
import { useState } from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from "next/router";


export default function Signup() {
  const router = useRouter();
  // Directs to home page
  const home = () => {
    router.push("/");
  };

  const [formSubmit, setFormSubmit] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false);


  const handleFormSubmit = async (value: any) => {
    console.log(value, 'this is value');
    const serverUrl = 'http://localhost:5005/api/auth/signup'

    try {
      const response = await fetch(serverUrl, {
        method: 'POST',
        body: JSON.stringify(value),
      })

      if (response.ok) {
        // Request was successful
        const data = await response.json(); // If the server returns a response
        console.log(data, 'data from server');

      }
    } catch (error) {
      console.log(error);
    }


  }
  // do a check and return a status quote. If email, 
  // send info to signup backend route 

  const validatePassword = async (rule: any, value: any) => {
    if (value.length < 8) {
      throw new Error("Password has to be at least 8 characters long")
    }
    else if (!/[0-9]/.test(value)) {
      throw new Error('Password must include at least one number')
    }
    else if (!/[A-Z]/.test(value)) {
      throw new Error('Password must include at least one uppercase letter')
    }

  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: "100vh", backgroundColor: "#EAF7F0", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'" }}>
      <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}>
        <h1 style={{ textAlign: 'center', fontSize: "30px", margin: "2rem 11rem", color: '#455A64' }}>Sign Up </h1>


        <Form name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 0 }}
          style={{ maxWidth: 600, margin: '0 20px' }}
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <div style={{ display: "flex", flexDirection: 'column' }}>
            <Form.Item label="Name" name="Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Name" id="Name" />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="Email Address"
              rules={[{
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },


              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="Password"
              rules={[
                {
                  required: true,
                },
                { validator: validatePassword }
              ]}

            >
              <Input.Password placeholder="Password" type='password' />
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit" style={{ backgroundColor: "#66BB6A", fontWeight: "50", width: '100%' }} >
                <span><svg viewBox="64 64 896 896" focusable="false" data-icon="user-add" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 00-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1-.4.2-.8.3-1.2.5-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 00-80.4 119.5A373.6 373.6 0 00137 888.8a8 8 0 008 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 008.1.3zM512.2 521c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 01340.5 349c0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4A171.2 171.2 0 01683.9 349c0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521zM880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"></path></svg>
                </span>
                <span>&nbsp;</span>

                <span>Sign Up</span>

              </Button>
            </Form.Item>

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
            onClick={home}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Back to home
          </Button>
        </div>

      </div >



    </div >



  )
}