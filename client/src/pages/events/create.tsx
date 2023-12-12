import { useEffect, FC, useState } from "react";
import { Typography, Button, Form, Input, DatePicker } from 'antd'
import { useAuth } from "@/contexts/AuthContext";
import { BoldOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { API_URL } from "@/common/constants";
import { ITag } from "@/common/interfaces_zod";

const Create: FC = () => {
    const router = useRouter()

    const { getAuthState, authState } = useAuth();
    const event = () => {
        router.push("/events");
    }

    const createEvent = async (value: any) => {

        const serverUrl = `${API_URL}/api/events/create`;
        const { ExpirationTime, Description, Quantity, Tag, Address, floor, room, loc_note } = value;

        console.log(Address);
        try {

            const response = await fetch(serverUrl, {
                method: "POST",
                body: JSON.stringify({
                    exp_time: ExpirationTime,
                    description: Description,
                    qty: Quantity,
                    tags: Tag,
                    location: {
                        Address: Address,
                        floor: parseInt(floor),
                        room: room,
                        loc_note: loc_note

                    }
                }),
                headers: {
                    Authorization: `Bearer ${getAuthState()?.token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                // Request was successful
                const data = await response.json(); // If the server returns a response
                console.log('-----')
                console.log(data)
                alert("Event Created"); //uncomment later
                event();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const validateLocation = async (rule: any, value: any) => {
        if (!value || value.trim() == '') {
            throw new Error('Location must be non empty')
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

                    <Form.Item label="Address" name="Address"
                        style={{ marginBottom: "5px", color: "rgb(69, 90, 100)", }}
                        rules={[{ required: true }, { validator: validateLocation }]}
                    >
                        <Input
                            placeholder="Address"
                            id="Address"
                            style={{ marginBottom: "20px" }}
                        />
                    </Form.Item>

                    <div style={{ display: 'flex' }}>

                        <Form.Item label="Floor #" name="floor"
                            style={{ marginRight: '5px', marginBottom: "5px", color: "rgb(69, 90, 100)", width: '50%' }}
                            rules={[{ required: true }, { validator: validateLocation }]} // fix validator for int
                        >
                            <Input
                                placeholder="Floor"
                                id="floor"
                                style={{ marginBottom: "20px" }}
                            />
                        </Form.Item>

                        <Form.Item label="Room #" name="room"
                            style={{ marginBottom: "5px", color: "rgb(69, 90, 100)", width: '50%' }}
                            rules={[{ required: true }, { validator: validateLocation }]}
                        >
                            <Input
                                placeholder="Room"
                                id="room"
                                style={{ marginBottom: "20px" }}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item label="Location Notes" name="loc_note"
                        style={{ marginBottom: "5px", color: "rgb(69, 90, 100)", }}
                        rules={[{ required: true }, { validator: validateLocation }]}
                    >
                        <Input
                            placeholder="Location Notes"
                            id="loc_note"
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

export default Create