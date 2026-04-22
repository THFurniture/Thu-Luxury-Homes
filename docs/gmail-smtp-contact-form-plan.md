# Plan: Migrar El Formulario De Resend A Gmail SMTP En Vercel Free

## Resumen

Cambiar el envio del formulario para que use el Gmail regular de la cliente via SMTP, ejecutado desde la action server-side actual de React Router.

Para bajo volumen, esta estrategia es viable en Vercel Hobby/free porque el formulario corre como server function y Gmail permite envios diarios limitados con App Password.

## Cambios De Implementacion

- Reemplazar `resend` por `nodemailer`.
- Instalar dependencias:

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

- Quitar `resend` de `package.json` cuando ya no se use.
- Crear un helper server-only, por ejemplo:

```txt
app/lib/smtp-mailer.server.ts
```

- El helper debe leer estas variables:

```env
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASS
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
SITE_NAME
```

- Configurar Nodemailer asi:

```ts
nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

- Actualizar `app/lib/contact-form.server.ts`.
- Mantener:
  - validacion actual
  - honeypot `company`
  - mensajes de exito/error
  - templates existentes de `contact-email.server.ts`
- Reemplazar `getResendClient()` y `resend.emails.send()` por el helper SMTP.
- Enviar email con:
  - `from: CONTACT_FROM_EMAIL`
  - `to: CONTACT_TO_EMAIL`
  - `replyTo: submission.email`
  - `subject: [SITE_NAME] New website inquiry from ${submission.name}`
  - `html: renderContactInquiryEmail(submission)`
  - `text: renderContactInquiryText(submission)`
- Eliminar `app/lib/resend.server.ts` cuando ya no este referenciado.
- Actualizar `.env.example`.

## Variables De Entorno

Ejemplo:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=clientemail@gmail.com
SMTP_PASS=google_app_password_16_chars
CONTACT_TO_EMAIL=clientemail@gmail.com
CONTACT_FROM_EMAIL="The One Home Staging <clientemail@gmail.com>"
SITE_NAME=The One Home Staging
```

## Pasos Manuales

1. Entrar a la cuenta Gmail de la cliente.
2. Activar 2-Step Verification:
   - Google Account
   - Security
   - 2-Step Verification
3. Crear App Password:
   - Google Account
   - Security
   - App passwords
   - Crear una para Mail u Other
   - Copiar la contrasena de 16 caracteres
4. En Vercel, abrir el proyecto:
   - Project
   - Settings
   - Environment Variables
5. Agregar estas variables en Production, Preview y Development si se quiere probar en todos:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=clientemail@gmail.com
SMTP_PASS=app_password_sin_espacios
CONTACT_TO_EMAIL=clientemail@gmail.com
CONTACT_FROM_EMAIL="The One Home Staging <clientemail@gmail.com>"
SITE_NAME=The One Home Staging
```

6. Hacer redeploy del proyecto en Vercel.
7. Probar el formulario desde la URL real.
8. Revisar:
   - inbox de Gmail
   - spam
   - Vercel Logs
9. Crear filtro opcional en Gmail:
   - buscar `[The One Home Staging]`
   - aplicar label `Website Leads`

## Test Plan

### Local

- Crear `.env` local con las variables SMTP.
- Ejecutar:

```bash
npm run dev
```

- Enviar formulario valido y confirmar que llega el email.
- Enviar formulario invalido y confirmar que la validacion sigue funcionando.
- Enviar con el campo honeypot `company` lleno y confirmar que responde exito sin mandar email.

### Produccion

- Enviar un lead real desde Vercel.
- Confirmar que el email llega.
- Confirmar que `replyTo` permite responder directamente al visitante.
- Confirmar que el subject incluye `SITE_NAME`.
- Revisar que no haya errores SMTP en Vercel Logs.

## Supuestos

- El volumen sera bajo.
- La cliente usara Gmail regular `@gmail.com`.
- La cliente acepta activar 2FA.
- La cliente acepta generar una App Password.
- Vercel Hobby/free se usara sabiendo que tecnicamente soporta functions, pero Vercel lo define como plan personal/no comercial.
- Si el volumen sube, conviene migrar a Google Workspace, Zoho, Resend, Brevo o Amazon SES.
