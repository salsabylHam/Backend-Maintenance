import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDb1685372967472 implements MigrationInterface {
  name = 'initDb1685372967472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET foreign_key_checks = 0;`);

    await queryRunner.query(
      `CREATE TABLE \`damage_group\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`description\` varchar(255) NOT NULL,
        \`code\` varchar(255) NOT NULL,
        \`label\` varchar(255) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`damage_code\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`description\` varchar(255) NOT NULL,
        \`code\` varchar(255) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`damageGroupId\` int NOT NULL,
        PRIMARY KEY (\`id\`),
        KEY \`FK_95396ab02be06222cec229569c5\` (\`damageGroupId\`),
        CONSTRAINT \`FK_95396ab02be06222cec229569c5\` FOREIGN KEY (\`damageGroupId\`) REFERENCES \`damage_group\` (\`id\`)
      ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`demande\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`description\` varchar(255) NOT NULL,
      \`image\` varchar(255) DEFAULT NULL,
      \`damageCodeId\` int NOT NULL,
      \`typeOfInterventions\` varchar(255) NOT NULL,
      \`priority\` enum('High','Medium','Low') NOT NULL,
      \`note\` text NOT NULL,
      \`userId\` int DEFAULT NULL,
      \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      \`machineId\` int NOT NULL,
      \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      PRIMARY KEY (\`id\`),
      KEY \`FK_dfde4005a6e00b0591e181e93fd\` (\`damageCodeId\`),
      KEY \`FK_a06e270d88c62319e260d7364d2\` (\`machineId\`),
      KEY \`FK_e6eca60792e48c89ba5eb266730\` (\`userId\`),
      CONSTRAINT \`FK_a06e270d88c62319e260d7364d2\` FOREIGN KEY (\`machineId\`) REFERENCES \`machine\` (\`id\`),
      CONSTRAINT \`FK_dfde4005a6e00b0591e181e93fd\` FOREIGN KEY (\`damageCodeId\`) REFERENCES \`damage_code\` (\`id\`),
      CONSTRAINT \`FK_e6eca60792e48c89ba5eb266730\` FOREIGN KEY (\`userId\`) REFERENCES \`user\` (\`id\`)
    ) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`file\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`name\` varchar(255) DEFAULT NULL,
      \`path\` varchar(255) NOT NULL,
      \`requestId\` int DEFAULT NULL,
      \`machineId\` int DEFAULT NULL,
      \`pieceId\` int DEFAULT NULL,
      \`orderTechnicianId\` int DEFAULT NULL,
      PRIMARY KEY (\`id\`),
      KEY \`FK_7ba55057b7d6f6413ad2b12afed\` (\`requestId\`),
      KEY \`FK_b9ce1a5a56b5ce225a111b6e51f\` (\`machineId\`),
      KEY \`FK_eabc17c9b8ed25c04d77ec8de46\` (\`pieceId\`),
      KEY \`FK_0fd127600dc9dd65364d5ced9cd\` (\`orderTechnicianId\`),
      CONSTRAINT \`FK_0fd127600dc9dd65364d5ced9cd\` FOREIGN KEY (\`orderTechnicianId\`) REFERENCES \`order_technician\` (\`id\`) ON DELETE CASCADE,
      CONSTRAINT \`FK_7ba55057b7d6f6413ad2b12afed\` FOREIGN KEY (\`requestId\`) REFERENCES \`demande\` (\`id\`) ON DELETE CASCADE,
      CONSTRAINT \`FK_b9ce1a5a56b5ce225a111b6e51f\` FOREIGN KEY (\`machineId\`) REFERENCES \`machine\` (\`id\`) ON DELETE CASCADE,
      CONSTRAINT \`FK_eabc17c9b8ed25c04d77ec8de46\` FOREIGN KEY (\`pieceId\`) REFERENCES \`piece\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`leave_absence_request\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`startDate\` varchar(255) NOT NULL,
      \`endDate\` varchar(255) NOT NULL,
      \`description\` varchar(255) NOT NULL,
      \`technicianId\` int NOT NULL,
      \`type\` enum('Leave Request','Absence') NOT NULL,
      PRIMARY KEY (\`id\`),
      KEY \`FK_a673ffb0431320302d750efe613\` (\`technicianId\`),
      CONSTRAINT \`FK_a673ffb0431320302d750efe613\` FOREIGN KEY (\`technicianId\`) REFERENCES \`user\` (\`id\`)
    ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`machine\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`description\` varchar(255) NOT NULL,
      \`name\` varchar(255) NOT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`machine_piece\` (
      \`machineId\` int NOT NULL,
      \`pieceId\` int NOT NULL,
      PRIMARY KEY (\`machineId\`,\`pieceId\`),
      KEY \`IDX_91d067ed532471ce3dd71247b5\` (\`machineId\`),
      KEY \`IDX_e84ae04329d7a809ef7ca245c0\` (\`pieceId\`),
      CONSTRAINT \`FK_91d067ed532471ce3dd71247b51\` FOREIGN KEY (\`machineId\`) REFERENCES \`machine\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT \`FK_e84ae04329d7a809ef7ca245c08\` FOREIGN KEY (\`pieceId\`) REFERENCES \`piece\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`notification\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`title\` varchar(255) NOT NULL,
      \`discription\` varchar(255) NOT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`order\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`demandeId\` int DEFAULT NULL,
      \`startDate\` varchar(255) NOT NULL,
      \`endDate\` varchar(255) DEFAULT NULL,
      \`typeOfInterventions\` enum('Predictive Maintenance','Curative Maintenance','Palliative Maintenance','Corrective Maintenance','Conditional Maintenance','Systematic Maintenance','Preventive Maintenance') NOT NULL,
      \`priority\` enum('High','Medium','Low') NOT NULL,
      \`note\` text NOT NULL,
      \`description\` text NOT NULL,
      \`machineId\` int NOT NULL,
      \`chainCode\` varchar(255) DEFAULT NULL,
      \`chainIndex\` int DEFAULT NULL,
      \`occurrence\` enum('Once','Weekly','Monthly','Yearly') NOT NULL DEFAULT 'Once',
      \`createOrderBefore\` int DEFAULT NULL,
      \`orderId\` int DEFAULT NULL,
      \`duration\` int DEFAULT NULL,
      PRIMARY KEY (\`id\`),
      KEY \`FK_8851fe5c4d9eab6014f088d9980\` (\`machineId\`),
      KEY \`FK_6769e2a413c506f8db6b867385d\` (\`demandeId\`),
      KEY \`FK_b075313d4d7e1c12f1a6e6359e8\` (\`orderId\`),
      CONSTRAINT \`FK_6769e2a413c506f8db6b867385d\` FOREIGN KEY (\`demandeId\`) REFERENCES \`demande\` (\`id\`),
      CONSTRAINT \`FK_8851fe5c4d9eab6014f088d9980\` FOREIGN KEY (\`machineId\`) REFERENCES \`machine\` (\`id\`),
      CONSTRAINT \`FK_b075313d4d7e1c12f1a6e6359e8\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`order_technician\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`userId\` int NOT NULL,
      \`startDate\` datetime DEFAULT NULL,
      \`orderId\` int NOT NULL,
      \`note\` text,
      \`endDate\` datetime DEFAULT NULL,
      \`status\` enum('InProgress','ToDo','Done','Waiting') NOT NULL DEFAULT 'ToDo',
      PRIMARY KEY (\`id\`),
      KEY \`FK_e5c4f4317a643953ae704d8d6d8\` (\`userId\`),
      KEY \`FK_33533e851641cdc6880643fa147\` (\`orderId\`),
      CONSTRAINT \`FK_33533e851641cdc6880643fa147\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\` (\`id\`) ON DELETE CASCADE,
      CONSTRAINT \`FK_e5c4f4317a643953ae704d8d6d8\` FOREIGN KEY (\`userId\`) REFERENCES \`user\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=281 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`permission\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`label\` varchar(255) NOT NULL,
      \`code\` varchar(255) NOT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`piece\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`discription\` varchar(255) NOT NULL,
      \`code\` varchar(255) NOT NULL,
      \`quantity\` int NOT NULL,
      \`price\` int NOT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`piece_order_technician\` (
      \`orderTechnicianId\` int NOT NULL,
      \`pieceId\` int NOT NULL,
      \`qty\` int NOT NULL,
      PRIMARY KEY (\`orderTechnicianId\`,\`pieceId\`),
      KEY \`FK_a01d854d6ccf5699637cd299d84\` (\`pieceId\`),
      CONSTRAINT \`FK_a01d854d6ccf5699637cd299d84\` FOREIGN KEY (\`pieceId\`) REFERENCES \`piece\` (\`id\`),
      CONSTRAINT \`FK_a753618f5b9539289322a3f1d13\` FOREIGN KEY (\`orderTechnicianId\`) REFERENCES \`order_technician\` (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`request_part\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`name\` varchar(255) NOT NULL,
      \`urgencyLevel\` enum('High','Medium','Low') NOT NULL,
      \`orderId\` int NOT NULL,
      \`userId\` int NOT NULL,
      \`qty\` int NOT NULL,
      \`description\` varchar(255) DEFAULT NULL,
      \`status\` enum('Waiting','In Stock','Denied') NOT NULL DEFAULT 'Waiting',
      PRIMARY KEY (\`id\`),
      KEY \`FK_36a9509902b854e633f33b87498\` (\`orderId\`),
      KEY \`FK_d183791d10085e61917cc8d2bce\` (\`userId\`),
      CONSTRAINT \`FK_36a9509902b854e633f33b87498\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\` (\`id\`) ON DELETE CASCADE,
      CONSTRAINT \`FK_d183791d10085e61917cc8d2bce\` FOREIGN KEY (\`userId\`) REFERENCES \`user\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`role\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`label\` varchar(255) NOT NULL,
      \`code\` varchar(255) NOT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`role_permission\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`read\` tinyint NOT NULL,
      \`create\` tinyint NOT NULL,
      \`update\` tinyint NOT NULL,
      \`delete\` tinyint NOT NULL,
      \`roleId\` int NOT NULL,
      \`permissionId\` int NOT NULL,
      PRIMARY KEY (\`id\`),
      KEY \`FK_e3130a39c1e4a740d044e685730\` (\`roleId\`),
      KEY \`FK_72e80be86cab0e93e67ed1a7a9a\` (\`permissionId\`),
      CONSTRAINT \`FK_72e80be86cab0e93e67ed1a7a9a\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\` (\`id\`) ON DELETE CASCADE,
      CONSTRAINT \`FK_e3130a39c1e4a740d044e685730\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`team\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`description\` varchar(255) DEFAULT NULL,
      \`name\` varchar(255) NOT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`user\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`email\` varchar(255) NOT NULL,
      \`firstName\` varchar(255) NOT NULL,
      \`lastName\` varchar(255) NOT NULL,
      \`password\` varchar(255) NOT NULL DEFAULT '',
      \`phone\` varchar(255) DEFAULT NULL,
      \`roleId\` int DEFAULT NULL,
      \`picture\` varchar(255) DEFAULT NULL,
      \`phone2\` varchar(255) DEFAULT NULL,
      PRIMARY KEY (\`id\`),
      KEY \`FK_c28e52f758e7bbc53828db92194\` (\`roleId\`),
      CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\` (\`id\`)
    ) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`user_notification\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`vue\` tinyint NOT NULL DEFAULT '0',
      \`userId\` int NOT NULL,
      \`notificationId\` int NOT NULL,
      PRIMARY KEY (\`id\`),
      KEY \`FK_dce2a8927967051c447ae10bc8b\` (\`userId\`),
      KEY \`FK_680af16b67e94e2cb693b9e9033\` (\`notificationId\`),
      CONSTRAINT \`FK_680af16b67e94e2cb693b9e9033\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\` (\`id\`),
      CONSTRAINT \`FK_dce2a8927967051c447ae10bc8b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\` (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(
      `CREATE TABLE \`user_team\` (
      \`userId\` int NOT NULL,
      \`teamId\` int NOT NULL,
      PRIMARY KEY (\`userId\`,\`teamId\`),
      KEY \`IDX_32ecd75ddc134fd687792507e9\` (\`userId\`),
      KEY \`IDX_e50bd38e4f1ba4fa1f3c6a356b\` (\`teamId\`),
      CONSTRAINT \`FK_32ecd75ddc134fd687792507e90\` FOREIGN KEY (\`userId\`) REFERENCES \`user\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT \`FK_e50bd38e4f1ba4fa1f3c6a356bc\` FOREIGN KEY (\`teamId\`) REFERENCES \`team\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`.replace(
        /\n/g,
        '',
      ),
    );

    await queryRunner.query(`SET foreign_key_checks = 1;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
