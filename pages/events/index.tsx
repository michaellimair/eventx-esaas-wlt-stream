import StickyAppBar from 'components/StickyAppBar';
import TEDxFooter from 'components/TEDxFooter';
import useOrganizerEvents from 'hooks/useOrganizerEvents';
import esaasAuthgSSP from 'middleware/esaasAuthgSSP';
import Link from 'next/link';
import { FC } from 'react';

const EventsPage: FC = () => {
  const { events: organizerEvents, loading } = useOrganizerEvents();

  return (
    <>
      <StickyAppBar />
      <main style={{ padding: 16 }}>
        <h1 style={{ textAlign: 'center' }}>Organizer Events</h1>
        {loading ? (
          <div>
            Loading...
          </div>
        ) : organizerEvents && organizerEvents.map(({ organization, events }) => (
          <div key={organization.id}>
            <h2>{organization.name}</h2>
            {events && events.map((event) => (
              <div key={event.id}>
                <p>{event.name}</p>
                <Link href={`/events/${event.id}`} passHref>
                  <button type="button">Go To Event</button>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </main>
      <TEDxFooter />
    </>
  );
};

export default EventsPage;

export const getServerSideProps = esaasAuthgSSP();
