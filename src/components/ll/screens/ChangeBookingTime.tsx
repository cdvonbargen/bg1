import { useEffect, useState } from 'react';

import { LightningLane, Offer } from '@/api/ll';
import Button from '@/components/Button';
import Screen from '@/components/Screen';
import { useClients } from '@/contexts/Clients';
import { useNav } from '@/contexts/Nav';
import useDataLoader from '@/hooks/useDataLoader';

import BookingDate from '../BookingDate';
import ReturnTime from '../ReturnTime';
import YourDayButton from '../YourDayButton';
import BookNewReturnTime from './BookNewReturnTime';
import RefreshButton from './RefreshButton';
import SelectReturnTime from './SelectReturnTime';

export default function ChangeBookingTime({
  booking,
}: {
  booking: LightningLane;
}) {
  const { goTo } = useNav();
  const { ll } = useClients();
  const { loadData, loaderElem } = useDataLoader();
  const [offer, setOffer] = useState<Offer<LightningLane>>();

  useEffect(() => {
    loadData(async () => {
      setOffer(await ll.offer(booking, booking.guests, { booking }));
    });
  }, [booking, ll, loadData]);

  return offer ? (
    <SelectReturnTime
      offer={offer}
      onOfferChange={offer => {
        goTo(<BookNewReturnTime offer={offer} />);
      }}
    />
  ) : (
    <Screen
      title="Select Return Time"
      theme={booking.park.theme}
      subhead={<BookingDate booking={booking} />}
      buttons={
        <>
          <YourDayButton />
          <RefreshButton name="Times" onClick={() => {}} />
        </>
      }
    >
      <h2>{booking.name}</h2>
      <div>{booking.park.name}</div>
      <ReturnTime {...booking} button={<Button type="small">Keep</Button>} />
      {loaderElem}
    </Screen>
  );
}
