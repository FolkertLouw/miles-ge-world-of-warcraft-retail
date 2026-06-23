#!/usr/bin/env node

/**
 * Generate dungeon relation indexes from normalized dungeon data.
 *
 * Default usage:
 *   node scripts/generate-dungeon-indexes.js
 *
 * Single dungeon usage:
 *   node scripts/generate-dungeon-indexes.js legion/dungeons/eye-of-azshara
 *
 * Source-of-truth order:
 *   normalized/*/dungeon.json
 *   normalized/*/bosses.json
 *   normalized/*/boss-loot-candidate.generated.json
 *
 * Output:
 *   generated/indexes/dungeon-to-bosses.json
 *   generated/indexes/boss-to-loot-candidates.json
 *   generated/indexes/item-to-source-candidates.json
 *   generated/indexes/entity-page-index.json
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const NORMALIZED_ROOT = path.join(REPO_ROOT, 'normalized');
const GENERATED_INDEX_ROOT = path.join(REPO_ROOT, 'generated', 'indexes');
const GENERATED_AT = new Date().toISOString().slice(0, 10);

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function repoPath(...parts) {
  return toPosix(path.join(...parts));
}

function absoluteFromRepo(relativePath) {
  return path.join(REPO_ROOT, relativePath);
}

function readJson(relativePath) {
  const absolutePath = absoluteFromRepo(relativePath);
  return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
}

function jsonExists(relativePath) {
  return fs.existsSync(absoluteFromRepo(relativePath));
}

function writeJson(relativePath, data) {
  const absolutePath = absoluteFromRepo(relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`wrote ${relativePath}`);
}

function walkDirectories(startDirectory) {
  if (!fs.existsSync(startDirectory)) {
    return [];
  }

  const found = [];
  const stack = [startDirectory];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    const fileNames = new Set(entries.filter((entry) => entry.isFile()).map((entry) => entry.name));

    if (fileNames.has('dungeon.json') && fileNames.has('bosses.json')) {
      found.push(current);
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        stack.push(path.join(current, entry.name));
      }
    }
  }

  return found.sort();
}

function normalizedRelativeDirectory(absoluteDirectory) {
  return toPosix(path.relative(NORMALIZED_ROOT, absoluteDirectory));
}

function getRequestedDungeonDirectories() {
  const requested = process.argv.slice(2).filter((arg) => arg !== '--all');

  if (requested.length === 0 || process.argv.includes('--all')) {
    return walkDirectories(NORMALIZED_ROOT);
  }

  return requested.map((relativeDirectory) => path.join(NORMALIZED_ROOT, relativeDirectory));
}

function getDungeonEntityPath(relativeDirectory, dungeonId) {
  const [expansion, contentType] = relativeDirectory.split('/');

  if (expansion && contentType) {
    return repoPath('entities', 'instances', contentType, expansion, `${dungeonId}.md`);
  }

  return repoPath('entities', 'instances', 'dungeons', `${dungeonId}.md`);
}

function getBossEntityPath(relativeDirectory, dungeonId, bossId) {
  const [expansion] = relativeDirectory.split('/');

  if (expansion) {
    return repoPath('entities', 'npcs', 'bosses', expansion, dungeonId, `${bossId}.md`);
  }

  return repoPath('entities', 'npcs', 'bosses', dungeonId, `${bossId}.md`);
}

function normalizeItemId(row) {
  return String(row.item_id || '').trim();
}

function minimalLootRow(row) {
  return {
    item_id: row.item_id,
    name: row.name,
    quality: row.quality,
    item_class: row.item_class,
    item_subclass: row.item_subclass,
    loot_type: row.loot_type,
    slot: row.slot,
    item_level: row.item_level,
    required_level: row.required_level,
    modes: row.modes || [],
    observed_drop_pct: row.observed_drop_pct,
    row_classification: row.row_classification,
    classification_confidence: row.classification_confidence,
    needs_blizzard_verification: row.needs_blizzard_verification !== false
  };
}

function buildIndexes(dungeonDirectories) {
  const dungeonToBosses = {
    schema_version: '0.1.0',
    generated_by: 'scripts/generate-dungeon-indexes.js',
    generated_at: GENERATED_AT,
    status: 'candidate_index',
    warning: 'Generated from normalized candidate data. Verify loot against Blizzard API or in-game data before treating boss drops as final.',
    dungeons: {}
  };

  const bossToLootCandidates = {
    schema_version: '0.1.0',
    generated_by: 'scripts/generate-dungeon-indexes.js',
    generated_at: GENERATED_AT,
    status: 'candidate_index',
    warning: 'Candidate loot only. Rows may include Wowhead-derived uncertainty and require verification.',
    bosses: {}
  };

  const itemToSourceCandidates = {
    schema_version: '0.1.0',
    generated_by: 'scripts/generate-dungeon-indexes.js',
    generated_at: GENERATED_AT,
    status: 'candidate_index',
    warning: 'Candidate item-source links only. Do not treat these as confirmed final loot sources without verification.',
    items: {}
  };

  const entityPageIndex = {
    schema_version: '0.1.0',
    generated_by: 'scripts/generate-dungeon-indexes.js',
    generated_at: GENERATED_AT,
    status: 'candidate_index',
    lookup_order: [
      'generated/indexes/',
      'normalized/',
      'entities/',
      'raw-imports/'
    ],
    dungeons: {},
    bosses: {},
    npcs: {},
    zones: {},
    item_source_contexts: {}
  };

  for (const dungeonDirectory of dungeonDirectories) {
    const relativeDirectory = normalizedRelativeDirectory(dungeonDirectory);
    const dungeonJsonPath = repoPath('normalized', relativeDirectory, 'dungeon.json');
    const bossesJsonPath = repoPath('normalized', relativeDirectory, 'bosses.json');
    const lootJsonPath = repoPath('normalized', relativeDirectory, 'boss-loot-candidate.generated.json');

    if (!jsonExists(dungeonJsonPath) || !jsonExists(bossesJsonPath)) {
      throw new Error(`Missing required normalized files in ${relativeDirectory}`);
    }

    const dungeonJson = readJson(dungeonJsonPath);
    const bossesJson = readJson(bossesJsonPath);
    const lootJson = jsonExists(lootJsonPath) ? readJson(lootJsonPath) : null;

    const dungeon = dungeonJson.dungeon || dungeonJson;
    const bosses = bossesJson.bosses || [];
    const candidateRows = lootJson && Array.isArray(lootJson.candidate_rows) ? lootJson.candidate_rows : [];

    const dungeonId = dungeon.id;
    const dungeonEntityPath = getDungeonEntityPath(relativeDirectory, dungeonId);
    const bossIds = bosses.map((boss) => boss.id);
    const bossEntityPages = {};

    for (const boss of bosses) {
      bossEntityPages[boss.id] = getBossEntityPath(relativeDirectory, dungeonId, boss.id);
    }

    dungeonToBosses.dungeons[dungeonId] = {
      dungeon_id: dungeonId,
      name: dungeon.name,
      expansion: dungeon.expansion,
      zone_id: dungeon.zone_id,
      boss_count: bosses.length,
      boss_order: dungeon.boss_order || bossIds,
      boss_ids: bossIds,
      normalized_sources: {
        dungeon: dungeonJsonPath,
        bosses: bossesJsonPath,
        boss_loot_candidates: jsonExists(lootJsonPath) ? lootJsonPath : null
      },
      entity_page: dungeonEntityPath,
      boss_entity_pages: bossEntityPages,
      confidence: dungeon.source_confidence || 'candidate'
    };

    entityPageIndex.dungeons[dungeonId] = {
      dungeon_id: dungeonId,
      name: dungeon.name,
      expansion: dungeon.expansion,
      zone_id: dungeon.zone_id,
      entity_page: dungeonEntityPath,
      normalized_sources: {
        dungeon: dungeonJsonPath,
        bosses: bossesJsonPath,
        boss_loot_candidates: jsonExists(lootJsonPath) ? lootJsonPath : null
      },
      generated_indexes: {
        dungeon_to_bosses: 'generated/indexes/dungeon-to-bosses.json',
        boss_to_loot_candidates: 'generated/indexes/boss-to-loot-candidates.json',
        item_to_source_candidates: 'generated/indexes/item-to-source-candidates.json'
      },
      boss_ids: bossIds
    };

    if (dungeon.zone_id !== undefined && dungeon.zone_id !== null) {
      entityPageIndex.zones[String(dungeon.zone_id)] = {
        zone_id: dungeon.zone_id,
        dungeon_id: dungeonId,
        dungeon_name: dungeon.name,
        entity_page: dungeonEntityPath
      };
    }

    for (const boss of bosses) {
      const rowsForBoss = candidateRows.filter((row) => row.boss_id === boss.id);
      const bossEntityPath = getBossEntityPath(relativeDirectory, dungeonId, boss.id);

      bossToLootCandidates.bosses[boss.id] = {
        boss_id: boss.id,
        boss_name: boss.name,
        npc_id: boss.npc_id,
        dungeon_id: dungeonId,
        dungeon_name: dungeon.name,
        entity_page: bossEntityPath,
        normalized_sources: {
          bosses: bossesJsonPath,
          boss_loot_candidates: jsonExists(lootJsonPath) ? lootJsonPath : null
        },
        candidate_count: rowsForBoss.length,
        candidates: rowsForBoss.map(minimalLootRow),
        needs_blizzard_verification: true
      };

      entityPageIndex.bosses[boss.id] = {
        boss_id: boss.id,
        name: boss.name,
        npc_id: boss.npc_id,
        dungeon_id: dungeonId,
        entity_page: bossEntityPath,
        normalized_source: bossesJsonPath,
        loot_candidate_index: 'generated/indexes/boss-to-loot-candidates.json',
        needs_blizzard_verification: true
      };

      if (boss.npc_id !== undefined && boss.npc_id !== null) {
        entityPageIndex.npcs[String(boss.npc_id)] = {
          npc_id: boss.npc_id,
          boss_id: boss.id,
          boss_name: boss.name,
          dungeon_id: dungeonId,
          entity_page: bossEntityPath
        };
      }
    }

    for (const row of candidateRows) {
      const itemId = normalizeItemId(row);
      if (!itemId) continue;

      if (!itemToSourceCandidates.items[itemId]) {
        itemToSourceCandidates.items[itemId] = {
          item_id: row.item_id,
          name: row.name,
          candidate_sources: []
        };
      }

      itemToSourceCandidates.items[itemId].candidate_sources.push({
        dungeon_id: dungeonId,
        dungeon_name: dungeon.name,
        boss_id: row.boss_id,
        boss_name: row.boss_name,
        npc_id: row.npc_id,
        loot_type: row.loot_type,
        slot: row.slot,
        item_level: row.item_level,
        required_level: row.required_level,
        observed_drop_pct: row.observed_drop_pct,
        row_classification: row.row_classification,
        classification_confidence: row.classification_confidence,
        needs_blizzard_verification: row.needs_blizzard_verification !== false,
        source_index: 'generated/indexes/boss-to-loot-candidates.json'
      });
    }

    entityPageIndex.item_source_contexts[dungeonId] = {
      dungeon_id: dungeonId,
      candidate_loot_index: 'generated/indexes/boss-to-loot-candidates.json',
      item_source_index: 'generated/indexes/item-to-source-candidates.json',
      normalized_candidate_source: jsonExists(lootJsonPath) ? lootJsonPath : null,
      status: 'candidate_unverified'
    };
  }

  return {
    dungeonToBosses,
    bossToLootCandidates,
    itemToSourceCandidates,
    entityPageIndex
  };
}

function main() {
  const dungeonDirectories = getRequestedDungeonDirectories();

  if (dungeonDirectories.length === 0) {
    throw new Error('No normalized dungeon directories found. Expected folders containing dungeon.json and bosses.json.');
  }

  fs.mkdirSync(GENERATED_INDEX_ROOT, { recursive: true });

  const indexes = buildIndexes(dungeonDirectories);

  writeJson('generated/indexes/dungeon-to-bosses.json', indexes.dungeonToBosses);
  writeJson('generated/indexes/boss-to-loot-candidates.json', indexes.bossToLootCandidates);
  writeJson('generated/indexes/item-to-source-candidates.json', indexes.itemToSourceCandidates);
  writeJson('generated/indexes/entity-page-index.json', indexes.entityPageIndex);

  console.log(`processed ${dungeonDirectories.length} dungeon dataset(s)`);
}

main();
