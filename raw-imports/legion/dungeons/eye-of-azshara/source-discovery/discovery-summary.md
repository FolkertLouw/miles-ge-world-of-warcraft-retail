# Eye of Azshara Source Discovery Summary

Status: raw source discovery checkpoint  
Dungeon: Eye of Azshara  
Expansion: Legion  
Source layer: Wowhead pasted pages, extracted into repo-safe JSON/CSV files  
Created: 2026-06-23

## Purpose

This file summarizes what has been collected so far before moving into normalized dungeon data.

The goal of this phase is not to create perfect entity pages yet. The goal is to understand what the raw sources provide, where the data is useful, and where the data contains noise that must be filtered later.

## Files created so far

### Dungeon-level discovery

- `wowhead-zone-8040-extracted.json`
- `discovery-status.md`
- `discovery-summary.md`  

### Boss-level discovery files

#### Warlord Parjesh

- `wowhead-npc-91784-warlord-parjesh-extracted.json`
- `wowhead-npc-91784-warlord-parjesh-drops-tiny.json`

Note: the Parjesh drops file is an early tiny/partial extraction. It should not be treated as the final compact drops table.

#### Lady Hatecoil

- `wowhead-npc-91789-lady-hatecoil-extracted.json`
- `wowhead-npc-91789-lady-hatecoil-drops-compact.csv`
- `wowhead-npc-91789-lady-hatecoil-drops-tiny.json`

Note: the tiny drops file has been superseded by the compact CSV.

#### Serpentrix

- `wowhead-npc-91808-serpentrix-extracted.json`
- `wowhead-npc-91808-serpentrix-drops-compact.csv`

#### King Deepbeard

- `wowhead-npc-91797-king-deepbeard-extracted.json`
- `wowhead-npc-91797-king-deepbeard-drops-compact.csv`

#### Wrath of Azshara

- `wowhead-npc-96028-wrath-of-azshara-extracted.json`
- `wowhead-npc-96028-wrath-of-azshara-drops-compact.csv`

## Boss discovery overview

| Order | Boss | NPC ID | Type | Map pin | Drops rows | Abilities | Notes |
|---:|---|---:|---|---|---:|---:|---|
| 1 | Warlord Parjesh | 91784 | Humanoid | 54.6, 68.3 | 124 | 13 | First boss; boss page useful for encounter and drop discovery. Drops extraction was early/tiny and should be revisited. |
| 2 | Lady Hatecoil | 91789 | Humanoid | 45.9, 50.0 | 126 | 1 page-tab / multiple encounter mechanics | Shielded by Hatecoil Arcanists before pull. Source conflicts on whether two, three, or four Arcanists matter in practice. |
| 3 | Serpentrix | 91808 | Beast | 56.3, 35.0 | 126 | 8 | Trash-heavy area. Clear extra trash. Submerges at 66% and 33%; Rampage must be interrupted. |
| 4 | King Deepbeard | 91797 | Humanoid | 68.2, 51.2 | 120 | 9 | Single-target fight. Gaseous Bubbles / Explosion and Quake / Aftershock are important mechanics. |
| 5 | Wrath of Azshara | 96028 | Elemental | 57.7, 53.6 | 136 | 16 | Final boss. Requires other four bosses first, then four Naga summoners before engagement. Heavy movement fight. |

## Health values captured from boss pages

| Boss | Normal | Heroic | Mythic Dungeon |
|---|---:|---:|---:|
| Lady Hatecoil | 38,927,471 | 63,257,112 | 82,234,248 |
| Serpentrix | 38,927,471 | 62,561,980 | 81,330,576 |
| King Deepbeard | 41,151,900 | 66,871,808 | 86,933,344 |
| Wrath of Azshara | 95,399,036 | 325,322,304 | 422,919,008 |

Warlord Parjesh health values were not included in the current summary and should be rechecked from the extracted JSON or original source if needed.

## Route and unlock notes found

### Dungeon / boss order

The dungeon has five boss encounters:

1. Warlord Parjesh
2. Lady Hatecoil
3. Serpentrix
4. King Deepbeard
5. Wrath of Azshara

### Lady Hatecoil unlock note

Lady Hatecoil is protected by Arcane Shielding before the fight.

The article text says the shielding is provided by four Hatecoil Arcanists. Comments suggest that in practice two or three Arcanists may be enough, depending on the route/version/run context.

This should be stored later as a route note with `confidence: mixed`.

### Serpentrix route note

Serpentrix has a trash-heavy area. Several comments strongly recommend clearing more trash than seems necessary before pulling the boss.

Important route/mechanic points:

- Clear surrounding trash first.
- Stormwake Hydras are called out as especially important trash.
- At 66% and 33%, Serpentrix submerges and reappears at another pool.
- Rampage must be interrupted quickly.
- Hydra spawns should be focus-fired.
- A comment suggests doing Serpentrix before Hatecoil to avoid winds/seagulls.
- Ghostly Brazier around 26.0, 31.6 can summon Dread Captain Thedon for `Eye of Azshara: Dread End`.

### Wrath of Azshara unlock note

Wrath of Azshara is the final boss and should not be treated as immediately pullable.

Important unlock points:

- All four other bosses must be defeated first.
- Four Naga summoners around Wrath of Azshara must be defeated before the boss can be engaged.
- Comments confirm that trying to kill the boss before the others leads to lethal lightning.

## Encounter mechanic notes found

### Lady Hatecoil

- Static Nova: move onto sand dunes.
- Focused Lightning: move away from sand dunes to avoid destroying them.
- Beckon Storm: summons Saltsea Globules.
- Curse of the Witch: curse removal creates a frontal cone blast.
- Monsoon appears as a higher difficulty mechanic.
- Crackling Thunder punishes leaving the arena.

### Serpentrix

- Poison Spit changes behavior depending on wind direction.
- Toxic Wound creates Toxic Puddles.
- Submerge happens at 66% and 33%.
- Rampage is interruptible and dangerous.
- Blazing Hydra Spawn has Blazing Nova.
- Arcane Hydra Spawn appears on higher difficulties and can stack Arcane Charge.

### King Deepbeard

- Call the Seas: avoid repeated frost damage.
- Gaseous Bubbles: absorb shield should be depleted before explosion.
- Ground Slam: tank/party movement check.
- Quake: spread / move.
- Aftershock appears on Mythic / Mythic+ contexts.

### Wrath of Azshara

- Massive Deluge: frontal/area tank movement mechanic.
- Mystic Tornado: avoid tornado spawns.
- Arcane Bomb: healer dispel, then players avoid detonation area.
- Raging Storms: triggered when no enemy is in melee range.
- Crushing Depths: split damage mechanic on higher difficulties.
- Heaving Sands: melee attacks trigger party damage.
- Elemental Resonance: lingering stacking damage effects on higher difficulties.
- Cry of Wrath: 10% health storm intensification.
- Violent Winds, Lightning Strike and Tidal Wave become important environmental hazards.

## Data quality findings

### 1. Boss pages are useful, but drops tables include noise

Boss pages are useful for:

- NPC identity
- map pin
- quick facts
- encounter journal text
- role notes
- spell/mechanic names and IDs
- related drops table
- some route/unlock notes from comments

However, the drops tables are not automatically clean boss loot tables.

They include a mix of:

- likely actual boss drops
- zone drops
- quest items
- currencies
- Timewalking rows
- profession-related rows
- event/holiday rows
- world-drop or global rows
- rows with difficulty/season/phase variants

Therefore, the next phase must classify each drop row before using it for recommendations.

### 2. `Source` column matters

The drops CSVs include a source-like field from the Wowhead table. This should be used as an initial classifier.

Possible categories to derive:

- `boss_drop`
- `zone_drop`
- `quest_item`
- `currency`
- `timewalking`
- `profession_material`
- `holiday_or_event`
- `unknown`

### 3. Difficulty and item-level data are present but not enough for final scaling

The Wowhead tables include mode, item level and required level rows, but this is not enough to create a reliable modern scaling model.

We still need to separate:

- historical Legion data
- current retail scaling
- Timewalking rows
- Chromie Time / leveling context
- normal / heroic / mythic / mythic+ differences
- observed run results from the user's group

### 4. Comments are useful but lower confidence

Comments provide valuable route and practical notes, especially for unlocks and trash. But they can be outdated or version-specific.

Store comment-derived facts later with lower confidence unless confirmed by article text, Blizzard API, or in-game observation.

## What is still missing

### High priority

1. A cleaned boss-to-loot candidate file.
2. A classification pass for all drop rows.
3. A Blizzard API comparison for official instance / encounter / item metadata.
4. A clear item-level scaling strategy.
5. A first normalized dungeon file.

### Medium priority

1. Trash mob extraction from the zone page.
2. Quest/objective extraction from the zone page and boss pages.
3. Route notes file.
4. Boss mechanic JSON.
5. Spell ID mapping.

### Later

1. Group character snapshots.
2. Upgrade scoring per group member.
3. Class/spec usefulness.
4. Market/transmog/profession value enrichment.
5. Generated markdown entity pages.

## Recommended next step

Create the first normalized candidate from the raw files:

`normalized/legion/dungeons/eye-of-azshara/boss-loot-candidate.json`

Purpose:

- Combine all boss drop CSVs into one file.
- Keep raw row data mostly intact.
- Add a first-pass `drop_classification` field.
- Do not remove noisy rows yet.
- Mark uncertain rows as `unknown` rather than guessing.

Suggested fields:

```json
{
  "dungeon_id": "eye-of-azshara",
  "boss_id": "lady-hatecoil",
  "boss_npc_id": 91789,
  "item_id": 134505,
  "item_name": "Horizon Line Warboots",
  "mode": "Normal",
  "item_level": 50,
  "required_level": 5,
  "slot": "Feet",
  "source_text": "Lady Hatecoil / Eye of Azshara",
  "type_text": "Plate",
  "count_text": "...",
  "drop_percent_text": "...",
  "drop_classification": "unknown",
  "confidence": "low",
  "notes": "First-pass classification only. Needs validation."
}
```

## Current recommendation

Do not create final entity pages yet.

First create `boss-loot-candidate.json`, because the largest open question is whether Wowhead boss-page drops can be reliably converted into boss-specific loot data.
