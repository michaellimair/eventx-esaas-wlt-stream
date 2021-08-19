import { EventXEventDetail } from 'customTypes/EventX';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useEventById = (eventId?: string): { event?: EventXEventDetail, loading: boolean } => {
  const [event, setEvent] = useState<EventXEventDetail>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    axios.get<EventXEventDetail>(`/api/eventx/events/${eventId}`).then(({ data }) => {
      setEvent(data);
      setLoading(false);
    });
  }, [eventId]);

  return { event, loading };
};

export default useEventById;
