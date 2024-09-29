import { createContext, useContext, useState } from 'react';

import { LightningLane } from '@/api/ll';

import { useBookingDate } from './BookingDate';

export interface Rebooking {
  current: LightningLane | undefined;
  auto: boolean;
  begin: (booking: LightningLane, auto?: boolean) => void;
  end: () => void;
  prevBookingDate?: string;
}

export const RebookingContext = createContext<Rebooking>({
  current: undefined,
  auto: false,
  begin: () => undefined,
  end: () => undefined,
});
export const useRebooking = () => useContext(RebookingContext);

export function RebookingProvider({ children }: { children: React.ReactNode }) {
  const { setBookingDate } = useBookingDate();
  const [rebooking, setRebooking] = useState<Rebooking>(() => ({
    current: undefined,
    auto: false,
    begin: (booking: LightningLane, auto = false) => {
      setBookingDate(date => {
        setRebooking(rb =>
          booking === rb.current
            ? rb
            : { ...rb, current: booking, auto, prevBookingDate: date }
        );
        return booking.start.date;
      });
    },
    end: () => {
      setRebooking(rb => {
        if (!rb.current) return rb;
        if (rb.prevBookingDate) setBookingDate(rb.prevBookingDate);
        return {
          ...rb,
          current: undefined,
          auto: false,
          prevBookingDate: undefined,
        };
      });
    },
  }));
  return (
    <RebookingContext.Provider value={rebooking}>
      {children}
    </RebookingContext.Provider>
  );
}
