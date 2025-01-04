import { ResortData } from '../resort';

const mk = {
  id: '80007944',
  name: 'Magic Kingdom',
  icon: '🏰',
  geo: {
    n: 28.422,
    s: 28.415,
    e: -81.575,
    w: -81.586,
  },
  theme: { bg: 'bg-fuchsia-600', text: 'text-fuchsia-600' },
};
const ep = {
  id: '80007838',
  name: 'EPCOT',
  icon: '🌐',
  geo: {
    n: 28.377,
    s: 28.366,
    e: -81.545,
    w: -81.555,
  },
  theme: { bg: 'bg-indigo-600', text: 'text-indigo-600' },
};
const hs = {
  id: '80007998',
  name: 'Hollywood Studios',
  icon: '🎬',
  geo: {
    n: 28.362,
    s: 28.353,
    e: -81.557,
    w: -81.564,
  },
  theme: { bg: 'bg-orange-600', text: 'text-orange-600' },
};
const ak = {
  id: '80007823',
  name: 'Animal Kingdom',
  icon: '🌳',
  geo: {
    n: 28.369,
    s: 28.354,
    e: -81.585,
    w: -81.597,
  },
  theme: { bg: 'bg-green-600', text: 'text-green-600' },
};

export const parks: ResortData['parks'] = [mk, ep, hs, ak];

// Magic Kingdom Lands
const mainStreet = {
  name: 'Main Street, USA',
  sort: 1,
  theme: { bg: 'bg-red-600', text: 'text-red-700' },
  park: mk,
};
const adventureland = {
  name: 'Adventureland',
  sort: 2,
  theme: { bg: 'bg-green-600', text: 'text-green-700' },
  park: mk,
};
const frontierland = {
  name: 'Frontierland',
  sort: 3,
  theme: { bg: 'bg-yellow-600', text: 'text-yellow-700' },
  park: mk,
};
const libertySquare = {
  name: 'Liberty Square',
  sort: 4,
  theme: { bg: 'bg-indigo-600', text: 'text-indigo-700' },
  park: mk,
};
const fantasyland = {
  name: 'Fantasyland',
  sort: 5,
  theme: { bg: 'bg-pink-600', text: 'text-pink-700' },
  park: mk,
};
const tomorrowland = {
  name: 'Tomorrowland',
  sort: 6,
  theme: { bg: 'bg-cyan-600', text: 'text-cyan-700' },
  park: mk,
};

// EPCOT Lands
const celebration = {
  name: 'World Celebration',
  sort: 1,
  theme: { bg: 'bg-indigo-600', text: 'text-indigo-700' },
  park: ep,
};
const discovery = {
  name: 'World Discovery',
  sort: 2,
  theme: { bg: 'bg-red-600', text: 'text-red-700' },
  park: ep,
};
const nature = {
  name: 'World Nature',
  sort: 3,
  theme: { bg: 'bg-green-600', text: 'text-green-700' },
  park: ep,
};
const showcase = {
  name: 'World Showcase',
  sort: 4,
  theme: { bg: 'bg-yellow-600', text: 'text-yellow-700' },
  park: ep,
};

// Hollywood Studios Lands
const hollywood = {
  name: 'Hollywood & Sunset',
  sort: 1,
  theme: { bg: 'bg-orange-600', text: 'text-orange-700' },
  park: hs,
};
const toyStory = {
  name: 'Toy Story Land',
  sort: 2,
  theme: { bg: 'bg-green-600', text: 'text-green-700' },
  park: hs,
};
const starWars = {
  name: "Star Wars: Galaxy's Edge",
  sort: 3,
  theme: { bg: 'bg-gray-600', text: 'text-gray-700' },
  park: hs,
};
const echoLake = {
  name: 'Echo Lake',
  sort: 4,
  theme: { bg: 'bg-indigo-600', text: 'text-indigo-700' },
  park: hs,
};
const otherStudios = {
  name: 'Miscellaneous',
  sort: 5,
  theme: { bg: 'bg-red-600', text: 'text-red-700' },
  park: hs,
};

// Animal Kingdom Lands
const discIsland = {
  name: 'Discovery Island',
  sort: 1,
  theme: { bg: 'bg-green-600', text: 'text-green-700' },
  park: ak,
};
const pandora = {
  name: 'Pandora',
  sort: 2,
  theme: { bg: 'bg-cyan-600', text: 'text-cyan-700' },
  park: ak,
};
const africa = {
  name: 'Africa',
  sort: 3,
  theme: { bg: 'bg-yellow-600', text: 'text-yellow-700' },
  park: ak,
};
const rafikis = {
  name: "Rafiki's Planet Watch",
  sort: 4,
  theme: { bg: 'bg-orange-600', text: 'text-orange-700' },
  park: ak,
};
const asia = {
  name: 'Asia',
  sort: 5,
  theme: { bg: 'bg-red-600', text: 'text-red-700' },
  park: ak,
};
const dinoland = {
  name: 'Dinoland USA',
  sort: 6,
  theme: { bg: 'bg-purple-600', text: 'text-purple-700' },
  park: ak,
};

export const experiences: ResortData['experiences'] = {
  // Magic Kingdom
  80010107: {
    name: 'Astro Orbiter',
    land: tomorrowland,
  },
  16491297: {
    name: 'Barnstormer',
    land: fantasyland,
    geo: [28.4208394, -81.5784733],
    avgWait: 22,
  },
  80010110: {
    name: 'Big Thunder Mountain Railroad',
    land: frontierland,
    geo: [28.4197486, -81.5845092],
    tier: 1,
    priority: 2.3,
    avgWait: 40,
    highlight: true,
    dropTimes: ['08:47', '13:47'],
  },
  80010114: {
    name: "Buzz Lightyear's Space Ranger Spin",
    land: tomorrowland,
    geo: [28.418446, -81.5796479],
    priority: 3.0,
    avgWait: 34,
    highlight: true,
  },
  80010232: {
    name: 'Carousel of Progress',
    land: tomorrowland,
  },
  8074: {
    name: "Casey's Corner Pianist",
    land: mainStreet,
  },
  80069748: {
    name: 'Country Bear Jamboree',
    land: frontierland,
  },
  8075: {
    name: 'Dapper Dans',
    land: mainStreet,
  },
  411550122: {
    name: 'Disney Adventure Friends Cavalcade',
    land: mainStreet,
  },
  276291: {
    name: 'Fourth of July Fireworks',
    land: mainStreet,
  },
  80010129: {
    name: 'Dumbo the Flying Elephant',
    land: fantasyland,
    geo: [28.4206047, -81.5789092],
    avgWait: 15,
  },
  16767276: {
    name: 'Enchanted Tales with Belle',
    land: fantasyland,
    geo: [28.4207354, -81.5807867],
    type: 'CHARACTER',
  },
  16124144: {
    name: 'Enchanted Tiki Room',
    land: adventureland,
  },
  12248: {
    name: 'Fantasy in the Sky Fireworks',
    land: mainStreet,
  },
  17718925: {
    name: 'Festival of Fantasy Parade',
    land: mainStreet,
    geo: [28.4189018, -81.5812001],
  },
  7922: {
    name: 'Flag Retreat',
    land: mainStreet,
  },
  80069754: {
    name: 'Hall of Presidents',
    land: libertySquare,
  },
  18672598: {
    name: 'Happily Ever After',
    land: mainStreet,
  },
  80010208: {
    name: 'Haunted Mansion',
    land: libertySquare,
    geo: [28.4208771, -81.5830102],
    priority: 1.3,
    avgWait: 41,
    highlight: true,
  },
  80010149: {
    name: "it's a small world",
    land: fantasyland,
    geo: [28.4205055, -81.582156],
    avgWait: 26,
  },
  412010035: {
    name: 'Jingle Cruise',
    land: adventureland,
    geo: [28.4180339, -81.5834548],
    tier: 1,
    priority: 1.1,
    avgWait: 53,
    highlight: true,
  },
  80010153: {
    name: 'Jungle Cruise',
    land: adventureland,
    geo: [28.4180339, -81.5834548],
    tier: 1,
    priority: 1.1,
    avgWait: 53,
    highlight: true,
  },
  8336: {
    name: 'Let the Magic Begin',
    land: mainStreet,
  },
  80010160: {
    name: 'Liberty Square Riverboat',
    land: libertySquare,
  },
  80010162: {
    name: 'Mad Tea Party',
    land: fantasyland,
    geo: [28.4200602, -81.5799004],
    avgWait: 15,
  },
  80010210: {
    name: 'Magic Carpets of Aladdin',
    land: adventureland,
    geo: [28.4183166, -81.5835006],
    avgWait: 22,
  },
  8066: {
    name: 'Main Street Philharmonic',
    land: mainStreet,
  },
  80010213: {
    name: 'Many Adventures of Winnie the Pooh',
    land: fantasyland,
    geo: [28.4202297, -81.5801966],
    priority: 2.0,
    avgWait: 35,
    highlight: true,
  },
  16874126: {
    name: "Ariel (Ariel's Grotto)",
    land: fantasyland,
    geo: [28.4208803, -81.5796853],
    type: 'CHARACTER',
  },
  15850196: {
    name: 'Mickey (Town Square Theater)',
    land: mainStreet,
    geo: [28.4167334, -81.5803937],
    type: 'CHARACTER',
  },
  18498503: {
    name: 'Cinderella (Princess Fairytale Hall)',
    land: fantasyland,
    geo: [28.4199771, -81.5808316],
    type: 'CHARACTER',
  },
  387133: {
    name: "Donald & Goofy (Pete's Silly Side Show)",
    land: fantasyland,
    type: 'CHARACTER',
  },
  15743682: {
    name: "Minnie & Daisy (Pete's Silly Side Show)",
    land: fantasyland,
    type: 'CHARACTER',
  },
  411987382: {
    name: 'Mirabel (Fairytale Garden)',
    land: fantasyland,
    type: 'CHARACTER',
  },
  17505397: {
    name: 'Tiana (Princess Fairytale Hall)',
    land: fantasyland,
    geo: [28.4199771, -81.5808316],
    type: 'CHARACTER',
  },
  19579538: {
    name: "Mickey's Celebration Cavalcade",
    land: mainStreet,
  },
  18381020: {
    name: "Mickey's Magical Friendship Faire",
    land: mainStreet,
  },
  411854077: {
    name: "Mickey's Most Merriest Celebration",
    land: mainStreet,
  },
  411854078: {
    name: "Mickey's Once Upon a Christmastime Parade",
    land: mainStreet,
  },
  80010170: {
    name: "Mickey's PhilharMagic",
    land: fantasyland,
    geo: [28.4200575, -81.5814156],
    avgWait: 15,
  },
  411854079: {
    name: "Minnie's Wonderful Christmastime Fireworks",
    land: mainStreet,
  },
  136550: {
    name: 'Monsters Inc. Laugh Floor',
    land: tomorrowland,
    geo: [28.4179954, -81.5800854],
    avgWait: 12,
  },
  80010224: {
    name: 'PeopleMover',
    land: tomorrowland,
  },
  80010176: {
    name: "Peter Pan's Flight",
    land: fantasyland,
    geo: [28.4203332, -81.5818676],
    tier: 1,
    priority: 1.2,
    avgWait: 53,
    highlight: true,
  },
  80010177: {
    name: 'Pirates of the Caribbean',
    land: adventureland,
    geo: [28.4180994, -81.5842719],
    priority: 2.2,
    avgWait: 28,
    highlight: true,
  },
  80010117: {
    name: 'Prince Charming Regal Carrousel',
    land: fantasyland,
  },
  8515: {
    name: 'Buzz/Stitch (Rocket Tower Plaza Stage)',
    land: tomorrowland,
    type: 'CHARACTER',
  },
  16767284: {
    name: 'Seven Dwarfs Mine Train',
    land: fantasyland,
    geo: [28.4204112, -81.5805506],
    avgWait: 63,
    highlight: true,
  },
  80010190: {
    name: 'Space Mountain',
    land: tomorrowland,
    geo: [28.4187869, -81.5782063],
    tier: 1,
    priority: 3.1,
    avgWait: 46,
    highlight: true,
  },
  80010196: {
    name: 'Swiss Family Treehouse',
    land: adventureland,
  },
  412021364: {
    name: "Tiana's Bayou Adventure",
    land: frontierland,
    geo: [28.419418, -81.58498],
    tier: 1,
    priority: 1.0,
    highlight: true,
    dropTimes: [
      '09:47',
      '10:47',
      '11:47',
      '12:47',
      '13:47',
      '14:47',
      '15:47',
      '16:47',
      '17:47',
      '18:47',
      '19:47',
      '20:47',
    ],
  },
  80010220: {
    name: "Tom Sawyer's Island",
    land: frontierland,
  },
  80010222: {
    name: 'Tomorrowland Speedway',
    land: tomorrowland,
    geo: [28.4194062, -81.5793505],
    avgWait: 18,
  },
  411504498: {
    name: 'TRON Lightcycle / Run',
    land: tomorrowland,
    geo: [28.4202075, -81.577053],
    priority: 1.0,
    avgWait: 115,
    highlight: true,
  },
  16767263: {
    name: 'Under the Sea',
    land: fantasyland,
    geo: [28.4210351, -81.5799673],
    avgWait: 24,
  },
  // EPCOT
  78700: {
    name: 'Alberta Bound',
    land: showcase,
  },
  80010200: {
    name: 'American Adventure',
    land: showcase,
    type: 'ENTERTAINMENT',
  },
  412026226: {
    name: 'Asha (World Showcase Plaza)',
    land: showcase,
    type: 'CHARACTER',
  },
  19496225: {
    name: 'Atlas Fusion (Morocco)',
    land: showcase,
  },
  19473173: {
    name: 'Awesome Planet',
    land: nature,
  },
  19463785: {
    name: 'Beauty & the Beast Sing-Along',
    land: showcase,
  },
  80010174: {
    name: 'Canada Far and Wide',
    land: showcase,
  },
  245275: {
    name: 'Canadian Holiday Voyageurs',
    land: showcase,
    type: 'HOLIDAY',
  },
  19036653: {
    name: 'Canada Mill Stage Entertainment',
    land: showcase,
  },
  70684: {
    name: 'Candlelight Processional',
    land: showcase,
    type: 'HOLIDAY',
  },
  245272: {
    name: 'Chinese Lion Dancer',
    land: showcase,
    type: 'HOLIDAY',
  },
  411702927: {
    name: 'Command Performance (UK)',
    land: showcase,
  },
  245268: {
    name: 'Daruma Storyteller (Japan)',
    land: showcase,
    type: 'HOLIDAY',
  },
  18269694: {
    name: 'Disney & Pixar Short Film Festival',
    land: celebration,
    geo: [28.3720463, -81.5508243],
  },
  412126654: {
    name: 'Encanto Celebration',
    land: celebration,
  },
  19258170: {
    name: 'Epcot Forever',
    land: showcase,
  },
  245270: {
    name: 'Father Christmas (UK)',
    land: showcase,
    type: 'HOLIDAY',
  },
  18375495: {
    name: 'Frozen Ever After',
    land: showcase,
    geo: [28.3706716, -81.5465556],
    tier: 1,
    priority: 1.1,
    avgWait: 63,
    highlight: true,
  },
  19242311: {
    name: 'Germany Gazebo Entertainment',
    land: showcase,
  },
  207395: {
    name: 'Gran Fiesta Tour',
    land: showcase,
  },
  18923661: {
    name: "Groovin' Alps",
    land: showcase,
  },
  411499845: {
    name: 'Guardians of the Galaxy: Cosmic Rewind',
    land: discovery,
    geo: [28.3747479, -81.5478405],
    highlight: true,
    priority: 1.0,
  },
  17186496: {
    name: 'Hanukkah Storyteller (Between Morocco & France)',
    land: showcase,
    type: 'HOLIDAY',
  },
  13507: {
    name: 'Jammitors',
    land: celebration,
  },
  80010152: {
    name: 'Journey Into Imagination',
    land: celebration,
    geo: [28.372896, -81.5512292],
    avgWait: 18,
  },
  411794307: {
    name: 'Journey of Water, Inspired by Moana',
    land: nature,
  },
  3427049: {
    name: 'JOYFUL! A Celebration of the Season',
    land: celebration,
    type: 'HOLIDAY',
  },
  19516307: {
    name: 'Julia Scheeser & Band',
    land: showcase,
  },
  245263: {
    name: 'La Befana (Italy)',
    land: showcase,
    type: 'HOLIDAY',
  },
  245264: {
    name: 'Las Posadas Celebration (Mexico)',
    land: showcase,
    type: 'HOLIDAY',
  },
  411928911: {
    name: 'Les Raftsmen',
    land: showcase,
  },
  80010161: {
    name: 'Living with the Land',
    land: nature,
    geo: [28.3739368, -81.5526389],
    avgWait: 23,
  },
  412010036: {
    name: 'Living with the Land', // Christmas overlay
    land: nature,
    geo: [28.3739368, -81.5526389],
    priority: 4.1,
    avgWait: 35,
  },
  412008998: {
    land: showcase,
    name: 'Luminous: The Symphony of Us',
  },
  19423795: {
    name: 'Mischievous Barn Santa (Norway)',
    land: showcase,
    type: 'HOLIDAY',
  },
  19322758: {
    name: 'Mariachi Cobre',
    land: showcase,
  },
  19277873: {
    name: 'Marimba de las Américas',
    land: showcase,
  },
  80010865: {
    name: 'Matsuriza (Japan)',
    land: showcase,
  },
  412126613: {
    name: 'Mickey & Friends',
    land: celebration,
    type: 'CHARACTER',
  },
  15695444: {
    name: 'Mary Poppins (UK)',
    land: showcase,
    type: 'CHARACTER',
  },
  268742: {
    name: 'Mulan (China)',
    land: showcase,
    type: 'CHARACTER',
  },
  15574092: {
    name: 'Princess Aurora (France)',
    land: showcase,
    type: 'CHARACTER',
  },
  245271: {
    name: 'Meet Santa (Odyssey Pavilion)',
    land: celebration,
    type: 'HOLIDAY',
  },
  13625: {
    name: 'Winnie the Pooh (UK)',
    land: showcase,
    type: 'CHARACTER',
  },
  80010173: {
    name: 'Mission: SPACE',
    land: discovery,
    geo: [28.3739368, -81.5526389],
    priority: 2.0,
    avgWait: 25,
  },
  245274: {
    name: 'Père Noël (France)',
    land: showcase,
    type: 'HOLIDAY',
  },
  18780200: {
    name: 'Raffy',
    land: showcase,
  },
  80010180: {
    name: 'Reflections of China',
    land: showcase,
  },
  19497835: {
    name: "Remy's Ratatouille Adventure",
    land: showcase,
    geo: [28.3680021, -81.5534178],
    tier: 1,
    priority: 1.0,
    avgWait: 67,
    highlight: true,
    dropTimes: ['13:47'],
  },
  17490262: {
    name: 'Rose & Crown Pub Musician',
    land: showcase,
  },
  107785: {
    name: 'Seas with Nemo & Friends',
    land: nature,
    geo: [28.3748995, -81.5507208],
    avgWait: 25,
  },
  80010873: {
    name: 'Sergio (Italy)',
    land: showcase,
  },
  411840597: {
    name: 'Si-Zhu Trio (China)',
    land: showcase,
    type: 'HOLIDAY',
  },
  20194: {
    name: "Soarin' Around the World",
    land: nature,
    geo: [28.3735924, -81.5522783],
    tier: 1,
    avgWait: 48,
    highlight: true,
  },
  412001587: {
    name: "Soarin' Over California",
    land: nature,
    geo: [28.3735924, -81.5522783],
    avgWait: 35,
    highlight: true,
  },
  80010191: {
    name: 'Spaceship Earth',
    land: celebration,
    geo: [28.3754661, -81.5493961],
    priority: 4.0,
    avgWait: 22,
  },
  // 80010199: {
  //   name: 'Test Track',
  //   land: discovery,
  //   geo: [28.3733374, -81.5474931],
  //   tier: 1,
  //   priority: 1.2,
  //   dropTimes: ['12:47', '14:47', '16:47'],
  // },
  62992: {
    name: 'Turtle Talk With Crush',
    land: nature,
    geo: [28.3753989, -81.5511449],
    avgWait: 17,
  },
  209984: {
    name: 'Viva Mexico',
    land: showcase,
  },
  80010879: {
    name: 'Voices of Liberty',
    land: showcase,
  },
  178205: {
    name: 'Voice of Liberty',
    land: showcase,
    type: 'HOLIDAY',
  },
  // Hollywood Studios
  18904172: {
    name: 'Alien Swirling Saucers',
    land: toyStory,
    geo: [28.3553702, -81.5624558],
    priority: 3.0,
    avgWait: 36,
  },
  80010848: {
    name: 'Beauty & the Beast Live on Stage',
    land: hollywood,
    geo: [28.3591529, -81.5597641],
  },
  19583373: {
    name: 'Disney Junior Play and Dance',
    land: otherStudios,
    geo: [28.3579409, -81.5607914],
  },
  18693119: {
    name: 'Disney Movie Magic',
    land: hollywood,
  },
  80010887: {
    name: 'Fantasmic!',
    land: hollywood,
    geo: [28.3599166, -81.5592299],
  },
  19025720: {
    name: 'Green Army Drum Corps',
    land: toyStory,
  },
  136: {
    name: 'Indiana Jones Epic Stunt Spectacular',
    land: echoLake,
    geo: [28.3567464, -81.5588053],
  },
  411979428: {
    name: 'First Order Searches for the Resistance',
    land: starWars,
  },
  17842841: {
    name: 'Frozen Sing-Along',
    land: echoLake,
    geo: [28.3566155, -81.5594812],
  },
  19276204: {
    name: "Lightning McQueen's Racing Academy",
    land: hollywood,
  },
  411926516: {
    name: 'Ariel (Walt Disney Presents)',
    land: otherStudios,
    type: 'CHARACTER',
  },
  18189394: {
    name: 'Chewbacca (Launch Bay)',
    land: otherStudios,
    type: 'CHARACTER',
  },
  224093: {
    name: 'Disney Junior Pals (Animation Courtyard)',
    land: otherStudios,
    type: 'CHARACTER',
  },
  18368386: {
    name: 'Mickey & Minnie (Red Carpet Dreams)',
    land: otherStudios,
    geo: [28.3560952, -81.5594433],
    type: 'CHARACTER',
  },
  19205017: {
    name: 'Edna Mode (Edna Mode Experience)',
    land: otherStudios,
    type: 'CHARACTER',
  },
  18368385: {
    name: 'Olaf (Celebrity Spotlight)',
    land: echoLake,
    geo: [28.3562836, -81.55906],
    type: 'CHARACTER',
  },
  19259335: {
    name: "Mickey & Minnie's Runaway Railway",
    land: hollywood,
    geo: [28.3567406, -81.5606842],
    tier: 1,
    priority: 2.0,
    avgWait: 55,
    highlight: true,
  },
  19263735: {
    name: 'Millennium Falcon: Smugglers Run',
    land: starWars,
    geo: [28.353862, -81.5616967],
    tier: 1,
    priority: 3.1,
    avgWait: 49,
    highlight: true,
    dropTimes: ['10:47', '15:47'],
  },
  80010151: {
    name: 'Muppet*Vision 3D',
    land: otherStudios,
    geo: [28.3550576, -81.5595],
    avgWait: 10,
  },
  80010182: {
    name: "Rock 'n' Roller Coaster",
    land: hollywood,
    geo: [28.3597607, -81.5606022],
    tier: 1,
    priority: 2.1,
    avgWait: 62,
    highlight: true,
  },
  18904138: {
    name: 'Slinky Dog Dash',
    land: toyStory,
    geo: [28.3562472, -81.5628474],
    tier: 1,
    priority: 1.0,
    avgWait: 79,
    highlight: true,
    dropTimes: ['13:17', '15:47'],
  },
  80010193: {
    name: 'Star Tours',
    land: echoLake,
    geo: [28.3557799, -81.5588696],
    avgWait: 17,
  },
  19263736: {
    name: 'Rise of the Resistance',
    land: starWars,
    geo: [28.3548829, -81.5604682],
    avgWait: 78,
    highlight: true,
  },
  209857: {
    name: 'Toy Story Mania',
    land: toyStory,
    geo: [28.3563865, -81.5619019],
    priority: 1.1,
    avgWait: 51,
    highlight: true,
    dropTimes: ['13:17', '15:47'],
  },
  80010218: {
    name: 'Twilight Zone Tower of Terror',
    land: hollywood,
    geo: [28.3595812, -81.5597695],
    priority: 1.2,
    avgWait: 52,
    highlight: true,
    dropTimes: ['13:17', '15:47'],
  },
  19260580: {
    name: 'Wonderful World of Animation',
    land: hollywood,
  },
  // Animal Kingdom
  19330300: {
    name: 'Animation Experience',
    land: rafikis,
    geo: [28.3652134, -81.5885522],
  },
  18665186: {
    name: 'Avatar Flight of Passage',
    land: pandora,
    geo: [28.3555698, -81.592292],
    avgWait: 86,
    highlight: true,
  },
  19581371: {
    name: 'Discovery Island Drummers Flotilla',
    land: discIsland,
  },
  80010123: {
    name: 'DINOSAUR',
    land: dinoland,
    geo: [28.3552805, -81.5884492],
    avgWait: 29,
    highlight: true,
  },
  26068: {
    name: 'Expedition Everest',
    land: asia,
    geo: [28.3584979, -81.587395],
    avgWait: 38,
    highlight: true,
    dropTimes: ['08:47', '12:47'],
  },
  19581372: {
    name: 'Feathered Friends in Flight',
    land: asia,
    geo: [28.3586675, -81.5900411],
  },
  12432: {
    name: 'Festival of the Lion King',
    land: africa,
    geo: [28.3581957, -81.5925823],
  },
  411550125: {
    name: 'Finding Nemo: The Big Blue and Beyond',
    land: dinoland,
    geo: [28.3574008, -81.5874145],
  },
  80010175: {
    name: 'Gorilla Falls Exploration Trail',
    land: africa,
  },
  18425797: {
    name: 'Harambe Village Acrobats',
    land: africa,
  },
  80010150: {
    name: "It's Tough to be a Bug",
    land: discIsland,
    geo: [28.3574356, -81.5900851],
    avgWait: 10,
  },
  80010154: {
    name: 'Kali River Rapids',
    land: asia,
    geo: [28.3592076, -81.5883195],
    avgWait: 15,
    dropTimes: ['13:47'],
  },
  80010157: {
    name: 'Kilimanjaro Safaris',
    land: africa,
    geo: [28.3592779, -81.5921478],
    avgWait: 53,
    highlight: true,
    dropTimes: ['08:47', '12:47'],
  },
  18435910: {
    name: 'Kora Tinga Tinga',
    land: africa,
  },
  80010164: {
    name: 'Maharajah Jungle Trek',
    land: asia,
  },
  17421326: {
    name: 'Mickey & Minnie (Adventurers Outpost)',
    land: discIsland,
    geo: [28.3579455, -81.5898647],
    type: 'CHARACTER',
  },
  411921961: {
    name: 'Moana (Character Landing)',
    land: discovery,
    type: 'CHARACTER',
  },
  18665185: {
    name: "Na'vi River Journey",
    land: pandora,
    geo: [28.3551663, -81.591708],
    priority: 1.0,
    avgWait: 58,
    highlight: true,
  },
  72877: {
    name: 'Tam Tam Drummers of Harambe',
    land: africa,
  },
  18447293: {
    name: 'Tree of Life Awakenings',
    land: discIsland,
    type: 'HOLIDAY',
  },
  80010228: {
    name: 'Triceratop Spin',
    land: dinoland,
  },
  16629705: {
    name: 'Viva Gaia Street Band',
    land: discIsland,
  },
  17821434: {
    name: 'Winged Encounters - The Kingdom Takes Flight',
    land: discIsland,
  },
};
