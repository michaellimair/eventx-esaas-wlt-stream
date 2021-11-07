import dynamic from 'next/dynamic';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import esaasAuthgSSP from 'middleware/esaasAuthgSSP';
import { useRouter } from 'next/router';
import styles from 'styles/Home.module.css';
import StickyAppBar from 'components/StickyAppBar';
import TEDxFooter from 'components/TEDxFooter';
import BackNavigation from 'components/BackNavigation';
import SessionManagement from 'components/SessionManagement';

const AgoraPreview = dynamic(() => import('components/AgoraPreview'), { ssr: false });

export const getServerSideProps = esaasAuthgSSP();

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const router = useRouter();
  const { eventId, webinarId } = router.query;

  return (
    <>
      <Head>
        <title>Stream Event</title>
      </Head>
      <StickyAppBar />
      <div style={{ margin: 16 }}>
        <BackNavigation href={`/events/${eventId}`} label="< Back to Event" />

        <main style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <h1 className={styles.title}>
            Stream Event (WLT)
          </h1>
          <SessionManagement eventId={eventId as string} webinarId={webinarId as string} />
          <AgoraPreview eventId={eventId as string} webinarId={webinarId as string} />
        </main>

      </div>
      <TEDxFooter />
    </>
  );
};

export default Home;
