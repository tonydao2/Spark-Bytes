// Import necessary dependencies and components
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_URL } from "@/common/constants";
import { Card, Descriptions, Image } from 'antd';
import { useAuth } from "@/contexts/AuthContext";

// Define the EventId component
const EventId = () => {
  const router = useRouter();
  const { getAuthState } = useAuth();
  const { event_id } = router.query;

  // Use 'any' for now, you might want to create a proper type for 'event'
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events/${event_id}`, {
          headers: {
            Authorization: `Bearer ${getAuthState()?.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else {
          console.log('error');
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [event_id, getAuthState]);

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const resDate = `${newDate.toLocaleDateString()} `;
    return resDate;
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  // Type guard to ensure 'event' is not 'never'
  if ('description' in event) {
    return (
      <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: 'rgb(234, 247, 240)', }}>
        <Card title={event_id} style={{ margin: "20px", textAlign: "center", maxWidth: '60%', borderRadius: "3rem" }}>


          <p style={{ textAlign: "center" }}>{event.description}</p>
          {event.photos.length > 0 && <Image width={200} src={event.photos[0]} />}
          <div>

            <Descriptions style={{ display: 'flex', justifyContent: "center", alignItems: "center", textAlign: 'center' }}>
              <Descriptions.Item label="Event Created By">{event.createdBy.name}</Descriptions.Item>

              <Descriptions.Item label="Event Created At">{formatDate(event.createdAt)}</Descriptions.Item>
              <Descriptions.Item label="Location">{event.location.Address}, Floor {event.location.floor}, Room: {event.location.room} </Descriptions.Item> 
            </Descriptions>

            <Descriptions>
              <Descriptions.Item label="Quantity">{event.qty}</Descriptions.Item>
              <Descriptions.Item label="Expiration Time">{formatDate(event.exp_time)}</Descriptions.Item>
              <Descriptions.Item label="Tags">{event.tags.length > 0 ? event.tags.join(",'") : 'n/a'}</Descriptions.Item>
            </Descriptions>
          </div>
        </Card>
      </div>
    );
  }

  return <div>Error: Event does not have a description.</div>;
};

export default EventId;
