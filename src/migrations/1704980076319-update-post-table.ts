import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostTable1704980076319 implements MigrationInterface {
    name = 'UpdatePostTable1704980076319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Proejct" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "status" integer NOT NULL, "filename" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_5146b7821c2b3eaa990466e75dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "filename" character varying NOT NULL, "views" character varying NOT NULL, "isPublished" character varying NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Proejct" ADD CONSTRAINT "FK_44262d17598d4c428646e065901" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Proejct" DROP CONSTRAINT "FK_44262d17598d4c428646e065901"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Proejct"`);
    }

}
