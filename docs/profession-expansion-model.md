# Profession Expansion Model

Professions should be stored by profession and expansion/system layer, not as one massive page.

## Canonical path pattern

```text
entities/professions/<profession>/README.md
entities/professions/<profession>/classic-vanilla.md
entities/professions/<profession>/the-burning-crusade.md
entities/professions/<profession>/wrath-of-the-lich-king.md
entities/professions/<profession>/cataclysm.md
entities/professions/<profession>/mists-of-pandaria.md
entities/professions/<profession>/warlords-of-draenor.md
entities/professions/<profession>/legion.md
entities/professions/<profession>/battle-for-azeroth.md
entities/professions/<profession>/shadowlands.md
entities/professions/<profession>/dragonflight.md
entities/professions/<profession>/the-war-within.md
entities/professions/<profession>/midnight.md
```

Create expansion pages only when there is data to store or a planned import target.

## Recipe path pattern

```text
entities/recipes/<profession>/<expansion>/README.md
normalized/recipes/<profession>/<expansion>/index.json
```

Individual recipe pages may later use:

```text
entities/recipes/<profession>/<expansion>/<recipe-slug>.md
normalized/recipes/<profession>/<expansion>/<recipe-slug>.json
```

## Rule

Do not duplicate recipe data in multiple places manually. The normalized recipe should be the machine-readable source of truth. Markdown pages should be generated or lightly curated from that data.
