# Item Taxonomy

The flat `entities/items/` folder does not scale for World of Warcraft.

Canonical item pages should use category-based paths.

## Canonical path pattern

```text
entities/items/<category>/<subcategory>/<item-slug>.md
```

## Initial categories

```text
entities/items/trade-goods/leather/
entities/items/trade-goods/thread/
entities/items/trade-goods/vendor-reagents/
entities/items/consumables/armor-kits/
entities/items/armor/leather/
entities/items/armor/mail/
entities/items/containers/bags/
entities/items/crafting/relics/
```

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

It also helps MILES reason faster because category is encoded in the path.

## Future categories

Potential future folders:

```text
entities/items/weapons/
entities/items/armor/cloth/
entities/items/armor/leather/
entities/items/armor/mail/
entities/items/armor/plate/
entities/items/armor/shields/
entities/items/gems/
entities/items/glyphs/
entities/items/quest/
entities/items/keys/
entities/items/toys/
entities/items/mounts/
entities/items/battle-pets/
entities/items/misc/
```
