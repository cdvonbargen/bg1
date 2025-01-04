import { use, useCallback, useEffect, useState } from 'react';

import { authStore } from '@/api/auth';
import { Queue } from '@/api/vq';
import Button from '@/components/Button';
import Screen from '@/components/Screen';
import RefreshButton from '@/components/ll/screens/RefreshButton';
import ClientsContext from '@/contexts/ClientsContext';
import NavContext from '@/contexts/NavContext';
import ThemeContext from '@/contexts/ThemeContext';
import { displayTime } from '@/datetime';
import useDataLoader from '@/hooks/useDataLoader';
import onVisible from '@/onVisible';

import ChooseParty from './ChooseParty';

const isAttraction = (queue: Queue) => queue.categoryContentId === 'attraction';
const isActive = (queue: Queue) =>
  queue.isAcceptingPartyCreation || queue.isAcceptingJoins;

export default function SelectQueue() {
  const { vq } = use(ClientsContext);
  const { goTo } = use(NavContext);
  const theme = use(ThemeContext);
  const { loadData, loaderElem } = useDataLoader();
  const [queues, setQueues] = useState<Queue[]>();

  const refreshQueues = useCallback(() => {
    loadData(async () => {
      setQueues(
        (await vq.getQueues()).sort(
          (a, b) =>
            +isActive(b) - +isActive(a) || +isAttraction(b) - +isAttraction(a)
        )
      );
    });
  }, [vq, loadData]);

  useEffect(() => {
    refreshQueues();
    return onVisible(refreshQueues);
  }, [refreshQueues]);

  return (
    <Screen
      title="Virtual Queues"
      buttons={<RefreshButton name="Queues" onClick={refreshQueues} />}
      footer={
        <div className="p-2 text-right">
          <Button
            className={`bg-opacity-90 bg-white ${theme.text}`}
            onClick={() => authStore.deleteData()}
          >
            Log Out
          </Button>
        </div>
      }
    >
      {!queues ? null : queues.length > 0 ? (
        <ul className="mt-1">
          {queues.map(q => (
            <li
              key={q.id}
              className="py-3 first:border-0 border-t-4 border-gray-300"
            >
              <h2 className="mt-0">{q.name}</h2>
              <div className="flex items-center mt-2">
                <div className="flex-1">
                  {q.isAcceptingJoins ? (
                    <span>Available now</span>
                  ) : q.nextScheduledOpenTime ? (
                    <>
                      Next opening:{' '}
                      <time
                        dateTime={q.nextScheduledOpenTime}
                        className="font-semibold"
                      >
                        {displayTime(q.nextScheduledOpenTime)}
                      </time>
                    </>
                  ) : (
                    'No more openings today'
                  )}
                </div>
                <div className="pl-3">
                  <Button
                    disabled={!isActive(q)}
                    onClick={() => goTo(<ChooseParty queue={q} />)}
                  >
                    {isActive(q) ? 'Join Queue' : 'Closed'}
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !loaderElem && (
          <p className="text-gray-500 font-semibold text-center uppercase">
            No virtual queues found
          </p>
        )
      )}
      {loaderElem}
    </Screen>
  );
}
