# {{ item_name }}

## Basic info

- Item ID: {{ item_id }}
- Quality: {{ quality }}
- Category: {{ category }}
- Subtype: {{ subtype }}
- Stack size: {{ stack_size }}
- Vendor sell value: {{ vendor_sell_value }}
- Last updated: {{ last_updated }}

## What can I do with this item?

| Option | Expected value | Speed | Risk | Notes |
|---|---:|---|---|---|
| Sell to vendor | {{ vendor_value }} | Instant | None | Vendor floor |
| Sell on Auction House | {{ ah_value }} | {{ sale_velocity }} | Market risk | Requires AH data |
| Use in recipe | {{ crafting_value }} | {{ crafting_speed }} | Depends | See recipes below |
| Keep for profession | — | — | Opportunity cost | Useful if leveling {{ profession }} |

## Sources

| Source type | Source | Confidence | Notes |
|---|---|---|---|
| {{ source_type }} | {{ source_name }} | {{ confidence }} | {{ notes }} |

## Obtained from

| Source | Type | Drop/observation count | Notes |
|---|---|---:|---|
| {{ source_name }} | {{ source_type }} | {{ count }} | {{ notes }} |

## Used in recipes

| Recipe | Input qty | Output | Output value | Notes |
|---|---:|---|---:|---|
| {{ recipe_name }} | {{ input_qty }} | {{ output_item }} | {{ output_value }} | {{ notes }} |

## Recommendation logic

- Quickest value: {{ quickest_value_recommendation }}
- Highest potential value: {{ highest_value_recommendation }}
- Safest value: {{ safest_value_recommendation }}
- Keep amount: {{ keep_amount_recommendation }}

## Related

- Recipes: {{ related_recipes }}
- Professions: {{ related_professions }}
- Mobs/sources: {{ related_sources }}
