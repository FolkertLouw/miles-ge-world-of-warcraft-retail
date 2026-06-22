# Item Taxonomy

The flat `entities/items/` folder does not scale for World of Warcraft.

Canonical item pages should use category-based paths.

## Canonical path pattern

```text
entities/items/<category>/<subcategory>/<item-slug>.md
```

For simple top-level categories without a useful subcategory, use:

```text
entities/items/<category>/<item-slug>.md
```

## Import classification fields

Recipe CSV imports should include both recipe data and output item classification data.

Required MVP classification columns:

```csv
outputItemType,outputItemSubType,outputItemSlot,armorType,weaponType,itemRole,itemCategoryPath
```

Example values:

```csv
armor,leather,feet,leather,,crafted-equipment,armor/leather
armor,mail,legs,mail,,crafted-equipment,armor/mail
consumable,armor-kit,none,none,,crafted-consumable,consumables/armor-kits
trade-good,leather,none,none,,crafted-material,trade-goods/leather
trade-good,thread,none,none,,reagent,trade-goods/thread
container,bag,bag,none,,crafted-container,containers/bags
```

## Item class values

Use these normalized values for `outputItemType` and `itemClass`:

```text
armor
weapon
trade-good
consumable
container
quest
recipe
toy
mount
battle-pet
misc
unknown
```

## Armor type values

Use these normalized values for `armorType`:

```text
cloth
leather
mail
plate
shield
cosmetic
none
unknown
```

## Equipment slot values

Use these normalized values for `outputItemSlot` and `equipmentSlot`:

```text
head
neck
shoulder
back
chest
shirt
tabard
wrist
hands
waist
legs
feet
finger
trinket
main-hand
off-hand
one-hand
two-hand
ranged
held-in-off-hand
bag
none
unknown
```

## Item role values

Use these normalized values for `itemRole`:

```text
crafted-equipment
crafted-material
crafted-consumable
crafted-container
reagent
vendor-reagent
quest-item
recipe-item
unknown
```

## Canonical categories

```text
entities/items/armor/cloth/
entities/items/armor/leather/
entities/items/armor/mail/
entities/items/armor/plate/
entities/items/armor/shields/

entities/items/weapons/one-hand/
entities/items/weapons/two-hand/
entities/items/weapons/ranged/
entities/items/weapons/off-hand/

entities/items/trade-goods/leather/
entities/items/trade-goods/thread/
entities/items/trade-goods/cloth/
entities/items/trade-goods/dyes/
entities/items/trade-goods/vendor-reagents/
entities/items/trade-goods/scales/
entities/items/trade-goods/pearls/
entities/items/trade-goods/gems/
entities/items/trade-goods/elemental/
entities/items/trade-goods/metal-parts/
entities/items/trade-goods/other/

entities/items/consumables/armor-kits/
entities/items/consumables/elixirs/
entities/items/consumables/potions/
entities/items/consumables/other/

entities/items/containers/bags/
entities/items/crafting/relics/
entities/items/recipes/
entities/items/quest/
entities/items/keys/
entities/items/toys/
entities/items/mounts/
entities/items/battle-pets/
entities/items/misc/
```

## Category inference rules for CSV preparation

When preparing CSVs from Wowhead HTML, add `itemCategoryPath` where it can be inferred safely.

### Crafted outputs

- Names ending in `Boots`, `Treads`, or similar footwear terms: `armor/<armorType>`, slot `feet`.
- Names ending in `Gloves`, `Gauntlets`, or similar hand terms: `armor/<armorType>`, slot `hands`.
- Names ending in `Bracers` or `Wristguards`: `armor/<armorType>`, slot `wrist`.
- Names ending in `Belt`: `armor/<armorType>`, slot `waist`.
- Names ending in `Pants`, `Leggings`, or `Legguards`: `armor/<armorType>`, slot `legs`.
- Names ending in `Vest`, `Tunic`, `Armor`, `Breastplate`, `Jerkin`, `Harness`, `Hauberk`, or `Shirt`: `armor/<armorType>`, slot `chest` unless the item is explicitly a shirt.
- Names ending in `Shoulders`, `Pauldrons`, or `Epaulets`: `armor/<armorType>`, slot `shoulder`.
- Names ending in `Cloak` or `Cape`: `armor/<armorType>`, slot `back`.
- Names ending in `Helm`, `Helmet`, `Cap`, or `Hat`: `armor/<armorType>`, slot `head`.
- Names ending in `Bag`: `containers/bags`, slot `bag`.
- Names ending in `Armor Kit`: `consumables/armor-kits`, slot `none`.
- Names ending in `Leather`, `Hide`, `Scale`, `Thread`, `Dye`, `Pearl`, `Gem`, `Salt`, or similar materials: `trade-goods/<subcategory>`, slot `none`.

### Leatherworking armor type heuristics

For Leatherworking imports:

- If the output name contains `Scale`, `Chain`, `Mail`, `Hauberk`, `Breastplate`, `Pauldrons`, `Gauntlets`, or WoW Legion-style mail naming, prefer `armorType = mail` when the item is equipment.
- If the output name contains `Leather`, `Hide`, `Whelp`, `Barbaric`, `Guardian`, `Hillman`, `Dusky`, or other classic leather armor naming, prefer `armorType = leather` when the item is equipment.
- If uncertain, set `armorType = unknown` and add `needs-verification`.

## Current migration rule

The categorized path is the canonical page.

Old flat item pages may temporarily remain as compatibility stubs while recipe links are migrated.

Example:

```text
Canonical: entities/items/trade-goods/leather/light-leather.md
Old:       entities/items/light-leather.md
```

## Why

This prevents `entities/items/` from becoming a folder with tens of thousands of files.

It also helps MILES reason faster because category is encoded in the path and the item record exposes class, role, armor type, equipment slot, and source quality.

## Data quality

CSV-generated classifications may be inferred from names and Wowhead table context.

When inferred, keep `needs-verification` in tags until the item is confirmed against a trusted structured source.
