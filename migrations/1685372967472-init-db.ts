import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDb1685372967472 implements MigrationInterface {
  name = 'initDb1685372967472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`damage_group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`label\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`team\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role_permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`roleId\` int NOT NULL, \`permissionId\` int NOT NULL, \`read\` tinyint NOT NULL, \`create\` tinyint NOT NULL, \`update\` tinyint NOT NULL, \`delete\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`discription\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`vue\` tinyint NOT NULL DEFAULT 0, \`userId\` int NOT NULL, \`notificationId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`picture\` varchar(255) NULL, \`password\` varchar(255) NOT NULL DEFAULT '', \`phone\` varchar(255) NULL, \`phone2\` varchar(255) NULL, \`roleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`request_part\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`urgencyLevel\` enum ('High', 'Medium', 'Low') NOT NULL, \`status\` enum ('Waiting', 'In Stock', 'Denied') NOT NULL DEFAULT 'Waiting', \`orderId\` int NOT NULL, \`userId\` int NOT NULL, \`qty\` int NOT NULL, \`description\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`demandeId\` int NULL, \`startDate\` varchar(255) NOT NULL, \`endDate\` varchar(255) NULL, \`typeOfInterventions\` enum ('Predictive Maintenance', 'Curative Maintenance', 'Palliative Maintenance', 'Corrective Maintenance', 'Conditional Maintenance', 'Systematic Maintenance', 'Preventive Maintenance') NOT NULL, \`priority\` enum ('High', 'Medium', 'Low') NOT NULL, \`occurrence\` enum ('Once', 'Weekly', 'Monthly', 'Yearly') NULL, \`note\` text NOT NULL, \`description\` text NOT NULL, \`machineId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order_technician\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`note\` text NULL, \`startDate\` datetime NULL, \`endDate\` datetime NULL, \`orderId\` int NOT NULL, \`status\` enum ('InProgress', 'ToDo', 'Done', 'Waiting') NOT NULL DEFAULT 'ToDo', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`piece_order_technician\` (\`orderTechnicianId\` int NOT NULL, \`pieceId\` int NOT NULL, \`qty\` int NOT NULL, PRIMARY KEY (\`orderTechnicianId\`, \`pieceId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`piece\` (\`id\` int NOT NULL AUTO_INCREMENT, \`discription\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`price\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`machine\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`path\` varchar(255) NOT NULL, \`requestId\` int NULL, \`machineId\` int NULL, \`pieceId\` int NULL, \`orderTechnicianId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`demande\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`damageCodeId\` int NOT NULL, \`typeOfInterventions\` varchar(255) NOT NULL, \`priority\` enum ('High', 'Medium', 'Low') NOT NULL, \`note\` text NOT NULL, \`userId\` int NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`machineId\` int NOT NULL, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`damage_code\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`damageGroupId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_team\` (\`teamId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_e50bd38e4f1ba4fa1f3c6a356b\` (\`teamId\`), INDEX \`IDX_32ecd75ddc134fd687792507e9\` (\`userId\`), PRIMARY KEY (\`teamId\`, \`userId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`machine_piece\` (\`pieceId\` int NOT NULL, \`machineId\` int NOT NULL, INDEX \`IDX_e84ae04329d7a809ef7ca245c0\` (\`pieceId\`), INDEX \`IDX_91d067ed532471ce3dd71247b5\` (\`machineId\`), PRIMARY KEY (\`pieceId\`, \`machineId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_e3130a39c1e4a740d044e685730\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_72e80be86cab0e93e67ed1a7a9a\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_notification\` ADD CONSTRAINT \`FK_dce2a8927967051c447ae10bc8b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_notification\` ADD CONSTRAINT \`FK_680af16b67e94e2cb693b9e9033\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_part\` ADD CONSTRAINT \`FK_36a9509902b854e633f33b87498\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_part\` ADD CONSTRAINT \`FK_d183791d10085e61917cc8d2bce\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_8851fe5c4d9eab6014f088d9980\` FOREIGN KEY (\`machineId\`) REFERENCES \`machine\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_6769e2a413c506f8db6b867385d\` FOREIGN KEY (\`demandeId\`) REFERENCES \`demande\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_technician\` ADD CONSTRAINT \`FK_e5c4f4317a643953ae704d8d6d8\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_technician\` ADD CONSTRAINT \`FK_33533e851641cdc6880643fa147\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`piece_order_technician\` ADD CONSTRAINT \`FK_a01d854d6ccf5699637cd299d84\` FOREIGN KEY (\`pieceId\`) REFERENCES \`piece\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`piece_order_technician\` ADD CONSTRAINT \`FK_a753618f5b9539289322a3f1d13\` FOREIGN KEY (\`orderTechnicianId\`) REFERENCES \`order_technician\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`file\` ADD CONSTRAINT \`FK_7ba55057b7d6f6413ad2b12afed\` FOREIGN KEY (\`requestId\`) REFERENCES \`demande\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`file\` ADD CONSTRAINT \`FK_b9ce1a5a56b5ce225a111b6e51f\` FOREIGN KEY (\`machineId\`) REFERENCES \`machine\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`file\` ADD CONSTRAINT \`FK_eabc17c9b8ed25c04d77ec8de46\` FOREIGN KEY (\`pieceId\`) REFERENCES \`piece\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`file\` ADD CONSTRAINT \`FK_0fd127600dc9dd65364d5ced9cd\` FOREIGN KEY (\`orderTechnicianId\`) REFERENCES \`order_technician\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`demande\` ADD CONSTRAINT \`FK_dfde4005a6e00b0591e181e93fd\` FOREIGN KEY (\`damageCodeId\`) REFERENCES \`damage_code\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`demande\` ADD CONSTRAINT \`FK_e6eca60792e48c89ba5eb266730\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`demande\` ADD CONSTRAINT \`FK_a06e270d88c62319e260d7364d2\` FOREIGN KEY (\`machineId\`) REFERENCES \`machine\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`damage_code\` ADD CONSTRAINT \`FK_95396ab02be06222cec229569c5\` FOREIGN KEY (\`damageGroupId\`) REFERENCES \`damage_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_team\` ADD CONSTRAINT \`FK_e50bd38e4f1ba4fa1f3c6a356bc\` FOREIGN KEY (\`teamId\`) REFERENCES \`team\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_team\` ADD CONSTRAINT \`FK_32ecd75ddc134fd687792507e90\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`machine_piece\` ADD CONSTRAINT \`FK_e84ae04329d7a809ef7ca245c08\` FOREIGN KEY (\`pieceId\`) REFERENCES \`piece\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`machine_piece\` ADD CONSTRAINT \`FK_91d067ed532471ce3dd71247b51\` FOREIGN KEY (\`machineId\`) REFERENCES \`machine\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`machine_piece\` DROP FOREIGN KEY \`FK_91d067ed532471ce3dd71247b51\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`machine_piece\` DROP FOREIGN KEY \`FK_e84ae04329d7a809ef7ca245c08\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_team\` DROP FOREIGN KEY \`FK_32ecd75ddc134fd687792507e90\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_team\` DROP FOREIGN KEY \`FK_e50bd38e4f1ba4fa1f3c6a356bc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`damage_code\` DROP FOREIGN KEY \`FK_95396ab02be06222cec229569c5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`demande\` DROP FOREIGN KEY \`FK_a06e270d88c62319e260d7364d2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`demande\` DROP FOREIGN KEY \`FK_e6eca60792e48c89ba5eb266730\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`demande\` DROP FOREIGN KEY \`FK_dfde4005a6e00b0591e181e93fd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`file\` DROP FOREIGN KEY \`FK_0fd127600dc9dd65364d5ced9cd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`file\` DROP FOREIGN KEY \`FK_eabc17c9b8ed25c04d77ec8de46\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`file\` DROP FOREIGN KEY \`FK_b9ce1a5a56b5ce225a111b6e51f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`file\` DROP FOREIGN KEY \`FK_7ba55057b7d6f6413ad2b12afed\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`piece_order_technician\` DROP FOREIGN KEY \`FK_a753618f5b9539289322a3f1d13\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`piece_order_technician\` DROP FOREIGN KEY \`FK_a01d854d6ccf5699637cd299d84\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_technician\` DROP FOREIGN KEY \`FK_33533e851641cdc6880643fa147\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_technician\` DROP FOREIGN KEY \`FK_e5c4f4317a643953ae704d8d6d8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_6769e2a413c506f8db6b867385d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_8851fe5c4d9eab6014f088d9980\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_part\` DROP FOREIGN KEY \`FK_d183791d10085e61917cc8d2bce\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_part\` DROP FOREIGN KEY \`FK_36a9509902b854e633f33b87498\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_notification\` DROP FOREIGN KEY \`FK_680af16b67e94e2cb693b9e9033\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_notification\` DROP FOREIGN KEY \`FK_dce2a8927967051c447ae10bc8b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_72e80be86cab0e93e67ed1a7a9a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_e3130a39c1e4a740d044e685730\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_91d067ed532471ce3dd71247b5\` ON \`machine_piece\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e84ae04329d7a809ef7ca245c0\` ON \`machine_piece\``,
    );
    await queryRunner.query(`DROP TABLE \`machine_piece\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_32ecd75ddc134fd687792507e9\` ON \`user_team\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e50bd38e4f1ba4fa1f3c6a356b\` ON \`user_team\``,
    );
    await queryRunner.query(`DROP TABLE \`user_team\``);
    await queryRunner.query(`DROP TABLE \`damage_code\``);
    await queryRunner.query(`DROP TABLE \`demande\``);
    await queryRunner.query(`DROP TABLE \`file\``);
    await queryRunner.query(`DROP TABLE \`machine\``);
    await queryRunner.query(`DROP TABLE \`piece\``);
    await queryRunner.query(`DROP TABLE \`piece_order_technician\``);
    await queryRunner.query(`DROP TABLE \`order_technician\``);
    await queryRunner.query(`DROP TABLE \`order\``);
    await queryRunner.query(`DROP TABLE \`request_part\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`user_notification\``);
    await queryRunner.query(`DROP TABLE \`notification\``);
    await queryRunner.query(`DROP TABLE \`role\``);
    await queryRunner.query(`DROP TABLE \`role_permission\``);
    await queryRunner.query(`DROP TABLE \`permission\``);
    await queryRunner.query(`DROP TABLE \`team\``);
    await queryRunner.query(`DROP TABLE \`damage_group\``);
  }
}
