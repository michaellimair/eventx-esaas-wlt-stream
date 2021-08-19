import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import {
  EVENTX_ESAAS_BASE_URL,
} from 'appenv';
import nookies from 'nookies';
import { EventXOrganizerEvent } from 'customTypes/EventX';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventXOrganizerEvent[]>,
) {
  const tokenUrl = `${EVENTX_ESAAS_BASE_URL}/organizers/orgs/events`;
  const cookies = nookies.get({
    req,
  });
  const resp = await axios.get<{ results: EventXOrganizerEvent[] }>(tokenUrl, {
    headers: {
      cookie: `esaas_access_token=${cookies.esaas_access_token ?? ''}`,
    },
  });
  res.status(200).json(resp.data.results);
}
