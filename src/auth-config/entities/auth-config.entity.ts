import { BadRequestException } from '@nestjs/common';
import { Enterprise } from 'src/enterprise/entities/enterprise.entity';
import { PROVIDERS } from 'src/shared/enums';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  issuer: string;

  @Column({
    type: 'enum',
    enum: PROVIDERS,
    default: PROVIDERS.UNKOWN,
  })
  provider;

  @Column()
  clientID: string;

  @Column()
  clientSecret: string;

  @Column()
  callbackURL: string;

  @Column()
  scope: string;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.authMethods, {
    onDelete: 'CASCADE',
  })
  enterprise: Enterprise;

  authorizationURL: string;

  tokenURL: string;

  userInfoURL: string;

  async setMetaData() {
    const response = await fetch(
      this.issuer + '/.well-known/openid-configuration',
    );
    if (!response.ok) {
      throw new BadRequestException(
        `Failed to fetch OIDC configuration: ${response.statusText}`,
      );
    }
    const config = await response.json();

    this.authorizationURL = config.authorization_endpoint;
    this.tokenURL = config.token_endpoint;
    this.userInfoURL = config.userinfo_endpoint;
  }
}
