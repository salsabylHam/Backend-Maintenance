import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import * as ejs from 'ejs';
import { join } from 'path';

@Injectable()
export class MailService {
  ses: SESv2Client;
  constructor(private configService: ConfigService) {
    this.ses = new SESv2Client({
      endpoint: configService.get('SES_HOST'),
      region: configService.get('SES_REGION'),
      credentials: configService.get('SES_ISLOCAL')
        ? {
            accessKeyId: 'ANY_STRING',
            secretAccessKey: 'ANY_STRING',
          }
        : null,
    });
  }

  async sendUserForgotPasswordUrl(user: User, token: string) {
    try {
      const url = `${this.configService.get(
        'ALLOWED_ORIGIN',
      )}/updatepassword?code=${token}`;

      await this.ses.send(
        new SendEmailCommand({
          FromEmailAddress: this.configService.get('SES_FROM_EMAIL'),
          Destination: { ToAddresses: [user.email] },
          Content: {
            Simple: {
              Subject: { Data: 'Reset password' },
              Body: {
                Html: {
                  Data: await ejs.renderFile(
                    join(__dirname, 'templates', 'forgotPassword.ejs'),
                    {
                      name: user.firstName,
                      url,
                    },
                  ),
                  Charset: 'UTF-8',
                },
              },
            },
          },
        }),
      );
    } catch (err) {
      throw err;
    }
  }
}
