const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

async function extract() {
  const rawDataDir = path.join(__dirname, '../../data/raw');
  const files = fs.readdirSync(rawDataDir).filter(file => file.endsWith('.csv'));
  const data = [];

  for (const file of files) {
    const source = path.basename(file, '.csv').split('_')[0];
    await new Promise((resolve, reject) => {
      fs.createReadStream(path.join(rawDataDir, file))
        .pipe(csv())
        .on('data', (row) => {
          data.push({ ...row, source });
        })
        .on('end', () => {
          console.log(`Successfully extracted data from ${file}`);
          resolve();
        })
        .on('error', (error) => {
          console.error(`Error extracting data from ${file}:`, error);
          reject(error);
        });
    });
  }

  return data;
}

module.exports = extract;
