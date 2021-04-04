import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDeveloper1617240586088 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "developers" (
        "id" serial NOT NULL,
        "nome" varchar NOT NULL,
        "sexo" varchar NOT NULL,
        "idade" integer NOT NULL,
        "hobby" varchar NOT NULL,
        "data_nascimento" date NOT NULL,

        CONSTRAINT "PK_ID_DEVELOPERS" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "developers"`);
  }
}
