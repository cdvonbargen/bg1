import { createContext } from 'react';

import { Guest, Guests } from '@/api/ll';

export interface Party extends Guests {
  selected: Guest[];
  setSelected: (guests: Guest[]) => void;
  experience: {
    name: string;
    park: { name: string; theme: { bg: string; text: string } };
  };
}

export default createContext<Party>({
  eligible: [],
  ineligible: [],
  selected: [],
  setSelected: () => null,
  experience: {
    name: '',
    park: { name: '', theme: { bg: '', text: '' } },
  },
});
