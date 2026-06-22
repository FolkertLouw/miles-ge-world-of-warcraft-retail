# Item Taxonomy

The flat `entities/items/` folder does not scale for World of Warcraft.

Canonical item pages should use category-based paths. For armor, the canonical path is now slot-level.

## Canonical path patterns

### Armor items

Armor item pages should use:

```text
entities/items/armor/<armor-type>/<slot-folder>/<item-slug>.md
```

Examples:

```text
entities/items/armor/leather/shoulders/barbaric-shoulders.md
entities/items/armor/mail/legs/blue-chain-leggings.md
entities/items/armor/leather/back/dark-leather-cloak.md
```

### Non-armor items

Non-armor item pages should use:

```text
entities/items/<category>/<subcategory>/<item-slug>.md
```

For simple top-level categories without a useful subcategory, use:

```text
entities/items/<category>/<item-slug>.md
```

## Recipe path pattern

Recipe pages must use lowercase profession folders:

```text
entities/recipes/<profession>/<expansion>/<recipe-slug>.md
```

Correct:

```text
entities/recipes/leatherworking/classic-vanilla/murloc-scale-breastplate.md
```

Incorrect:

```text
entities/recipes/Leatherworking/classic-vanilla/murloc-scale-breastplate.md
```

## Import classification fields

Recipe CSV imports should include both recipe data and output item classification data.

Required MVP classification columns:

```csv
outputItemType,outputItemSubType,outputItemSlot,armorType,itemRole,itemCategoryPath
```

Important:

- `outputItemSlot` uses the normalized singular slot value.
- `itemCategoryPath` uses the canonical folder path after `entities/items/`.
- For armor, `itemCategoryPath` must include the slot-level folder.

Example values:

```csv
armor,leather,feet,leather,crafted-equipment,armor/leather/feet
armor,mail,legs,mail,crafted-equipment,armor/mail/legs
armor,leather,shoulder,leather,crafted-equipment,armor/leather/shoulders
armor,leather,wrist,leather,crafted-equipment,armor/leather/wrists
consumable,armor-kit,none,none,crafted-consumable,consumables/armor-kits
trade-good,leather,none,none,crafted-material,trade-goods/leather
trade-good,thread,none,none,reagent,trade-goods/thread
container,bag,bag,none,crafted-container,containers/bags
```

## Item class values

Use these normalized values for `outputItemType` and `itemClass`:

```text
armor
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
bag
none
unknown
```

## Armor slot folder mapping

Use singular values in data, but path-friendly slot folders in file paths.

```text
head      -> head
neck      -> neck
shoulder  -> shoulders
back      -> back
chest     -> chest
shirt     -> shirts
tabard    -> tabards
wrist     -> wrists
hands     -> hands
waist     -> waist
legs      -> legs
feet      -> feet
```

Example:

```text
equipmentSlot: shoulder
itemCategoryPath: armor/leather/shoulders
file path: entities/items/armor/leather/shoulders/barbaric-shoulders.md
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

## Canonical armor categories

```text
entities/items/armor/cloth/head/
entities/items/armor/cloth/shoulders/
entities/items/armor/cloth/back/
entities/items/armor/cloth/chest/
entities/items/armor/cloth/wrists/
entities/items/armor/cloth/hands/
entities/items/armor/cloth/waist/
entities/items/armor/cloth/legs/
entities/items/armor/cloth/feet/

entities/items/armor/leather/head/
entities/items/armor/leather/shoulders/
entities/items/armor/leather/back/
entities/items/armor/leather/chest/
entities/items/armor/leather/wrists/
entities/items/armor/leather/hands/
entities/items/armor/leather/waist/
entities/items/armor/leather/legs/
entities/items/armor/leather/feet/

entities/items/armor/mail/head/
entities/items/armor/mail/shoulders/
entities/items/armor/mail/back/
entities/items/armor/mail/chest/
entities/items/armor/mail/wrists/
entities/items/armor/mail/hands/
entities/items/armor/mail/waist/
entities/items/armor/mail/legs/
entities/items/armor/mail/feet/

entities/items/armor/plate/head/
entities/items/armor/plate/shoulders/
entities/items/armor/plate/back/
entities/items/armor/plate/chest/
entities/items/armor/plate/wrists/
entities/items/armor/plate/hands/
entities/items/armor/plate/waist/
entities/items/armor/plate/legs/
entities/items/armor/plate/feet/

entities/items/armor/shields/
```

## Canonical non-armor categories

```text
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

- Names ending in `Boots`, `Treads`, or similar footwear terms: slot `feet`, folder `feet`.
- Names ending in `Gloves`, `Gauntlets`, or similar hand terms: slot `hands`, folder `hands`.
- Names ending in `Bracers` or `Wristguards`: slot `wrist`, folder `wrists`.
- Names ending in `Belt`: slot `waist`, folder `waist`.
- Names ending in `Pants`, `Leggings`, or `Legguards`: slot `legs`, folder `legs`.
- Names ending in `Vest`, `Tunic`, `Armor`, `Breastplate`, `Jerkin`, `Harness`, `Hauberk`, or `Shirt`: slot `chest`, folder `chest` unless the item is explicitly a shirt.
- Names ending in `Shoulders`, `Pauldrons`, or `Epaulets`: slot `shoulder`, folder `shoulders`.
- Names ending in `Cloak` or `Cape`: slot `back`, folder `back`.
- Names ending in `Helm`, `Helmet`, `Cap`, or `Hat`: slot `head`, folder `head`.
- Names ending in `Bag`: `containers/bags`, slot `bag`.
- Names ending in `Armor Kit`: `consumables/armor-kits`, slot `none`.
- Names ending in `Leather`, `Hide`, `Scale`, `Thread`, `Dye`, `Pearl`, `Gem`, `Salt`, or similar materials: `trade-goods/<subcategory>`, slot `none`.

### Leatherworking armor type heuristics

For Leatherworking imports:

- If the output name contains `Scale`, `Chain`, `Mail`, `Hauberk`, `Breastplate`, `Pauldrons`, `Gauntlets`, or modern mail-style naming, prefer `armorType = mail` when the item is equipment.
- If the output name contains `Leather`, `Hide`, `Whelp`, `Barbaric`, `Guardian`, `Hillman`, `Dusky`, or other classic leather armor naming, prefer `armorType = leather` when the item is equipment.
- If uncertain, set `armorType = unknown` and add `needs-verification`.

## Current migration rule

The categorized slot-level path is the canonical item page.

Old flat item pages and older non-slot item folders may temporarily remain as compatibility stubs while recipe links are migrated.

Example:

```text
Canonical: entities/items/armor/leather/shoulders/barbaric-shoulders.md
Old:       entities/items/armor/leather/barbaric-shoulders.md
Old:       entities/items/barbaric-shoulders.md
```

## Why

This prevents `entities/items/` from becoming a folder with tens of thousands of files.

It also helps MILES reason faster because category, armor type and equipment slot are encoded in the path and the item record exposes class, role, armor type, equipment slot, and source quality.

## Data quality

CSV-generated classifications may be inferred from names and Wowhead table context.

When inferred, keep `needs-verification` in tags until the item is confirmed against a trusted structured source.
