#!/usr/bin/env node

/**
 * Generate draft item entity pages from candidate item-source indexes.
 *
 * This script is intentionally conservative:
 * - it creates candidate/unverified item pages only;
 * - it does not claim final boss loot truth;
 * - it does not invent item stats, BiS value, class value or upgrade value;
 * - it does not overwrite existing item pages unless --force is passed.
 *
 * Default usage:
 *   node scripts/generate-item-page-scaffolds.js
 *
 * Filter by dungeon id:
 *   node scripts/generate-item-page-scaffolds.js --dungeon eye-of-azshara
 *
 * Preview without writing:
 *   node scripts/generate-item-page-scaffolds.js --dry-run
 *
 * Force overwrite generated candidate pages:
 *   node scripts/generate-item-page-scaffolds.js --force
 *
 * Source:
 *   generated/indexes/item-to-source-candidates.json
 *
 * Output:
 *   entities/items/candidates/<item-id>-<slug>.md
 *   generated/indexes/item-page-scaffold-index.json
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const SOURCE_INDEX = 'generated/indexes/item-to-source-candidates.json';
const ITEM_CANDIDATE_DIR = 'entities/items/candidates';
const OUTPUT_INDEX = 'generated/indexes/item-page-scaffold-index.json';
const GENERATED_AT = new Date().toISOString().slice(0, 10);

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function absoluteFromRepo(relativePath) {
  return path.join(REPO_ROOT, relativePath);
}

function repoPath(...parts) {
  return toPosix(path.join(...parts));
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(absoluteFromRepo(relativePath), 'utf8'));
}

function writeText(relativePath, content) {
  const absolutePath = absoluteFromRepo(relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content, 'utf8');
  console.log(`wrote ${relativePath}`);
}

function fileExists(relativePath) {
  return fs.existsSync(absoluteFromRepo(relativePath));
}

function parseArgs(argv) {
  const args = {
    dungeon: null,
    dryRun: false,
    force: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--dry-run') {
      args.dryRun = true;
    } else if (arg === '--force') {
      args.force = true;
    } else if (arg === '--dungeon') {
      args.dungeon = argv[index + 1];
      index += 1;
    } else if (!arg.startsWith('--') && !args.dungeon) {
      args.dungeon = arg;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function yamlString(value) {
  return JSON.stringify(String(value || ''));
}

function unique(values) {
  return [...new Set(values.filter((value) => value !== undefined && value !== null && value !== ''))];
}

function sourceMatchesDungeon(source, dungeonId) {
  if (!dungeonId) return true;
  return source.dungeon_id === dungeonId;
}

function renderCandidateSource(source) {
  const bits = [];

  if (source.boss_name) bits.push(`boss: ${source.boss_name}`);
  if (source.dungeon_name) bits.push(`dungeon: ${source.dungeon_name}`);
  if (source.slot) bits.push(`slot: ${source.slot}`);
  if (source.loot_type) bits.push(`type: ${source.loot_type}`);
  if (source.item_level !== undefined && source.item_level !== null) bits.push(`item level: ${source.item_level}`);
  if (source.classification_confidence) bits.push(`confidence: ${source.classification_confidence}`);

  return `- ${bits.join(' | ')}`;
}

function renderItemPage(itemId, item, candidateSources) {
  const sourceDungeons = unique(candidateSources.map((source) => source.dungeon_id));
  const sourceBosses = unique(candidateSources.map((source) => source.boss_id));
  const sourceNpcIds = unique(candidateSources.map((source) => source.npc_id));
  const slots = unique(candidateSources.map((source) => source.slot));
  const lootTypes = unique(candidateSources.map((source) => source.loot_type));
  const needsVerification = candidateSources.some((source) => source.needs_blizzard_verification !== false);

  return `---
id: item-${itemId}
entity_type: item
item_id: ${itemId}
name: ${yamlString(item.name)}
status: item_candidate_unverified
source_confidence: low
generated_by: scripts/generate-item-page-scaffolds.js
generated_from: ${SOURCE_INDEX}
generated_at: ${GENERATED_AT}
needs_blizzard_verification: ${needsVerification ? 'true' : 'false'}
source_dungeons: ${JSON.stringify(sourceDungeons)}
source_bosses: ${JSON.stringify(sourceBosses)}
source_npc_ids: ${JSON.stringify(sourceNpcIds)}
slots: ${JSON.stringify(slots)}
loot_types: ${JSON.stringify(lootTypes)}
---

# ${item.name}

## Status

This is a generated candidate item page. Treat the item-source relationship as unverified until confirmed against Blizzard API data, in-game loot journal data, or logged loot observations.

Do not use this page to make final BiS, upgrade, class, spec, or value claims yet.

## Known candidate sources

${candidateSources.map(renderCandidateSource).join('\n')}

## Current known fields

- Item ID: ${itemId}
- Candidate source count: ${candidateSources.length}
- Candidate dungeon IDs: ${sourceDungeons.join(', ') || 'unknown'}
- Candidate boss IDs: ${sourceBosses.join(', ') || 'unknown'}
- Slot candidates: ${slots.join(', ') || 'unknown'}
- Loot type candidates: ${lootTypes.join(', ') || 'unknown'}

## Missing before final item page

- Blizzard item API details.
- Current item stats.
- Binding rules.
- Valid class/spec/armor restrictions.
- Confirmed source table.
- Scaling behavior by level/difficulty/timewalking context.
- Upgrade relevance for known characters.
- Market/transmog/profession value, if relevant.

## Source files to check

- ${SOURCE_INDEX}
- generated/indexes/boss-to-loot-candidates.json
- normalized/*/boss-loot-candidate.generated.json
`;
}

function buildPages(sourceIndex, args) {
  const items = sourceIndex.items || {};
  const pages = [];
  const skipped = [];

  for (const [itemId, item] of Object.entries(items)) {
    const candidateSources = (item.candidate_sources || []).filter((source) => sourceMatchesDungeon(source, args.dungeon));

    if (candidateSources.length === 0) {
      continue;
    }

    const slug = slugify(item.name || `item-${itemId}`);
    const relativePath = repoPath(ITEM_CANDIDATE_DIR, `${itemId}-${slug}.md`);

    if (fileExists(relativePath) && !args.force) {
      skipped.push({ item_id: itemId, name: item.name, page: relativePath, reason: 'exists' });
      continue;
    }

    pages.push({
      item_id: itemId,
      name: item.name,
      page: relativePath,
      candidate_sources: candidateSources,
      content: renderItemPage(itemId, item, candidateSources)
    });
  }

  return { pages, skipped };
}

function buildIndex(pages, skipped, args, sourceIndex) {
  const index = {
    schema_version: '0.1.0',
    generated_by: 'scripts/generate-item-page-scaffolds.js',
    generated_at: GENERATED_AT,
    status: 'candidate_unverified',
    warning: 'Generated candidate item pages only. Do not treat these as final item truth until Blizzard/in-game verification exists.',
    source_index: SOURCE_INDEX,
    filter: {
      dungeon_id: args.dungeon || null
    },
    summary: {
      source_item_count: Object.keys(sourceIndex.items || {}).length,
      pages_written_or_planned: pages.length,
      skipped_existing_pages: skipped.length
    },
    pages: {}
  };

  for (const page of pages) {
    index.pages[page.item_id] = {
      item_id: Number(page.item_id),
      name: page.name,
      page: page.page,
      candidate_source_count: page.candidate_sources.length,
      needs_blizzard_verification: true
    };
  }

  for (const item of skipped) {
    if (!index.pages[item.item_id]) {
      index.pages[item.item_id] = {
        item_id: Number(item.item_id),
        name: item.name,
        page: item.page,
        skipped: true,
        reason: item.reason,
        needs_blizzard_verification: true
      };
    }
  }

  return index;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const sourceIndexPath = absoluteFromRepo(SOURCE_INDEX);

  if (!fs.existsSync(sourceIndexPath)) {
    throw new Error(`Missing source index: ${SOURCE_INDEX}. Run scripts/generate-dungeon-indexes.js first.`);
  }

  const sourceIndex = readJson(SOURCE_INDEX);
  const { pages, skipped } = buildPages(sourceIndex, args);
  const scaffoldIndex = buildIndex(pages, skipped, args, sourceIndex);

  if (args.dryRun) {
    console.log(`dry run: would write ${pages.length} candidate item page(s)`);
    console.log(`dry run: would skip ${skipped.length} existing page(s)`);
    return;
  }

  for (const page of pages) {
    writeText(page.page, page.content);
  }

  writeText(OUTPUT_INDEX, `${JSON.stringify(scaffoldIndex, null, 2)}\n`);

  console.log(`candidate item pages written: ${pages.length}`);
  console.log(`existing pages skipped: ${skipped.length}`);
}

main();
