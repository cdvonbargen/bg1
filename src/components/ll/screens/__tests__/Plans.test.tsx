import { ak, booking, bookings, ep, hs, mk } from '@/__fixtures__/ll';
import { Booking } from '@/api/itinerary';
import PlansContext from '@/contexts/PlansContext';
import { displayTime } from '@/datetime';
import { click, nav, render, screen, see, setTime, within } from '@/testing';

import BookingDetails from '../BookingDetails';
import Plans from '../Plans';

setTime('09:00');
const refreshPlans = jest.fn();
const { Provider: NavProvider, goTo } = nav;

function renderComponent(plans: Booking[]) {
  render(
    <PlansContext value={{ plans, refreshPlans, loaderElem: null }}>
      <NavProvider>
        <Plans />
      </NavProvider>
    </PlansContext>
  );
}

describe('Plans', () => {
  it('shows reservations', async () => {
    renderComponent(bookings);

    click('Refresh Plans');
    expect(refreshPlans).toHaveBeenCalledTimes(1);

    const planLIs = (await screen.findAllByRole('listitem')).filter(li =>
      li.classList.contains('border-t-4')
    );
    see('Today, October 1');
    bookings
      .filter(b => b.type !== 'APR')
      .forEach((booking, i) => {
        const inLI = within(planLIs[i]);
        inLI.getByText(booking.choices ? 'Multiple Experiences' : booking.name);
        inLI.getByText(
          booking.type === 'BG'
            ? `BG ${booking.boardingGroup}`
            : booking.start.time
              ? displayTime(booking.start.time)
              : 'Park Open'
        );
        if (booking.type === 'LL') {
          inLI.getByText(
            booking.end?.time ? displayTime(booking.end.time) : 'Park Close'
          );
        }
      });

    screen.getByRole('listitem', { name: mk.name });
    screen.getByRole('listitem', { name: ak.name });
    expect(
      screen.queryByRole('listitem', { name: ep.name })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('listitem', { name: hs.name })
    ).not.toBeInTheDocument();

    within(see('Tomorrow, October 2').closest('li') as HTMLLIElement).getByText(
      'No existing plans'
    );
    expect(see.all('No existing plans')).toHaveLength(1);

    click(booking.name);
    expect(goTo).toHaveBeenLastCalledWith(<BookingDetails booking={booking} />);
  });

  it('shows "No existing plans" message', async () => {
    renderComponent([]);
    see('No existing plans');
  });
});
