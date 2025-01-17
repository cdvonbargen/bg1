import { use } from 'react';

import { Guest, Queue } from '@/api/vq';
import FloatingButton from '@/components/FloatingButton';
import GuestList from '@/components/GuestList';
import TimeBoard from '@/components/TimeBoard';
import ClientsContext from '@/contexts/ClientsContext';
import NavContext from '@/contexts/NavContext';
import ResortContext from '@/contexts/ResortContext';
import useDataLoader from '@/hooks/useDataLoader';
import { ping } from '@/ping';

import BGResult from './BGResult';
import QueueScreen from './QueueScreen';

export default function JoinQueue({
  queue,
  guests,
}: {
  queue: Queue;
  guests: Guest[];
}) {
  const { goTo } = use(NavContext);
  const resort = use(ResortContext);
  const { vq } = use(ClientsContext);
  const { loadData, loaderElem } = useDataLoader();

  async function joinQueue() {
    await loadData(
      async flash => {
        const q = await vq.getQueue(queue);
        if (!q.isAcceptingJoins) {
          return flash(
            q.isAcceptingPartyCreation
              ? 'Queue not open yet'
              : 'No boarding groups available'
          );
        }
        const result = await vq.joinQueue(queue, guests);
        goTo(<BGResult queue={queue} guests={guests} result={result} />, {
          replace: true,
        });
        if (result.boardingGroup !== null) ping(resort, 'V');
      },
      { minLoadTime: 999 }
    );
  }

  return (
    <QueueScreen queue={queue} title="Virtual Queue">
      {queue.isAcceptingJoins ? (
        <p>The virtual queue is open. Join now!</p>
      ) : queue.nextScheduledOpenTime ? (
        <>
          <TimeBoard
            time={queue.nextScheduledOpenTime}
            label="Next queue opening"
          />
          <p>
            Tap the <b>Join Virtual Queue</b> button when the clock reads{' '}
            <time className="font-semibold">{queue.nextScheduledOpenTime}</time>
            . The queue can fill up almost instantly, so be quick!
          </p>
        </>
      ) : null}
      <h3>Your Party</h3>
      <GuestList guests={guests} />
      <FloatingButton onClick={joinQueue}>Join Virtual Queue</FloatingButton>
      {loaderElem}
    </QueueScreen>
  );
}
