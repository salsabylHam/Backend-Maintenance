import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  port: configService.get('DB_PORT'),
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  entities: [__dirname + '/src/**/entity/*.{ts,js}'],
});
