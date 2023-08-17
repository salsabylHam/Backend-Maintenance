import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import * as ejs from 'ejs';

@Injectable()
export class MailService {
  ses: SESv2Client;
  constructor(
    private configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {
    if (configService.get('MAILING_OPTION') == 'ses') {
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
  }

  async sendUserForgotPasswordUrl(user: User, token: string) {
    try {
      const url = `${this.configService.get(
        'ALLOWED_ORIGIN',
      )}/updatepassword?code=${token}`;

      if (this.configService.get('MAILING_OPTION') == 'ses') {
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
      } else {
        await this.mailerService.sendMail({
          to: user.email,
          from: this.configService.get('EMAIL'),
          subject: 'Reset password',
          html: await ejs.renderFile(
            join(__dirname, 'templates', 'forgotPassword.ejs'),
            {
              name: user.firstName,
              url,
            },
          ),
        });
      }
    } catch (err) {
      throw err;
    }
  }
}
