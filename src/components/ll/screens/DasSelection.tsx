import { use, useState } from 'react';

import {
  ConflictsError,
  DasParty,
  EligibilityConflicts,
  Experience,
  Guest,
} from '@/api/das';
import { Park } from '@/api/resort';
import Button from '@/components/Button';
import FloatingButton from '@/components/FloatingButton';
import GuestList from '@/components/GuestList';
import Screen from '@/components/Screen';
import ClientsContext from '@/contexts/ClientsContext';
import NavContext from '@/contexts/NavContext';
import PlansContext from '@/contexts/PlansContext';
import ResortContext from '@/contexts/ResortContext';
import useDataLoader from '@/hooks/useDataLoader';
import { ping } from '@/ping';

import BookingDetails from './BookingDetails';
import DasExperienceList from './DasExperienceList';
import Home from './Home';

export default function DasSelection({
  park,
  party,
}: {
  park: Park;
  party: DasParty;
}) {
  const { goTo, goBack } = use(NavContext);
  const resort = use(ResortContext);
  const { das } = use(ClientsContext);
  const { refreshPlans } = use(PlansContext);
  const [experience, setExperience] = useState<Experience>();
  const [selected, setSelected] = useState<Set<Guest>>(
    new Set(
      [party.primaryGuest, ...party.linkedGuests].slice(0, party.selectionLimit)
    )
  );
  const [conflicts, setConflicts] = useState<EligibilityConflicts>({});
  const { loadData, loaderElem } = useDataLoader();

  async function book() {
    if (!experience) return;
    loadData(
      async () => {
        try {
          const booking = await das.book({
            park,
            experience,
            primaryGuest: party.primaryGuest,
            guests: [...selected],
          });
          refreshPlans();
          ping(resort, 'D');
          await goBack({ screen: Home });
          goTo(<BookingDetails booking={booking} isNew={true} />);
        } catch (e) {
          if (e instanceof ConflictsError) setConflicts(e.conflicts);
          throw e;
        }
      },
      {
        messages: {
          ConflictsError: 'Some guests not eligible',
          ExperienceUnavailable: 'Experience currently unavailable',
        },
      }
    );
  }

  return (
    <Screen title="DAS Selection" theme={park.theme}>
      <h3>Experience</h3>
      {experience ? (
        <div className="flex items-center mt-3">
          <div className="text-lg font-semibold truncate">
            {experience.name}
          </div>
          <div className="ml-3">
            <Button
              type="small"
              onClick={() =>
                goTo(
                  <DasExperienceList
                    park={park}
                    onSelect={exp => {
                      setExperience(exp);
                      goBack();
                    }}
                  />
                )
              }
            >
              Change
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-3 text-center">
          <Button
            onClick={() =>
              goTo(
                <DasExperienceList
                  park={park}
                  onSelect={experience => {
                    setExperience(experience);
                    goBack();
                  }}
                />
              )
            }
          >
            Select Experience
          </Button>
        </div>
      )}
      <h3>DAS Guest</h3>
      <GuestList guests={[party.primaryGuest]} conflicts={conflicts} />
      {party.linkedGuests.length > 0 && (
        <>
          <h3>Additional Guests</h3>
          <GuestList
            guests={party.linkedGuests}
            selectable={{
              isSelected: g => selected.has(g),
              onToggle: g => {
                selected[selected.has(g) ? 'delete' : 'add'](g);
                setSelected(new Set(selected));
              },
              limit: party.selectionLimit - 1,
            }}
            conflicts={conflicts}
          />
        </>
      )}
      <FloatingButton disabled={!party || !experience} onClick={book}>
        Request Return Time
      </FloatingButton>

      {loaderElem}
    </Screen>
  );
}
