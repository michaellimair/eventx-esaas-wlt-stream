export const EVENTX_ESAAS_BASE_URL = process.env.EVENTX_ESAAS_BASE_URL ?? 'https://esaas-api.eventx.io';
export const IS_PROD = process.env.NODE_ENV === 'production';

export default {
  EVENTX_ESAAS_BASE_URL,
};
