
# Data Quality Rules

This document outlines the data quality rules that are enforced during the ETL process. These rules ensure that the data loaded into the `products` table is accurate, complete, and consistent.

## 1. Data Validation

Data that fails these validation checks will be logged and moved to the `rejected_records` table for manual review.

| Field | Rule | Reason for Rejection |
|---|---|---|
| `product_code` | Must not be NULL or empty. | A unique identifier is required for every product. |
| `product_name` | Must not be NULL or empty. | The product name is essential for identification. |
| `price` | Must be a positive decimal value. | A product cannot have a negative or zero price. |
| `quantity` | Must be a non-negative integer. | Product quantity cannot be negative. |
| `category` | Must not be NULL or empty. | Category is required for product classification. |
| `source` | Must not be NULL or empty. | The source is required to trace the product's origin. |

## 2. Data Deduplication

Duplicate records are identified and handled to maintain a single source of truth for each product.

### Identification

A record is flagged as a potential duplicate if it meets the following criteria:

- **High Name Similarity:** The `product_name` has a high similarity score (e.g., > 90%) with an existing product, calculated using a fuzzy matching algorithm.
- **Matching Attributes:** The record shares the same `supplier_name` and has a similar `price` (e.g., within a 5% tolerance) as an existing product.

### Handling

- When potential duplicates are identified within a single ETL batch, one record from the group is selected as the "master" record to be loaded into the `products` table. The other records are flagged as duplicates.
- The selection of the master record can be based on a predefined rule, such as selecting the one with the most complete data or from a preferred source.
- The flagged duplicates are not discarded. Instead, they are loaded into the `duplicates` table for manual review.
- The `duplicates` table stores pairs of product IDs that are suspected to be duplicates, along with a similarity score and the reason for flagging.
- A `resolved` flag in the `duplicates` table tracks whether a human has reviewed and resolved the duplicate entry.
