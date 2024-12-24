import { Booking, isType } from '@/api/itinerary';
import { useBookingDate } from '@/contexts/BookingDate';
import { useClients } from '@/contexts/Clients';
import { NavError, useNav } from '@/contexts/Nav';
import { usePark } from '@/contexts/Park';
import { useRebooking } from '@/contexts/Rebooking';
import { parkDate } from '@/datetime';

import Button from '../Button';
import BookExperience from './screens/BookExperience';
import Home from './screens/Home';

type Props = Parameters<typeof Button>[0] & {
  booking: Booking;
};

export default function ModifyButton({ booking, ...buttonProps }: Props) {
  const { ll } = useClients();
  const { goBack } = useNav();
  const { park, setPark } = usePark();
  const { setBookingDate } = useBookingDate();
  const rebooking = useRebooking();

  const goHome = () => goBack({ screen: Home, props: { tabName: 'LL' } });

  return booking.modifiable &&
    !rebooking.auto &&
    isType(booking, 'LL', 'MP') ? (
    <Button
      {...buttonProps}
      onClick={async () => {
        rebooking.begin(booking);
        const today = parkDate();
        const newDate = parkDate(booking.start);
        setBookingDate(newDate);
        if (!ll.rules.parkModify || newDate > today) {
          setPark(booking.park);
          if (park !== booking.park) return goHome();
        }
        try {
          await goBack({ screen: BookExperience });
        } catch (error) {
          if (!(error instanceof NavError)) throw error;
          await goHome();
        }
      }}
    >
      Modify
    </Button>
  ) : null;
}
