import { EventXWebinarSession } from 'customTypes/EventX';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useWebinarsByEventId = (eventId?: string): {
  webinars?: EventXWebinarSession[];
  loading: boolean;
} => {
  const [webinars, setWebinars] = useState<EventXWebinarSession[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    axios.get<EventXWebinarSession[]>(`/api/eventx/events/${eventId}/webinars`).then(({ data }) => {
      setWebinars(data);
      setLoading(false);
    });
  }, [eventId]);

  return { webinars, loading };
};

export default useWebinarsByEventId;
