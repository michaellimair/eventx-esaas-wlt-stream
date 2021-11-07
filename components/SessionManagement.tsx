import { EventXWebinarSessionStatus } from 'customTypes/EventX';
import useWltSession from 'hooks/useWltSession';
import { FC } from 'react';

const SessionManagement: FC<{ eventId: string; webinarId: string; }> = ({ eventId, webinarId }: {
  eventId: string;
  webinarId: string;
}) => {
  const {
    meta,
    start,
    end,
    pause,
    resume,
  } = useWltSession(eventId, webinarId);

  return (
    <div>
      <p>{`Status: ${meta?.status ?? '-'}`}</p>
      <div>
        {meta?.status === EventXWebinarSessionStatus.PENDING && (
          <>
            <button onClick={start} type="button">Start Session</button>
          </>
        )}
        {meta?.status === EventXWebinarSessionStatus.STARTED && (
          <>
            <button onClick={pause} type="button">Pause Session</button>
            <button onClick={end} type="button">End Session</button>
          </>
        )}
        {meta?.status === EventXWebinarSessionStatus.PAUSED && (
          <>
            <button onClick={resume} type="button">Resume Session</button>
          </>
        )}
      </div>
    </div>
  );
};

export default SessionManagement;
