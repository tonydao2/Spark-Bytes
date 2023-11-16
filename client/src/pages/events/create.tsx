import React from 'react'
import { Typography, Button, Form, Input, DatePicker } from 'antd'

function create() {
    return (
        <div
            style={{
                backgroundColor: "#eaf7f0",
                padding: "20px",
                width: "100%",
                height: "100%",
            }}
        >
            <Typography.Title
                level={2}
                style={{ textAlign: "center", marginBottom: "20px" }}
            >
                {"Create Events"}
            </Typography.Title>

            <Form labelCol={{ span: 8 }}
                wrapperCol={{ span: 0 }}
                style={{ maxWidth: 600, margin: '0 20px' }}
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
            >


                <div style={{
                    margin: "20px",
                }}>
                    <Form.Item label="Description" name="Description"
                        style={{ marginBottom: "5px", color: "rgb(69, 90, 100)", }}
                        rules={[{ required: true }]}
                    >
                        <Input
                            placeholder="Description"
                            id="Description"
                            style={{ marginBottom: "20px" }}
                        />
                    </Form.Item>

                    <Form.Item label="Quantity" name="Quantity"
                        style={{ marginBottom: "5px", color: "rgb(69, 90, 100)", }}
                        rules={[{ required: true }]}
                    >
                        <Input
                            placeholder="Quantity"
                            id="Quantity"
                            style={{ marginBottom: "20px" }}
                        />
                    </Form.Item>

                    <Form.Item label="Expiration Time" name="Expiration Time"
                        style={{ marginBottom: "5px", color: "rgb(69, 90, 100)", }}
                        rules={[{ required: true }]}
                    >
                        <DatePicker />

                    </Form.Item>

                    <Form.Item label="Tag" name="Tag"
                        style={{ marginBottom: "5px", color: "rgb(69, 90, 100)", }}
                        rules={[{ required: true }]}
                    >
                        <Input
                            placeholder="Tag"
                            id="Tag"
                            style={{ marginBottom: "20px" }}
                        />
                    </Form.Item>


                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit" // This makes the button submit the form
                            style={{
                                backgroundColor: "rgb(102, 187, 106)",
                                border: "none",
                                color: "white",
                                width: "100%"
                            }}

                        >
                            Submit
                        </Button>
                    </Form.Item>



                </div>

            </Form>


        </div>
    )
}

export default create