# API_Refaccionaria
Esta API está diseñada para gestionar clientes y piezas en una refaccionaria, ofreciendo un conjunto de operaciones CRUD (Crear, Leer, Actualizar y Eliminar) para ambos tipos de entidades. El sistema está optimizado con características avanzadas como paginación, búsqueda por categorías y almacenamiento en caché para un mejor rendimiento.

## Tecnologías🖥️
Este proyecto ha sido desarrollado con las siguientes tecnologías:
- ⚙️ Node.js - Entorno de ejecución de JavaScript.
- 🟦 TypeScript - Superconjunto de JavaScript.
- 🐳 Docker - Contenedorización del proyecto.
- 📦 pnpm - Gestor de paquetes.
- 🍃 MongoDB - Base de datos NoSQL.
- 🚀 Express - Framework para construir la API.
- 📜 Swagger - Documentación de API.
- 🧠 Redis - Almacenamiento de cache.

## Requisitos📋
- [x] 🛠️ DataGrip - Herramienta de administración de bases de datos.
- [x] 🐳 Docker - Contenedorización del proyecto.
- [x] 📝 Visual Studio Code - Editor de código.
      
## Instalación 🔧
- ⚙️ Configuración inicial<br>
      1. Clonar el repositorio en el directorio de tu preferencia.<br>
         ``git clone https://github.com/GaelRS/API_Refaccionaria.git``<br>
      2. Una vez que haya clonado el repositorio, dirígete a la terminal y ejecuta el siguiente comando.<br>
         ``pnpm install``<br>
         
- 🐳 Configuración de Contenedores
    - 1.crear contenedor que contiene la BD de Mongo.<br>
        ``docker run --name Refaccionaria -p 27017:27017 -v refaccionaria:/data/db -d mongo``
      
        - 1.1 Verificar que el sistema esté en ejecución. A continuación, abre DataGrip y crea una nueva fuente de datos (Data Source) para MongoDB. Luego, introduce el siguiente script.
          ```bash
          use Refaccionaria
          
          db.createCollection("Piezas");
          db.createCollection("Clientes");

          db.Piezas
          ```
          

  
