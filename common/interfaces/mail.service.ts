import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  private async initializeTransporter() {
    this.logger.log('Initializing transporter...');
    try {
      const oauth2Client = new google.auth.OAuth2(
        this.configService.get<string>('CLIENT_ID'),
        this.configService.get<string>('CLIENT_SECRET'),
        this.configService.get<string>('REDIRECT_URL'),
      );

      oauth2Client.setCredentials({
        refresh_token: this.configService.get<string>('REFRESH_TOKEN'),
      });

      this.logger.log('Getting access token...');
      const accessToken = await oauth2Client.getAccessToken();
      if (!accessToken) {
        throw new Error('Failed to obtain access token');
      }

      this.logger.log('Access token obtained');

      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: this.configService.get<string>('EMAIL_USER'),
          clientId: this.configService.get<string>('CLIENT_ID'),
          clientSecret: this.configService.get<string>('CLIENT_SECRET'),
          refreshToken: this.configService.get<string>('REFRESH_TOKEN'),
          accessToken: accessToken.token,
        },
        logger: true,
        debug: true,
      });

      this.logger.log('Transporter initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize transporter', error.stack);
      throw error;
    }
  }

  async sendMaill(to: string, subject: string, text: string) {
    try {
      const mailOptions = {
        from: this.configService.get<string>('EMAIL_USER'),
        to,
        subject,
        text,
      };

      await this.transporter.sendMail(mailOptions);
      this.logger.log(Email sent to ${to});
    } catch (error) {
      this.logger.error(Failed to send email to ${to}, error.stack);
      throw error;
    }
  }
}