import { AgoraTokenConfig } from 'customTypes/AgoraToken';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useAgoraTokenConfig = (eventId?: string, webinarId?: string): AgoraTokenConfig | null => {
  const [tokenConfig, setTokenConfig] = useState<AgoraTokenConfig | null>(null);

  useEffect(() => {
    if (!eventId || !webinarId) {
      return;
    }

    axios.get<AgoraTokenConfig>(`/api/eventx/events/${eventId}/webinars/${webinarId}/wltTokens`).then(({ data }) => {
      setTokenConfig(data);
    });
  }, [eventId, webinarId]);

  return tokenConfig;
};

export default useAgoraTokenConfig;
