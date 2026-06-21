# {{ instance_name }}

## Basic info

- Instance ID: {{ instance_id }}
- Type: {{ dungeon | raid | delve | battleground | arena | scenario }}
- Expansion: {{ expansion }}
- Level range: {{ level_range }}
- Location: {{ zone_or_region }}
- Last updated: {{ last_updated }}

## MILES use cases

- Dungeon recommendation
- Boss kill/skip decision
- Party upgrade analysis
- Route/checklist generation
- Lore/context summary

## Bosses / encounters

| Encounter | Optional | Loot table | Notes |
|---|---|---|---|
| {{ boss_name }} | {{ yes_no }} | {{ loot_table_ref }} | {{ notes }} |

## Loot summary

| Item | Slot/type | Useful for | Source | Notes |
|---|---|---|---|---|
| {{ item_name }} | {{ slot_or_type }} | {{ class_spec_role }} | {{ boss_or_source }} | {{ notes }} |

## Route notes

{{ route_notes }}

## Lore/context

{{ lore_summary }}

## Recommendation notes

- Best for: {{ best_for }}
- Skip if: {{ skip_if }}
- Optional bosses worth killing when: {{ optional_boss_logic }}

## Missing data

- Boss list
- Loot tables
- Level scaling behavior
- Class/spec relevance
- Route timing
- Lore/context
- Source metadata
