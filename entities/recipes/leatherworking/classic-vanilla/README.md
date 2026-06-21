# Leatherworking Recipes — Classic / Vanilla

## Status

Initial seed. Not yet a complete verified recipe database.

This page is the canonical index for Classic / Vanilla Leatherworking recipes in MILES GE.

## Purpose

This index should eventually answer:

- Which recipes use Light Leather?
- Which recipes are useful for leveling Leatherworking?
- Which recipes create sellable gear or transmog?
- Which materials are in demand because of Leatherworking recipes?
- What should I craft with a given inventory?

## Recipe categories

- Materials / conversions
- Light leather armor
- Medium leather armor
- Heavy leather armor
- Thick leather armor
- Rugged leather armor
- Armor kits
- Specialty recipes
- Quest/reputation/vendor/drop patterns

## Starter recipe seeds

These are starter placeholders around the Light Leather economy test. Exact item IDs, skill requirements and material quantities still need verification before recommendation use.

| Recipe | Output item | Main material | Status |
|---|---|---|---|
| Light Armor Kit | Light Armor Kit | Light Leather | Needs verification |
| Handstitched Leather Boots | Handstitched Leather Boots | Light Leather | Needs verification |
| Handstitched Leather Bracers | Handstitched Leather Bracers | Light Leather | Needs verification |
| Handstitched Leather Cloak | Handstitched Leather Cloak | Light Leather | Needs verification |
| Embossed Leather Vest | Embossed Leather Vest | Light Leather | Needs verification |
| Embossed Leather Boots | Embossed Leather Boots | Light Leather | Needs verification |
| Embossed Leather Gloves | Embossed Leather Gloves | Light Leather | Needs verification |
| Medium Armor Kit | Medium Armor Kit | Medium Leather | Needs verification |

## Import target

The full Classic / Vanilla Leatherworking recipe list should be imported from a verified source or dataset, then normalized into:

```text
normalized/recipes/leatherworking/classic-vanilla/index.json
normalized/recipes/leatherworking/classic-vanilla/<recipe-slug>.json
entities/recipes/leatherworking/classic-vanilla/<recipe-slug>.md
```

## Required fields per recipe

- Recipe ID
- Recipe name
- Profession
- Expansion/system layer
- Skill requirement
- Source: trainer/vendor/drop/quest/reputation/unknown
- Output item ID/name/quantity
- Input items and quantities
- Required tools/stations if relevant
- Classes/specs/roles that may care about output
- Market value model
- Sale velocity
- Source metadata and confidence
