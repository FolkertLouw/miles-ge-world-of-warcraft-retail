# Eye of Azshara — Source Discovery

This folder stores raw or lightly processed source material for the Eye of Azshara dungeon import MVP.

## Current goal

Collect source material first, before deciding the final normalized JSON structure.

The first import target is:

- Zone / dungeon
- Bosses
- Notable mobs
- Loot tables
- Item-level scaling notes
- Source metadata

## Intake method

Folkert can paste copied Wowhead sections into ChatGPT. ChatGPT will then process the pasted material and write cleaned raw notes or structured discovery files into this folder.

## Source priority

1. User-pasted Wowhead sections and in-game observations.
2. Blizzard API raw JSON when available.
3. Later normalization into `normalized/legion/dungeons/eye-of-azshara/`.

## Open source questions

- Which fields can we reliably get from Wowhead pages?
- Which fields can we reliably get from Blizzard API?
- Where do loot tables come from most cleanly?
- How should item-level scaling be represented for leveling dungeons?
- Which trash mobs matter enough to import individually?

## Notes

Do not invent missing values. Unknown or blank is allowed during source discovery.
