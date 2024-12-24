import { createContext, useContext, useState } from 'react';

import { LightningLane } from '@/api/ll';

export interface Rebooking {
  current: LightningLane | undefined;
  auto: boolean;
  begin: (booking: LightningLane, auto?: boolean) => void;
  end: () => void;
}

export const RebookingContext = createContext<Rebooking>({
  current: undefined,
  auto: false,
  begin: () => undefined,
  end: () => undefined,
});
export const useRebooking = () => useContext(RebookingContext);

export function RebookingProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: Rebooking;
}) {
  const [rebooking, setRebooking] = useState<Rebooking>(() => ({
    current: undefined,
    auto: false,
    begin: (booking: LightningLane, auto = false) => {
      setRebooking(rb =>
        booking === rb.current ? rb : { ...rb, current: booking, auto }
      );
    },
    end: () => {
      setRebooking(rb =>
        rb.current ? { ...rb, current: undefined, auto: false } : rb
      );
    },
  }));

  return (
    <RebookingContext.Provider value={value ?? rebooking}>
      {children}
    </RebookingContext.Provider>
  );
}
