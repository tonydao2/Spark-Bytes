import { useEffect, FC, useState } from "react";
import { Typography, Button, Form, Input, DatePicker, Upload, UploadProps } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import { useAuth } from "@/contexts/AuthContext";
import { BoldOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { API_URL } from "@/common/constants";

const Create: FC = () => {
    const router = useRouter();

    const { getAuthState, authState } = useAuth();
    const event = () => {
        router.push("/events");
    }

    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png',
        },
    ]);

    const handleChange: UploadProps['onChange'] = (info) => {
        let newFileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        newFileList = newFileList.slice(-2);

        // 2. Read from response and show file link
        newFileList = newFileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        setFileList(newFileList);
    };

    const props = {
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange: handleChange,
        multiple: true,
    };

    const createEvent = async (value: any) => {
        const serverUrl = `${API_URL}/api/events/create`;
        const { ExpirationTime, Description, Quantity, Tag } = value;
        console.log(value);
        try {
            console.log({ ExpirationTime, Description, Quantity, Tag })
            const response = await fetch(serverUrl, {
                method: "POST",
                body: JSON.stringify({
                    exp_time: ExpirationTime,
                    description: Description,
                    qty: Quantity,
                    tags: Tag
                }),
                headers: {
                    Authorization: `Bearer ${getAuthState()?.token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                // Request was successful
                const data = await response.json(); // If the server returns a response
                alert("Event Created");
                event();
            }
        } catch (error) {
            console.log(error);
        }
    }


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
                onFinish={createEvent}
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

                    <Form.Item label="Expiration Time" name="ExpirationTime"
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

                    <Form.Item label="Upload Photo" name="Upload Photo"
                        style={{ marginBottom: "5px", color: "rgb(69, 90, 100)", }}
                        rules={[{ required: true }]}
                    >
                        <Upload {...props} fileList={fileList}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
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

export default Create