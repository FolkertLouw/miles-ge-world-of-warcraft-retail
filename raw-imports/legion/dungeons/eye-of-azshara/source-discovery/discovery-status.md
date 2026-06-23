# Eye of Azshara — source discovery status

## Current source

Initial source: user-pasted Wowhead Eye of Azshara page HTML/text.

Stored extracted file:

- `wowhead-zone-8040-extracted.json`

The full raw Wowhead HTML/user comments were not committed to the public repository. The committed file stores extracted facts, IDs, counts and curated notes only.

## What was found in the pasted source

- Dungeon quick facts:
  - Zone ID: 8040
  - Level: 10
  - Required enter/queue level: 10
  - Territory: Contested
  - Instance type: Dungeon
  - Players: 5
  - Heroic available from level 20
  - Mythic available from level 20
  - Added in patch 7.0.1
- Boss order:
  1. Warlord Parjesh — NPC 91784
  2. Lady Hatecoil — NPC 91789
  3. Serpentrix — NPC 91808
  4. King Deepbeard — NPC 91797
  5. Wrath of Azshara — NPC 96028
- Source table counts found:
  - Zone-level drops Listview: 43 items
  - NPC Listview: 78 NPCs
  - Object Listview: 18 objects
  - Quest Listview: 13 quests
  - Starts-quest item Listview: 5 items
  - Quest reward Listview: 3 items
  - Achievement Listview: 11 achievements
  - Guide Listview: 8 guides
  - News Listview: 13 items
  - Spell/mechanic gatherer entries: 44
- Curated notes found:
  - Entrance is in Azsuna, around 61.2/61.7, 41.1.
  - Closest flight point observed in source notes: Felblaze Ingress / Adept Sunwing.
  - Optional treasure/chest coordinates are present in comments.
  - Cove Seagull is notable as a route/pull danger.
  - Shelter buff is mentioned on the route from Serpentrix to King Deepbeard.
  - Several dungeon quests are present, including general, alchemist, druid and Mythic-specific notes.

## Important missing pieces

The pasted zone page is useful, but not enough for the full dungeon decision engine.

Still needed:

1. Per-boss loot attribution
   - The zone page has a zone-level drops list.
   - It may not reliably state which exact boss drops which item.
   - Need per-boss pages, Blizzard encounter data, or item pages to resolve boss-to-loot.

2. Full item-level scaling model
   - The source shows item levels/requirements in some list data.
   - It does not provide a clean formula for how boss drops scale while leveling.
   - Need Blizzard API data and/or observed run logs.

3. Full boss pages
   - The zone page contains many boss mechanics, but per-boss pages may expose cleaner encounter-specific data.
   - Need one raw/extracted source per boss.

4. Trash mob relevance
   - The zone page gives a broad NPC list.
   - It does not distinguish route-critical mobs from background/filler mobs.
   - Need route notes or manual curation.

5. Route map / pull order
   - Current source gives hints but not a clean casual-leveling route.
   - Need manual route notes, in-game observation or guide data.

6. Blizzard API raw files
   - Need official journal instance / journal encounter / item metadata where available.
   - This should be added to raw-imports before normalization.

## Next recommended source step

Fetch or paste the dedicated Wowhead boss page for **Warlord Parjesh** first.

Reason: it should help determine whether boss pages expose cleaner loot attribution and encounter mechanics than the zone page.

Target file when processed:

- `raw-imports/legion/dungeons/eye-of-azshara/source-discovery/wowhead-boss-warlord-parjesh-extracted.json`
