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

---

## Containerization with Docker

The entire application stack (API, ETL, Database) is containerized using Docker and Docker Compose for portability, consistency, and ease of setup.

### How It Works

- **`docker-compose.yml`**: This file defines the three services (`db`, `api`, `etl`) and orchestrates the entire application. It configures networking, environment variables, and volumes.
- **`database/init.sql`**: This script is automatically run by the `db` service on its first startup. It creates the `master_data_db` database and all necessary tables (`products`, `rejected_records`, `duplicates`), automating the database setup.
- **Data Persistence**: A Docker volume (`db_data`) is used to persist the MySQL database data on the host machine, ensuring that data is not lost when the containers are stopped or removed.
- **Live Reloading**: The `develop.watch` feature is used for the `api` and `etl` services. This automatically syncs any code changes you make on your host machine to the respective running containers, providing a seamless development experience without needing to manually rebuild images.

### Prerequisites

- Docker
- Docker Compose (v2 or later, using the `docker compose` command)

### Usage

**1. Start the Development Environment**

This command builds the images if they don't exist, starts the `db` and `api` services, and begins watching for file changes.

```bash
docker compose watch
```

The API will be available at `http://localhost:3000`.

**2. Run the ETL Process**

To populate the database, run the ETL service as a one-off task. This command will use the latest version of your code thanks to the `watch` configuration.

```bash
docker compose run --rm etl
```

**3. Verify the Data**

You can test that the API is serving data with `curl`:

```bash
curl http://localhost:3000/api/products
```

**4. Stop the Application**

To stop and remove the containers, run:

```bash
docker compose down
```

To perform a full reset and remove the database data as well, use the `--volumes` flag:

```bash
docker compose down --volumes
```