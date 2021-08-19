import { EventXOrganizerEvent } from 'customTypes/EventX';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useOrganizerEvents = (): {
  events?: EventXOrganizerEvent[];
  loading: boolean;
} => {
  const [events, setEvents] = useState<EventXOrganizerEvent[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios.get<EventXOrganizerEvent[]>('/api/eventx/events').then(({ data }) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  return {
    events,
    loading,
  };
};

export default useOrganizerEvents;
