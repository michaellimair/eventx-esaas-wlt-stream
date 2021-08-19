import esaasAuthgSSP from 'middleware/esaasAuthgSSP';
import { NextPage } from 'next';

const RedirectPage: NextPage = () => null;

export const getServerSideProps = esaasAuthgSSP('/events');

export default RedirectPage;
