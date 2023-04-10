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
          entities: [__dirname + '../**/*.entity{.ts,.js}'],
          port: config.get('DB_PORT'),
          synchronize: true,
          autoLoadEntities: true,
          //logging: 'all',
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
