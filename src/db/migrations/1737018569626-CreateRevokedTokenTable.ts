import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRevokedTokenTable1737018569626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'revoked_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'token',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'revoked_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'expires_at',
            type: 'timestamp',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('revoked_tokens');
  }
}
