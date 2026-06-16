# Pasos Manuales: Formulario Con Gmail SMTP

## Cuenta De Google

1. Entrar a la cuenta Gmail que va a enviar y recibir los inquiries del sitio.
2. Abrir Google Account > Security.
3. Activar 2-Step Verification si todavia no esta activo.
4. Abrir App passwords.
5. Crear un nuevo app password para Mail u Other.
6. Copiar la contrasena de 16 caracteres.
7. Guardarla solo en el `.env` local y en las Environment Variables de Vercel. No commitearla.

## Entorno Local

1. Crear un archivo `.env` local tomando `.env.example` como base.
2. Completar la cuenta Gmail y el app password:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=clientemail@gmail.com
SMTP_PASS=app_password_without_spaces
CONTACT_TO_EMAIL=clientemail@gmail.com
CONTACT_FROM_EMAIL="THU Design Projects <clientemail@gmail.com>"
SITE_NAME=THU Design Projects
SITE_ORIGIN=http://localhost:5173
```

3. Correr el dev server:

```bash
npm run dev
```

4. Abrir `/contact`, esperar al menos 3 segundos y enviar una prueba.
5. Confirmar que el email llega a Gmail.
6. Revisar spam si no aparece en inbox.

## Environment Variables En Vercel

1. Abrir el proyecto en Vercel.
2. Ir a Settings > Environment Variables.
3. Agregar estas variables en Production:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=clientemail@gmail.com
SMTP_PASS=app_password_without_spaces
CONTACT_TO_EMAIL=clientemail@gmail.com
CONTACT_FROM_EMAIL="THU Design Projects <clientemail@gmail.com>"
SITE_NAME=THU Design Projects
SITE_ORIGIN=https://your-production-domain.com
```

4. Agregar las mismas variables en Preview solo si quieres que los preview deployments envien emails reales.
5. Hacer redeploy despues de agregar o cambiar variables.

## Prueba En Produccion

1. Abrir la pagina `/contact` en produccion.
2. Esperar al menos 3 segundos antes de enviar.
3. Enviar un inquiry realista.
4. Confirmar que:
   - el email llega
   - Reply usa el email del visitante
   - el subject incluye `SITE_NAME`
   - no aparecen secretos SMTP en Vercel Logs

## Notas

- Gmail SMTP queda pensado aqui para uso de bajo volumen.
- Si el app password se expone, revocarlo en Google Account > Security > App passwords y crear uno nuevo.
- Si aumenta el spam, agregar rate limiting persistente con Vercel KV o Upstash y considerar Cloudflare Turnstile.
