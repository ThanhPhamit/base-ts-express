# welfan-namecard-server

## Prerequisites

- Node.js (Version 22.11.0)

## Installation

1. Install dependencies:

   ```sh
   npm install
   ```

2. Copy the example environment file and configure it:

   ```sh
   cp .env.example .env
   ```

3. Update the `.env` file with your configuration.

## Running the Application

1. Start the PostgreSQL database using Docker Compose:

   ```sh
   docker-compose up -d
   ```

2. Build the application:

   ```sh
   npm run build
   ```

3. Start the application:

   ```sh
   npm run start
   ```

## Migration

1. Create a migration

   ```sh
   npm run typeorm migration:create {path_to_migration_file}
   Ex: npm run typeorm migration:create ./src/db/migrations/CreateUserTable
   ```

2. Run migration

   ```sh
   npm run typeorm migration:create -- -d {path_to_config_file}
   Ex: npm run typeorm-migration -- -d ./src/config/database
   ```

## Seed

1. Create a seed

   ```sh
   npm run typeorm-seed:create -- --name {path_to_seed_file}
   Ex: npm run typeorm-seed:create -- --name ./src/db/seeds/user.seed.ts
   ```

2. Run a specific seed

   ```sh
   npm run typeorm-seed:run -- -d {path_to_config_file} --name {path_to_seed_file}
   Ex: npm run typeorm-seed:run -- -d ./src/config/database.ts --name ./src/db/seeds/user.seed.ts
   ```
