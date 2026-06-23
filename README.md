# MILES GE — World of Warcraft Retail

World of Warcraft Retail data, entity pages, imports and planning exports for MILES Game Intelligence.

## Purpose

This repository is the WoW Retail knowledge base for MILES GE. It should eventually allow an AI planner to answer questions like:

- Which dungeon should our group run next?
- Which bosses are worth killing for our party?
- What upgrades can drop for each character?
- What should I do with 100 Light Leather?
- What should I do with Perfect Deviate Scales?
- Which materials should I sell, keep, convert or craft with?
- What is the lore/context behind this zone, dungeon or questline?

## Current MVP

Start with a small Retail WoW validation set:

1. one active player group;
2. one dungeon or small dungeon set;
3. 10-20 items;
4. one character snapshot for Folkert;
5. one item economy test case: Light Leather;
6. one observed kill/loot session format;
7. one legacy material decision test case: Perfect Deviate Scales.

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

## AI navigation rules

Use these rules when answering player questions from the repo. The goal is not only to find a file, but to produce a useful action answer.

### General lookup order

1. Search for an exact entity page under [`entities/`](entities/).
2. Search generated relation indexes under [`generated/indexes/`](generated/indexes/) if they exist.
3. Search normalized JSON under [`normalized/`](normalized/) for structured values.
4. Search raw imports under [`raw-imports/`](raw-imports/) only as evidence when the curated layer is missing or unclear.
5. If the repo does not contain enough data, say exactly what is missing and give the best next data object to add.

### Material and item decision questions

For questions like:

```text
What should I do with Perfect Deviate Scales?
What should I do with 100 Light Leather?
Should I sell, keep, craft or farm this material?
```

Search in this order:

1. [`entities/items/<item-slug>.md`](entities/items/) — item identity, type, expansion, binding, stack size, known uses and direct advice.
2. [`generated/indexes/item-to-recipes.json`](generated/indexes/item-to-recipes.json) — recipes that consume the item.
3. [`entities/recipes/`](entities/recipes/) — crafted outputs, profession requirements, materials and whether the craft is useful.
4. [`generated/indexes/item-to-sources.json`](generated/indexes/item-to-sources.json) — mobs, zones, vendors, quests, drops, skinning/mining/herbalism sources.
5. [`entities/markets/`](entities/markets/) — auction-house observations, sale rate, region/realm pricing notes and value confidence.
6. [`entities/demand-board/`](entities/demand-board/) — known player demand, guild demand, transmog demand or future crafting requests.
7. [`entities/routes/`](entities/routes/) — if the answer involves farming more of the material.

The answer should contain:

- a direct recommendation: sell, keep, craft, vendor, mail to an alt, or investigate price first;
- what the item is used for;
- whether the use is power progression, profession leveling, transmog, collection, twinking, or legacy value;
- whether the decision depends on auction-house price or player goal;
- what data is missing if the repo cannot support a confident answer yet.

### Equipment upgrade questions

For questions like:

```text
Is this item an upgrade for my character?
What dungeon should we run for better gear?
```

Search in this order:

1. [`entities/characters/`](entities/characters/) — current character snapshot.
2. [`entities/items/`](entities/items/) — candidate item stats, slot, requirements and source.
3. [`entities/classes/`](entities/classes/) and [`entities/specs/`](entities/specs/) — stat relevance and role logic.
4. [`entities/instances/`](entities/instances/) — dungeon, boss and loot source.
5. [`generated/indexes/`](generated/indexes/) — item-to-source, boss-to-loot or character-to-upgrades indexes.
6. [`entities/plans/`](entities/plans/) or [`exports/`](exports/) — generated run plans.

The answer should explain whether the item is actually better, where it comes from and what the player should do next.

### Dungeon and farming route questions

For questions like:

```text
Where should I farm Deviate Scales?
Which dungeon should we run next?
Which bosses are worth killing?
```

Search in this order:

1. [`entities/instances/`](entities/instances/) — dungeon/raid structure, bosses and level relevance.
2. [`entities/npcs/`](entities/npcs/) — mobs, bosses, loot tables and skinning/mining/herbalism links.
3. [`entities/items/`](entities/items/) — target item page.
4. [`generated/indexes/`](generated/indexes/) — source and loot indexes.
5. [`entities/routes/`](entities/routes/) — route instructions, lockout notes and repeatability.
6. [`entities/groups/`](entities/groups/) and [`entities/characters/`](entities/characters/) — whether the current group can efficiently run it.

The answer should produce a practical route or run recommendation, not just a database description.

## Answer contract

Every player-facing answer should be concise and action-oriented:

```text
Recommendation: <what to do now>
Why: <main reason>
Uses: <crafting/progression/transmog/economy/collection>
Check first: <AH price, missing data, profession level, character goal>
Next action: <sell/craft/farm/store/import missing data>
Confidence: <high/medium/low based on repo evidence>
```

When repo data is incomplete, prefer this format:

```text
The repo does not yet contain enough data to answer this confidently.
To support this answer, add:
- entities/items/<item-slug>.md
- generated/indexes/item-to-recipes.json entry
- generated/indexes/item-to-sources.json entry
- optional market observation under entities/markets/
```

Do not invent missing values. Blank or unknown is allowed when source data is not present.

## First material decision test case

Use **Perfect Deviate Scales** as a concrete test case for item intelligence.

Minimum useful data to add:

```text
entities/items/perfect-deviate-scale.md
entities/recipes/<recipe-that-uses-perfect-deviate-scale>.md
generated/indexes/item-to-recipes.json
generated/indexes/item-to-sources.json
entities/markets/perfect-deviate-scale.md    # optional once AH data exists
entities/routes/wailing-caverns-deviate-materials.md    # optional once route data exists
```

Target question:

```text
What should I do with Perfect Deviate Scales?
```

Target answer type:

```text
Recommendation: Keep or sell depending on AH value; do not vendor until recipe uses and market value are checked.
Why: It is a legacy material, so its value is likely tied to crafting, collection, transmog/twinking or scarcity rather than current Retail power progression.
Uses: Link to recipes that consume it once imported.
Check first: Auction-house price, sale rate, recipe demand and whether Folkert has the profession/recipe.
Next action: Check item-to-recipes, item-to-sources and market observation; if missing, import this item as the first material decision test case.
Confidence: Based only on repo evidence until the item page and indexes are added.
```

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
