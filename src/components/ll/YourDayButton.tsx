import { useBookingDate } from '@/contexts/BookingDate';
import { useNav } from '@/contexts/Nav';
import { ThemeProvider, useTheme } from '@/contexts/Theme';
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
  const { goTo } = useNav();
  const theme = useTheme();
  const { bookingDate } = useBookingDate();
  return (
    <>
      <Button
        {...buttonProps}
        onClick={() =>
          goTo(
            <ThemeProvider value={theme}>
              <YourDay date={date ?? bookingDate} unmodifiable={changes} />
            </ThemeProvider>
          )
        }
        title="Your Day"
      >
        <DayIcon />
      </Button>
    </>
  );
}
