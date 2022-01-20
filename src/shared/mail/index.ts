import { User } from '@entities';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import { env } from '@environments';
import * as handlebars from 'handlebars';

export type MailType = 'verifyEmail' | 'welcomeEmail';

export const sendEmail = async (
  type: MailType,
  user: User,
  req: any,
  token: string,
  _id: string,
): Promise<any> => {
  if (!user.email) {
    console.log(`User: ${user.walletAddress} is missing email`);
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

  const readHTMLFile = (path: string, callback: any) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
      if (err) {
        callback(err);
      } else {
        callback(null, html);
      }
    });
  };

  readHTMLFile('./src/assets/templates/mail.html', (err, html) => {
    const template = handlebars.compile(html);

    const common = {
      author: env.get('mail.author'),
      issuer: env.get('mail.issuer'),
      ios: '',
      android: '',
      twitter: '',
      facebook: '',
      googleplus: '',
      linkedin: '',
      number: '17',
      street: 'Hang Chuoi',
      city: 'Ha Noi',
      country: 'Viet Nam',
      to: user.fullName,
      tracking: `http://${req.headers.host}/${env.get(
        'graphqlEndpoint',
      )}/${_id}`,
    };

    const replacements = {
      verifyEmail: {
        link: `${req.headers.origin}/verify/${token}`,
        subject: 'Verify Email',
        text1: 'To complete your sign up, please verify your email: ',
        button: 'VERIFY EMAIL',
        text2: 'Or copy this link and paste in your web	browser',
        ...common,
      },
      forgotPassword: {
        link: `${req.headers.origin}/reset/${token}`,
        subject: 'Reset Your Password',
        text1:
          // tslint:disable-next-line:quotemark
          "Tap the button below to reset your customer account password. If you didn't request a new password, you can safely delete this email.",
        button: 'Set New Password',
        text2:
          // tslint:disable-next-line:quotemark
          "If that doesn't work, copy and paste the following link in your browser:",
        ...common,
      },
    };

    const htmlToSend = template(replacements[type]);

    const mailOptions = {
      from: 'Lixi NFT:' + env.get('mail.nodemailerUser'),
      to: user.email,
      subject: replacements[type].subject,
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
      }
    });

    transporter.close();
  });
};
