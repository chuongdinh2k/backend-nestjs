import { MigrationInterface, QueryRunner } from 'typeorm';

export class test1680428879173 implements MigrationInterface {
  name = 'test1680428879173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdOn\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedOn\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`first_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`last_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`phone\` int NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`created_at\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updated_at\` datetime NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`created_at\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phone\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`last_name\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`first_name\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updatedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`username\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\` (\`email\`)`,
    );
  }
}
