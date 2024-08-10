# Onboarding/KYC Truora API

Este proyecto es una prueba técnica que implementa la funcionalidad de Onboarding/KYC utilizando la API de Truora. A continuación, se detallan los pasos para clonar, configurar y ejecutar el proyecto en tu entorno local.

## Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos en tu máquina:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

## Instrucciones de Instalación

### 1. Clonar el Repositorio

Primero, clona este repositorio en tu máquina local usando el siguiente comando:

```bash
git clone https://github.com/Fyroxl/truora-kyc.git
```

Luego, navega al directorio del proyecto:

```bash
cd truora-kyc
```

### 2. Instalar Dependencias

Para instalar todas las dependencias del proyecto, ejecuta:

```bash
npm install
```

### 3. Configurar Variables de Entorno

Edita el archivo `.env.dev` a `.env` y agrega tu `Truora-API-Key`:

```bash
VITE_TRUORA_API_KEY=tu_clave_api
```

Asegúrate de reemplazar `tu_clave_api` con la API key real.

### 4. Ejecutar el Proyecto

Una vez que hayas configurado el archivo `.env` y las dependencias se hayan instalado correctamente, puedes ejecutar el proyecto con el siguiente comando:

```bash
npm run dev
```

Este comando iniciará el servidor de desarrollo. Si todo está configurado correctamente, deberías poder acceder al proyecto en tu navegador en la siguiente URL:

```
http://localhost:5173
```

## Estructura del Proyecto

Aquí hay una descripción general de la estructura del proyecto:

- **src/**: Contiene el código fuente de la aplicación.
- **public/**: Contiene los archivos estáticos que serán servidos directamente.
- **.env**: Archivo de configuración de las variables de entorno.
- **package.json**: Contiene las dependencias y scripts del proyecto.
