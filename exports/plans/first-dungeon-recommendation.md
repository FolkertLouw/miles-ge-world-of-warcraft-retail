# First Dungeon Recommendation Stub

Status: not ready / missing party and dungeon data.

## Question

> Given our current party, which dungeon should we run next and which bosses/items matter?

## Current answer quality

Not ready for real recommendation yet.

The repo currently needs:

- real or anonymized party data;
- current gear snapshots;
- one dungeon's boss list;
- boss loot tables;
- class/spec/role relevance per item;
- optional boss logic;
- route/checklist format.

## Future answer format

```text
Recommended dungeon:
- {{ dungeon_name }}

Why:
- Player 1 has X possible upgrades.
- Player 2 has Y possible upgrades.
- Optional boss A is worth killing because it drops Z.
- Optional boss B can be skipped unless the group wants lore/completion.

Checklist:
[ ] Queue/travel to dungeon
[ ] Kill Boss A for Player 1 upgrade chance
[ ] Kill Boss B only if nearby
[ ] Loot/verify item drops
[ ] Update character snapshots after run
```

## Immediate data needed from Folkert

For each party member:

- class;
- spec/role;
- level;
- current gear or at least weak slots;
- professions;
- goal for the session.

For the dungeon:

- chosen dungeon name;
- boss list;
- known item drops or source dataset.
