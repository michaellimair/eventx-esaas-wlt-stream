import type { NextApiRequest, NextApiResponse } from 'next';
import addDays from 'date-fns/addDays';
import cookie from 'cookie';
import {
  IS_PROD,
} from 'appenv';
import getEsaasToken from 'libs/eventx/getEsaasToken';

interface ILoginResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILoginResponse>,
) {
  const token = await getEsaasToken(req.body.email, req.body.password);
  const serializedCookie = cookie.serialize('esaas_access_token', token, {
    // 12 hour expiry
    expires: addDays(new Date(), 1),
    secure: IS_PROD,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
  res.setHeader('Set-Cookie', serializedCookie);
  res.status(200).json({
    message: 'OK',
  });
}
