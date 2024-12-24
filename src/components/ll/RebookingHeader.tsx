import { useRebooking } from '@/contexts/Rebooking';

import Button from '../Button';
import BookingListing from './BookingListing';
import Home from './screens/Home';

export default function RebookingHeader() {
  const rebooking = useRebooking();
  if (!rebooking.current) return null;
  return (
    <div>
      <div className="-mx-3">
        <h2 className="mt-0 pb-1 text-sm">Modifying Reservation</h2>
        <div className="px-3 py-2 bg-white text-black text-base font-normal normal-case text-left">
          <BookingListing
            booking={rebooking.current}
            button={
              <Button
                type="small"
                back={rebooking.auto && { screen: Home }}
                onClick={rebooking.end}
              >
                Keep
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
