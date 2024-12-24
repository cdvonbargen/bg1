import { booking, ll, modOffer, renderResort, times } from '@/__fixtures__/ll';
import { useNav } from '@/contexts/Nav';
import { displayTime } from '@/datetime';
import { click, loading, see, waitFor } from '@/testing';

import BookNewReturnTime from '../BookNewReturnTime';
import ChangeBookingTime from '../ChangeBookingTime';

jest.mock('@/contexts/Nav');
ll.offer.mockResolvedValue(modOffer);
jest.useFakeTimers();

describe('ChangeBookingTime', () => {
  const { goTo } = useNav();

  it('allows changing booking return time', async () => {
    renderResort(<ChangeBookingTime booking={booking} />);
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
