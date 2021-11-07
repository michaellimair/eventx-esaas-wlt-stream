import { useEffect, useState } from 'react';
import axios from 'axios';
import { EventXWebinarSessionMeta } from 'customTypes/EventX';

const useWltSession = (eventId?: string, webinarId?: string): {
  meta: EventXWebinarSessionMeta | null;
  start: () => Promise<void>;
  end: () => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
} => {
  const [meta, setMeta] = useState<EventXWebinarSessionMeta | null>(null);

  useEffect(() => {
    if (!eventId || !webinarId) {
      return;
    }

    axios.get<EventXWebinarSessionMeta>(`/api/eventx/events/${eventId}/webinars/${webinarId}`).then(({ data }) => {
      setMeta(data);
    });
  }, [eventId, webinarId]);

  const start = () => axios.post<EventXWebinarSessionMeta>(`/api/eventx/events/${eventId}/webinars/${webinarId}/start`).then(({ data }) => {
    setMeta(data);
  });

  const end = () => axios.post<EventXWebinarSessionMeta>(`/api/eventx/events/${eventId}/webinars/${webinarId}/end`).then(({ data }) => {
    setMeta(data);
  });

  const pause = () => axios.post<EventXWebinarSessionMeta>(`/api/eventx/events/${eventId}/webinars/${webinarId}/pause`).then(({ data }) => {
    setMeta(data);
  });

  const resume = () => axios.post<EventXWebinarSessionMeta>(`/api/eventx/events/${eventId}/webinars/${webinarId}/resume`).then(({ data }) => {
    setMeta(data);
  });

  return {
    meta,
    start,
    end,
    pause,
    resume,
  };
};

export default useWltSession;
