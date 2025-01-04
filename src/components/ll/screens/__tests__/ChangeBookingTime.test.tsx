import { booking, ll, modOffer, renderResort, times } from '@/__fixtures__/ll';
import { displayTime } from '@/datetime';
import { click, loading, nav, see, waitFor } from '@/testing';

import BookNewReturnTime from '../BookNewReturnTime';
import ChangeBookingTime from '../ChangeBookingTime';

ll.offer.mockResolvedValue(modOffer);
jest.useFakeTimers();
const { Provider: NavProvider, goTo } = nav;

describe('ChangeBookingTime', () => {
  it('allows changing booking return time', async () => {
    renderResort(
      <NavProvider>
        <ChangeBookingTime booking={booking} />
      </NavProvider>
    );
    await see.screen('Select Return Time');
    expect(ll.offer).toHaveBeenCalledWith(booking, booking.guests, { booking });
    expect(ll.offer).toHaveBeenCalledTimes(1);
    await loading();
    const newOffer = { ...modOffer, id: 'new-offer' };
    ll.changeOfferTime.mockResolvedValueOnce(newOffer);
    click(displayTime(times[1][1].startTime));
    await waitFor(() =>
      expect(goTo).toHaveBeenCalledWith(<BookNewReturnTime offer={newOffer} />)
    );
  });
});
