# Agent Query Flow — Generic Game Data

Status: `agent_usage_standard_candidate`  
Scope: all game datasets in this repository family  
Purpose: define how MILES and related agents should answer game-data questions from repository-backed data.

This document is the generic standard. Dataset-specific documents, such as Eye of Azshara, should follow this pattern and only add local paths, known gaps, and dataset-specific caveats.

## Core principle

Use the most processed reliable layer first, then fall back to lower layers only when needed.

Default order:

1. `generated/indexes/` — fast relation lookup and routing.
2. `normalized/` — machine-readable structured source of truth or candidate truth.
3. `entities/` — readable pages for human/AI narrative context.
4. `raw-imports/` — evidence layer, debugging, source inspection, and re-extraction.

Do not answer from raw imports as the primary source when generated or normalized data exists.

## Repository layer roles

### `raw-imports/`

Purpose:

- preserve original or extracted source material
- preserve discovery notes
- preserve compact source-derived tables
- support auditability and re-extraction

Use for:

- checking where a claim came from
- debugging bad normalized data
- filling missing fields
- resolving source conflicts

Do not use as:

- final truth
- direct answer source when normalized/generated data exists
- hidden evidence for confident claims

### `normalized/`

Purpose:

- structured data used as the main machine-readable layer
- stable identifiers
- normalized dungeon, boss, item, route, loot and scaling data
- confidence and verification status

Use for:

- dungeon structure
- boss details
- loot candidates or verified loot
- route metadata
- scaling rules
- item/entity relationships

Normalized files may still be candidate data. Always read their status fields.

### `generated/indexes/`

Purpose:

- fast lookup maps generated from normalized data
- relation discovery for agents
- routing from user terms to entity paths

Use first for:

- dungeon to bosses
- boss to loot
- item to source
- NPC ID to boss
- zone ID to dungeon
- entity page lookup
- cross-dataset navigation

Generated indexes should not invent facts. They should point back to normalized/entity sources.

### `entities/`

Purpose:

- human-readable pages
- concise summaries
- agent-friendly explanations
- route/mechanic/lore context

Use for:

- readable answers
- mechanics summaries
- route summaries
- lore/flavor
- explaining data to users

Do not use entity pages as the only source for structured relation questions if indexes and normalized data exist.

## Standard query flows

## 1. Dungeon overview questions

Examples:

- What bosses are in this dungeon?
- What is the boss order?
- Is the final boss locked?
- What is the rough route?

Read in order:

1. `generated/indexes/dungeon-to-bosses.json` or dataset equivalent.
2. `normalized/.../dungeon.json`.
3. `normalized/.../bosses.json`.
4. Dungeon entity page.

Answer with:

- dungeon name
- boss order
- unlock requirements
- route caveats
- confidence status

## 2. Boss questions

Examples:

- What does this boss do?
- Where is this boss?
- What should tank/healer/DPS watch for?
- Which boss is most annoying?

Read in order:

1. Entity/page index to resolve boss ID or NPC ID.
2. `normalized/.../bosses.json`.
3. Boss entity page.
4. Raw imports only if normalized/entity data is missing or disputed.

Answer with:

- boss name
- location/map pin if available
- key mechanics
- role notes
- confidence status

## 3. Item source questions

Examples:

- Which boss drops item X?
- Where can I get item X?
- Is this item in this dungeon?

Read in order:

1. `generated/indexes/item-to-source*.json`.
2. `generated/indexes/boss-to-loot*.json`.
3. Relevant normalized loot file.
4. Relevant boss or dungeon entity page.

Answer with:

- item name and ID if available
- candidate or verified source
- boss/dungeon path
- confidence status
- verification warning if needed

If no item is found, say the repository does not currently contain that item in the relevant data set.

## 4. Boss loot questions

Examples:

- What does this boss drop?
- Which items can this boss drop?
- Which boss has the most possible upgrades?

Read in order:

1. `generated/indexes/boss-to-loot*.json`.
2. Relevant normalized loot file.
3. Boss entity page.

Answer with:

- candidate/verified item list
- item IDs
- slot/type if available
- confidence status

Do not present candidate loot as verified.

## 5. Upgrade value questions

Examples:

- Which dungeon is best for our group?
- Which boss is worth farming?
- Is this an upgrade for my character?

Read in order:

1. Dungeon and loot indexes.
2. Normalized loot data.
3. Item data, if available.
4. Scaling rules, if available.
5. Player current gear/input, if provided.

Before giving a strong recommendation, check or ask for:

- player class/spec
- current level
- current equipped gear
- item-level context
- group composition
- dungeon route/time
- source confidence

If this data is incomplete, give a rough estimate and state what is missing.

## 6. Route questions

Examples:

- How should we run this dungeon?
- Which boss first?
- Can we skip anything?

Read in order:

1. Dungeon entity page.
2. `normalized/.../dungeon.json`.
3. Boss entity pages.
4. Route/index files if present.
5. Raw imports only for source evidence or unresolved route notes.

Answer with:

- practical boss order
- unlock requirements
- known route caveats
- confidence status

Do not over-optimize routes unless route data is verified.

## 7. Lore or flavor questions

Examples:

- What is the story behind this boss?
- Why is this dungeon here?
- What is the lore of this zone?

Read in order:

1. Entity pages.
2. Normalized summaries.
3. Raw imports only if lore source text is needed.

Do not use loot indexes for lore questions.

## Confidence language

Use these terms consistently:

- `verified`: confirmed by a reliable later source, such as Blizzard API, in-game observation, or manually reviewed canonical data.
- `candidate`: extracted or inferred data that is useful but not yet final.
- `raw evidence`: original/imported material used for audit and extraction.
- `unknown`: the repository does not contain enough information.

Never hide uncertainty.

## Answering rules

When data is candidate:

> Based on the current candidate data, this item is linked to [source], but the source still needs verification.

When data is verified:

> This item is verified as a drop from [source].

When data is missing:

> I do not see this item in the current repository data for this dungeon.

When data conflicts:

> The repository has conflicting evidence. The normalized layer says X, while raw evidence suggests Y. Treat this as unresolved until reviewed.

## Dataset-specific docs

Each dungeon or dataset can add a specific usage doc under:

`docs/agent-usage/[dataset]-query-flow.md`

That file should include:

- exact paths
- known data quality issues
- available indexes
- confidence caveats
- local query examples
- next data improvements

Dataset-specific docs should not contradict this generic standard unless they clearly explain why.

## Do not do this

- Do not use raw imports as final truth.
- Do not present candidate data as verified.
- Do not generate confident upgrade advice without class/spec, item and scaling context.
- Do not create entity pages from noisy source rows without status warnings.
- Do not duplicate large normalized datasets inside Markdown pages.
- Do not bury source confidence; surface it in the answer.
