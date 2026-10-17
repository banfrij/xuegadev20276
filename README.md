# Xuega Dev — tienda y atención al cliente

Aplicación web basada en React, TypeScript, Vite y Firebase. Esta carpeta queda configurada para compilar y desplegar la aplicación en Firebase Hosting; el proyecto Firebase de destino se selecciona explícitamente al desplegar.

## Requisitos

- Node.js 20.19+ o 22.12+ y npm.
- Un proyecto Firebase propio con Authentication y Firestore habilitados para las funciones que se vayan implementando.
- Firebase CLI para desplegar: `npm install --global firebase-tools`.

## Desarrollo local

```powershell
npm ci
Copy-Item .env.example .env
npm run dev
```

Completa en `.env` las seis variables `VITE_FIREBASE_*` con la configuración de la aplicación web Firebase. Estos valores se incluyen en el cliente; no pongas contraseñas, claves privadas ni secretos de servidor en variables `VITE_*`. La aplicación muestra el acceso deshabilitado mientras falte configuración.

## Comprobaciones y compilación

```powershell
npm run typecheck
npm run lint
npm run build
npm run preview
```

El flujo de GitHub Actions ejecuta lint y build en cada push y pull request.

## Estructura actual

```text
src/
  components/auth/  Guardas de autenticación
  config/           Inicialización Firebase
  contexts/         Estado global de sesión
  hooks/            Hooks reutilizables
  pages/            Login y panel básico
```

El alcance funcional actual es autenticación por correo y contraseña y un panel básico. Catálogo, carrito, checkout, pedidos y soporte todavía requieren implementación; no se consideran listos para operar transacciones.

Al desarrollar esos flujos, agrúpalos por dominio bajo `src/features/` (por ejemplo `catalog/`, `cart/`, `checkout/`, `orders/`, `support/` y `admin/`) y deja en `components/` solo la interfaz compartida.

## Firebase Hosting

`firebase.json` publica **`dist/`**, la salida de Vite de esta carpeta, ejecuta `npm run build` antes del despliegue y redirige las rutas de React Router a `index.html`. El archivo `.firebaserc` no fija un proyecto para evitar publicar accidentalmente en el proyecto de otra aplicación.

```powershell
firebase login
firebase deploy --only hosting --project <ID_DEL_PROYECTO_FIREBASE>
```

Usa el ID del proyecto Firebase que corresponda a esta tienda. El repositorio de referencia está vinculado a `xuegadev2026`, pero ese ID **no** se configura como destino aquí. Si también despliegas Firestore o Storage, revisa primero las reglas: parten de denegar todo acceso hasta que se implementen reglas acordes al modelo de datos y roles reales.

## Firebase y seguridad

- `firestore.rules` y `storage.rules` deniegan todo acceso por defecto. No abras lectura/escritura para todos los usuarios durante el desarrollo.
- `firestore.indexes.json` incluye los índices de pedidos y conversaciones presentes en el repositorio de referencia; revísalos si cambian las consultas o el esquema.
- Los precios, permisos de personal y operaciones de pago deben validarse en servidor/reglas, no confiarse al cliente.
- `.env` se excluye de Git. Las credenciales de Firebase del cliente no son secretos de servidor y deben restringirse en Firebase Console.
