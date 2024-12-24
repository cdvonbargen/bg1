import { bg, booking, multiExp } from '@/__fixtures__/ll';
import { ak, ll, renderResort } from '@/__fixtures__/resort';
import { Booking } from '@/api/itinerary';
import { Park } from '@/api/resort';
import { BookingDateContext } from '@/contexts/BookingDate';
import { NavError, useNav } from '@/contexts/Nav';
import { ParkContext } from '@/contexts/Park';
import { Rebooking, RebookingContext } from '@/contexts/Rebooking';
import {
  TODAY,
  TOMORROW,
  click,
  render,
  see,
  setTime,
  waitFor,
} from '@/testing';

import ModifyButton from '../ModifyButton';
import BookExperience from '../screens/BookExperience';
import Home from '../screens/Home';

jest.mock('@/contexts/Nav');
setTime('10:00');

const setBookingDate = jest.fn();
const setPark = jest.fn();
const rebooking: Rebooking = {
  begin: jest.fn(),
  end: jest.fn(),
  current: undefined,
  auto: false,
};

function ModifyButtonTest({
  booking: b = booking,
  bookingDate = TODAY,
  park,
  auto = false,
}: {
  booking?: Booking;
  bookingDate?: string;
  park?: Park;
  auto?: boolean;
}) {
  park ??= b.park;
  return (
    <BookingDateContext.Provider value={{ bookingDate, setBookingDate }}>
      <ParkContext.Provider value={{ park, setPark }}>
        <RebookingContext.Provider
          value={{ ...rebooking, current: auto ? booking : undefined, auto }}
        >
          <ModifyButton booking={b} />
        </RebookingContext.Provider>
      </ParkContext.Provider>
    </BookingDateContext.Provider>
  );
}

const home = { screen: Home, props: { tabName: 'LL' } };
const bookExp = { screen: BookExperience };

describe('ModifyButton', () => {
  const { goBack } = useNav();

  beforeEach(() => {
    jest.clearAllMocks();
    ll.rules.parkModify = true;
  });

  it('goes back to BookExperience if booking in current park', async () => {
    renderResort(<ModifyButtonTest />);
    click('Modify');
    expect(rebooking.begin).toHaveBeenCalledWith(booking);
    expect(goBack).toHaveBeenCalledWith(bookExp);
  });

  it('goes Home if no previous BookExperience screen', async () => {
    jest.mocked(goBack).mockRejectedValueOnce(new NavError());
    renderResort(<ModifyButtonTest />);
    click('Modify');
    expect(goBack).toHaveBeenCalledWith(bookExp);
    await waitFor(() => expect(goBack).toHaveBeenLastCalledWith(home));
  });

  it('goes Home if booking not in current park and bookingDate not today', async () => {
    renderResort(
      <ModifyButtonTest
        booking={{
          ...booking,
          start: { date: TOMORROW, time: '10:00:00' },
          end: { date: TOMORROW, time: '11:00:00' },
        }}
        park={ak}
      />
    );
    click('Modify');
    expect(setBookingDate).toHaveBeenCalledWith(TOMORROW);
    expect(setPark).toHaveBeenCalledWith(booking.park);
    expect(goBack).toHaveBeenCalledWith(home);
  });

  it('goes Home if booking not in current park and no parkModify', async () => {
    ll.rules.parkModify = false;
    renderResort(<ModifyButtonTest park={ak} />);
    click('Modify');
    expect(setPark).toHaveBeenCalledWith(booking.park);
    expect(goBack).toHaveBeenCalledWith(home);
  });

  it("doesn't show Modify button when auto rebooking or not a modifiable LL", async () => {
    renderResort(<ModifyButtonTest auto />);
    see.no('Modify');
    render(<ModifyButtonTest booking={bg} />);
    see.no('Modify');
    render(<ModifyButtonTest booking={multiExp} />);
    see.no('Modify');
  });
});
