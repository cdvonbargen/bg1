import { useCallback, useEffect, useState } from 'react';

import { LightningLane, isType } from '@/api/itinerary';
import { Guest, Offer, OfferError, OfferExperience } from '@/api/ll';
import FloatingButton from '@/components/FloatingButton';
import Screen from '@/components/Screen';
import Spinner from '@/components/Spinner';
import { useBookingDate } from '@/contexts/BookingDate';
import { useClients } from '@/contexts/Clients';
import { useNav, useScreenState } from '@/contexts/Nav';
import { Party, PartyProvider } from '@/contexts/Party';
import { usePlans } from '@/contexts/Plans';
import { useRebooking } from '@/contexts/Rebooking';
import { useResort } from '@/contexts/Resort';
import { parkDate } from '@/datetime';
import useDataLoader from '@/hooks/useDataLoader';
import { ping } from '@/ping';

import BookingDate from '../BookingDate';
import RebookingHeader from '../RebookingHeader';
import YourDayButton from '../YourDayButton';
import NoEligibleGuests from './BookExperience/NoEligibleGuests';
import NoGuestsFound from './BookExperience/NoGuestsFound';
import NoReservationsAvailable from './BookExperience/NoReservationsAvailable';
import OfferDetails from './BookExperience/OfferDetails';
import BookingDetails from './BookingDetails';
import RefreshButton from './RefreshButton';

export default function BookExperience({
  experience,
}: {
  experience: OfferExperience;
}) {
  const { goTo } = useNav();
  const { isActiveScreen } = useScreenState();
  const resort = useResort();
  const { ll } = useClients();
  const { plans, plansLoaded, refreshPlans } = usePlans();
  const { bookingDate } = useBookingDate();
  const rebooking = useRebooking();
  const [party, setParty] = useState<Party>();
  const [offer, setOffer] = useState<Offer | null | undefined>();
  const { loadData, loaderElem } = useDataLoader();

  useEffect(() => {
    if (!isActiveScreen) return;
    setOffer(offer => (offer && offer !== ll.lastOffer ? undefined : offer));
  }, [isActiveScreen, ll]);

  useEffect(() => {
    setParty(undefined);
    setOffer(undefined);
    return () => {
      if (rebooking.auto) rebooking.end();
    };
  }, [rebooking]);

  async function book() {
    if (!offer || !party) return;
    loadData(
      async () => {
        const booking = await ll.book(offer, party.selected);
        rebooking.end();
        const selectedIds = new Set(party.selected.map(g => g.id));
        const guestsToCancel = booking.guests.filter(
          g => !selectedIds.has(g.id)
        );
        if (guestsToCancel.length > 0) {
          await ll.cancelBooking(guestsToCancel);
          booking.guests = booking.guests.filter(g => selectedIds.has(g.id));
        }
        goTo(<BookingDetails booking={booking} isNew={true} />, {
          replace: true,
        });
        refreshPlans();
        ping(resort, 'G');
      },
      {
        messages: { 410: 'Offer expired' },
      }
    );
  }

  const loadParty = useCallback(() => {
    loadData(async () => {
      const guests = rebooking.current
        ? { eligible: rebooking.current.guests, ineligible: [] }
        : await ll.guests(experience, bookingDate);

      // Detect if there's an existing LL for this experience we can modify
      if (
        guests.eligible.length === 0 &&
        guests.ineligible.some(
          g => g.ineligibleReason === 'EXPERIENCE_LIMIT_REACHED'
        )
      ) {
        const booking = plans.find(
          (b): b is LightningLane =>
            b.id === experience.id &&
            !!b.modifiable &&
            isType(b, 'LL', 'MP') &&
            parkDate(b.start) === bookingDate
        );
        if (booking) return rebooking.begin(booking, true);
      }

      setParty({
        ...guests,
        selected: guests.eligible.slice(0, ll.rules.maxPartySize),
        setSelected: (selected: Guest[]) =>
          setParty(party => {
            if (!party) return party;
            const oldSelected = new Set(party.selected);
            setOffer(offer =>
              offer === null || selected.some(g => !oldSelected.has(g))
                ? undefined
                : offer
            );
            return { ...party, selected };
          }),
        experience,
      });
    });
  }, [plans, ll, experience, bookingDate, rebooking, loadData]);

  useEffect(() => {
    if (!party && plansLoaded) loadParty();
  }, [party, plansLoaded, loadParty]);

  const refreshOffer = useCallback(
    (first = false) => {
      if (!isActiveScreen || !party || party.selected.length === 0) return;

      function updateParty({ guests }: Pick<Offer, 'guests'>) {
        setParty(party => ({
          ...(party as Party),
          ...guests,
          selected: guests.eligible,
        }));
      }

      loadData(
        async () => {
          try {
            const newOffer = await ll.offer(
              experience,
              party.selected,
              rebooking.current
                ? { booking: rebooking.current }
                : { date: bookingDate }
            );
            const { ineligible } = newOffer.guests;
            if (ineligible.length > 0) {
              const ineligibleIds = new Set(ineligible.map(g => g.id));
              const isEligible = (g: Guest) => !ineligibleIds.has(g.id);
              setParty({
                ...party,
                eligible: party.eligible.filter(isEligible),
                ineligible: [...ineligible, ...party.ineligible],
                selected: party.selected.filter(isEligible),
              });
            }
            if (!first) newOffer.changed = false;
            setOffer(newOffer);
            if (ineligible.length > 0) updateParty(newOffer);
          } catch (error) {
            setOffer(offer => offer ?? null);
            if (error instanceof OfferError) return updateParty(error);
            throw error;
          }
        },
        {
          messages: { 410: first ? '' : 'No reservations available' },
        }
      );
    },
    [ll, experience, party, bookingDate, rebooking, isActiveScreen, loadData]
  );

  useEffect(() => {
    if (offer === undefined) refreshOffer(true);
  }, [offer, refreshOffer]);

  const noEligible = party?.eligible.length === 0;
  const noGuestsFound = noEligible && party?.ineligible.length === 0;

  return (
    <Screen
      title="Lightning Lane"
      theme={experience.park.theme}
      buttons={
        <>
          <YourDayButton />
          <RefreshButton
            onClick={() => {
              if (noEligible) {
                loadParty();
              } else {
                refreshOffer();
              }
            }}
            name={noEligible ? 'Party' : 'Offer'}
          />
        </>
      }
      subhead={
        <>
          <RebookingHeader />
          <BookingDate booking={offer ?? undefined} />
        </>
      }
    >
      <h2>{experience.name}</h2>
      <div>{experience.park.name}</div>
      {party ? (
        <PartyProvider value={party}>
          {noGuestsFound ? (
            <NoGuestsFound onRefresh={loadParty} />
          ) : noEligible ? (
            <NoEligibleGuests />
          ) : !party || offer === undefined ? (
            <div />
          ) : offer === null ? (
            <NoReservationsAvailable />
          ) : (
            <>
              <OfferDetails offer={offer} onOfferChange={setOffer} />
              <FloatingButton onClick={book}>{`${
                rebooking.current ? 'Modify' : 'Book'
              } Lightning Lane`}</FloatingButton>
            </>
          )}
        </PartyProvider>
      ) : !plansLoaded ? (
        <Spinner />
      ) : null}
      {loaderElem}
    </Screen>
  );
}
