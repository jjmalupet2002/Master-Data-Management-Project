project-root/
│
├── crud-api/                # Express.js app for CRUD operations
│   ├── src/
│   │   ├── models/          # DB schemas (e.g., Mongoose models)
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Business logic for CRUD
│   │   └── app.js           # Entry point
│   ├── tests/               # Postman collections or Jest tests
│   ├── package.json
│   └── Dockerfile
│
├── etl/                     # ETL scripts & jobs
│   ├── extract/             # Data loading logic (CSV/JSON/etc.)
│   ├── transform/           # Cleaning, formatting, validation
│   ├── load/                # Inserts into DB via API calls
│   ├── quality/             # Deduplication, profiling, rules
│   ├── tests/               # Unit tests for ETL steps
│   ├── etl_runner.js        # Orchestrates pipeline
│   └── Dockerfile
│
├── data/                    # Datasets (simulated raw data + clean output)
│   ├── raw/
│   └── processed/
│
├── docs/                    # Documentation
│   ├── README.md
│   ├── architecture.md      # System flow, diagrams
│   └── data_quality.md      # Rules & rationale
│
├── docker-compose.yml       # Orchestration for API + ETL + DB
└── .env                     # Config vars (DB URL, API keys, etc.)