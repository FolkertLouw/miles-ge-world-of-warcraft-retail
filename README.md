# MILES GE — World of Warcraft Retail

World of Warcraft Retail data, entity pages, imports and planning exports for MILES Game Intelligence.

## Purpose

This repository is the WoW Retail knowledge base for MILES GE. It should eventually allow an AI planner to answer questions like:

- Which dungeon should our group run next?
- Which bosses are worth killing for our party?
- What upgrades can drop for each character?
- What should I do with 100 Light Leather?
- Which materials should I sell, keep, convert or craft with?
- What is the lore/context behind this zone, dungeon or questline?

## Current MVP

Start with a small Retail WoW validation set:

1. one active player group;
2. one dungeon or small dungeon set;
3. 10-20 items;
4. one character snapshot for Folkert;
5. one item economy test case: Light Leather;
6. one observed kill/loot session format.

## Repository structure

```text
raw-imports/      # raw addon/API/manual imports; evidence layer
normalized/       # structured machine-readable source of truth
entities/         # human/AI-readable Markdown pages
generated/        # generated indexes and addon-ready files
exports/          # plans, checklists, routes and recommendations
schemas/          # WoW-specific schema extensions
docs/             # design notes and contribution rules
examples/         # minimal samples used for validation
templates/        # reusable entity/import templates
```

## Database navigation

### Items and collections

- [`entities/items/`](entities/items/) — equipment, consumables, trade goods, quest items, keys, miscellaneous items.
- [`entities/item-sets/`](entities/item-sets/) — class sets, transmog sets and other item collections.
- [`entities/transmog/`](entities/transmog/) — transmog items, outfits and appearance groupings.
- [`entities/mounts/`](entities/mounts/) — mounts and acquisition paths.
- [`entities/toys/`](entities/toys/) — toy box entries and acquisition paths.
- [`entities/battle-pets/`](entities/battle-pets/) — pet species, abilities and collection logic.
- [`entities/glyphs/`](entities/glyphs/) — glyphs and class/spec relevance.
- [`entities/currencies/`](entities/currencies/) — currencies by expansion/system/source.

### Professions and crafting

- [`entities/professions/`](entities/professions/) — primary and secondary professions.
- [`entities/recipes/`](entities/recipes/) — crafting recipes, inputs, outputs and profitability logic.
- [`entities/profession-traits/`](entities/profession-traits/) — profession specialization/trait systems.
- [`entities/work-orders/`](entities/work-orders/) — work-order relevant data and demand logic.

### Characters and builds

- [`entities/classes/`](entities/classes/) — classes and class-level metadata.
- [`entities/specs/`](entities/specs/) — specializations, roles and build relevance.
- [`entities/talents/`](entities/talents/) — talents and build paths.
- [`entities/spells/`](entities/spells/) — spells, abilities, passives and item effects.
- [`entities/pvp-talents/`](entities/pvp-talents/) — PvP talents and PvP build logic.
- [`entities/races/`](entities/races/) — races, allied races and racial traits.
- [`entities/resources/`](entities/resources/) — class resources such as mana, rage, energy, combo points, runes, etc.
- [`entities/hunter-pets/`](entities/hunter-pets/) — hunter pet families, specs and abilities.

### World and content

- [`entities/zones/`](entities/zones/) — continents, zones, cities, class halls, player housing and world regions.
- [`entities/instances/`](entities/instances/) — dungeons, raids, delves, battlegrounds, arenas and scenarios.
- [`entities/quests/`](entities/quests/) — quests, campaigns, recurring quests and questlines.
- [`entities/npcs/`](entities/npcs/) — mobs, bosses, vendors, trainers, battle pets and other NPCs.
- [`entities/objects/`](entities/objects/) — chests, herbs, mining nodes, books, treasures, fishing pools and interactable objects.
- [`entities/factions/`](entities/factions/) — factions and reputation groups.
- [`entities/holidays/`](entities/holidays/) — seasonal holidays and their rewards.
- [`entities/events/`](entities/events/) — recurring events, bonus events, timewalking and world events.

### Progression and account systems

- [`entities/achievements/`](entities/achievements/) — character, guild, legacy and feat achievements.
- [`entities/titles/`](entities/titles/) — titles and acquisition methods.
- [`entities/reputations/`](entities/reputations/) — reputation progressions, rewards and routes.
- [`entities/expansions/`](entities/expansions/) — expansion groupings and expansion-level systems.
- [`entities/patches/`](entities/patches/) — patch/version metadata and added/changed content.

### Media and metadata

- [`entities/icons/`](entities/icons/) — icon references by entity.
- [`entities/sounds/`](entities/sounds/) — sound/music references where useful.

### Player data and planning

- [`entities/characters/`](entities/characters/) — player character snapshots and anonymized profiles.
- [`entities/groups/`](entities/groups/) — party, guild or team profiles.
- [`entities/routes/`](entities/routes/) — farming, leveling, dungeon and collection routes.
- [`entities/tasks/`](entities/tasks/) — checklist/task entities.
- [`entities/plans/`](entities/plans/) — generated or manually curated plans.
- [`entities/markets/`](entities/markets/) — AH/economy observations and value models.
- [`entities/demand-board/`](entities/demand-board/) — future player demand, buy/sell/craft requests.

See [`docs/database-taxonomy.md`](docs/database-taxonomy.md) for the broader taxonomy and design notes.

## Source-of-truth model

```text
Raw imports = evidence
Normalized data = structured truth database
Markdown entity pages = human/AI-readable knowledge layer
Generated files = addon/runtime layer
Exports = task/checklist/plan outputs
```

## Privacy rule

Do not commit private player data unless it is your own data or the player has explicitly agreed.

For MVP, use manual or anonymized group profiles where needed.

## Relationship to core schemas

Shared schema concepts live in:

```text
FolkertLouw/miles-ge-core
```

This repo may extend those schemas for World of Warcraft-specific fields such as item level, class/spec relevance, dungeon boss loot, auction-house value and character equipment snapshots.
