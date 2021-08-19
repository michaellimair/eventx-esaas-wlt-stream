import { GetServerSideProps } from 'next';
import nookies from 'nookies';

const esaasAuthgSSP: (successRedirect?: string) => GetServerSideProps<{}> = (
  successRedirect?: string,
) => async (ctx) => {
  const cookies = nookies.get(ctx);
  const esaasToken = cookies.esaas_access_token;

  if (!esaasToken) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  return {
    props: {},
    redirect: successRedirect ? {
      permanent: false,
      destination: successRedirect,
    } : undefined,
  };
};

export default esaasAuthgSSP;
