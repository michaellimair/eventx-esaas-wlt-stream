import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { AgoraTokenConfig } from 'customTypes/AgoraToken';
import {
  EVENTX_ESAAS_BASE_URL,
} from 'appenv';
import nookies from 'nookies';
import { EventXWebinarSessionDetail } from 'customTypes/EventX';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AgoraTokenConfig>,
) {
  const { eventId, webinarId } = req.query;
  const webinarDetailUrl = `${EVENTX_ESAAS_BASE_URL}/events/${eventId}/webinar-sessions/${webinarId}`;
  const cookies = nookies.get({
    req,
  });
  const webinarResp = await axios.get<EventXWebinarSessionDetail>(webinarDetailUrl, {
    headers: {
      cookie: `esaas_access_token=${cookies.esaas_access_token ?? ''}`,
    },
  });
  const tokenUrl = `${EVENTX_ESAAS_BASE_URL}/events/${eventId}/wlt-sessions/${webinarResp.data.wltSessionId}/tokens`;
  const resp = await axios.get<AgoraTokenConfig>(tokenUrl, {
    headers: {
      cookie: `esaas_access_token=${cookies.esaas_access_token ?? ''}`,
    },
  });
  res.status(200).json(resp.data);
}
