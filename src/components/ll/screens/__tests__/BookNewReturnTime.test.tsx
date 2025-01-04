import { booking, ll, modOffer, renderResort, wdw } from '@/__fixtures__/ll';
import PlansContext from '@/contexts/PlansContext';
import { ping } from '@/ping';
import { TODAY, act, click, loading, nav, see } from '@/testing';

import BookNewReturnTime from '../BookNewReturnTime';
import BookingDetails from '../BookingDetails';
import Home from '../Home';
import SelectReturnTime from '../SelectReturnTime';

jest.mock('@/ping');
jest.useFakeTimers();
const refreshPlans = jest.fn();

async function renderComponent() {
  return renderResort(
    <PlansContext value={{ plans: [], refreshPlans, loaderElem: null }}>
      <nav.Provider>
        <BookNewReturnTime offer={modOffer} />
      </nav.Provider>
    </PlansContext>
  );
}

describe('BookNewReturnTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('books new return time', async () => {
    renderComponent();
    see(modOffer.experience.name, 'heading');
    see.time(modOffer.start.time);
    see.time(modOffer.end.time);

    click('Change');
    expect(nav.goTo).toHaveBeenCalledWith(
      <SelectReturnTime offer={modOffer} onOfferChange={expect.any(Function)} />
    );
    const { onOfferChange } = nav.goTo.mock.lastCall?.[0].props ?? {};
    expect(onOfferChange).toBeInstanceOf(Function);

    const newOffer = {
      ...modOffer,
      start: { date: TODAY, time: '12:25:00' },
      end: { date: TODAY, time: '13:25:00' },
    };
    act(() => onOfferChange(newOffer));

    click('Modify Lightning Lane');
    await loading();
    expect(ll.book).toHaveBeenCalledWith(newOffer);
    expect(refreshPlans).toHaveBeenCalledTimes(1);
    expect(nav.goBack).toHaveBeenCalledWith({ screen: Home });
    expect(nav.goTo).toHaveBeenCalledWith(
      <BookingDetails booking={booking} isNew />
    );
    expect(ping).toHaveBeenCalledWith(wdw, 'G');
  });
});
