import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_URL } from "@/common/constants";
import { Card, Descriptions, Image } from 'antd'

import { useAuth } from "@/contexts/AuthContext";


export default function eventId() {
    // expands the url and its query 
    const router = useRouter()
    const { getAuthState, authState } = useAuth();
    const { event_id } = router.query



    // fetches data from the api and store it in a variable 
    const [event, setEvent] = useState(null)


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
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    setEvent(data)
                    { event && console.log(event) }

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

    }, [event_id, getAuthState])

    const formatDate = (date: string) => {
        const newDate = new Date(date);
        const resDate = `${newDate.toLocaleDateString()} `
        return resDate
    }




    // create a class that prints out the information fetched
    return (
        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card title={event && event_id} style={{ margin: "20px", textAlign: "center", maxWidth: '60%', }}>
                <p style={{ textAlign: "center" }}>{event && event.description}</p>
                {event && event.photos.length > 0 && <Image width={200} src={event.photos[0]} />}
                <div>
                    <Descriptions>
                        <Descriptions.Item label="Event Created By">{event && event.createdBy.name}</Descriptions.Item>
                        <Descriptions.Item label="Event Created At">{event && formatDate(event.createdAt)}</Descriptions.Item>
                    </Descriptions>

                    <Descriptions>
                        <Descriptions.Item label="Quantity">{event && event.qty}</Descriptions.Item>
                        <Descriptions.Item label="Expiration Time">{event && formatDate(event.exp_time)}</Descriptions.Item>
                        <Descriptions.Item label="Tags">{event && event.tags.length > 0 ? event.tags.join(",'") : 'n/a'}
                        </Descriptions.Item>
                    </Descriptions>
                </div>


            </Card>
        </div >

    )
}