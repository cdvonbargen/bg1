import { useEffect, useState } from 'react';

import { Guest } from '@/api/genie';
import FloatingButton from '@/components/FloatingButton';
import GuestList from '@/components/GuestList';
import Screen from '@/components/Screen';
import { useClients } from '@/contexts/Clients';
import useDataLoader from '@/hooks/useDataLoader';
import kvdb from '@/kvdb';

export const PARTY_IDS_KEY = ['bg1', 'genie', 'partyIds'];

export function loadPartyIds(): string[] {
  const partyIds = kvdb.get(PARTY_IDS_KEY) ?? [];
  return Array.isArray(partyIds) ? partyIds : [];
}

export function useSelectedParty() {
  const { ll } = useClients();
  useEffect(() => ll.setPartyIds(loadPartyIds()), [ll]);
}

export default function PartySelector() {
  const { ll } = useClients();
  const { loadData, loaderElem } = useDataLoader();
  const [auto, setAuto] = useState(true);
  const [guests, setGuests] = useState<Guest[]>();
  const [partyIds, setPartyIds] = useState<Set<string>>(() => {
    const partyIds = new Set(loadPartyIds());
    setAuto(partyIds.size === 0);
    return partyIds;
  });

  function save() {
    const pids = [...partyIds];
    kvdb.set<string[]>(PARTY_IDS_KEY, pids);
    ll.setPartyIds(pids);
  }

  useEffect(() => {
    loadData(async () => {
      const guests = await ll.guests();
      setGuests(
        [...guests.eligible, ...guests.ineligible].sort(
          (a, b) => +!a.primary - +!b.primary || a.name.localeCompare(b.name)
        )
      );
    });
  }, [ll, loadData]);

  useEffect(() => {
    if (auto) setPartyIds(new Set());
  }, [auto]);

  const partyGuests = guests?.filter(g => partyIds.has(g.id));
  const nonpartyGuests = guests?.filter(g => !partyIds.has(g.id));

  const Mode = (props: { auto: boolean; children: string }) => (
    <li>
      <label className="flex items-center mt-2">
        <input
          type="radio"
          name="auto"
          onChange={() => setAuto(props.auto)}
          checked={auto === props.auto}
          className="mr-2"
        />{' '}
        {props.children}
      </label>
    </li>
  );

  return (
    <Screen title="Party Selection">
      <p>
        By default, all eligible guests (up to a maximum of 12) are
        automatically selected when you book a Lightning Lane. If you would like
        to limit who you book for, you can manually select your party here.
      </p>
      <ul>
        <Mode auto={true}>Book for all eligible guests</Mode>
        <Mode auto={false}>Only book for selected guests</Mode>
      </ul>

      {auto ? null : guests?.length === 0 ? (
        <p className="text-red-700">No guests to select</p>
      ) : partyGuests && nonpartyGuests ? (
        <>
          {partyGuests.length > 0 && (
            <>
              <h3>Your Party</h3>
              <GuestList
                guests={partyGuests}
                selectable={{
                  isSelected: () => true,
                  onToggle: g => {
                    const newPartyIds = new Set(partyIds);
                    newPartyIds.delete(g.id);
                    setPartyIds(newPartyIds);
                  },
                }}
              />
            </>
          )}
          {nonpartyGuests.length > 0 && (
            <>
              <h3>Add to Your Party</h3>
              <GuestList
                guests={nonpartyGuests}
                selectable={{
                  isSelected: () => false,
                  onToggle: g => {
                    const newPartyIds = new Set(partyIds);
                    newPartyIds.add(g.id);
                    setPartyIds(newPartyIds);
                  },
                }}
              />
            </>
          )}
        </>
      ) : null}
      {loaderElem}
      <FloatingButton
        back
        disabled={!auto && partyIds.size === 0}
        onClick={save}
      >
        Save
      </FloatingButton>
    </Screen>
  );
}
