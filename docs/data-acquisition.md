# Data Acquisition

MILES GE should combine multiple data layers.

## Static game data

Possible sources:

- Blizzard Game Data APIs where available;
- Blizzard Profile APIs where available;
- open-source addon datasets where license/terms allow reuse;
- manual seed data for the MVP.

Avoid depending on restricted third-party scraping.

## Player and group state

Start with manual character profiles, then add addon export later.

Track:

- character name/realm;
- class/spec/role;
- level;
- equipped items;
- professions;
- bags/materials where explicitly exported;
- timestamp;
- source and confidence.

## Observed kill/drop data

In-game addon observations should track:

- session ID;
- character;
- zone/subzone;
- coordinates;
- mob ID/name;
- kill timestamp;
- loot items and quantities;
- skinning/mining/herbing results;
- contributor/source;
- client/game version if available.

Observed drop data should always show sample size and confidence.
