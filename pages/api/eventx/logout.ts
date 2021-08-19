import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import {
  IS_PROD,
} from 'appenv';

interface ILoginResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILoginResponse>,
) {
  const serializedCookie = cookie.serialize('esaas_access_token', '', {
    // 12 hour expiry
    expires: new Date(),
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
