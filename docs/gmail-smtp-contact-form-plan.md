# Plan: Migrar El Formulario De Resend A Gmail SMTP En Vercel Free

## Resumen

Cambiar el envio del formulario para que use el Gmail regular de la cliente via SMTP, ejecutado desde una action server-side de React Router.

Para bajo volumen, esta estrategia es viable en Vercel Hobby/free porque el formulario corre como server function y Gmail permite envios diarios limitados con App Password.

Nota del estado actual del repo: el formulario todavia debe conectarse a una action server-side real. La implementacion actual del componente de contacto no debe llamar SMTP desde el cliente.

## Cambios De Implementacion

- Reemplazar `resend` por `nodemailer`.
- Instalar dependencias:

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

- Quitar `resend` cuando ya no haya referencias usando npm para que tambien actualice `package-lock.json`:

```bash
npm uninstall resend
```

- Crear la `action` server-side en `app/routes/contact.tsx` antes de integrar SMTP:
  - aceptar solo submissions `POST`
  - leer `await request.formData()`
  - validar y normalizar los campos en servidor
  - llamar al helper server-only de contacto
  - devolver estados controlados de exito/error para que el formulario los muestre
- Actualizar `app/components/contact/contact-form.tsx` para enviar el formulario a la action de React Router, por ejemplo con `fetcher.Form` o submit nativo de ruta.
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
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
  disableFileAccess: true,
  disableUrlAccess: true,
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

## Medidas Basicas De Seguridad

Para bajo volumen no hace falta una solucion pesada, pero si conviene agregar estas defensas desde el inicio:

- Mantener todas las credenciales SMTP solo server-side:
  - no usar prefijos publicos como `VITE_`
  - no commitear `.env`
  - no imprimir `SMTP_PASS` ni variables completas en logs
- Validar en servidor aunque el formulario tenga validacion HTML:
  - `name`: requerido, `trim`, maximo aproximado 120 caracteres
  - `email`: requerido, formato valido, maximo aproximado 254 caracteres
  - `scope`: allowlist de valores permitidos
  - `message`: `trim`, maximo aproximado 4000 caracteres
  - remover `\r` y `\n` de campos que terminen en headers de email, como `name`, `email` y `subject`
- Escapar contenido de usuario en el template HTML del email:
  - `name`
  - `email`
  - `scope`
  - `message`
- Mantener honeypot `company`:
  - si viene lleno, responder exito sin enviar email
- Agregar una proteccion anti-bot ligera:
  - incluir un timestamp oculto al renderizar el formulario
  - rechazar envios demasiado rapidos, por ejemplo menos de 3 segundos
- Agregar rate limiting basico si aparece spam:
  - por IP, por ejemplo 3 a 5 envios cada 10 minutos
  - por email, por ejemplo 3 envios por hora
  - en Vercel serverless, usar KV/Upstash/Vercel KV si se necesita persistencia real
- Opcionalmente verificar `Origin` o `Referer` contra el dominio esperado (`SITE_ORIGIN`) para reducir submissions cross-site simples.
- Usar mensajes genericos para el usuario y logs internos discretos:
  - el usuario ve exito/error simple
  - los logs guardan codigo de error SMTP y contexto minimo, no el mensaje completo si no hace falta
- Si el App Password se filtra o se comparte por error, revocarlo en Google y generar uno nuevo.

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
SITE_ORIGIN=https://example.com
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
SITE_ORIGIN=https://example.com
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
- Enviar con campos demasiado largos y confirmar que se rechazan antes de SMTP.
- Enviar con HTML en `message` y confirmar que el email lo muestra escapado, no interpretado.
- Enviar inmediatamente despues de cargar el formulario y confirmar que la proteccion de timestamp lo bloquea o lo trata como bot.

### Produccion

- Enviar un lead real desde Vercel.
- Confirmar que el email llega.
- Confirmar que `replyTo` permite responder directamente al visitante.
- Confirmar que el subject incluye `SITE_NAME`.
- Revisar que no haya errores SMTP en Vercel Logs.
- Confirmar que no se exponen secretos ni payloads completos en logs.

## Supuestos

- El volumen sera bajo.
- La cliente usara Gmail regular `@gmail.com`.
- La cliente acepta activar 2FA.
- La cliente acepta generar una App Password.
- Vercel Hobby/free se usara sabiendo que tecnicamente soporta functions, pero Vercel lo define como plan personal/no comercial.
- Si el volumen sube, conviene migrar a Google Workspace, Zoho, Resend, Brevo o Amazon SES.
