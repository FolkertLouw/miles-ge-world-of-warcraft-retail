# Agent Query Flow — Eye of Azshara

Status: `agent_usage_candidate`  
Scope: World of Warcraft Retail / Legion / Eye of Azshara  
Purpose: tell MILES how to answer dungeon, boss, loot, route, and upgrade questions using the current repository structure.

> Important: loot data for Eye of Azshara is currently candidate data. It is useful for routing and early reasoning, but it is not yet verified against Blizzard API or in-game observations.

## File layers

Use the repository layers in this order:

1. `generated/indexes/` for fast lookup and relation discovery.
2. `normalized/` for structured machine-readable dungeon and boss data.
3. `entities/` for readable dungeon and boss pages.
4. `raw-imports/` only when evidence or source debugging is needed.

Do not use raw imports as the primary answer source unless normalized/generated data is missing or disputed.

## Primary files

### Entity discovery

Use:

- `generated/indexes/entity-page-index.json`

This maps:

- dungeon ID to dungeon page
- boss ID to boss page
- NPC ID to boss ID
- zone ID 8040 to Eye of Azshara
- item source context to candidate loot indexes

### Dungeon structure

Use:

- `normalized/legion/dungeons/eye-of-azshara/dungeon.json`
- `generated/indexes/dungeon-to-bosses.json`
- `entities/instances/dungeons/legion/eye-of-azshara.md`

Use these for questions like:

- What bosses are in Eye of Azshara?
- What is the boss order?
- Is Wrath of Azshara locked behind other bosses?
- What is the general route or dungeon structure?

### Boss data

Use:

- `normalized/legion/dungeons/eye-of-azshara/bosses.json`
- `entities/npcs/bosses/legion/eye-of-azshara/*.md`

Use these for questions like:

- What does this boss do?
- Where is this boss located?
- What should tank/healer/DPS watch for?
- Which boss is mechanically annoying or dangerous?

### Loot candidates

Use:

- `normalized/legion/dungeons/eye-of-azshara/boss-loot-candidate.generated.json`
- `generated/indexes/boss-to-loot-candidates.json`
- `generated/indexes/item-to-source-candidates.json`

Use these for questions like:

- Which candidate items can this boss drop?
- Which boss might drop this item?
- Which Eye of Azshara boss has the most possible upgrades?

Always explain that these are candidate loot sources until verified.

## Query flows

## 1. User asks: "What bosses are in Eye of Azshara?"

Read:

1. `generated/indexes/dungeon-to-bosses.json`
2. `normalized/legion/dungeons/eye-of-azshara/bosses.json`
3. Optionally the dungeon entity page for a readable summary.

Answer with:

- boss order
- boss names
- NPC IDs if useful
- note that Wrath of Azshara is the final boss and requires the other bosses first

## 2. User asks: "What does Warlord Parjesh drop?"

Read:

1. `generated/indexes/boss-to-loot-candidates.json`
2. `normalized/legion/dungeons/eye-of-azshara/boss-loot-candidate.generated.json`
3. `entities/npcs/bosses/legion/eye-of-azshara/warlord-parjesh.md`

Answer with:

- candidate items
- slot/type if available
- warning that the drop source is not yet verified

Do not present candidate loot as confirmed final truth.

## 3. User asks: "Which boss drops item X?"

Read:

1. `generated/indexes/item-to-source-candidates.json`
2. If found, follow the boss ID to `entity-page-index.json`
3. Use the boss page for readable context

Answer with:

- likely/candidate boss source
- confidence status
- source path or boss page path
- whether verification is still needed

If the item is not in the candidate index, say it is not currently in the Eye of Azshara candidate loot set.

## 4. User asks: "Is this a real boss drop?"

Read:

1. `generated/indexes/item-to-source-candidates.json`
2. `normalized/legion/dungeons/eye-of-azshara/boss-loot-candidate.generated.json`
3. `raw-imports/legion/dungeons/eye-of-azshara/source-discovery/` only if evidence is needed

Answer with one of:

- candidate only, not verified
- not found in candidate data
- verified only if a later verified source exists

Current state: Eye of Azshara boss loot is candidate data, not verified final loot.

## 5. User asks: "Which dungeon is best for upgrades?"

For Eye of Azshara only, read:

1. `generated/indexes/boss-to-loot-candidates.json`
2. `generated/indexes/item-to-source-candidates.json`
3. `normalized/legion/dungeons/eye-of-azshara/boss-loot-candidate.generated.json`

Then ask or infer:

- player class/spec
- current level
- current equipped item slots
- item level context
- group composition if comparing group value

Do not answer upgrade value purely from boss loot candidates unless the user only wants a rough estimate.

For a real upgrade score, MILES needs:

- candidate item slot
- current equipped slot
- class/spec usability
- item level/scaling context
- duplicate slot overlap across the group
- time/route difficulty

## 6. User asks: "How should we run Eye of Azshara?"

Read:

1. `entities/instances/dungeons/legion/eye-of-azshara.md`
2. `normalized/legion/dungeons/eye-of-azshara/dungeon.json`
3. all relevant boss entity pages

Answer with:

- practical route
- boss order
- key mechanics
- final boss unlock requirement
- any movement/healer/tank notes

Avoid over-optimizing route until route data is verified.

## 7. User asks lore or flavor questions

Use:

- dungeon entity page
- boss entity pages
- normalized boss summaries

Do not use loot indexes for lore questions.

## Confidence policy

Use these words consistently:

- `verified` only for data confirmed by a reliable later source.
- `candidate` for extracted Wowhead table-derived data not yet verified.
- `raw evidence` for original imported source material.
- `unknown` when the repo does not yet contain enough data.

## Current data quality notes

Current Eye of Azshara data is good enough for:

- boss order
- boss page navigation
- rough mechanics summaries
- candidate loot lookup
- early item-source reasoning

Current Eye of Azshara data is not yet good enough for:

- final confirmed boss loot truth
- exact upgrade scoring
- item stat comparison
- exact item-level scaling per player context
- final dungeon-worth recommendation across multiple dungeons

## Recommended next data improvements

1. Add Blizzard API or in-game verified loot source flags.
2. Add item stat/entity files for candidate drops.
3. Add class/spec usability fields.
4. Add item-level scaling rules by player context.
5. Add route/time estimates.
6. Add player inventory/current gear input format.

## Answer style for MILES

When answering from candidate data, prefer this style:

> Based on the current Eye of Azshara candidate data, this item is linked to Warlord Parjesh, but the loot source still needs verification. Use it as a likely source, not final truth.

When answering from verified future data, prefer this style:

> This item is verified as a drop from Warlord Parjesh.

## Do not do this

- Do not cite raw Wowhead rows as final truth.
- Do not hide uncertainty.
- Do not generate item pages directly from unverified candidate loot without a warning.
- Do not mix route advice and loot certainty unless both are relevant to the question.
