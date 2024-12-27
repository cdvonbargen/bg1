import { use } from 'react';

import { FlexExperience } from '@/api/ll';
import Button from '@/components/Button';
import NavContext from '@/contexts/NavContext';
import { displayTime } from '@/datetime';

import BookExperience from '../BookExperience';
import LabeledItem from './LabeledItem';

export default function LLButton({
  experience,
}: {
  experience: FlexExperience;
}) {
  const { goTo } = use(NavContext);
  const { flex, standby } = experience;

  return (
    <LabeledItem label="LL">
      <span>
        <Button
          onClick={() => goTo(<BookExperience experience={experience} />)}
        >
          {standby.unavailableReason === 'CLOSED'
            ? 'Book'
            : flex.nextAvailableTime
              ? displayTime(flex.nextAvailableTime)
              : 'none'}
        </Button>
      </span>
    </LabeledItem>
  );
}
