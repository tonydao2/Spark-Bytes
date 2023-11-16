import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_URL } from "@/common/constants";
import { Card, Descriptions } from 'antd'

import { useAuth } from "@/contexts/AuthContext";


export default function eventId() {
    // expands the url and its query 
    const router = useRouter()
    const { getAuthState, authState } = useAuth();
    const { event_id } = router.query


    // fetches data from the api and store it in a variable 
    const [event, setEvent] = useState({})


    useEffect(() => {
        // function used to fetch data 
        const fetchData = async () => {
            console.log(router.query)
            console.log(event_id)
            try {
                const response = await fetch(`${API_URL}/api/events/${event_id}`, {
                    headers: {
                        Authorization: `Bearer ${getAuthState()?.token}`,
                    },
                })

                console.log(response)
                if (response.ok) {
                    const data = await response.json()
                    setEvent(data)

                } else {
                    // add error checking 
                    console.log('error')
                }
            } catch (err) {
                // add error checking 
                console.log(err)
            }
        }

        fetchData()

    }, [])




    // create a class that prints out the information fetched
    return (
        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card title="Event Title" style={{ margin: "20px", textAlign: "center", maxWidth: '60%', }}>
                <p style={{ textAlign: "center" }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus placeat maiores facilis suscipit, architecto tempore culpa qui voluptas fugiat minima officiis odit quod sunt, dolorum in quo nostrum quae molestias?</p>
                <Descriptions>
                    <Descriptions.Item label="Quantity">1</Descriptions.Item>
                    <Descriptions.Item label="Expiration Time">1/1/11</Descriptions.Item>
                    <Descriptions.Item label="Tags">Hi</Descriptions.Item>
                </Descriptions>

            </Card>
        </div >

    )
}