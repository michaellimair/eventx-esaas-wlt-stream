import { EVENTX_ESAAS_BASE_URL } from 'appenv';
import axios, { AxiosError } from 'axios';

const loginUrl = `${EVENTX_ESAAS_BASE_URL}/auth/login`;

const getEsaasToken = async (email: string, password: string): Promise<string> => {
  try {
    const loginResp = await axios.post(loginUrl, {
      email,
      password,
    });

    const setCookies = loginResp.headers['set-cookie']! as string[];

    const token = setCookies.find((v) => v.includes('esaas_access_token'))!.match('esaas_access_token=(.*?);')![1]!;
    return token;
  } catch (e) {
    console.error((e as AxiosError).response?.data);
    throw e;
  }
};

export default getEsaasToken;
