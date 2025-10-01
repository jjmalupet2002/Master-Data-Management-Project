const extract = require('./extract/extract');
const transform = require('./transform/transform');
const load = require('./load/load');
const deduplicate = require('./transform/deduplicate');

async function runEtl() {
  let cleanedData = [];
  try {
    console.log('Starting ETL process...');

    // 1. Extraction
    const rawData = await extract();

    // 2. Transformation and Quality Check
    const { cleaned, rejected } = transform(rawData);
    cleanedData = cleaned; // Store for the deduplication step

    // 3. Loading
    await load({ cleaned, rejected });

    console.log('Main loading process completed successfully.');

  } catch (error) {
    console.error('ETL process failed during main loading:', error.message);
    // Exit if the main loading fails, as deduplication would be pointless
    return;
  }

  // 4. Post-Load Deduplication
  try {
    console.log('Starting post-load deduplication process...');
    await deduplicate(cleanedData);
    console.log('Deduplication process completed successfully.');
  } catch (error) {
    console.error('ETL process failed during deduplication:', error.message);
  }

  console.log('Full ETL process finished.');
}

runEtl();