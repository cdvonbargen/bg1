import { use, useState } from 'react';

import { Booking } from '@/api/itinerary';
import { Park } from '@/api/resort';
import Button from '@/components/Button';
import FloatingButton from '@/components/FloatingButton';
import GuestList from '@/components/GuestList';
import Notice from '@/components/Notice';
import Screen from '@/components/Screen';
import { Time } from '@/components/Time';
import ClientsContext from '@/contexts/ClientsContext';
import DasPartiesContext from '@/contexts/DasPartiesContext';
import NavContext from '@/contexts/NavContext';
import ResortContext from '@/contexts/ResortContext';
import { DEFAULT_THEME } from '@/contexts/ThemeContext';
import { parkDate } from '@/datetime';

import { ExperienceList } from '../ExperienceList';
import ModifyButton from '../ModifyButton';
import ReturnTime from '../ReturnTime';
import CancelGuests from './CancelGuests';
import ChangeBookingTime from './ChangeBookingTime';
import Home from './Home';

export default function BookingDetails({
  booking,
  isNew,
  unmodifiable,
}: {
  booking: Booking;
  isNew?: boolean;
  unmodifiable?: boolean;
}) {
  const { goTo, goBack } = use(NavContext);
  const { parks } = use(ResortContext);
  const { ll } = use(ClientsContext);
  const dasParties = use(DasPartiesContext);
  const { name, park, choices, type, subtype, start } = booking;
  const dasGuest =
    type === 'DAS' && subtype === 'IN_PARK'
      ? booking.guests.find(g =>
          dasParties.find(p => p.primaryGuest.id === g.id)
        )
      : undefined;
  const [guests, setGuests] = useState(
    booking.cancellable && (type !== 'DAS' || dasGuest)
      ? booking.guests
      : undefined
  );

  const choicesByPark = new Map([
    [park as Park, []],
    ...parks.map(
      park => [park, []] as [Park, Required<typeof booking>['choices']]
    ),
  ]);
  for (const exp of choices || []) choicesByPark.get(exp.park)?.push(exp);

  const parkChoices = [...choicesByPark]
    .filter(([, exps]) => exps.length > 0)
    .map(([park]) => park);
  const theme =
    (!choices ? park : parkChoices.length === 1 ? parkChoices[0] : {}).theme ??
    DEFAULT_THEME;
  const titles = {
    LL: 'Lightning Lane',
    DAS: 'DAS Selection',
    BG: 'Boarding Group',
    APR: 'Park Pass',
    RES: 'Reservation',
  };

  return (
    <Screen
      title={'Your ' + titles[type]}
      theme={theme}
      buttons={!unmodifiable && !isNew && <ModifyButton booking={booking} />}
      subhead={<Time date={parkDate(start)} />}
    >
      {choices ? (
        <h2>Multiple Experiences</h2>
      ) : (
        <>
          <h2>{name}</h2>
          {park.name && <div>{park.name}</div>}
        </>
      )}
      {type === 'BG' ? (
        <>
          {booking.status === 'SUMMONED' && (
            <Notice>Your boarding group has been called</Notice>
          )}
          <h3>
            Boarding Group:{' '}
            <span className="ml-1 font-semibold">{booking.boardingGroup}</span>
          </h3>
          <p>
            Check the official Disney app for return time and other virtual
            queue information.
          </p>
        </>
      ) : (
        <ReturnTime
          {...booking}
          button={
            !unmodifiable &&
            ll.rules.timeSelect &&
            booking.modifiable && (
              <Button
                type="small"
                onClick={() => {
                  goTo(<ChangeBookingTime booking={booking} />);
                }}
              >
                Change
              </Button>
            )
          }
        />
      )}
      {choices && (
        <>
          <p>
            {name && (
              <>
                <b>{name}</b> was temporarily unavailable during your return
                time.{' '}
              </>
            )}
            You may redeem this Lightning Lane at one of these replacement
            experiences:
          </p>
          {[...choicesByPark]
            .filter(([, choices]) => choices.length > 0)
            .map(([park, choices]) => (
              <ExperienceList
                heading={park.name}
                experiences={choices}
                bg={park.theme.bg}
                key={park.id}
              />
            ))}
        </>
      )}
      <div className="flex mt-4">
        <h3 className="inline mt-0">Your Party</h3>
        {booking.cancellable && guests && (
          <Button
            type="small"
            onClick={() => {
              goTo(
                <CancelGuests
                  booking={{ ...booking, guests }}
                  dasGuest={dasGuest}
                  onCancel={remainingGuests => {
                    if (remainingGuests.length > 0) {
                      setGuests(remainingGuests);
                    } else {
                      goBack();
                    }
                  }}
                />
              );
            }}
            className="ml-3"
          >
            Cancel
          </Button>
        )}
      </div>
      <GuestList
        guests={guests || booking.guests}
        conflicts={Object.fromEntries(
          booking.type === 'LL'
            ? booking.guests
                .filter(g => (g.redemptions ?? 1) !== 1)
                .map(g => [g.id, `Redemptions left: ${g.redemptions}`])
            : []
        )}
      />
      {isNew && (
        <FloatingButton
          onClick={() => goBack({ screen: Home, props: { tabName: 'Plans' } })}
        >
          Show Plans
        </FloatingButton>
      )}
    </Screen>
  );
}
