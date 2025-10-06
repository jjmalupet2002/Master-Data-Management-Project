const fs = require('fs');
const path = require('path');

// Load the mapping configuration
const mappingsPath = path.join(__dirname, '../config/mappings.json');
const mappings = JSON.parse(fs.readFileSync(mappingsPath, 'utf8'));

function transform(data) {
  const cleaned = [];
  const rejected = [];

  for (const record of data) {
    const sourceMapping = mappings[record.source];
    let product_code, product_name, price, quantity, category, supplier_name;
    let rejectionReason = null;

    if (!sourceMapping) {
      rejectionReason = `No mapping configuration found for source: ${record.source}`;
    } else {
      // Dynamically map fields using the configuration
      product_code = record[sourceMapping.product_code];
      product_name = record[sourceMapping.product_name];
      price = record[sourceMapping.price];
      quantity = record[sourceMapping.quantity];
      category = record[sourceMapping.category];
      supplier_name = record[sourceMapping.supplier_name]; // This will be undefined if not in mapping, which is handled
    }

    if (!rejectionReason) {
        // Clean price field: remove currency symbol, then replace comma with period for decimals
        if (typeof price === 'string') {
            price = price.replace('₱', '').replace(',', '.');
        }

        if (!product_code) {
          rejectionReason = 'Missing product_code';
        } else if (!product_name) {
          rejectionReason = 'Missing product_name';
        } else if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
          rejectionReason = 'Invalid or missing price';
        } else if (quantity === '' || quantity === null || isNaN(parseInt(quantity)) || parseInt(quantity) < 0) {
          rejectionReason = 'Invalid or missing quantity';
        } else if (!category) {
          rejectionReason = 'Missing category';
        } else if (!record.source) {
          rejectionReason = 'Missing source';
        }
    }

    if (rejectionReason) {
      rejected.push({ ...record, reason_for_rejection: rejectionReason });
    } else {
      cleaned.push({
        product_code,
        product_name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category,
        source: record.source,
        supplier_name: supplier_name || null
      });
    }
  }

  console.log(`Transformed ${cleaned.length} records, rejected ${rejected.length} records.`);
  return { cleaned, rejected };
}

module.exports = transform;
