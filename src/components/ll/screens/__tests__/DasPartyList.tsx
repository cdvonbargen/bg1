import {
  booking,
  itinerary,
  mickey,
  minnie,
  mk,
  party,
  renderResort,
} from '@/__fixtures__/das';
import { DasBooking, DasParty } from '@/api/das';
import { useNav } from '@/contexts/Nav';
import { ParkContext } from '@/contexts/Park';
import { PlansProvider } from '@/contexts/Plans';
import { click, loading, see, setTime } from '@/testing';

import BookingDetails from '../BookingDetails';
import DasPartyList from '../DasPartyList';
import DasSelection from '../DasSelection';

jest.mock('@/contexts/Nav');

const donald = {
  id: 'donald',
  name: 'Donald Duck',
};

const daisy = {
  id: 'daisy',
  name: 'Daisy Duck',
};

const duckParty = {
  primaryGuest: daisy,
  linkedGuests: [donald],
  selectionLimit: 4,
};
const parties: DasParty[] = [party, duckParty];

function DasPartyListTest({ parties }: { parties: DasParty[] }) {
  return (
    <ParkContext.Provider value={{ park: mk, setPark: jest.fn() }}>
      <PlansProvider>
        <DasPartyList parties={parties} />
      </PlansProvider>
    </ParkContext.Provider>
  );
}

async function renderComponent(parties: DasParty[], plans: DasBooking[]) {
  jest.spyOn(itinerary, 'plans').mockResolvedValue(plans);
  renderResort(<DasPartyListTest parties={parties} />);
  await loading();
}

describe('DasPartyList', () => {
  const { goTo } = useNav();

  beforeEach(() => {
    jest.clearAllMocks();
    setTime('10:00');
  });

  it('shows DAS selection details if active selection', async () => {
    await renderComponent([party], [booking]);
    see('Your DAS Selection');
    see(mickey.name);
    see(minnie.name);
    expect(itinerary.plans).toHaveBeenCalledTimes(1);
  });

  it('shows DAS booking screen if no active selection', async () => {
    await renderComponent([party], []);
    see('DAS Selection');
    see(mickey.name);
    see(minnie.name);
  });

  it('shows party list if multiple DAS parties', async () => {
    await renderComponent(parties, [booking]);
    see(mickey.name);
    see(daisy.name);

    click('Select');
    expect(goTo).toHaveBeenCalledWith(
      <DasSelection park={mk} party={duckParty} />
    );

    click('Details');
    expect(goTo).toHaveBeenCalledWith(<BookingDetails booking={booking} />);
  });
});
