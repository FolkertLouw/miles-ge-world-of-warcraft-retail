#!/usr/bin/env node

/**
 * Validate generated MILES GE dungeon/item indexes and candidate item pages.
 *
 * This script does not fetch external data and does not verify Blizzard truth.
 * It only checks repository consistency:
 * - required generated index files exist and parse as JSON;
 * - required summary fields exist;
 * - generated item candidate pages stay marked as unverified;
 * - item page scaffold index points to existing pages when present.
 *
 * Usage:
 *   node scripts/validate-generated-data.js
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');

const REQUIRED_JSON_FILES = [
  'generated/indexes/dungeon-to-bosses.json',
  'generated/indexes/boss-to-loot-candidates.json',
  'generated/indexes/item-to-source-candidates.json',
  'generated/indexes/entity-page-index.json'
];

const OPTIONAL_JSON_FILES = [
  'generated/indexes/item-page-scaffold-index.json'
];

const REQUIRED_ENTITY_FILES = [
  'entities/instances/dungeons/legion/eye-of-azshara.md',
  'entities/npcs/bosses/legion/eye-of-azshara/warlord-parjesh.md',
  'entities/npcs/bosses/legion/eye-of-azshara/lady-hatecoil.md',
  'entities/npcs/bosses/legion/eye-of-azshara/serpentrix.md',
  'entities/npcs/bosses/legion/eye-of-azshara/king-deepbeard.md',
  'entities/npcs/bosses/legion/eye-of-azshara/wrath-of-azshara.md'
];

function absoluteFromRepo(relativePath) {
  return path.join(REPO_ROOT, relativePath);
}

function exists(relativePath) {
  return fs.existsSync(absoluteFromRepo(relativePath));
}

function readText(relativePath) {
  return fs.readFileSync(absoluteFromRepo(relativePath), 'utf8');
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function fail(errors, message) {
  errors.push(message);
}

function warn(warnings, message) {
  warnings.push(message);
}

function validateRequiredFiles(errors) {
  for (const file of REQUIRED_JSON_FILES) {
    if (!exists(file)) {
      fail(errors, `Missing required generated JSON file: ${file}`);
    }
  }

  for (const file of REQUIRED_ENTITY_FILES) {
    if (!exists(file)) {
      fail(errors, `Missing required Eye of Azshara entity file: ${file}`);
    }
  }
}

function validateJsonFiles(errors) {
  for (const file of [...REQUIRED_JSON_FILES, ...OPTIONAL_JSON_FILES]) {
    if (!exists(file)) continue;

    try {
      readJson(file);
    } catch (error) {
      fail(errors, `Invalid JSON in ${file}: ${error.message}`);
    }
  }
}

function validateDungeonIndexes(errors, warnings) {
  if (!exists('generated/indexes/dungeon-to-bosses.json')) return;
  if (!exists('generated/indexes/boss-to-loot-candidates.json')) return;
  if (!exists('generated/indexes/item-to-source-candidates.json')) return;
  if (!exists('generated/indexes/entity-page-index.json')) return;

  const dungeonToBosses = readJson('generated/indexes/dungeon-to-bosses.json');
  const bossToLoot = readJson('generated/indexes/boss-to-loot-candidates.json');
  const itemToSource = readJson('generated/indexes/item-to-source-candidates.json');
  const entityPageIndex = readJson('generated/indexes/entity-page-index.json');

  const dungeon = dungeonToBosses.dungeons && dungeonToBosses.dungeons['eye-of-azshara'];
  if (!dungeon) {
    fail(errors, 'Missing eye-of-azshara in generated/indexes/dungeon-to-bosses.json');
  } else if (!Array.isArray(dungeon.boss_ids) || dungeon.boss_ids.length !== 5) {
    fail(errors, 'Expected 5 boss IDs for eye-of-azshara in dungeon-to-bosses index');
  }

  const bosses = bossToLoot.bosses || {};
  for (const bossId of ['warlord-parjesh', 'lady-hatecoil', 'serpentrix', 'king-deepbeard', 'wrath-of-azshara']) {
    if (!bosses[bossId]) {
      fail(errors, `Missing boss loot candidate index for ${bossId}`);
    } else if (bosses[bossId].needs_blizzard_verification !== true) {
      fail(errors, `Boss loot candidate ${bossId} must remain marked needs_blizzard_verification=true`);
    }
  }

  const itemCount = Object.keys(itemToSource.items || {}).length;
  if (itemCount === 0) {
    fail(errors, 'Item-to-source candidate index contains no items');
  }

  const itemWarning = JSON.stringify(itemToSource).toLowerCase();
  if (!itemWarning.includes('candidate') || !itemWarning.includes('verification')) {
    warn(warnings, 'Item-to-source candidate index does not clearly include candidate/verification warning language');
  }

  if (!entityPageIndex.dungeons || !entityPageIndex.dungeons['eye-of-azshara']) {
    fail(errors, 'Entity page index does not map eye-of-azshara');
  }
}

function validateItemScaffoldIndex(errors, warnings) {
  const indexPath = 'generated/indexes/item-page-scaffold-index.json';
  if (!exists(indexPath)) {
    warn(warnings, 'No item-page scaffold index found yet. Run scripts/generate-item-page-scaffolds.js when ready to create candidate item pages.');
    return;
  }

  const index = readJson(indexPath);
  if (index.status !== 'candidate_unverified') {
    fail(errors, 'Item-page scaffold index must have status=candidate_unverified');
  }

  for (const [itemId, entry] of Object.entries(index.pages || {})) {
    if (!entry.page) {
      fail(errors, `Item scaffold index entry ${itemId} is missing page path`);
      continue;
    }

    if (!exists(entry.page)) {
      fail(errors, `Item scaffold page listed in index does not exist: ${entry.page}`);
      continue;
    }

    const content = readText(entry.page);
    if (!content.includes('status: item_candidate_unverified')) {
      fail(errors, `Generated item page must remain item_candidate_unverified: ${entry.page}`);
    }

    if (!content.includes('Do not use this page to make final BiS')) {
      warn(warnings, `Generated item page may be missing final-claim warning: ${entry.page}`);
    }
  }
}

function main() {
  const errors = [];
  const warnings = [];

  validateRequiredFiles(errors);
  validateJsonFiles(errors);

  if (errors.length === 0) {
    validateDungeonIndexes(errors, warnings);
    validateItemScaffoldIndex(errors, warnings);
  }

  for (const message of warnings) {
    console.warn(`warning: ${message}`);
  }

  if (errors.length > 0) {
    for (const message of errors) {
      console.error(`error: ${message}`);
    }
    process.exit(1);
  }

  console.log('generated data validation passed');
}

main();
