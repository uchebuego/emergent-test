import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchemaAgain1704980493633 implements MigrationInterface {
    name = 'UpdateSchemaAgain1704980493633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` varchar(36) NOT NULL, \`amount\` int NOT NULL, \`timestamp\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`type\` varchar(255) NOT NULL, \`walletId\` varchar(36) NULL, INDEX \`IDX_cce9f3db01ff7df5db4d337869\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`wallet\` (\`id\` varchar(36) NOT NULL, \`accountNumber\` char(10) NOT NULL, \`balance\` int NOT NULL DEFAULT '0', \`safePin\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_eade8556fd57a767e7905e68da\` (\`accountNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_900eb6b5efaecf57343e4c0e79d\` FOREIGN KEY (\`walletId\`) REFERENCES \`wallet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_900eb6b5efaecf57343e4c0e79d\``);
        await queryRunner.query(`DROP INDEX \`IDX_eade8556fd57a767e7905e68da\` ON \`wallet\``);
        await queryRunner.query(`DROP TABLE \`wallet\``);
        await queryRunner.query(`DROP INDEX \`IDX_cce9f3db01ff7df5db4d337869\` ON \`transaction\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
    }

}
