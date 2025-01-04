import { ll, renderResort } from '@/__fixtures__/ll';
import useSavedParty, { PARTY_IDS_KEY } from '@/hooks/useSavedParty';
import kvdb from '@/kvdb';
import { click, loading, nav, see, waitFor } from '@/testing';

import PartySelector from '../PartySelector';

jest.useFakeTimers();

const getSavedPartyIds = () => kvdb.get(PARTY_IDS_KEY);

function PartySelectorTest() {
  useSavedParty();
  return (
    <nav.Provider>
      <PartySelector />
    </nav.Provider>
  );
}

async function renderComponent() {
  renderResort(<PartySelectorTest />);
  await loading();
}

describe('PartySelector', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    kvdb.clear();
  });

  it('renders party selection screen', async () => {
    const { eligible, ineligible } = await ll.guests();
    const guests = [...eligible, ...ineligible];
    await renderComponent();
    expect(see('Book for all eligible guests', 'radio')).toBeChecked();
    expect(see('Only book for selected guests', 'radio')).not.toBeChecked();
    expect(ll.setPartyIds).toHaveBeenLastCalledWith([]);

    click('Only book for selected guests');
    see('Add to Your Party');
    see.no('Your Party');

    guests.forEach(g => click(g.name));
    see('Your Party');
    see.no('Add to Your Party');
    click(guests[0].name);
    see('Add to Your Party');

    click('Save');
    await waitFor(() => expect(nav.goBack).toHaveBeenCalled());
    const guestIds = guests.slice(1).map(g => g.id);
    expect(ll.setPartyIds).toHaveBeenLastCalledWith(guestIds);
    expect(getSavedPartyIds()).toEqual(guestIds);

    click('Book for all eligible guests');
    click('Save');
    expect(ll.setPartyIds).toHaveBeenLastCalledWith([]);
    expect(getSavedPartyIds()).toEqual([]);
  });

  it('shows "No guests to select" if no guests loaded', async () => {
    ll.guests.mockResolvedValueOnce({ eligible: [], ineligible: [] });
    await renderComponent();
    click('Only book for selected guests');
    see('No guests to select');
  });

  it('loads party IDs from localStorage', async () => {
    const guestIds = (await ll.guests()).eligible.map(g => g.id);
    kvdb.set(PARTY_IDS_KEY, guestIds);
    await renderComponent();
    expect(ll.setPartyIds).toHaveBeenLastCalledWith(guestIds);
  });

  it('ignores non-array values in localStorage', async () => {
    kvdb.set(PARTY_IDS_KEY, {});
    await renderComponent();
    expect(ll.setPartyIds).toHaveBeenLastCalledWith([]);
  });
});
