export interface Park {
  id: string;
  name: string;
  icon: string;
  geo: { n: number; s: number; e: number; w: number };
  theme: { bg: string; text: string };
  dropTimes: string[];
  waitThreshold: number;
}

export interface Land {
  name: string;
  sort: number;
  theme: { bg: string; text: string };
  park: Park;
}

export type ExperienceType =
  | 'ATTRACTION'
  | 'ENTERTAINMENT'
  | 'CHARACTER'
  | 'HOLIDAY';

export interface Experience {
  id: string;
  name: string;
  land: Land;
  park: Park;
  geo?: readonly [number, number];
  type?: ExperienceType;
  avgWait?: number;
  tier?: number;
  priority?: number;
  dropTimes?: string[];
}

type ParkData = Omit<Park, 'dropTimes'>;
type LandData = Omit<Land, 'park'> & { park: ParkData };
type ExperienceData = Omit<Experience, 'id' | 'land' | 'park'> & {
  land: LandData;
};

export interface ResortData {
  parks: ParkData[];
  experiences: {
    [id: string | number]: ExperienceData | null | undefined;
  };
}

export class InvalidId extends Error {
  name = 'InvalidId';

  constructor(id: string) {
    super(`Invalid ID: ${id}`);
  }
}

export class Resort {
  readonly id: 'WDW' | 'DLR';
  readonly parks: Park[];
  protected parksById: { [id: string]: Park | undefined };
  protected expsById: { [id: string]: Experience | null | undefined };
  protected dropExpsByPark: Map<Park, Experience[]>;

  constructor(id: Resort['id'], data: ResortData) {
    this.id = id;
    this.parks = data.parks as Park[];
    this.parksById = Object.fromEntries(this.parks.map(p => [p.id, p]));
    this.expsById = data.experiences as Resort['expsById'];
    this.dropExpsByPark = new Map(this.parks.map(p => [p, [] as Experience[]]));
    for (const [id, exp] of Object.entries(this.expsById)) {
      if (exp) {
        exp.id = id;
        exp.park = exp.land.park;
      }
      if (exp?.dropTimes) this.dropExpsByPark.get(exp.land.park)?.push(exp);
    }
    for (const park of this.parks) {
      park.dropTimes = [
        ...new Set(
          this.dropExpsByPark.get(park)?.flatMap(exp => exp.dropTimes ?? [])
        ),
      ].sort();
      this.dropExpsByPark
        .get(park)
        ?.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  experience(id: string) {
    const exp = this.expsById[id];
    if (exp) return exp;
    if (exp !== null) console.warn(`Missing experience: ${id}`);
    throw new InvalidId(id);
  }

  park(id: string) {
    const park = this.parksById[id];
    if (park) return park;
    throw new InvalidId(id);
  }

  dropExperiences(park: Park) {
    return this.dropExpsByPark.get(park) ?? [];
  }
}

export async function loadResort(id: Resort['id']): Promise<Resort> {
  const data: ResortData = await import(`./data/${id.toLowerCase()}.ts`);
  return new Resort(id, data);
}
