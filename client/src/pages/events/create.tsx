import { useEffect, FC, useState } from "react";
import { Typography, Button, Form, Input, DatePicker, Upload, UploadProps, message, Modal } from 'antd'
import type { UploadFile, RcFile } from 'antd/lib/upload/interface';
import { UploadOutline, PlusOutlined } from '@ant-design/icons';
import { useAuth } from "@/contexts/AuthContext";
import { BoldOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { API_URL } from "@/common/constants";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
});

const Create: FC = () => {
    const router = useRouter();

    const { getAuthState, authState } = useAuth();
    const event = () => {
        router.push("/events");
    }

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);
        console.log(fileList);

    const uploadButton = (
        <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

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
                const data = await response.json();
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

                    <Form.Item label="Upload Image" name="Upload"
                        style={{ marginBottom: "5px", color: "rgb(69, 90, 100)", }}
                        rules={[{ required: true }]}
                    >
                        <Upload
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 10 ? null : uploadButton}
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
                            loading={uploading}
                        >
                            {uploading ? 'Uploading' : 'Submit'}
                        </Button>
                    </Form.Item>



                </div>

            </Form>


        </div>
    )
}

export default Create