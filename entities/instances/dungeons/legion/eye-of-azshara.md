---
id: eye-of-azshara
name: Eye of Azshara
type: dungeon
expansion: legion
zone_id: 8040
status: entity_candidate
source_confidence: medium-low
created_at: 2026-06-23
---

# Eye of Azshara

Eye of Azshara is a Legion 5-player dungeon in Azsuna. This page is a human/AI-readable entity page generated from normalized candidate data.

## Status

This page is **not final verified dungeon truth** yet.

Current confidence: **medium-low**.

The dungeon structure, bosses and mechanics are useful enough for routing and early recommendations, but loot data is still candidate-level and requires Blizzard API and/or in-game verification before high-confidence gearing decisions.

## Machine-readable sources

- Normalized dungeon data: `normalized/legion/dungeons/eye-of-azshara/dungeon.json`
- Normalized boss data: `normalized/legion/dungeons/eye-of-azshara/bosses.json`
- Candidate loot manifest: `normalized/legion/dungeons/eye-of-azshara/boss-loot-candidate.json`
- Generated loot candidates: `normalized/legion/dungeons/eye-of-azshara/boss-loot-candidate.generated.json`
- Dungeon-to-boss index: `generated/indexes/dungeon-to-bosses.json`
- Boss-to-loot candidate index: `generated/indexes/boss-to-loot-candidates.json`
- Item-to-source candidate index: `generated/indexes/item-to-source-candidates.json`
- Source discovery summary: `raw-imports/legion/dungeons/eye-of-azshara/source-discovery/discovery-summary.md`

## Boss order candidate

1. [Warlord Parjesh](../../../../npcs/bosses/legion/eye-of-azshara/warlord-parjesh.md)
2. [Lady Hatecoil](../../../../npcs/bosses/legion/eye-of-azshara/lady-hatecoil.md)
3. [Serpentrix](../../../../npcs/bosses/legion/eye-of-azshara/serpentrix.md)
4. [King Deepbeard](../../../../npcs/bosses/legion/eye-of-azshara/king-deepbeard.md)
5. [Wrath of Azshara](../../../../npcs/bosses/legion/eye-of-azshara/wrath-of-azshara.md)

## Route notes candidate

- Warlord Parjesh is treated as the first boss in the current source set.
- Lady Hatecoil requires nearby Hatecoil Arcanists / shield sources to be handled before the boss is vulnerable. Exact count still needs verification.
- Serpentrix has dangerous surrounding trash and sinkholes; clear more than seems necessary before pulling.
- Wrath of Azshara is final-gated: all four other bosses must be defeated first, then the nearby Naga summoners must be defeated before engagement.

## Loot status

Candidate loot extraction reviewed **632 raw drop rows** and included **62 candidate boss-loot rows**.

Candidate rows per boss:

- Warlord Parjesh: 12
- Lady Hatecoil: 13
- Serpentrix: 13
- King Deepbeard: 10
- Wrath of Azshara: 14

Do not treat these as confirmed boss drops yet. The source tables include likely boss drops, zone drops, Timewalking rows, quest/currency/profession/event rows and other noisy entries.

## Scaling note

Store item identity and boss source separately from item level.

Item level depends on player level, boss level, difficulty, Chromie Time, Timewalking and other current-game contexts.

## Data quality notes

- Wowhead boss-page drops are useful but mixed with noisy rows.
- Boss-to-loot data remains candidate-level.
- Unknown or blank values are allowed and should not be invented.
- This page should be regenerated after Blizzard API / in-game verification is added.
