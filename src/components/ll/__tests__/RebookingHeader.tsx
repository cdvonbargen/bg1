import { booking } from '@/__fixtures__/ll';
import { useNav } from '@/contexts/Nav';
import { RebookingContext } from '@/contexts/Rebooking';
import { click, render, see, setTime, waitFor } from '@/testing';

import RebookingHeader from '../RebookingHeader';
import Home from '../screens/Home';

jest.mock('@/contexts/Nav');
setTime('10:00');

const rebooking = {
  begin: () => null,
  end: jest.fn(),
  auto: false,
  current: booking as typeof booking | undefined,
};

function Test({ auto }: { auto?: boolean }) {
  return (
    <RebookingContext.Provider value={{ ...rebooking, auto: !!auto }}>
      <RebookingHeader />
    </RebookingContext.Provider>
  );
}

describe('RebookingHeader', () => {
  const { goBack } = useNav();

  beforeEach(() => {
    rebooking.current = booking;
  });

  it('shows LL to be modified', async () => {
    render(<Test />);
    see(booking.name);
    see.time(booking.start.time as string);
    see.time(booking.end.time as string);
    click('Keep');
    expect(rebooking.end).toHaveBeenCalledTimes(1);
    expect(goBack).not.toHaveBeenCalled();
  });

  it('shows nothing if not modifying', async () => {
    rebooking.current = undefined;
    const { container } = render(<Test />);
    expect(container).toBeEmptyDOMElement();
  });

  it('goes back to Home screen if auto rebooking', async () => {
    render(<Test auto />);
    click('Keep');
    await waitFor(() => expect(goBack).toHaveBeenCalledTimes(1));
    expect(goBack).toHaveBeenLastCalledWith({ screen: Home });
  });
});
