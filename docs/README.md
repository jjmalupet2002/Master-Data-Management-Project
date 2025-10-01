# Master Data Management Project

This project is a comprehensive solution for managing master data, including a CRUD API for data interaction and an ETL pipeline for data processing, cleaning, and deduplication.

## Project Modules

### CRUD API (`crud-api`)

A Node.js and Express-based API for performing Create, Read, Update, and Delete operations on the master product data.

**Dependencies:**
- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `mysql2`: MySQL client for Node.js with a focus on performance.

### ETL Service (`etl`)

A Node.js-based ETL (Extract, Transform, Load) service responsible for reading raw data from multiple sources, applying data quality and deduplication rules, and loading the processed data into the database.

**Dependencies:**
- `csv-parser`: Streaming CSV parser that's fast and easy to use.
- `mysql2`: Used to connect to and load data into the MySQL database.
- `string-similarity`: Finds the degree of similarity between two strings, used for fuzzy matching in the deduplication process.
