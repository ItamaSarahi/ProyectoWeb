
import * as ejsLibrary from "../libraries/ejs.library";
import { mailer } from "../libraries/mailer.library";

export async function sendUserCredentials(params: { data: object | undefined; emai: string | undefined }) {
  const { data, emai } = params;
  const htmlContent = await ejsLibrary.renderFileHtml({ data:data || {}, file: "credenciales-template.ejs"});
  const responseMailer = await mailer.sendMail({
    from: process.env.MAILER_USER,
    to: emai,
    html: htmlContent,
    subject:"BIENVENIDO A CREATIVE IDEAS"
  });
}

export async function enviarCorreo(params: { data: object | undefined; emai: string | undefined }) {
  const { data, emai } = params;
  const htmlContent = await ejsLibrary.renderFileHtml({ data:data || {}, file: "ticket-template.ejs"});
  const responseMailer = await mailer.sendMail({
    from: process.env.MAILER_USER,
    to: emai,
    html: htmlContent,
    subject:"BIENVENIDO A CREATIVE IDEAS"
  });

  
}