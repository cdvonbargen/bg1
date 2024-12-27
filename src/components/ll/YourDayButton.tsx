import { use } from 'react';

import BookingDateContext from '@/contexts/BookingDateContext';
import NavContext from '@/contexts/NavContext';
import DayIcon from '@/icons/DayIcon';

import Button from '../Button';
import YourDay from './screens/YourDay';

export default function YourDayButton({
  date,
  unmodifiable: changes,
  ...buttonProps
}: Omit<Parameters<typeof Button>[0], 'onClick' | 'title'> & {
  date?: string;
  unmodifiable?: boolean;
}) {
  const { goTo } = use(NavContext);
  const { bookingDate } = use(BookingDateContext);
  return (
    <>
      <Button
        {...buttonProps}
        onClick={() =>
          goTo(<YourDay date={date ?? bookingDate} unmodifiable={changes} />)
        }
        title="Your Day"
      >
        <DayIcon />
      </Button>
    </>
  );
}
