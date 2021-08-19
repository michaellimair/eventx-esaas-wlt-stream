import { Paper } from '@material-ui/core';
import BackNavigation from 'components/BackNavigation';
import StickyAppBar from 'components/StickyAppBar';
import TEDxFooter from 'components/TEDxFooter';
import { EventXWebinarType } from 'customTypes/EventX';
import useEventById from 'hooks/useEventById';
import useWebinarsByEventId from 'hooks/useWebinarsByEventId';
import esaasAuthgSSP from 'middleware/esaasAuthgSSP';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

const EventDetailPage: NextPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const { event, loading: loadingEvent } = useEventById(eventId as string);
  const { webinars, loading: loadingWebinars } = useWebinarsByEventId(eventId as string);

  if (loadingEvent || loadingWebinars) {
    return (
      <>
        <StickyAppBar />
        <main style={{ padding: 16 }}>
          <BackNavigation href="/events" label="< Back to All Events" />
          <div>Loading Event...</div>
        </main>
      </>
    );
  }

  if (!event || !webinars) {
    return (
      <>
        <StickyAppBar />
        <main style={{ padding: 16 }}>
          <BackNavigation href="/events" label="< Back to All Events" />
          <div>Unable to load event.</div>

        </main>

      </>
    );
  }

  return (
    <>
      <StickyAppBar />
      <main style={{ padding: 16 }}>
        <BackNavigation href="/events" label="< Back to All Events" />
        <h1 style={{ textAlign: 'center' }}>
          {event.name}
        </h1>
        <Paper style={{ margin: '16px 0', padding: '8px 16px' }}>
          <h2>Event Info</h2>
          <p>{`Start Time: ${new Date(event.startsAt).toLocaleString()}`}</p>
          <p>{`End Time: ${new Date(event.endsAt).toLocaleString()}`}</p>
          <p>{`Published: ${event.isPublished ? 'Yes' : 'No'}`}</p>
        </Paper>
        <Paper style={{ margin: '16px 0', padding: '8px 16px' }}>
          <h2>Webinars</h2>
          <div>
            <hr />
            {webinars ? (webinars.map((webinar) => (
              <div key={webinar.id}>
                <h3>{webinar.name}</h3>
                <p>{`Start Time: ${new Date(webinar.startsAt).toLocaleString()}`}</p>
                <p>{`End Time: ${new Date(webinar.endsAt).toLocaleString()}`}</p>
                <p>{`Type: ${webinar.webinarType}`}</p>
                {webinar.webinarType === EventXWebinarType.WLT && (
                <Link passHref href={`/events/${eventId}/webinars/${webinar.id}/stream`}>
                  <button type="button">Stream Webinar</button>
                </Link>
                )}
                <hr />
              </div>
            ))) : '-'}
          </div>
        </Paper>
      </main>
      <TEDxFooter />
    </>
  );
};

export default EventDetailPage;

export const getServerSideProps = esaasAuthgSSP();
