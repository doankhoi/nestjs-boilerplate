import { User } from '@entities';
import { env } from '@environments';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';

export interface CommonParamsType {
  author: string;
  issuer: string;
  ios?: string;
  android?: string;
  twitter?: string;
  facebook?: string;
  googleplus?: string;
  linkedin?: string;
  number: string;
  street: string;
  city: string;
  country: string;
  to?: string;
  tracking?: string;
}

export interface ExtractParamsType {
  link?: string;
  subject?: string;
  text1?: string;
  button?: string;
  text2?: string;
}

export class BaseEmail {
  commonParams: CommonParamsType;
  extractParams?: ExtractParamsType;
  emailTemplate: string;

  constructor() {
    this.emailTemplate = './src/assets/templates/mail.html';
    this.commonParams = {
      author: env.get('mail.author'),
      issuer: env.get('mail.issuer'),
      number: '17',
      street: 'Hang Chuoi',
      city: 'Ha Noi',
      country: 'Viet Nam',
    };
  }

  readHTMLFile(callback: any) {
    fs.readFile(this.emailTemplate, { encoding: 'utf-8' }, (err, html) => {
      if (err) {
        callback(err);
      } else {
        callback(null, html);
      }
    });
  }

  async sendEmail(user: User, token?: string, req?: any, _id?: string) {
    if (!user.email) {
      console.log(`Missing user email of wallet: ${user.walletAddress}`);
      return;
    }

    const transporter = await nodemailer.createTransport({
      service: 'SendGrid',
      secure: false,
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: env.get('mail.nodemailerUser'),
        pass: env.get('mail.nodemailerPass'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const data: CommonParamsType & ExtractParamsType = {
      ...this.commonParams,
      to: user.email,
      ...this.extractParams,
    };

    this.readHTMLFile((err, html) => {
      const template = handlebars.compile(html);
      const htmlToSend = template(data);

      const mailOptions = {
        from: `"Lixi NFT" <${env.get('mail.fromEmail')}>`,
        to: user.email,
        subject: data.subject,
        html: htmlToSend,
        attachments: [
          {
            path: './src/assets/images/logo.png',
            cid: 'unique@lixinft.me',
          },
          {
            path: './src/assets/images/mail/twitter.jpg',
            cid: 'twitter@lixinft.me',
          },
          {
            path: './src/assets/images/mail/facebook.jpg',
            cid: 'facebook@lixinft.me',
          },
          {
            path: './src/assets/images/mail/googleplus.jpg',
            cid: 'googleplus@lixinft.me',
          },
          {
            path: './src/assets/images/mail/linkedin.jpg',
            cid: 'linkedin@lixinft.me',
          },
        ],
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Send email: ${info.messageId}`);
        }
      });

      transporter.close();
    });
  }
}
