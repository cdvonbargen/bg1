import { createContext } from 'react';

import { LightningLane } from '@/api/ll';

export interface Rebooking {
  current: LightningLane | undefined;
  auto: boolean;
  begin: (booking: LightningLane, auto?: boolean) => void;
  end: () => void;
}

export default createContext<Rebooking>({
  current: undefined,
  auto: false,
  begin: () => undefined,
  end: () => undefined,
});
