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

4. Generate RSA key pair for authentication:

   ```sh
   # Generate private key with 2048 bits, encrypted with AES-256
   openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048 -aes256
   
   # Extract public key from the private key (use your actual password)
   openssl rsa -pubout -in private.key -out public.key -passin pass:123456
   ```
   Then Manual copy to JWT_PUBLIC_KEY, JWT_PRIVATE_KEY, JWT_PASSPHRASE

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

## Running the Application

1. Start the PostgreSQL database using Docker Compose:

   ```sh
   docker-compose up -d
   ```

2. Run migration:

   ```sh
   npm run typeorm-migration -- -d ./src/config/database
   ```

3. Run seed for creating role and permission: (For the first time)

   ```sh
   npm run typeorm-seed:run -- -d ./src/config/database.ts --name ./src/db/seeds/1737432635607-createBasicRoleAndPermission.seed.ts
   ```

4. Run cli for creating user:

   ```sh
   npx ts-node -r tsconfig-paths/register ./src/cli/createUserWithRole "{role: admin/sales/office}" "{email}" "{password}" "{firstName}" "{lastName}" "{firstNameKana}" "{lastNameKana}"
   Ex: npx ts-node -r tsconfig-paths/register ./src/cli/createUserWithRole "admin" "admin@admin.com" "password@123" "Alexander" "Smith" "アレクサンダー" "スミス"
   ```

5. Build the application:

   ```sh
   npm run build
   ```

6. Start the application:

   ```sh
   npm run start
   ```
