# 🚀 Sistema de Gestión de Marcas - Fullstack

Un sistema completo de gestión de marcas desarrollado con **FastAPI** (backend) y **Next.js** (frontend), que incluye autenticación JWT, CRUD de usuarios y marcas, y una interfaz moderna y responsive.

## 📋 Características

### Backend (FastAPI)
- **API REST** con documentación automática
- **Autenticación JWT** segura
- **Base de datos SQLite** con SQLAlchemy ORM
- **Validación de datos** con Pydantic
- **Hash de contraseñas** con bcrypt
- **CORS** habilitado para desarrollo

### Frontend (Next.js)
- **Interfaz moderna** con Tailwind CSS
- **Autenticación persistente** con Context API
- **Gestión de estado** optimizada
- **Notificaciones toast** para feedback
- **Tabla de datos** interactiva
- **Responsive design**

## 🛠️ Stack Tecnológico

### Backend
- **FastAPI** - Framework web moderno
- **SQLAlchemy** - ORM para base de datos
- **Pydantic** - Validación de datos
- **PyJWT** - Manejo de tokens JWT
- **Passlib** - Hash de contraseñas
- **SQLite** - Base de datos

### Frontend
- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **React Context** - Gestión de estado
- **React Hot Toast** - Notificaciones
- **Lucide React** - Iconos
- **React Data Table** - Tablas interactivas

## 📁 Estructura del Proyecto

```
proyecto-fullstack/
├── backend/                    # API FastAPI
│   ├── auth/
│   │   ├── __init__.py
│   │   └── security.py        # JWT y funciones de seguridad
│   ├── models/               # Modelos SQLAlchemy
│   │   ├── usuario.py
│   │   └── marca.py
│   ├── routes/               # Endpoints de la API
│   │   ├── auth.py
│   │   ├── usuario.py
│   │   └── marca.py
│   ├── schemas/              # Schemas Pydantic
│   │   ├── usuario.py
│   │   └── marca.py
│   ├── database.py           # Configuración BD
│   ├── main.py              # Punto de entrada
│   └── requirements.txt
├── frontend/                  # App Next.js
│   ├── app/
│   │   ├── auth/            # Páginas de autenticación
│   │   ├── marcas/          # Dashboard de marcas
│   │   └── usuario/         # Perfil de usuario
│   ├── components/
│   │   ├── auth/            # Componentes de login/registro
│   │   ├── marca/           # Componentes CRUD marcas
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── context/
│   │   └── AuthContext.tsx  # Estado global
│   ├── utils/
│   │   └── api.ts           # Configuración API
│   └── package.json
└── README.md
```

## ⚙️ Instalación

### Prerrequisitos
- **Python 3.8+**
- **Node.js 18+**
- **npm** o **yarn**

### 🔧 Backend (FastAPI)

1. **Navegar al directorio backend**
```bash
cd backend
```

2. **Crear entorno virtual**
```bash
python -m venv venv
```

3. **Activar entorno virtual**
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. **Instalar dependencias**
```bash
pip install -r requirements.txt
```

5. **Ejecutar el servidor**
```bash
uvicorn main:app --reload
fastapi dev main.py
```

El backend estará disponible en: `http://localhost:8000`

### 🎨 Frontend (Next.js)

1. **Navegar al directorio frontend**
```bash
cd frontend
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
```

El frontend estará disponible en: `http://localhost:3000`

## 🚀 Uso del Sistema

### 1. **Registro de Usuario**
- Navega a `/auth/registro`
- Completa el formulario con nombre, email y contraseña
- El sistema hashea automáticamente la contraseña

### 2. **Inicio de Sesión**
- Navega a `/auth/login`
- Ingresa credenciales válidas
- Recibirás un JWT token válido por 30 minutos

### 3. **Gestión de Marcas**
- Accede al dashboard en `/marcas`
- **Crear**: Botón "Nueva Marca"
- **Ver**: Tabla con todas las marcas
- **Editar**: Icono de lápiz en cada fila
- **Eliminar**: Icono de papelera con confirmación

### 4. **Perfil de Usuario**
- Haz clic en el icono de usuario en el header
- Ve información del perfil
- Botón de logout disponible

## 🔐 Autenticación

El sistema usa **JWT (JSON Web Tokens)** para autenticación:

- **Registro**: Hash de contraseña + creación de usuario
- **Login**: Verificación + generación de JWT
- **Protección**: Middleware en rutas protegidas
- **Expiración**: Logout automático tras 30 minutos
- **Persistencia**: Token guardado en localStorage

### Flujo de Autenticación
```
1. Usuario se registra → Hash contraseña → Guarda en BD
2. Usuario hace login → Verifica credenciales → Genera JWT
3. Frontend guarda token → Incluye en headers de requests
4. Backend valida token → Permite/deniega acceso
5. Auto-logout al expirar → Redirect a login
```

## 🌐 API Endpoints

### Autenticación
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/auth/token` | Login y obtener token | ❌ |
| GET | `/auth/me` | Info del usuario actual | ✅ |

### Usuarios
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/usuarios/registro` | Registrar nuevo usuario | ❌ |
| GET | `/usuarios/` | Listar usuarios | ✅ |
| GET | `/usuarios/{id}` | Obtener usuario por ID | ✅ |
| PUT | `/usuarios/{id}` | Actualizar usuario | ✅ |
| DELETE | `/usuarios/{id}` | Eliminar usuario | ✅ |

### Marcas
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/marcas/` | Crear marca | ✅ |
| GET | `/marcas/` | Listar marcas | ✅ |
| GET | `/marcas/{id}` | Obtener marca | ✅ |
| PUT | `/marcas/{id}` | Actualizar marca | ✅ |
| DELETE | `/marcas/{id}` | Eliminar marca | ✅ |

## 📊 Modelos de Datos

### Usuario
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "correo": "juan@email.com",
  "created_at": "2024-01-01T00:00:00",
  "updated_at": "2024-01-01T00:00:00",
  "marcas": []
}
```

### Marca
```json
{
  "id": 1,
  "nombre": "Apple",
  "titular": "Apple Inc.",
  "estado": true,
  "usuarios_id": 1,
  "created_at": "2024-01-01T00:00:00",
  "updated_at": "2024-01-01T00:00:00"
}
```

## 🧪 Testing y Documentación

### API Documentation
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Testing con cURL

**Registro:**
```bash
curl -X POST "http://localhost:8000/usuarios/registro" \
-H "Content-Type: application/json" \
-d '{"nombre":"Test User","correo":"test@test.com","password":"123456"}'
```

**Login:**
```bash
curl -X POST "http://localhost:8000/auth/token" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "username=test@test.com&password=123456"
```

**Crear Marca:**
```bash
curl -X POST "http://localhost:8000/marcas" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN" \
-d '{"nombre":"Mi Marca","titular":"Mi Empresa","estado":true,"usuarios_id":1}'
```

## 🎨 Características de UI/UX

- **Responsive Design**: Compatible con mobile y desktop
- **Dark/Light Mode**: Soporte para tema del sistema
- **Loading States**: Indicadores de carga
- **Toast Notifications**: Feedback inmediato
- **Form Validation**: Validación en cliente y servidor
- **Protected Routes**: Redirección automática
- **Auto-logout**: Por expiración de token
- **Error Handling**: Manejo elegante de errores

## 🚀 Deployment

### Backend (FastAPI)
```bash
# Producción con Gunicorn
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend (Next.js)
```bash
# Build para producción
npm run build
npm start
```

### Variables de Entorno

**Backend (.env):**
```env
SECRET_KEY=tu-clave-secreta-muy-segura
DATABASE_URL=sqlite:///./app.db
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://tu-api-backend.com
```

## 🤝 Contribuir

1. **Fork** el proyecto
2. **Crea** tu rama: `git checkout -b feature/nueva-funcionalidad`
3. **Commit** tus cambios: `git commit -m 'Add: nueva funcionalidad'`
4. **Push** a la rama: `git push origin feature/nueva-funcionalidad`
5. **Abre** un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **FastAPI** por el excelente framework backend
- **Next.js** por el framework frontend moderno
- **Tailwind CSS** por el sistema de diseño
- **Vercel** por el hosting y deployment
- **Comunidad Open Source** por las increíbles librerías

## 👤 Autor

**Tu Nombre**
- GitHub: [@Juliandos](https://github.com/Juliandos)
- LinkedIn: [juliandos95](https://linkedin.com/in/juliandos95)
- Email: tu-email@ejemplo.com

## 🐛 Issues y Soporte

Si encuentras algún bug o tienes sugerencias:

1. **Revisa** los issues existentes
2. **Crea** un nuevo issue con:
   - Descripción del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots (si aplica)

---

⭐ **¡No olvides darle una estrella al repo si te resultó útil!** ⭐