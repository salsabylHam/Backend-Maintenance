import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { PROVIDERS } from 'src/shared/enums';

export class CreateAuthConfigDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  issuer: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl({
    require_tld: false,
    allow_protocol_relative_urls: true,
  })
  callbackURL: string;

  @IsEnum(PROVIDERS)
  provider: PROVIDERS;

  @IsString()
  @IsNotEmpty()
  clientID: string;

  @IsString()
  @IsNotEmpty()
  clientSecret: string;

  @IsString()
  @IsNotEmpty()
  scope: string;
}
