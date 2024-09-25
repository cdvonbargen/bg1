import { hm, jc, mickey, minnie, sm } from '@/__fixtures__/das';
import { fetchJson } from '@/fetch';
import { TODAY } from '@/testing';

import { authStore } from '../auth';
import { DasClient } from '../das';
import * as data from '../data/wdw';
import { Resort } from '../resort';

jest.mock('@/fetch');
const accessToken = 'ACCESS_TOKEN';
const swid = 'SWID';
jest.spyOn(authStore, 'getData').mockReturnValue({ accessToken, swid });

const wdw = new Resort('WDW', data);
const [mk] = wdw.parks;
const origin = 'https://disneyworld.disney.go.com';

const booking = {
  type: 'DAS',
  subtype: 'IN_PARK',
  id: jc.id,
  name: jc.name,
  park: mk,
  guests: [
    {
      id: mickey.id,
      name: mickey.name,
      avatarImageUrl: mickey.avatarImageUrl,
      entitlementId: 'jc1030_mickey',
    },
    {
      ...minnie,
      entitlementId: 'jc1030_minnie',
    },
  ],
  start: { date: TODAY, time: '10:30:00' },
  end: {},
  bookingId: 'jc1030',
};

function response(data: any, status = 200) {
  return { ok: status >= 200 && status < 300, status, data: { ...data } };
}

function respond(...responses: ReturnType<typeof response>[]) {
  for (const res of responses) {
    jest.mocked(fetchJson).mockResolvedValueOnce(res);
  }
}

function expectFetch(
  path: string,
  { method, params, data }: Parameters<typeof fetchJson>[1] = {},
  nthCall = 1
) {
  expect(fetchJson).toHaveBeenNthCalledWith(
    nthCall,
    expect.stringContaining(origin + path),
    {
      method,
      params,
      data,
      headers: {
        'Accept-Language': 'en-US',
        Authorization: `BEARER ${accessToken}`,
        'x-user-id': swid,
      },
    }
  );
}

describe('DasClient', () => {
  const client = new DasClient(wdw);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('parties()', () => {
    it('returns parties', async () => {
      const res = response({
        bookingGuestId: 'mickey',
        parties: [
          {
            primaryGuest: {
              id: mickey.id,
              name: `${mickey.name} (Me)`,
              characterId: '17532228',
            },
            linkedGuests: [
              {
                id: minnie.id,
                name: minnie.name,
                characterId: '90004486',
              },
            ],
            selectionLimit: 4,
          },
        ],
      });
      respond(res);
      expect(await client.parties()).toEqual([
        {
          primaryGuest: mickey,
          linkedGuests: [minnie],
          selectionLimit: 4,
        },
      ]);
      expectFetch(`/das-vas/api/v1/users/${encodeURIComponent(swid)}/parties`);
    });
  });

  describe('experiences()', () => {
    it('returns experiences', async () => {
      const res = response({
        experiences: [
          {
            ...jc,
            name: 'Jungle',
            available: false,
          },
          {
            ...sm,
            name: 'Space',
            nextAvailableStartDateTime: `${TODAY}T${sm.time}`,
          },
          {
            ...hm,
            name: 'Haunted',
            nextAvailableStartDateTime: `${TODAY}T${hm.time}`,
          },
        ],
      });
      respond(res);
      expect(await client.experiences(mk)).toEqual([hm, sm]);
    });
  });

  describe('book()', () => {
    it('books DAS selection', async () => {
      const eligRes = response({
        eligibility: [
          {
            type: 'ELIGIBLE',
            guestIds: [mickey.id, minnie.id],
          },
        ],
      });
      const availRes = response({
        id: hm.id,
        type: 'ATTRACTION',
        startDateTime: `${TODAY}T10:30:00`,
        endDateTime: `${TODAY}T21:00:00`,
      });
      const bookRes = response({
        booking: {
          id: 'jc1030',
          entitlements: [
            {
              id: 'jc1030_mickey',
              guestId: mickey.id,
            },
            {
              id: 'jc1030_minnie',
              guestId: minnie.id,
            },
          ],
          startDateTime: `${TODAY}T10:30:00`,
          endDateTime: `${TODAY}T02:00:00`,
          singleExperienceDetails: {
            experienceId: jc.id,
            parkId: mk.id,
          },
        },
      });
      respond(eligRes, availRes, bookRes);
      expect(
        await client.book({
          park: mk,
          experience: jc,
          primaryGuest: mickey,
          guests: [mickey, minnie],
        })
      ).toEqual(booking);
    });
  });

  describe('cancelBooking()', () => {
    it('cancels booking', async () => {
      respond(response({}, 204));
      expect(await client.cancelBooking(booking.guests)).toBe(undefined);
      expectFetch(
        `/das-vas/api/v1/entitlements/${booking.guests
          .map(g => g.entitlementId)
          .join(',')}`,
        { method: 'DELETE' }
      );
    });
  });
});
