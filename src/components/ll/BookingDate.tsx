import { use } from 'react';

import { Booking } from '@/api/itinerary';
import BookingDateContext from '@/contexts/BookingDateContext';
import { parkDate } from '@/datetime';

import { Time } from '../Time';

export default function BookingDate({
  booking,
}: {
  booking?: Pick<Booking, 'start'>;
}) {
  const { bookingDate } = use(BookingDateContext);
  return <Time date={booking ? parkDate(booking.start) : bookingDate} />;
}
