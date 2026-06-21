# Database Taxonomy

This repository is organized around MILES-readable entity types rather than a direct copy of any third-party website menu.

The goal is to eventually store enough World of Warcraft Retail data to support:

- planning;
- search;
- item intelligence;
- character/guild recommendations;
- dungeon/instance decisions;
- economy analysis;
- route generation;
- lore/context summaries;
- addon/checklist exports.

## Primary entity folders

### Items and collections

```text
entities/items/
entities/item-sets/
entities/transmog/
entities/mounts/
entities/toys/
entities/battle-pets/
entities/glyphs/
entities/currencies/
```

### Professions and crafting

```text
entities/professions/
entities/recipes/
entities/profession-traits/
entities/work-orders/
```

### Characters and builds

```text
entities/classes/
entities/specs/
entities/talents/
entities/spells/
entities/pvp-talents/
entities/races/
entities/resources/
entities/hunter-pets/
```

### World and content

```text
entities/zones/
entities/instances/
entities/quests/
entities/npcs/
entities/objects/
entities/factions/
entities/holidays/
entities/events/
```

### Progression and account systems

```text
entities/achievements/
entities/titles/
entities/reputations/
entities/expansions/
entities/patches/
```

### Media and metadata

```text
entities/icons/
entities/sounds/
```

### Player data and planning

```text
entities/characters/
entities/groups/
entities/routes/
entities/tasks/
entities/plans/
entities/markets/
entities/demand-board/
```

## Normalized data mirrors

Every entity area may later have a normalized machine-readable version under:

```text
normalized/<entity-type>/
```

For example:

```text
entities/items/light-leather.md
normalized/items/light-leather.json
```

## Generated indexes

Generated files should support lookup and relation queries, for example:

```text
generated/indexes/item-to-sources.json
generated/indexes/item-to-recipes.json
generated/indexes/recipe-to-items.json
generated/indexes/npc-to-loot.json
generated/indexes/zone-to-quests.json
generated/indexes/instance-to-bosses.json
generated/indexes/class-to-talents.json
```

## What not to copy blindly

Some source menus contain tools, calculators, duplicate categories or UI sections. These should not become primary data folders unless they represent actual data entities.

Examples of things that are better treated as generated tools/exports:

- dressing room;
- item finder;
- talent calculator;
- character planner;
- collection trackers;
- profiler.

These belong under:

```text
exports/
generated/
docs/tools/
```

not as core entity folders.

## Data confidence

Every imported or manually created fact should eventually include source metadata:

```text
source_type
source_name
source_url
observed_at
imported_at
confidence
sample_size
notes
```

This is especially important for observed drop rates, player gear snapshots and auction-house data.
