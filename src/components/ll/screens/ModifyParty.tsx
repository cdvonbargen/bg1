import { use, useState } from 'react';

import FloatingButton from '@/components/FloatingButton';
import GuestList, { Guest } from '@/components/GuestList';
import Screen from '@/components/Screen';
import ClientsContext from '@/contexts/ClientsContext';
import PartyContext, { Party } from '@/contexts/PartyContext';

import IneligibleGuestList from '../IneligibleGuestList';

export default function ModifyParty({ party }: { party: Party }) {
  const { eligible, ineligible, selected, experience } = party;
  const [newParty, setNewParty] = useState<Set<Guest>>(new Set(selected));
  const { maxPartySize } = use(ClientsContext).ll.rules;

  function toggleGuest(guest: Guest) {
    newParty[newParty.has(guest) ? 'delete' : 'add'](guest);
    setNewParty(new Set(newParty));
  }

  return (
    <PartyContext value={party}>
      <Screen title="Modify Party" theme={experience.park.theme}>
        <h2>{experience.name}</h2>
        <div>{experience.park.name}</div>
        <h3>Your Party</h3>
        <GuestList
          guests={eligible}
          selectable={{
            isSelected: g => newParty.has(g),
            onToggle: toggleGuest,
            limit: maxPartySize,
          }}
        />
        {ineligible.length > 0 && (
          <>
            <h3>Ineligible Guests</h3>
            <IneligibleGuestList />
          </>
        )}
        <FloatingButton
          back
          disabled={newParty.size === 0}
          onClick={() => {
            party.setSelected(eligible.filter(g => newParty.has(g)));
          }}
        >
          Confirm Party
        </FloatingButton>
      </Screen>
    </PartyContext>
  );
}
