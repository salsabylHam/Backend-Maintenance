import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { PROVIDERS } from '../enums';

@Injectable()
export class ParseAuthProviderPipe implements PipeTransform {
  transform(value: any) {
    
    if (!(Object.values(PROVIDERS).includes(value as PROVIDERS))) {
      throw new BadRequestException(
        `Invalid provider: ${value}. Allowed providers are ${Object.values(
          PROVIDERS,
        ).join(', ')}`,
      );
    }
    return value;
  }
}
