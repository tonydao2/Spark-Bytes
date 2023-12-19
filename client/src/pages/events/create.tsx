import { useEffect, FC, useState } from "react";
import { Select, Typography, Button, Form, Input, DatePicker, Upload, UploadProps, message, Modal } from 'antd'
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

interface Tag {
    tag_id: number;
    name: string;
    color: string;
    type_id: number;
}

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
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch(`${API_URL}/api/tags/`, {
                    headers: { Authorization: `Bearer ${getAuthState()?.token}` },
                });
                const data = await response.json();
                console.log(data);
                if (data && Array.isArray(data)) {
                    setTags(data); 
                } else if (data && data.tags) {
                    setTags(data.tags);
                } else {
                    setTags([]);
                }
            } catch (error) {
                message.error('Failed to fetch tags');
                setTags([]);
            }
        };
    
        fetchTags();
    }, []);

    const handleTagChange = (tags: any) => {
        console.log(tags);
        setSelectedTags(tags);
    };
    
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleFileListChange = async (info: any) => {
        const updatedFileList = await Promise.all(
            info.fileList.map(async (file: any) => {
                if (file.originFileObj) {
                    const fileUrl = await getBase64(file.originFileObj);
                    return {
                        uid: file.uid,
                        name: file.name,
                        status: file.status,
                        url: fileUrl,
                    }
                }
                return file;
            }),
        );

        setFileList(updatedFileList);
        console.log(updatedFileList);
    }

    const uploadButton = (
        <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    const createEvent = async (value: any) => {
        const serverUrl = `${API_URL}/api/events/create`;
        const { ExpirationTime, Description, Quantity, Tag } = value;
        const photoURLs = fileList.map(file => file.url || "");

        try {
            const response = await fetch(serverUrl, {
                method: "POST",
                body: JSON.stringify({
                    exp_time: ExpirationTime,
                    description: Description,
                    qty: Quantity,
                    tags: selectedTags,
                    photos: photoURLs,
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

                    <Form.Item label="Tag" name="Tag" rules={[{ required: true }]}>
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Select or add tags"
                            value={selectedTags}
                            onChange={handleTagChange}
                        >
                            {tags && tags.map(tag => (
                                <Select.Option key={tag.tag_id} value={tag.tag_id}>
                                    {tag.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Upload Image" name="Upload"
                        style={{ marginBottom: "5px", color: "rgb(69, 90, 100)", }}
                        rules={[{ required: false }]}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleFileListChange}
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