import { Booking } from '@/api/itinerary';
import { useNav } from '@/contexts/Nav';
import { useTheme } from '@/contexts/Theme';
import ChevronRightIcon from '@/icons/ChevronRightIcon';

import ReturnWindow from './ReturnWindow';
import BookingDetails from './screens/BookingDetails';

const DOT = <span aria-hidden>•</span>;

export default function BookingListing({
  booking,
  button,
  details,
  unmodifiable,
}: {
  booking: Booking;
  button?: React.ReactNode;
  details?: boolean;
  unmodifiable?: boolean;
}) {
  const { goTo } = useNav();
  const theme = useTheme();
  return (
    <div
      className="flex items-center gap-x-3"
      onClick={
        details
          ? () =>
              goTo(
                <BookingDetails booking={booking} unmodifiable={unmodifiable} />
              )
          : undefined
      }
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-x-2 text-gray-500 text-sm font-semibold uppercase whitespace-nowrap">
          {booking.type === 'DAS' && (
            <>
              <span>DAS</span>
              {DOT}
            </>
          )}
          {booking.type === 'BG' ? (
            <>
              <span>BG {booking.boardingGroup}</span>
              {booking.status === 'SUMMONED' && (
                <>
                  {DOT}
                  <span className={`${theme.text} font-bold`}>Board Now</span>
                </>
              )}
            </>
          ) : (
            <ReturnWindow {...booking} />
          )}
        </div>
        <div className="text-lg font-semibold leading-snug truncate">
          {booking.choices ? 'Multiple Experiences' : booking.name}
        </div>
      </div>
      {button && <div className="flex gap-x-3 items-center">{button}</div>}
      {details && (
        <button className={theme.text} title="More Info">
          <ChevronRightIcon />
        </button>
      )}
    </div>
  );
}
