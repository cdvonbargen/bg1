import {
  booking,
  das,
  hs,
  liveData,
  mk,
  renderResort,
} from '@/__fixtures__/ll';
import kvdb from '@/kvdb';
import { click, loading, revisitTab, see, setTime } from '@/testing';

import Merlock from '../../Merlock';
import Home, { HOME_TAB_KEY } from '../Home';

jest.mock('@/ping');
jest.spyOn(das, 'parties').mockResolvedValue([]);
jest.spyOn(liveData, 'shows').mockResolvedValue({});

beforeEach(() => {
  kvdb.clear();
});

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setTime('10:00');
  });

  it('shows LL home screen', async () => {
    renderResort(<Merlock />);
    await loading();

    revisitTab(60);
    await loading();

    click('Times');
    expect(kvdb.get(HOME_TAB_KEY)).toBe('Times');

    click(mk.name);
    click(hs.name, 'radio');
    await loading();
    see(hs.name);

    click('Plans');
    click(booking.name);
    jest.spyOn(Element.prototype, 'scroll');
    await see.screen('Your Lightning Lane');
    click('Modify');
    await see.screen('LL');
    expect(see(hs.name)).toBeEnabled();
    expect(Element.prototype.scroll).toHaveBeenCalledTimes(2);

    click('Plans');
    click(booking.name);
    await see.screen('Your Lightning Lane');
    click('Cancel');
    await see.screen('Cancel Guests');
    click('Select All');
    click('Cancel Reservation');
    await see.screen('Your Plans');
  });
});

describe('Home.currentTabName()', () => {
  it('returns default tab', () => {
    expect(Home.getSavedTabName()).toBe('LL');
    kvdb.set(HOME_TAB_KEY, 'Times');
    expect(Home.getSavedTabName()).toBe('Times');
  });
});
