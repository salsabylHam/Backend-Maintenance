import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';
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

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get('CLIENT_ID'),
      this.configService.get('CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL'),
        clientId: this.configService.get('CLIENT_ID'),
        clientSecret: this.configService.get('CLIENT_SECRET'),
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }

  async sendUserForgotPasswordUrl(user: User, token: string) {
    try {
      await this.setTransport();
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
          transporterName: 'gmail',
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
