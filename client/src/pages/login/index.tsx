import React from "react";
import { Typography, Form } from "antd";

const Login = () => {
  return <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#eaf7f0",
    }}>
    <div
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
      }}>
      <Typography.Title level={2}>Log in</Typography.Title>
    </div>
  </div>;
};

export default Login;
