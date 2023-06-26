import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get('DB_HOST'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_NAME'),
          port: config.get('DB_PORT'),
          synchronize: false,
          migrations: [__dirname + '/migrations/*.{ts,js}'],
          autoLoadEntities: true,
          migrationsRun: true,
          //logging: 'all',
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
