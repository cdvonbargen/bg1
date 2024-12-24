import { bookings } from '@/__fixtures__/ll';
import { Booking } from '@/api/itinerary';
import { PlansContext } from '@/contexts/Plans';
import { displayTime, parkDate } from '@/datetime';
import { TODAY, render, screen, see, setTime, within } from '@/testing';

import YourDay from '../YourDay';

jest.mock('@/contexts/Nav');
setTime('09:00');
const refreshPlans = jest.fn();

function renderComponent(plans: Booking[] = bookings, unmodifiable = false) {
  render(
    <PlansContext.Provider value={{ plans, refreshPlans, loaderElem: null }}>
      <YourDay date={TODAY} unmodifiable={unmodifiable} />
    </PlansContext.Provider>
  );
}

describe('YourDay', () => {
  it('shows plans for specified date', async () => {
    renderComponent();

    const planLIs = await screen.findAllByRole('listitem');
    bookings
      .filter(b => b.type !== 'APR' && parkDate(b.start) === TODAY)
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
        if (booking.modifiable) {
          inLI.getByRole('button', { name: 'Modify' });
        }
      });
  });

  it("doesn't show Modify buttons if unmodifiable", async () => {
    renderComponent(bookings, true);
    see.no('Modify');
  });

  it('shows "No existing plans" message if no plans', async () => {
    renderComponent([]);
    see('No existing plans');
  });
});
