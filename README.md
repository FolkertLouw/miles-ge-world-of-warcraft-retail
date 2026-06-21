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
