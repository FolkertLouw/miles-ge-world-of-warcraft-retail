# WoW Retail MVP Scope

## First validation target

Validate whether MILES GE can use structured WoW Retail data to produce a useful group dungeon recommendation and execution checklist.

## MVP question

> Given our current party, levels, roles, gear and goals, which dungeon should we run next, which bosses matter and what upgrades can drop?

## Minimum data required

- Party members: class, spec, role, level and current gear.
- One dungeon: bosses, optional bosses and loot table.
- Items: slot, item level, class/spec relevance and acquisition source.
- Checklist output format.
- Source metadata for every fact.

## Secondary MVP question

> I have 100 Light Leather. What should I do with it?

Minimum data required:

- item page for Light Leather;
- vendor value;
- AH value placeholder;
- recipe/conversion relationships;
- profession use;
- sale-velocity classification;
- recommendation categories.

## Non-goals

- Do not model all of WoW first.
- Do not build a live addon first.
- Do not depend on scraping restricted third-party websites.
- Do not treat small observed drop samples as official drop rates.
